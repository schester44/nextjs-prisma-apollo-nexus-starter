import { extendType } from "@nexus/schema";
import { Context } from "src/server/graphql/context";

export const projects = extendType({
  type: "Query",
  definition(t) {
    t.list.field("projects", {
      type: "Project",
      async resolve(parent, args, ctx: Context) {
        // TODO: Only return a users projects
        const projects = await ctx.prisma.project.findMany({});

        return projects;
      },
    });
  },
});
