import React from "react";
import {
  Project,
  ProjectUsers,
  useChangeSessionProjectMutation,
} from "@client/graphql/types.generated";

import { AiOutlinePlusCircle } from "react-icons/ai";
import { DropdownMenu, MenuItem, MenuDivider } from "../../Dropdown";
import Router from "next/router";
import FullPageLoader from "../../FullPageLoader";

const ProjectDropdown = ({
  projects,
  onEdit,
  onCreate,
}: {
  projects: ProjectUsers[];
  onCreate: () => void;
  onEdit: (p: Project) => void;
}) => {
  const [{ fetching, data }, updateSession] = useChangeSessionProjectMutation();

  function handleProjectSelection(project: Project) {
    updateSession({ projectId: project.id }).then(({ data }) => {
      if (data?.changeSessionProject) {
        Router.reload();
      }
    });
  }

  return (
    <DropdownMenu className="w-64">
      {(fetching || data) && <FullPageLoader />}

      {projects.map(({ project }) => {
        return (
          <MenuItem
            onClick={() => handleProjectSelection(project)}
            className="text-gray-700 text-lg flex items-center justify-between"
            key={project.id}
          >
            <span>{project.name}</span>

            <span
              className="text-blue-600 hover:pointer hover:text-blue-700 text-sm hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(project);
              }}
            >
              Edit
            </span>
          </MenuItem>
        );
      })}
      <MenuDivider />

      <MenuItem className="flex items-center text-lg" onClick={onCreate}>
        <AiOutlinePlusCircle className="mr-2" /> Create Project
      </MenuItem>
    </DropdownMenu>
  );
};

export default ProjectDropdown;
