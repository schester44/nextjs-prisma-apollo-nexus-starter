import React from "react";
import Trigger from "rc-trigger";
import placements, { PlacementPosition } from "./placements";
import { AlignType } from "rc-trigger/lib/interface";

type DropdownProps = {
  children: React.ReactElement;
  content: React.ReactElement;
  onVisibleChange?: (visible: boolean) => void;
  closeOnClick?: boolean;
  trigger?: string[];
  placement?: PlacementPosition;
  align?: AlignType;
};

export const Dropdown = ({
  children,
  content,
  align,
  closeOnClick = true,
  trigger = ["click"],
  placement = "bottomLeft",
  onVisibleChange,
}: DropdownProps) => {
  const [triggerVisible, setTriggerVisible] = React.useState(false);

  const onClick = (e) => {
    const overlayProps = content.props;

    if (overlayProps.onClick) {
      overlayProps.onClick(e);
    }

    if (closeOnClick) {
      setTriggerVisible(false);
    }
  };

  const getMenuElement = () => {
    return React.cloneElement(content, { onClick });
  };

  const handleVisibleChange = (visible: boolean) => {
    setTriggerVisible(visible);

    if (typeof onVisibleChange === "function") {
      onVisibleChange(visible);
    }
  };

  return (
    <Trigger
      action={trigger}
      popup={getMenuElement()}
      onPopupVisibleChange={handleVisibleChange}
      popupVisible={triggerVisible}
      popupAlign={align || placements[placement]}
    >
      <div>{children}</div>
    </Trigger>
  );
};
