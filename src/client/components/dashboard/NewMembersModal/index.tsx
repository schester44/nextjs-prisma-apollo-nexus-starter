import React, { Fragment } from "react";
import Button from "@client/components/dashboard/Button";
import { Transition, Dialog } from "@headlessui/react";

type Props = {
  onClose: () => void;
  open?: boolean;
};

const NewMembersModal = ({ onClose, open = true }: Props) => {
  // const [{ fetching }, addUsersToProject] = useCreateProjectMutation();
  const [email, setEmail] = React.useState("");

  let fetching = false;

  function handleAction() {
    // addUsersToProject({ emails: [email] });
  }

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-hidden"
        open={open}
        onClose={onClose}
        static
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            leave="ease-in duration-200"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-400 opacity-50" />
          </Transition.Child>
        </div>

        <Transition.Child
          as="div"
          className="w-screen h-screen flex justify-center items-center"
          enter="transition ease-out duration-300"
          enterFrom="transform scale-95"
          enterTo="transform scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform scale-100"
          leaveTo="transform scale-95"
        >
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded">
            <Dialog.Title className="text-lg leading-none font-medium text-gray-900">
              Invite new users
            </Dialog.Title>

            <div className="py-5">
              <input
                aria-label="Team member email"
                name="name"
                placeholder="steve@gmail.com"
                className=" appearance-none relative rounded block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-indigo-300 focus:z-10 sm:text-sm sm:leading-5"
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
              />
            </div>

            <div className="flex justify-end">
              <Button size="sm" onClick={() => onClose()}>
                Cancel
              </Button>

              <Button
                type="primary"
                size="sm"
                isLoading={fetching}
                isDisabled={email.trim().length === 0 || !email.includes("@")}
                className="ml-1"
                onClick={handleAction}
              >
                Invite
              </Button>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default NewMembersModal;
