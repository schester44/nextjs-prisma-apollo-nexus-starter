import Layout from "@client/components/dashboard/Layout";
import { Project, User } from "@client/graphql/types.generated";
import { getSessionProject } from "src/server/session";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import { getSession } from "next-auth/react";
import prisma from "@db/prisma/client";
import superjson from "superjson";

const AppIndex = ({ user, projects }: { user: User; project: Project | undefined }) => {
  const router = useRouter();

  return (
    <Layout>
      <div>hello</div>
    </Layout>
  );
};

export async function getServerSideProps({ req, res, ...rest }: NextPageContext) {
  const session = await getSession({ req });

  if (!session) {
    res.writeHead(302, { Location: "/" });
    res.end();
    return {};
  }

  const projects = await prisma.projectUsers.findMany({
    include: { project: true },
    where: {
      userId: session.user.id,
      projectId: session.currentProject,
    },
  });

  return {
    props: {
      user: session?.user || null,
      projects: superjson.stringify(projects.map((p) => p.project)),
    },
  };
}

export default AppIndex;
