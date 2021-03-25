import React from "react";

const FullPageLoader = () => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-50 flex items-center justify-center bg-[rgba(255,255,255,0.4)] text-2xl text-gray-400">
      LOADING
    </div>
  );
};

export default FullPageLoader;
