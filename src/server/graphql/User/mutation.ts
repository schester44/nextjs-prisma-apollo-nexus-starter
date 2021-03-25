import { UserInputError } from "apollo-server-micro";
import { mutationField, nonNull, stringArg } from "nexus";
import { Context } from "src/server/graphql/context";

export const changeSessionProject = mutationField("changeSessionProject", {
  type: "Boolean",
  args: {
    projectId: nonNull(stringArg()),
  },
  async resolve(root, { projectId }, ctx: Context) {
    if (!ctx.user || !ctx.session) return false;

    const project = await ctx.prisma.projectUsers.findFirst({
      where: {
        projectId,
        userId: ctx.user.id,
      },
    });

    if (!project) throw new UserInputError("Invalid args");

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
