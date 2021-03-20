import { extendType } from "@nexus/schema";
import { nonNull, stringArg } from "nexus";
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

export const project = extendType({
  type: "Query",
  definition(t) {
    t.field("project", {
      type: "Project",
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(parent, { id }, ctx: Context) {
        const pu = await ctx.prisma.projectUsers.findFirst({
          where: {
            userId: ctx.user?.id,
            projectId: id,
          },
          include: {
            project: true,
          },
        });

        return pu?.project;
      },
    });
  },
});
