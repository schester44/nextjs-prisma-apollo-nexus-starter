import React from "react";
import { signIn, useSession } from "next-auth/client";
import { useEffect } from "react";
import SideNav from "../SideNav";
import { ProjectUsers, useGetCurrentUserQuery, User } from "@client/graphql/types.generated";
import ActionBar from "../ActionBar";
import { useActiveProject } from "@client/hooks/useActiveProject";

type LayoutProps = { children: React.ReactNode };

const Layout = ({ children }: LayoutProps) => {
  const [session, loading] = useSession();

  const [{ data, fetching }] = useGetCurrentUserQuery();
  const activeProject = useActiveProject();

  useEffect(() => {
    if (loading) return;

    if (!session) {
      signIn();
    }
  }, [session, loading]);

  if (loading || fetching) return <div>Loading...</div>;

  if (!session || !data?.currentUser?.projects) return null;

  return (
    <div className="w-full h-full flex">
      <SideNav
        activeProject={activeProject?.project}
        projects={data.currentUser.projects as ProjectUsers[]}
      />
      <div className="flex-1  flex flex-col">
        <ActionBar user={data.currentUser as User} />

        <div className="flex-1">
          <div className="h-full p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
