export * from "./mutation";
export * from "./query";

import prisma from "../../../db/prisma/client";
import { objectType, enumType } from "@nexus/schema";
import { plans } from "../../services/stripe/plans";

export const PaidPlan = enumType({
  name: "PaidPlan",
  members: Object.keys(plans),
});

export const Project = objectType({
  name: "Project",
  definition(t) {
    t.model.id();
    t.model.name();
    t.field("isPaying", {
      type: "Boolean",
      async resolve(root) {
        const subscription = await prisma.subscription.findFirst({
          where: {
            projectId: root.id,
          },
        });

        // todo: this should probably check the end date of the subscription

        return !!subscription;
      },
    });
  },
});
