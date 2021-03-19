import React from "react";
import { signIn, useSession } from "next-auth/client";
import { useEffect } from "react";
import SideNav from "../SideNav";
import { ProjectUsers, useGetCurrentUserQuery } from "@client/graphql/types.generated";
import ActionBar from "../ActionBar";

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

  return (
    <div className="w-full h-full flex">
      <SideNav projects={data.currentUser.projects as ProjectUsers[]} />
      <div className="flex-1">
        <ActionBar user={data.currentUser} />

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
