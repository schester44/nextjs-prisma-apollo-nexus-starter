import { logger } from "@server/logging";
import { UserInputError } from "apollo-server-micro";
import { mutationField, nonNull, stringArg, list, enumType, arg } from "nexus";
import { AuthenticatedUserContext } from "src/server/graphql/context";
import { isAuthenticated } from "../auth";

const userRoles = ["ADMIN", "USER"];

export const UserRole = enumType({
  name: "UserRole",
  members: userRoles,
});

export const changeSessionProject = mutationField("changeSessionProject", {
  type: "Boolean",
  args: {
    projectId: nonNull(stringArg()),
  },
  authorize: isAuthenticated,
  async resolve(root, { projectId }, ctx: AuthenticatedUserContext) {
    const project = await ctx.prisma.projectUsers.findFirst({
      where: {
        projectId,
        userId: ctx.user.id,
      },
    });

    if (!project) {
      logger.info(
        `User ${ctx.user.id} tried to change their session project to one that does not exist (${projectId})`
      );

      throw new UserInputError("Project does not exist");
    }

    await ctx.prisma.session.update({
      where: {
        accessToken: ctx.session?.accessToken,
      },
      data: {
        currentProject: projectId,
      },
    });

    return true;
  },
});
