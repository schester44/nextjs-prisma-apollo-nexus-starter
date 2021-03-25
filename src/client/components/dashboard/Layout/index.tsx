import React from "react";
import { signIn, useSession } from "next-auth/client";
import { useEffect } from "react";
import SideNav from "../SideNav";
import { Project, ProjectUsers, useGetCurrentUserQuery } from "@client/graphql/types.generated";
import ActionBar from "../ActionBar";
import { ModalProvider } from "react-modal-hook";

type LayoutProps = { children: React.ReactNode };

const Layout = ({ children }: LayoutProps) => {
  const [session, loading] = useSession();

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
    ({ project }) => project.id === session.currentProject
  );

  return (
    <ModalProvider>
      <div className="w-full h-full flex">
        <SideNav
          activeProject={activeProject?.project}
          projects={data.currentUser.projects as ProjectUsers[]}
        />
        <div className="flex-1">
          <ActionBar user={data.currentUser} />

          <div className="p-4">{children}</div>
        </div>
      </div>
    </ModalProvider>
  );
};

export default Layout;
