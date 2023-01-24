import Button from "@client/components/dashboard/Button";
import Layout from "@client/components/dashboard/Layout";
import NewMembersModal from "@client/components/dashboard/NewMembersModal";
import SettingsBreadcrumb from "@client/components/dashboard/SettingsBreadcrumb";
import { Project, ProjectUsers, UserInvites } from "@client/graphql/types.generated";
import { getSessionProject } from "@server/session";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";

import prisma from "src/db/prisma/client";

// TODO: InvitedUsers should be hydratable so we can update the list on invite

const Team = ({
  project,
  userEmail,
  users,
  invitedUsers,
}: {
  project: Project;
  userEmail: string;
  users: ProjectUsers[];
  invitedUsers: UserInvites[];
}) => {
  const [isNewMembersModalVisible, showAddMembersModal] = useState(false);

  return (
    <Layout>
      <NewMembersModal
        projectId={project.id}
        open={isNewMembersModalVisible}
        onClose={() => showAddMembersModal(false)}
      />

      <div className="p-4">
        <SettingsBreadcrumb path={[{ title: "Team" }]} />

        {!!invitedUsers.length && (
          <div className="mt-4 mb-8 pb-4 border-b border-gray-200">
            <h1 className="text-2xl pb-2 mb-4 font-bold border-b border-gray-200">Invited</h1>

            {invitedUsers.map(({ user, invitedBy }) => {
              return (
                <div key={user?.id}>
                  <div className="flex items-center">
                    {user?.name}
                    <div className="rounded bg-indigo-200 px-2 text-xs text-indigo-600 ml-2">
                      Invited by {invitedBy.email === userEmail ? "you" : invitedBy.name}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">{user?.email}</div>
                </div>
              );
            })}

            <p className="mt-4 text-sm text-gray-600 border-t border-gray-200 pt-4">
              {invitedUsers.length} invited
            </p>
          </div>
        )}

        <div className="flex items-center justify-between my-4">
          <h1 className="text-2xl font-bold">Team</h1>

          <Button type="primary" size="sm" onClick={() => showAddMembersModal(true)}>
            <FiPlus className="text-xl mr-2" /> New Member
          </Button>
        </div>

        <div>
          <div className="text-xs mb-4 border-t border-b border-gray-200 py-2">TEAM MEMBER</div>

          {users.map(({ user, role }) => {
            return (
              <div key={user?.id}>
                <div className="flex items-center">
                  {user?.name}
                  {userEmail === user?.email && (
                    <div className="rounded bg-indigo-200 px-2 text-xs text-indigo-600 ml-2">
                      You
                    </div>
                  )}

                  <div className="rounded bg-green-200 px-2 text-xs text-green-900 ml-2">
                    {role}
                  </div>
                </div>
                <div className="text-sm text-gray-600">{user?.email}</div>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-sm text-gray-600 border-t border-gray-200 pt-4">
          {users.length} member{users.length > 1 ? "s" : ""}
        </p>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ req, res }: NextPageContext) {
  const sessionProject = await getSessionProject(req);
  const session = await getSession({ req });

  const users = await prisma.projectUsers.findMany({
    where: { projectId: sessionProject?.projectId },
    include: { user: true },
  });

  const invitedUsers = await prisma.userInvites.findMany({
    where: { projectId: sessionProject?.projectId },
    include: { user: true, invitedBy: true },
  });

  return {
    props: {
      project: sessionProject?.project,
      userEmail: session?.user?.email,
      users,
      invitedUsers,
    },
  };
}

export default Team;
