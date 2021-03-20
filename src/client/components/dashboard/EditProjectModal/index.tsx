import React from "react";
import Modal from "@client/components/dashboard/Modal";
import Button from "@client/components/dashboard/Button";
import { Project, useUpdateProjectMutation } from "@client/graphql/types.generated";

type Props = {
  project: Project;
  onClose: () => void;
  visible?: boolean;
};

const EditProjectModal = ({ project, onClose, visible = true }: Props) => {
  const [{ fetching }, updateProject] = useUpdateProjectMutation();

  const [name, setName] = React.useState(project.name);

  function handleUpdate() {
    updateProject({ id: project.id, name }).then(onClose)
  }

  return (
    <Modal width="w-full md:w-96" visible={visible} onClose={onClose}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Project Name</h3>
          <div className="mt-2">
            <div className="py-4">
              <input
                aria-label="Project Name"
                name="name"
                placeholder="Project"
                className=" appearance-none relative mt-1 rounded block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                value={name}
                onChange={({ target: { value } }) => setName(value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 sm:px-6 sm:py-4 sm:flex-wrap sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex sm:flex-row-reverse">
          <Button
            type="primary"
            isLoading={fetching}
            isDisabled={name.trim().length === 0}
            className="w-full mt-2 sm:ml-3 sm:mt-0 sm:w-auto mb-2 sm:mb-0"
            onClick={handleUpdate}
          >
            Update
          </Button>

          <Button className="w-full sm:w-auto" onClick={() => onClose()}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditProjectModal;
