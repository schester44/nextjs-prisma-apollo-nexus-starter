export * from "./query";
export * from "./mutation";

import { objectType } from "@nexus/schema";

export const InvitedUser = objectType({
  name: "UserInvites",
  definition(t) {
    t.model.user();
    t.model.invitedBy();
  },
});

export const ProjectUsers = objectType({
  name: "ProjectUsers",
  definition(t) {
    t.model.user();
    t.model.project();
    t.model.role();
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
