import prisma from "src/db/prisma/client";

import { IncomingMessage } from "http";
import { getSession } from "next-auth/react";

export const getActiveProject = async (userId: string, { id }: { id?: string | string[] }) => {
  if (!id) return null;

  if (Array.isArray(id)) {
    id = id[0];
  }

  const userProject = await prisma.projectUsers.findFirst({
    include: { project: true },
    where: {
      userId,
      projectId: id,
    },
  });

  return userProject?.project;
};
