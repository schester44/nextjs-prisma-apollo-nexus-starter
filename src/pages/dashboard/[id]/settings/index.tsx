import Layout from "@client/components/dashboard/Layout";
import { Project } from "@prisma/client";
import { getActiveProject } from "@server/session";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FiUser, FiCreditCard, FiUsers } from "react-icons/fi";

function MenuItem({ href, icon, title }: { href: string; icon: JSX.Element; title: string }) {
  return (
    <div className="mb-2 px-4 py-2">
      <Link href={href} className="w-full">
        <div className="cursor-pointer text-gray-700 hover:text-gray-900 flex items-center">
          {icon}
          <span className="pl-2">{title}</span>
        </div>
      </Link>
    </div>
  );
}

const Settings = () => {
  const { query } = useRouter();

  return (
    <Layout>
      <div className="flex flex-1">
        <div className="w-[200px] border-r h-full pt-4">
          <MenuItem
            href={`/dashboard/${query.id}/settings/billing`}
            title="Billing & Plans"
            icon={<FiCreditCard className="text-gray-400" />}
          />

          <MenuItem
            href={`/dashboard/${query.id}/settings/team`}
            title="Team"
            icon={<FiUsers className="text-gray-400" />}
          />
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p>upgrade so we can use nested routes</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ req, res, query }: NextPageContext) {
  const session = await getSession({ req });

  if (!session) {
    res.writeHead(302, { Location: "/" });
    res.end();
  }

  return { props: {} };
}

export default Settings;
