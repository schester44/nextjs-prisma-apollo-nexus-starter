import { objectType } from "@nexus/schema";

export const Company = objectType({
  name: "Company",
  definition(t) {
    t.string("id");
    t.string("name");

    t.list.field("users", {
      type: "User",
      resolve: (parent, input, ctx) =>
        ctx.prisma.company
          .findUnique({
            where: { id: parent.id },
          })
          .users(),
    });
  },
});
