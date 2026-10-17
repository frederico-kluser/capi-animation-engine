import { type LaptopPropId, type Pose, type PropId } from '../contracts/pose.js';
import type { DrinkKind } from '../contracts/set.js';
export declare function isLaptopPropId(value: unknown): value is LaptopPropId;
export declare const PROP_DEFAULT_ANGLE: Record<PropId, number>;
export declare function laptopSinkY(id: PropId, wristY: number): number;
export declare const PROP_BOX: Record<PropId, {
    x: number;
    y: number;
    w: number;
    h: number;
}>;
export declare const PROP_LABELS: Record<PropId, string>;
export declare const DRINK_DEMO_TILT = 30;
export declare function drinkDemoPose(kind: DrinkKind): Pose;
