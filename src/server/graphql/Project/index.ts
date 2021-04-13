export * from "./mutation";
export * from "./query";

import prisma from "../../../db/prisma/client";
import { objectType, enumType } from "@nexus/schema";
import { plans } from "../../services/stripe/plans";

export const PaidPlan = enumType({
  name: "PaidPlan",
  members: Object.keys(plans),
});

export const Subscriptions = objectType({
  name: "Subscription",
  definition(t) {
    t.model.id();
    t.model.endDate();
    t.model.externalProductId();

    t.field("planLevel", {
      type: PaidPlan,
      resolve(subscription) {
        const planLevel = Object.keys(plans).find((key) => {
          return plans[key as keyof typeof plans] === subscription.externalProductId;
        }) as keyof typeof plans;

        return planLevel;
      },
    });
  },
});

export const Project = objectType({
  name: "Project",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.users();
    t.model.subscriptions();

    t.field("isPaying", {
      type: "Boolean",
      async resolve(root) {
        const subscription = await prisma.subscription.findFirst({
          where: {
            projectId: root.id,
            endDate: {
              gte: new Date(),
            },
          },
        });

        return !!subscription;
      },
    });
  },
});
