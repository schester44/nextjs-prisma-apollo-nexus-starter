import { queryField, stringArg } from "@nexus/schema";

export const user = queryField("user", {
  type: "User",
  args: {
    id: stringArg(),
  },
  async resolve(parent, { id }, ctx) {
    return ctx.prisma.user.findUnique({ where: { id } });
  },
});
