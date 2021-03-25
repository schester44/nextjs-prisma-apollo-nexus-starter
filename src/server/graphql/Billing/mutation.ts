import { mutationField, nonNull, stringArg } from "nexus";
import { stripe, plans } from "../../services/stripe";

import { Context } from "../../graphql/context";
import prisma from "../../../db/prisma/client";

import { AuthenticationError, UserInputError } from "apollo-server-micro";

export const createCheckoutSession = mutationField("createCheckoutSession", {
  type: "String",
  args: {
    projectId: nonNull(stringArg()),

    // TODO: Can we be more explicit here?
    plan: nonNull(stringArg()),
  },
  async resolve(root, { plan, projectId }, ctx) {
    if (!ctx.user) {
      throw new AuthenticationError("Whoops");
    }

    const pu = await prisma.projectUsers.findFirst({
      include: { project: true },
      where: { projectId, userId: ctx.user.id },
    });

    const project = pu?.project;

    if (!project) throw new UserInputError("No project found");

    let customer = project?.externalBillingId;

    // Finding a subscription means that this project is already paid for and we shouldn't let them pay again.
    const activeSubscription = await prisma.subscription.findFirst({
      where: {
        projectId: project.id,
      },
    });

    if (activeSubscription) throw new UserInputError("Project already paid for.");

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
          price: plans[plan as keyof typeof plans] || plans.pro,
          quantity: 1,
        },
      ],
      // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
      // the actual Session ID is returned in the query parameter when your customer
      // is redirected to the success page.
      success_url: `${process.env.NEXTAUTH_URL}/app?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/app`,
    });

    return session.id;
  },
});

export const createBillingPortalSession = mutationField("createBillingPortalSession", {
  type: "String",
  args: {
    projectId: nonNull(stringArg()),
  },
  async resolve(root, { projectId }, ctx: Context) {
    if (!ctx.user) {
      throw new AuthenticationError("Whoops");
    }

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
      throw new UserInputError("Non-existent project");
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: userProject.project.externalBillingId,
      return_url: `${process.env.NEXTAUTH_URL}/app`,
    });

    return portalSession.url;
  },
});
