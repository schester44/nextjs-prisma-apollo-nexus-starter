export * from "./query";

import { objectType } from "@nexus/schema";

export const ProjectUsers = objectType({
  name: "ProjectUsers",
  definition(t) {
    t.model.user();
    t.model.project();
  },
});

export const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();

    // FIXME:
    t.model.projects();
  },
});
