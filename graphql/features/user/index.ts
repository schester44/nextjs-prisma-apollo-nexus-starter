import { objectType } from "@nexus/schema";

export const User = objectType({
  name: "User",
  definition(t) {
    t.string("id");
    t.string("firstName");
    t.string("lastName");
    t.string("email");

    t.field("company", {
      type: "Company",
      resolve: (parent, args, ctx) =>
        ctx.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .company(),
    });
  },
});
