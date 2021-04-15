import { extendType } from "@nexus/schema";
import { AuthenticationError, UserInputError } from "apollo-server-errors";
import { arg, nonNull, queryField, stringArg } from "nexus";
import { AuthenticatedUserContext, Context } from "src/server/graphql/context";
import { isAuthenticated } from "../auth";
import { logger } from "src/server/logging";

export const projectUsers = extendType({
  type: "Query",
  definition(t) {
    t.list.field("projectUsers", {
      type: "User",
      args: {
        projectId: nonNull(stringArg()),
      },
      // authorize: isAuthenticated,
      async resolve(parent, { projectId }, ctx: AuthenticatedUserContext) {
        const users = await ctx.prisma.projectUsers.findMany({
          where: { projectId },
          include: { user: true },
        });

        return users.map(({ user }) => user);
      },
    });
  },
});

export const projects = extendType({
  type: "Query",
  definition(t) {
    t.list.field("projects", {
      type: "Project",
      authorize: isAuthenticated,
      async resolve(parent, args, ctx: AuthenticatedUserContext) {
        const projects = await ctx.prisma.projectUsers.findMany({
          where: { userId: ctx.user.id },
          include: { project: true },
        });

        return projects.map(({ project }) => project);
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
        //FIXME:
        id: stringArg(),
      },
      authorize: isAuthenticated,
      async resolve(parent, { id }, ctx: AuthenticatedUserContext) {
        const pu = await ctx.prisma.projectUsers.findFirst({
          where: {
            userId: ctx.user.id,
            projectId: id,
          },
          include: {
            project: true,
          },
        });

        if (!pu) {
          logger.info(`User ${ctx.user.id} requested a project  (${id}) that does not exist.`);

          throw new UserInputError("The requested project does not exit");
        }

        return pu.project;
      },
    });
  },
});
