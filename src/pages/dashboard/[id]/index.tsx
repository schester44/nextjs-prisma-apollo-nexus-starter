import Layout from "@client/components/dashboard/Layout";
import { Project, User } from "@client/graphql/types.generated";
import { getSessionProject } from "src/server/session";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import { getSession } from "next-auth/react";

const AppIndex = ({ user, project }: { user: User; project: Project | undefined }) => {
  const router = useRouter();

  React.useEffect(() => {
    if (!project) router.push("/app");
  }, [project]);

  return (
    <Layout>
      <h1 className="text-3xl p-4 font-semibold">Getting started with X, {user?.name}</h1>
      <p>This is the Project Dashboard for {project?.name}.</p>
    </Layout>
  );
};

export async function getServerSideProps({ req, res, params }: NextPageContext) {
  console.log({ params });

  const session = await getSession({ req });

  if (!session) {
    res.writeHead(302, { Location: "/" });
    res.end();
    return {};
  }

  const userProject = await getSessionProject(req);

  return {
    props: {
      user: session?.user || null,
      project: userProject?.project || null,
    },
  };
}

export default AppIndex;
