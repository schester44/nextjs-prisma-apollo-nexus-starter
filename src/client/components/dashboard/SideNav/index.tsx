import { Project, ProjectUsers } from "@client/graphql/types.generated";
import { Fragment } from "react";
import { BiCog, BiHomeSmile } from "react-icons/bi";
import { AiOutlineShop } from "react-icons/ai";
import { FiChevronDown, FiChevronUp, FiUser } from "react-icons/fi";
import NavMenuItem from "./MenuItem";
import ProjectDropdown from "./ProjectDropdown";
import { Menu } from "@headlessui/react";
import Link from "next/link";

type SideNavProps = {
  projects: ProjectUsers[];
  activeProject?: Project;
};

const SideNav = ({ projects, activeProject }: SideNavProps) => {
  if (!activeProject) return null;

  return (
    <div className="bg-gray-100 h-full w-[300px] px-6 py-3 flex flex-col justify-between">
      <div>
        <ProjectDropdown activeProject={activeProject} projects={projects}>
          {({ open }) => {
            return (
              <Menu.Button as={Fragment}>
                <div className="flex items-center text-gray-700 cursor font-medium">
                  <div className="rounded w-7 h-7 bg-indigo-400 text-white mr-3 shadow flex items-center justify-center uppercase">
                    {activeProject.name.charAt(0)}
                  </div>

                  <div className="flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[180px]">
                    {activeProject.name}
                  </div>

                  {open ? (
                    <FiChevronUp className="text-xl ml-2" />
                  ) : (
                    <FiChevronDown className="text-xl ml-2" />
                  )}
                </div>
              </Menu.Button>
            );
          }}
        </ProjectDropdown>

        <div className="mt-8">
          <NavMenuItem
            label="Home"
            href={`/dashboard/${activeProject.id}/home`}
            icon={<BiHomeSmile className="text-lg" />}
          />

          <NavMenuItem
            label="Settings"
            href={`/dashboard/${activeProject.id}/settings`}
            icon={<BiCog className="text-lg" />}
          />
        </div>
      </div>

      <div>
        <Link href="/settings/user" className="flex items-center">
          <FiUser className="mr-2" /> Your Profile
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
