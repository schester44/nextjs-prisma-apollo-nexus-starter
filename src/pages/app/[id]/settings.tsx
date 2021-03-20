import { User, Project } from "@prisma/client";
import { NextPageContext } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";
import prisma from "src/db/prisma/client";

const settings = ({ user, project }: { user: User; project: Project | undefined }) => {
  const router = useRouter();

  React.useEffect(() => {
    if (!project) router.push("/app");
  }, [project]);

  return <div>Settings page for {project?.name}</div>;
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

export default settings;
