import { queryField, stringArg } from "@nexus/schema";

export const currentUser = queryField("currentUser", {
  type: "User",
  resolve(parent, args, ctx) {
    console.log(ctx.user);
    return ctx.user;
  },
});

export const user = queryField("user", {
  type: "User",
  args: {
    id: stringArg(),
  },
  async resolve(parent, { id }, ctx) {
    return ctx.prisma.user.findUnique({ where: { id } });
  },
});
