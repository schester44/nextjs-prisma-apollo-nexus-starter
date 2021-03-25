import prisma from "src/db/prisma/client";

import { Session } from "next-auth";
import { IncomingMessage } from "http";
import { Project, ProjectUsers, User } from "@prisma/client";
import { getSession } from "next-auth/client";

export const getSessionProject = async (
  req: IncomingMessage | undefined
): Promise<(ProjectUsers & { project: Project }) | null> => {
  if (!req) return null;

  const session = await getSession({ req });
  const user = session?.user as User | undefined;

  if (!session || !user) return null;

  let projectId = session.currentProject;

  // TODO: This is a lot of logic to be in a single pages getServerSide props
  if (!projectId) {
    const userProject = await prisma.projectUsers.findFirst({
      include: { project: true },
      where: {
        userId: user.id,
      },
    });

    if (userProject) {
      await prisma.session.update({
        where: {
          accessToken: session?.accessToken,
        },
        data: {
          currentProject: userProject?.projectId,
        },
      });
    }

    return userProject;
  }

  return prisma.projectUsers.findFirst({
    include: { project: true },
    where: {
      userId: user.id,
      projectId: session.currentProject,
    },
  });
};
