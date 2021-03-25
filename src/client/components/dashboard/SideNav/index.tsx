import { Project, ProjectUsers } from "@client/graphql/types.generated";
import React from "react";
import { BiCog, BiHomeSmile } from "react-icons/bi";
import { Dropdown } from "../Dropdown";
import { AiOutlineShop } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import NavMenuItem from "./MenuItem";
import ProjectDropdown from "./ProjectDropdown";
import EditProjectModal from "../EditProjectModal";
import CreateProjectModal from "../CreateProjectModal";
import useModalWithData from "@client/hooks/useModalWithData";

type SideNavProps = {
  projects: ProjectUsers[];
  activeProject?: Project;
};

const SideNav = ({ projects, activeProject }: SideNavProps) => {
  const [showEditModal, hideEditModal] = useModalWithData<Project>((project) => () =>
    project ? <EditProjectModal onClose={hideEditModal} project={project} /> : null
  );

  const [showCreateModal, hideCreateModal] = useModalWithData<Project>((project) => () =>
    project ? <CreateProjectModal onClose={hideCreateModal} project={project} /> : null
  );

  if (!activeProject) return null;

  return (
    <div className="bg-gray-100 border-r h-full w-1/5 px-6 py-3">
      <div>
        <Dropdown
          content={
            <ProjectDropdown
              onCreate={showCreateModal}
              onEdit={showEditModal}
              projects={projects}
            />
          }
        >
          <div className="flex items-center text-gray-700 cursor font-medium">
            <div className="rounded-full w-7 h-7 bg-white text-gray-400 mr-3 shadow flex items-center justify-center">
              <AiOutlineShop />
            </div>
            {(activeProject || projects[0].project).name} <FiChevronDown className="text-xl ml-2" />
          </div>
        </Dropdown>
      </div>

      <div className="mt-8">
        <NavMenuItem label="Home" href="/app" icon={<BiHomeSmile className="text-lg" />} />

        <NavMenuItem label="Settings" href="/app/settings" icon={<BiCog className="text-lg" />} />
      </div>
    </div>
  );
};

export default SideNav;
