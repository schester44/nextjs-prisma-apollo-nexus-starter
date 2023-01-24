import React from "react";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import SideNav from "../SideNav";
import { ProjectUsers, useGetCurrentUserQuery, User } from "@client/graphql/types.generated";
import ActionBar from "../ActionBar";
import { useRouter } from "next/router";

type LayoutProps = { children: React.ReactNode };

const Layout = ({ children }: LayoutProps) => {
  const { data: session, status } = useSession();
  const { query } = useRouter();

  const loading = status === "loading";

  const [{ data, fetching }] = useGetCurrentUserQuery();

  useEffect(() => {
    if (loading) return;

    if (!session) {
      signIn();
    }
  }, [session, loading]);

  if (loading || fetching) return <div>Loading...</div>;

  if (!session || !data?.currentUser?.projects) return null;

  const activeProject = data.currentUser.projects.find(
    (project) => project.project.id === query.id
  )?.project;

  return (
    <div className="w-full h-full flex">
      <SideNav
        activeProject={activeProject}
        projects={data.currentUser.projects as ProjectUsers[]}
      />
      <div className="flex-1 flex flex-col h-full">{children}</div>
    </div>
  );
};

export default Layout;
