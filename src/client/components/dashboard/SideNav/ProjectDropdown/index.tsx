import React from "react";
import Link from "next/link";
import { Project, ProjectUsers } from "@client/graphql/types.generated";

import { AiOutlinePlusCircle } from "react-icons/ai";
import { DropdownMenu, MenuItem, MenuDivider } from "../../Dropdown";

const ProjectDropdown = ({
  projects,
  onEdit,
  onCreate,
}: {
  projects: ProjectUsers[];
  onCreate: () => void;
  onEdit: (p: Project) => void;
}) => {
  return (
    <DropdownMenu className="w-64">
      {projects.map(({ project }) => {
        return (
          <MenuItem
            as={Link}
            href={`/app/${project.id}`}
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
