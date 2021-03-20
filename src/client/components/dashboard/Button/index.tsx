import React from "react";
import clsx from "classnames";
import { AiOutlineLoading } from "react-icons/ai";

type ClassStyles = {
  [k in ButtonType as string]: { base: string; enabled: string };
};

const classNames: ClassStyles = {
  default: {
    base:
      "inline-flex justify-center rounded border border-gray-300 bg-white leading-6 font-medium text-gray-600 shadow-sm transition ease-in-out duration-150 sm:leading-5",
    enabled: "hover:text-gray-700 focus:border-blue-300",
  },
  primary: {
    base:
      "inline-flex justify-center rounded border border-indigo-500 bg-indigo-500 leading-6 font-medium text-gray-100 shadow-sm transition ease-in-out duration-150 sm:leading-5",
    enabled: "hover:text-white hover:bg-indigo-600 hover:border-indigo-700 focus:border-indigo-900",
  },
  secondary: {
    base:
      "inline-flex justify-center rounded border border-gray-500 bg-gray-500 leading-6 font-medium text-gray-100 shadow-sm transition ease-in-out duration-150 sm:leading-5",
    enabled: "hover:text-white hover:bg-gray-600 hover:border-gray-600 focus:border-indigo-900",
  },
};

const SIZE = {
  xs: "px-1 py-1 text-xs",
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-4 text-lg",
};

type ButtonType = "default" | "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  type?: ButtonType;
  isLoading?: boolean;
  isDisabled?: boolean;
  isSubmit?: boolean;
  size?: ButtonSize;
}

const Button: React.FC<
  ButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">
> = ({
  children,
  type = "default",
  size = "md",
  isLoading = false,
  isDisabled = false,
  isSubmit = false,
  ...props
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (isLoading || isDisabled) return;

    if (props.onClick) {
      props.onClick(event);
    }
  };

  const sizeStyles = SIZE[size] || SIZE.md;

  return (
    <button
      {...props}
      type={isSubmit ? "submit" : "button"}
      onClick={handleClick}
      className={clsx(classNames[type]?.base || classNames.default.base, sizeStyles, {
        [props.className || ""]: !!props.className,
        "focus:shadow-outline": !isDisabled,
        [classNames[type]?.enabled || classNames.default.enabled]: !isDisabled,
        "cursor-not-allowed opacity-50 outline-none focus:outline-none": isDisabled || isLoading,
      })}
    >
      {isLoading ? <AiOutlineLoading className="button-loader text-lg" /> : children}
    </button>
  );
};

export default Button;
