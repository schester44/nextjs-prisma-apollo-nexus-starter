import { queryField } from "@nexus/schema";
import { isAuthenticated } from "../auth";

export const currentUser = queryField("currentUser", {
  type: "User",
  authorize: isAuthenticated,
  resolve(parent, args, ctx) {
    return ctx.user;
  },
});
