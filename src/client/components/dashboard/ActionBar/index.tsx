import React from "react";
import { BiUser } from "react-icons/bi";
import { User } from "@client/graphql/types.generated";
import { signOut } from "next-auth/client";
import Link from "next/link";
import { Menu } from "@headlessui/react";

const ActionBar = ({ user }: { user: User }) => {
  return (
    <div className="flex items-center justify-between flex-row-reverse py-3 px-6 border-b"></div>
  );
};

export default ActionBar;
