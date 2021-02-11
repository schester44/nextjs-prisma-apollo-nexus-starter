import { queryField } from "@nexus/schema";

export const company = queryField("company", {
  type: "Company",
  async resolve(parent, args, ctx) {
    const id = "83107722-d216-453a-bc68-430fa5ac4894";

    return ctx.prisma.company.findUnique({ where: { id } });
  },
});
