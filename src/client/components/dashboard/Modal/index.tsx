import React from "react";
import clsx from "classnames";
import useHotkey from "@client/hooks/useHotKey";
import useWindowSize from "@client/hooks/useWindowSize";

interface Props {
  visible: boolean;
  width?: string;
  maskClosable?: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

const Modal = ({
  visible = false,
  width = "w-full",
  maskClosable = true,
  children,
  onClose,
}: Props) => {
  const { width: windowWidth } = useWindowSize();

  useHotkey("esc", () => {
    if (typeof onClose === "function") {
      onClose();
    }
  });

  const handleMaskClick = () => {
    if (!maskClosable) return;

    if (typeof onClose === "function") {
      onClose();
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
      <div className="fixed inset-0 transition-opacity" onClick={handleMaskClick}>
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div
        style={{
          width: typeof width === "number" ? (windowWidth! <= 768 ? "100%" : width) : undefined,
        }}
        className={clsx("bg-white rounded-lg overflow-hidden shadow-xl transform transition-all", {
          [width]: width,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
