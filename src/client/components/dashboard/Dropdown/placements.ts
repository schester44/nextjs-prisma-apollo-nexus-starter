import { BuildInPlacements } from "rc-trigger";

type Overflow = { adjustX: number; adjustY: number };
type TargetOffset = [number, number];

const autoAdjustOverflow: Overflow = {
  adjustX: 1,
  adjustY: 1,
};

export type PlacementPosition =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "bottomLeft"
  | "bottomCenter"
  | "bottomRight";

const targetOffset: TargetOffset = [0, 0];

const placements: BuildInPlacements = {
  topLeft: {
    points: ["bl", "tl"],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset,
  },
  topCenter: {
    points: ["bc", "tc"],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset,
  },
  topRight: {
    points: ["br", "tr"],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset,
  },
  bottomLeft: {
    points: ["tl", "bl"],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset,
  },
  bottomCenter: {
    points: ["tc", "bc"],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset,
  },
  bottomRight: {
    points: ["tr", "br"],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset,
  },
};

export default placements;
