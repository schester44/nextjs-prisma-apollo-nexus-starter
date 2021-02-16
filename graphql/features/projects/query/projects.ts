import { extendType } from "@nexus/schema";
import { Context } from "../../../../pages/api/graphql";

export const projects = extendType({
  type: "Query",
  definition(t) {
    t.list.field("projects", {
      type: "Project",
      async resolve(parent, args, ctx: Context) {
        const projects = await ctx.prisma.project.findMany({});

        console.log({ projects });
        return projects;
      },
    });
  },
});
