import React, { Fragment, useState } from "react";

import {
  Project,
  ProjectUsers,
  useChangeSessionProjectMutation,
} from "@client/graphql/types.generated";

import { AiOutlineCloseCircle, AiOutlinePlusSquare } from "react-icons/ai";
import Router from "next/router";

import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { signOut } from "next-auth/client";
import CreateProjectModal from "../../CreateProjectModal";
import EditProjectModal from "../../EditProjectModal";

const ProjectDropdown = ({
  projects,
  activeProject,
  onEdit,
  onCreate,
  children,
}: {
  activeProject: Project;
  projects: ProjectUsers[];
  onCreate: () => void;
  onEdit: (p: Project) => void;
  children: (args: { open: boolean }) => React.ReactNode;
}) => {
  const [{ fetching, data }, updateSession] = useChangeSessionProjectMutation();

  const [isCreateModalVisible, setCreateModalVisibility] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);

  function handleProjectSelection(project: Project) {
    updateSession({ projectId: project.id }).then(({ data }) => {
      if (data?.changeSessionProject) {
        Router.reload();
      }
    });
  }

  return (
    <div>
      {editingProject && (
        <EditProjectModal
          open={!!editingProject}
          onClose={() => setEditingProject(undefined)}
          project={editingProject}
        />
      )}

      <CreateProjectModal
        open={isCreateModalVisible}
        onClose={() => setCreateModalVisibility(false)}
      />
      <Menu as="div" className="relative inline-block text-left">
        {({ open }) => {
          return (
            <>
              {children({ open })}
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-0 w-96 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-2 py-2">
                    {projects.map(({ project }, index) => {
                      return (
                        <Menu.Item key={project.id}>
                          {({ active }) => {
                            const isSelected = activeProject.id === project.id;

                            return (
                              <button
                                className={classNames(
                                  "text-gray-700 text-lg flex items-center justify-between w-full rounded p-1",
                                  {
                                    "bg-gray-50": !isSelected && active,
                                    "cursor-default": isSelected,
                                    "mb-2": index !== projects.length - 1,
                                  }
                                )}
                                onClick={() => !isSelected && handleProjectSelection(project)}
                              >
                                <div className="flex items-center">
                                  <div className="rounded w-7 h-7 bg-indigo-400 text-white mr-3 shadow flex items-center justify-center uppercase">
                                    {project.name.charAt(0)}
                                  </div>

                                  <div className="flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[250px]">
                                    {project.name}
                                  </div>
                                </div>

                                <span
                                  className="text-blue-600 hover:pointer hover:text-blue-700 text-sm hover:underline cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingProject(project);
                                  }}
                                >
                                  Edit
                                </span>
                              </button>
                            );
                          }}
                        </Menu.Item>
                      );
                    })}
                  </div>
                  <div className=" bg-gray-50 py-2">
                    <Menu.Item onClick={() => setCreateModalVisibility(true)}>
                      {({ active }) => {
                        return (
                          <button
                            className={classNames(
                              "w-full px-4 text-gray-600 flex items-center text-sm p-1",
                              {
                                "bg-gray-100 text-gray-900": active,
                              }
                            )}
                          >
                            <AiOutlinePlusSquare className="mr-2" /> Create Project
                          </button>
                        );
                      }}
                    </Menu.Item>

                    <Menu.Item onClick={() => signOut()}>
                      {({ active }) => {
                        return (
                          <button
                            className={classNames(
                              "w-full px-4 text-gray-600 flex items-center text-sm p-1",
                              {
                                "bg-gray-100 text-gray-900": active,
                              }
                            )}
                          >
                            <AiOutlineCloseCircle className="mr-2" /> Logout
                          </button>
                        );
                      }}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          );
        }}
      </Menu>
    </div>
  );
};

export default ProjectDropdown;
