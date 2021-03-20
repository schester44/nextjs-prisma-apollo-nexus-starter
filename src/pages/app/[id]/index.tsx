import Layout from "@client/components/dashboard/Layout";
import { Project, useGetProjectQueryQuery } from "@client/graphql/types.generated";
import { User } from "@prisma/client";
import { NextPageContext } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";
import prisma from "src/db/prisma/client";

const AppIndex = ({ user, project }: { user: User; project: Project | undefined }) => {
  const router = useRouter();
  React.useEffect(() => {
    if (!project) router.push("/app");
  }, [project]);

  return (
    <Layout activeProject={project}>
      <h1>This is the Project Dashboard for {project?.name}.</h1>
    </Layout>
  );
};

export async function getServerSideProps({ req, params }: NextPageContext) {
  const session = await getSession({ req });
  const user = session?.user as User | undefined;

  const pu = await prisma.projectUsers.findFirst({
    where: {
      userId: user?.id,
      projectId: params.id,
    },
    include: {
      project: true,
    },
  });

  return {
    props: {
      project: pu?.project || null,
      user,
    },
  };
}

export default AppIndex;
