import Layout from "@client/components/dashboard/Layout";
import Link from "next/link";
import React from "react";
import { FiUser, FiCreditCard, FiUsers } from "react-icons/fi";

function MenuItem({ href, icon, title }: { href: string; icon: JSX.Element; title: string }) {
  return (
    <Link href={href}>
      <div className="w-full md:w-1/3 p-4">
        <div className="rounded-lg p-4 border border-gray-200 hover:border-indigo-500 cursor-pointer text-gray-700 hover:text-gray-900 flex items-center mb-2">
          {icon}
          <span className="pl-2">{title}</span>
        </div>
      </div>
    </Link>
  );
}

const Settings = () => {
  return (
    <Layout>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
      </div>

      <div className="flex">
        <MenuItem
          href="/app/settings/user"
          title="Profile"
          icon={<FiUser className="text-gray-400" />}
        />
        <MenuItem
          href="/app/settings/billing"
          title="Billing & Plans"
          icon={<FiCreditCard className="text-gray-400" />}
        />

        <MenuItem
          href="/app/settings/team"
          title="Team"
          icon={<FiUsers className="text-gray-400" />}
        />
      </div>
    </Layout>
  );
};

export default Settings;
