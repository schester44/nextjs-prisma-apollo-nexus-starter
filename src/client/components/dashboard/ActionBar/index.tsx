import React from "react";
import { BiUser } from "react-icons/bi";
import { User } from "@client/graphql/types.generated";
import { Dropdown, DropdownMenu, MenuDivider, MenuItem } from "../Dropdown";
import { signOut } from "next-auth/client";
import Link from "next/link";

const ActionBar = ({ user }: { user: User }) => {
  return (
    <div className="flex items-center justify-between flex-row-reverse py-3 px-6 border-b">
      <div>
        <div>
          <Dropdown
            placement="bottomRight"
            content={
              <DropdownMenu className="w-48" onClick={console.log}>
                <div className="px-4 py-2">
                  <div>{user.name}</div>
                </div>

                <MenuDivider />
                <MenuItem as={Link} href="/settings/user">
                  Profile
                </MenuItem>
                <MenuItem onClick={() => signOut()}>Logout</MenuItem>
              </DropdownMenu>
            }
          >
            <div>
              <BiUser className="text-lg" />
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
