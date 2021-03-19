import React from "react";
import clsx from "classnames";

type DropdownMenuProps = {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
  onClick?: (...args: any[]) => void;
};

export const DropdownMenu = ({ style, children, className = "", onClick }: DropdownMenuProps) => {
  return (
    <div
      className={clsx("mt-2 rounded-md shadow-lg z-10 bg-white", {
        [className]: !!className,
      })}
      style={style}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        return React.cloneElement(child, {
          onClick: (...args: any[]) => {
            if (typeof child.props.onClick === "function") {
              child.props.onClick(...args);
            }

            if (typeof onClick === "function") {
              onClick(child.props);
            }
          },
        });
      })}
    </div>
  );
};
