import Link from "next/link";
import React from "react";
import { FiCreditCard, FiUser } from "react-icons/fi";

function MenuItem({ href, icon, title }: { href: string; icon: JSX.Element; title: string }) {
  return (
    <Link href={href}>
      <div className="cursor-pointer text-gray-700 hover:text-gray-900 flex items-center mb-2">
        {icon}
        <span className="pl-2">{title}</span>
      </div>
    </Link>
  );
}

const SettingsNav = () => {
  return (
    <div className="pl-4 pr-4 py-4 border-r border-gray-100 mr-4">
      <MenuItem href="/app/settings/user" title="Profile" icon={<FiUser className="text-gray-400" />} />
      <MenuItem
        href="/app/settings/billing"
        title="Billing & Plans"
        icon={<FiCreditCard className="text-gray-400" />}
      />
    </div>
  );
};

export default SettingsNav;
