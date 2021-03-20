import { User } from "@client/graphql/types.generated";
import { NextApiRequest } from "next";
import { getSession } from "next-auth/client";
import React from "react";
import prisma from "src/db/prisma/client";
import { useRouter } from "next/router";

const AppIndex = ({ redirectTo }: { redirectTo: string }) => {
  const router = useRouter();


  
  React.useEffect(() => {
    router.push(redirectTo);
  }, [redirectTo]);

  return null;
};

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const session = await getSession({ req });
  const user = session?.user as User | undefined;

  const project = await prisma.projectUsers.findFirst({ where: { userId: user?.id } });

  return {
    props: {
      redirectTo: project ? `/app/${project.projectId}` : "/api/auth/login",
    }, // will be passed to the page component as props
  };
}

export default AppIndex;
