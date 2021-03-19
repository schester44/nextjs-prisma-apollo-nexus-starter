import { mutationField, nonNull, stringArg } from "nexus";
import { Context } from "src/server/graphql/context";

export const createProject = mutationField("createProject", {
  type: "Project",
  args: {
    projectName: nonNull(stringArg()),
  },
  async resolve(root, { projectName }, ctx: Context) {
    const project = await ctx.prisma.project.create({
      data: {
        // TODO: Fixme
        //@ts-ignore
        name: projectName,
      },
    });

    await ctx.prisma.projectUsers.create({
      data: {
        userId: 2,
        // TODO: Fixme
        // userId: ctx.user.id,
        projectId: project.id,
      },
    });

    console.log({ project });

    return project;
  },
});
