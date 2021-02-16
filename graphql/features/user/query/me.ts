import { queryField } from "@nexus/schema";

export const me = queryField("me", {
  type: "User",
  async resolve(parent, args, ctx) {
    return ctx.user;
  },
});
