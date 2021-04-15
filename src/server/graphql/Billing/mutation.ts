import { mutationField, nonNull, stringArg } from "nexus";
import { stripe, plans } from "../../services/stripe";

import { AuthenticatedUserContext } from "../../graphql/context";
import prisma from "../../../db/prisma/client";

import { UserInputError } from "apollo-server-micro";
import { isAuthenticated } from "../auth";
import { logger } from "@server/logging";

export const changeSubscriptionPlan = mutationField("changeSubscriptionPlan", {
  type: "Boolean",
  args: {
    projectId: nonNull(stringArg()),

    // TODO: Can we be more explicit here?
    plan: nonNull(stringArg()),
  },
  authorize: isAuthenticated,
  async resolve(root, { plan, projectId }, ctx: AuthenticatedUserContext) {
    const pu = await prisma.projectUsers.findFirst({
      include: { project: true },
      where: { projectId, userId: ctx.user.id },
    });

    const project = pu?.project;

    const selectedPlan = plans[plan as keyof typeof plans];

    if (!selectedPlan) {
      logger.error(
        `${ctx.user.id} tried to change their subscription plan to a plan that does not exist (${plan}) for project ID ${projectId}.`
      );

      throw new UserInputError("Invalid  plan");
    }

    if (!project) {
      logger.error(
        `${ctx.user.id} tried to change their subscription plan for a project that doesn't exist (${projectId}).`
      );

      throw new UserInputError("No project found");
    }

    // Finding a subscription means that this project is already paid for and we shouldn't let them pay again.
    const activeSubscription = await prisma.subscription.findFirst({
      where: {
        projectId: project.id,
      },
    });

    if (!activeSubscription) {
      logger.error(
        `${ctx.user.id} tried to change their subscription plan for a project that doesn't yet have an active subscription (${projectId}).`
      );

      throw new UserInputError("Project does not have an active subscription");
    }

    const stripeSubscription = await stripe.subscriptions.retrieve(activeSubscription.externalId);

    await stripe.subscriptions.update(stripeSubscription.id, {
      cancel_at_period_end: false,
      proration_behavior: "create_prorations",
      items: [
        {
          id: stripeSubscription.items.data[0].id,
          price: selectedPlan,
        },
      ],
    });

    await prisma.subscription.update({
      data: { externalProductId: selectedPlan },
      where: {
        id: activeSubscription.id,
      },
    });

    return true;
  },
});

export const createCheckoutSession = mutationField("createCheckoutSession", {
  type: "String",
  args: {
    projectId: nonNull(stringArg()),

    // TODO: Can we be more explicit here?
    plan: nonNull(stringArg()),
  },
  authorize: isAuthenticated,
  async resolve(root, { plan, projectId }, ctx: AuthenticatedUserContext) {
    const pu = await prisma.projectUsers.findFirst({
      include: { project: true },
      where: { projectId, userId: ctx.user.id },
    });

    const project = pu?.project;

    const selectedPlan = plans[plan as keyof typeof plans];

    if (!selectedPlan) {
      logger.error(
        `${ctx.user.id} tried to create a checkout session for a plan that does not exist (${plan}) for project ID ${projectId}.`
      );

      throw new UserInputError("Invalid  plan");
    }

    if (!project) {
      logger.error(
        `${ctx.user.id} tried to create a checkout session for a project that doesn't exist (${projectId}).`
      );

      throw new UserInputError("No project found");
    }

    let customer = project?.externalBillingId;

    // Finding a subscription means that this project is already paid for and we shouldn't let them pay again.
    const activeSubscription = await prisma.subscription.findFirst({
      where: {
        projectId: project.id,
      },
    });

    if (activeSubscription) {
      logger.error(
        `${ctx.user.id} tried to create a checkout session for a project that has already been paid for (${projectId})`
      );

      throw new UserInputError("Project already paid for.");
    }

    if (!customer) {
      const { id } = await stripe.customers.create({
        name: String(ctx.user.name || ctx.user.email),
        email: String(ctx.user.email),
        metadata: {
          projectId,
          userId: ctx.user.id,
        },
      });

      await prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          externalBillingId: id,
        },
      });

      customer = id;
    }

    const session = await stripe.checkout.sessions.create({
      customer,
      client_reference_id: String(projectId),
      mode: "subscription",
      payment_method_types: ["card"],
      metadata: {
        projectId,
      },
      line_items: [
        {
          // TODO: Can we define the plans enum as an input so only a pre-defined plan name can be passed in? Let GQL handle the validation
          price: selectedPlan,
          quantity: 1,
        },
      ],
      // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
      // the actual Session ID is returned in the query parameter when your customer
      // is redirected to the success page.
      success_url: `${process.env.BASE_URL}/app?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/app`,
    });

    return session.id;
  },
});

export const createBillingPortalSession = mutationField("createBillingPortalSession", {
  type: "String",
  args: {
    projectId: nonNull(stringArg()),
  },
  authorize: isAuthenticated,
  async resolve(root, { projectId }, ctx: AuthenticatedUserContext) {
    const userProject = await prisma.projectUsers.findFirst({
      where: {
        userId: ctx.user.id,
        projectId,
      },
      include: {
        project: true,
      },
    });

    if (!userProject?.project.externalBillingId) {
      logger.error(
        `User ${ctx.user.id} tried to access the billing portal for a project (${projectId}) that is not paid for.`
      );

      throw new UserInputError("Non-existent project");
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: userProject.project.externalBillingId,
      return_url: `${process.env.BASE_URL}/app`,
    });

    return portalSession.url;
  },
});
