import { type FoodPropId, type LaptopPropId, type Point, type Pose, type PropId, type ResolvedPropPose, type Side } from '../contracts/pose.js';
import type { DrinkKind } from '../contracts/set.js';
export declare function isLaptopPropId(value: unknown): value is LaptopPropId;
export declare function isFoodPropId(value: unknown): value is FoodPropId;
export declare const PROP_DEFAULT_ANGLE: Record<PropId, number>;
export declare const LAPTOP: {
    readonly width: 336;
    readonly height: 256;
    readonly spot: {
        readonly x: 500;
        readonly bottom: 760;
    };
    readonly carry: {
        readonly grip: 20;
        readonly drop: 30;
    };
    readonly closedLid: 0.17;
};
export interface LaptopPlacement {
    x: number;
    y: number;
    w: number;
    h: number;
    open: number;
    carry: number;
    top: number;
    bottom: number;
}
export declare function laptopPlacement(prop: Pick<ResolvedPropPose, 'hand' | 'carry'>, wrist: Point): LaptopPlacement;
export declare const LAPTOP_MOUSE: {
    readonly rest: {
        readonly x: 404;
        readonly y: 736;
    };
    readonly hand: {
        readonly x: 240;
        readonly y: 728;
        readonly angle: 174;
    };
    readonly reach: 92;
    readonly y: 750;
    readonly grab: {
        readonly near: 18;
        readonly far: 130;
    };
    readonly press: {
        readonly from: 3.5;
        readonly to: 5.5;
    };
};
export declare function laptopCarryOf(prop: Pick<ResolvedPropPose, 'id' | 'carry'> | null | undefined): number;
export declare const laptopMouseSide: (owner: Side) => Side;
export declare function laptopMousePlacement(placement: Pick<LaptopPlacement, 'open' | 'carry'>, side: Side, wrist: Point): {
    center: Point;
    grab: number;
    press: number;
} | null;
export declare const PROP_BOX: Record<PropId, {
    x: number;
    y: number;
    w: number;
    h: number;
}>;
export declare const PROP_LABELS: Record<PropId, string>;
export declare const DRINK_DEMO_TILT = 30;
export declare function foodDemoPose(kind: FoodPropId, bites?: number): Pose;
export declare function drinkDemoPose(kind: DrinkKind): Pose;
