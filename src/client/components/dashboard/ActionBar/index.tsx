import React from "react";
import { User } from "@client/graphql/types.generated";

const ActionBar = ({ user }: { user: User }) => {
  return (
    <div className="flex items-center justify-between flex-row-reverse py-5 pr-6 pl-2">
      <div>{user.name}</div>
      <div className="w-full max-w-sm">
        <input
          aria-label="Search"
          name="search"
          placeholder="Search"
          className="shadow-sm appearance-none rounded-full relative block w-full px-4 py-2 border border-gray-100 placeholder-gray-400 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-indigo-300 focus:z-10 sm:text-md sm:leading-5"
        />
      </div>
    </div>
  );
};

export default ActionBar;
