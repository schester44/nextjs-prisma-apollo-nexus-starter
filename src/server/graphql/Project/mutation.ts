import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { mutationField, nonNull, stringArg } from "nexus";
import { Context } from "src/server/graphql/context";

export const createProject = mutationField("createProject", {
  type: "Project",
  args: {
    name: nonNull(stringArg()),
  },
  async resolve(root, { name }, ctx: Context) {
    if (!ctx.user) throw new AuthenticationError("Not authenticated");

    const project = await ctx.prisma.project.create({
      data: {
        name,
      },
    });

    await ctx.prisma.projectUsers.create({
      data: {
        userId: ctx.user?.id,
        projectId: project.id,
      },
    });

    if (ctx.session) {
      await ctx.prisma.session.update({
        where: {
          accessToken: ctx.session.accessToken,
        },
        data: {
          currentProject: project.id,
        },
      });
    }

    return project;
  },
});

export const updateProject = mutationField("updateProject", {
  type: "Project",
  args: {
    id: nonNull(stringArg()),
    name: nonNull(stringArg()),
  },
  async resolve(root, { id, name }, ctx: Context) {
    const project = await ctx.prisma.project.findFirst({ where: { id } });

    if (!project) {
      throw new UserInputError("Whoops!");
    }

    await ctx.prisma.project.update({ where: { id }, data: { name } });

    return ctx.prisma.project.findFirst({ where: { id } });
  },
});

export const deleteProject = mutationField("deleteProject", {
  type: "Boolean",
  args: {
    id: nonNull(stringArg()),
  },
  async resolve(root, { id }, ctx: Context) {
    const project = await ctx.prisma.project.findFirst({ where: { id } });

    if (!project) {
      throw new UserInputError("Whoops!");
    }

    return ctx.prisma.project.delete({ where: { id } });
  },
});
