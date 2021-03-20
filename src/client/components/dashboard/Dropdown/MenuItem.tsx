import clsx from "classnames";
import { PolymorphicComponentProps } from "@client/types";

interface Props<C extends React.ElementType> {
  as?: C;
  children: React.ReactNode;
  clickable?: boolean;
}

export const MenuItem = <C extends React.ElementType = "div">({
  as,
  clickable = true,
  children,
  ...props
}: PolymorphicComponentProps<C, Props<C>>) => {
  const Component = as || "div";

  const className = clsx("px-4 py-2 text-sm text-gray-700", {
    "cursor-pointer hover:bg-gray-100": !!clickable,
    [props.className]: !!props.className,
  });

  return (
    <Component {...props} className={className}>
      {props.href ? <a href={props.href} className={className} children={children} /> : children}
    </Component>
  );
};
