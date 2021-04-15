import Button from "@client/components/dashboard/Button";
import Layout from "@client/components/dashboard/Layout";
import NewMembersModal from "@client/components/dashboard/NewMembersModal";
import SettingsBreadcrumb from "@client/components/dashboard/SettingsBreadcrumb";
import { useProjectUsersQuery } from "@client/graphql/types.generated";
import { useActiveProject } from "@client/hooks/useActiveProject";
import { useSession } from "next-auth/client";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";

const Team = () => {
  const [isNewMembersModalVisible, showAddMembersModal] = useState(false);
  const [session] = useSession();
  const activeProject = useActiveProject();

  const [{ data }] = useProjectUsersQuery({
    pause: !activeProject,
    variables: {
      projectId: activeProject?.project.id as string,
    },
  });

  if (!data?.projectUsers) return null;

  return (
    <Layout>
      <NewMembersModal open={isNewMembersModalVisible} onClose={() => showAddMembersModal(false)} />

      <div className="p-4">
        <div className="mb-3">
          <SettingsBreadcrumb path={[{ title: "Team" }]} />

          <div className="flex items-center justify-between mt-4">
            <h1 className="text-2xl font-bold">Team</h1>

            <Button type="primary" size="sm" onClick={() => showAddMembersModal(true)}>
              <FiPlus className="text-xl mr-2" /> New Member
            </Button>
          </div>
        </div>

        <div>
          <div className="text-xs mb-4 border-t border-b border-gray-200 py-2">TEAM MEMBER</div>

          {data.projectUsers.map((user) => {
            return (
              <div key={user?.id}>
                <div className="flex items-center">
                  {user?.name}
                  {session?.user.email === user?.email && (
                    <div className="rounded bg-indigo-200 px-2 text-xs text-indigo-600 ml-2">
                      You
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-600">{user?.email}</div>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-sm text-gray-600 border-t border-gray-200 pt-4">
          {data.projectUsers.length} member{data.projectUsers.length > 1 ? "s" : ""}
        </p>
      </div>
    </Layout>
  );
};

export default Team;
