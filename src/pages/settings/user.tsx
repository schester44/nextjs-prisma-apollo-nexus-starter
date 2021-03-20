import Layout from "@client/components/dashboard/Layout";
import { useGetCurrentUserQuery } from "@client/graphql/types.generated";
import React from "react";

const User = () => {
  const [{ data }] = useGetCurrentUserQuery();

  if (!data?.currentUser) return null;

  return (
    <Layout>
      <div>
        <div className="border-b py-3 mb-3">
          <h1 className="text-3xl font-medium">Profile</h1>
        </div>

        <div>
          <div>Email {data.currentUser.email}</div>
          <div>Name {data.currentUser.name}</div>
        </div>
      </div>

      <div>
        <div className="border-b py-3">
          <h3 className="text-xl font-medium">Projects</h3>
          <p className="text-sm text-gray-700">The list of projects to which you are a member.</p>
        </div>

        <div>
          {data.currentUser.projects.map(({ project }) => {
            return (
              <div key={project.id} className="p-2">
                {project.name} - {project.id}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default User;
