import { ProjectUsers } from "@client/graphql/types.generated";
import React from "react";
import Link from "next/link";
import { BiHomeSmile } from "react-icons/bi";
import { Dropdown, DropdownMenu, MenuDivider, MenuItem } from "../Dropdown";
import { AiOutlinePlusCircle, AiOutlineShop } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import NavMenuItem from "./MenuItem";

type SideNavProps = {
  projects: ProjectUsers[];
};

const SideNav = ({ projects }: SideNavProps) => {
  return (
    <div className="bg-gray-100 border-r h-full w-1/5 px-6 py-3">
      <div>
        <Dropdown
          content={
            <DropdownMenu className="w-64">
              {projects.map(({ project }) => {
                return (
                  <MenuItem
                    className="text-gray-700 text-lg flex items-center justify-between"
                    key={project.id}
                  >
                    <span>{project.name}</span>
                    <span className="text-blue-600 hover:pointer hover:text-blue-700 text-sm hover:underline">
                      Edit
                    </span>
                  </MenuItem>
                );
              })}
              <MenuDivider />

              <MenuItem className="flex items-center text-lg">
                <AiOutlinePlusCircle className="mr-2" /> Create Project
              </MenuItem>
            </DropdownMenu>
          }
        >
          <div className="flex items-center text-gray-700 cursor font-medium">
            <div className="rounded-full w-7 h-7 bg-white text-gray-400 mr-3 shadow flex items-center justify-center">
              <AiOutlineShop />
            </div>
            {projects[0].project.name} <FiChevronDown className="text-xl ml-2" />
          </div>
        </Dropdown>
      </div>

      <div className="mt-8">
        <NavMenuItem label="Home" href="/dashboard" icon={<BiHomeSmile className="text-lg" />} />
      </div>
    </div>
  );
};

export default SideNav;
