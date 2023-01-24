import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import prisma from "@db/prisma/client";

const AppIndex = () => {
  return null;
};

export async function getServerSideProps({ req, res }: NextPageContext) {
  const session = await getSession({ req });

  if (!session) {
    res.writeHead(302, { Location: "/" });
    res.end();
    return {};
  }

  const projects = await prisma.projectUsers.findFirst({
    include: { project: true },
    where: {
      userId: session.user.id,
    },
  });

  const projectId = projects?.project.id;

  res.writeHead(302, { Location: projectId ? `/dashboard/${projectId}/home` : "/" });
  res.end();
  return {};
}

export default AppIndex;
