import { NextPageContext } from "next";
import React from "react";
import { getSession } from "next-auth/react";
import prisma from "@db/prisma/client";
import Layout from "@client/components/dashboard/Layout";

const AppIndex = () => {
  return <Layout>hello world</Layout>;
};

export async function getServerSideProps({ req, res, query }: NextPageContext) {
  const session = await getSession({ req });

  if (!session || !query.id) {
    res.writeHead(302, { Location: "/" });
    res.end();
    return {};
  }

  const project = await prisma.projectUsers.findFirst({
    include: { project: true },
    where: {
      userId: session.user.id,
      projectId: query.id as string,
    },
  });

  return {
    props: {
      project: project?.project || null,
    },
  };
}

export default AppIndex;
