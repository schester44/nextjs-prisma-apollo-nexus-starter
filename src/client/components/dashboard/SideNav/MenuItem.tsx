import React from "react";
import Link from "next/link";

interface Props {
  label: string;
  icon: React.ReactNode;
  href?: string;
}

const NavMenuItem = ({ label, icon, href }: Props) => {
  return (
    <Link href={href}>
      <a href={href} className="flex items-center text-gray-700 hover:text-gray-900 mb-2">
        {icon} <span className="ml-4">{label}</span>
      </a>
    </Link>
  );
};

export default NavMenuItem;
