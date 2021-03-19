export * from "./mutation";
export * from "./query";

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
  },
});
