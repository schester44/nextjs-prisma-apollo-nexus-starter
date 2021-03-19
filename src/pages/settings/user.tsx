import Layout from "@client/components/dashboard/Layout";
import { useGetCurrentUserQuery } from "@client/graphql/types.generated";
import React from "react";

const User = () => {
  const [{ data }] = useGetCurrentUserQuery();

  if (!data?.currentUser) return null;

  return (
    <Layout>
      <h1>This is the user settings page.</h1>
    </Layout>
  );
};

export default User;
