import { type ArmPose, type Point, type Pose, type Side } from '../../contracts/pose.js';
export declare const AIM_ZONES: readonly ['top-left', 'top', 'top-right', 'left', 'center', 'right', 'bottom-left', 'bottom', 'bottom-right'];
export type AimZone = (typeof AIM_ZONES)[number];
export declare const AIM_ZONE_POINTS: Readonly<Record<AimZone, Point>>;
export type AimInput = AimZone | Point;
export declare function isAimZone(value: unknown): value is AimZone;
export declare function readAim(value: unknown): AimInput | undefined;
export declare function aimFraction(aim: AimInput): Point;
export declare function aimZoneOf(aim: AimInput): AimZone;
export interface AimSurface {
    x: number;
    y: number;
    width: number;
    height: number;
    flipX?: boolean;
}
export declare function aimPointIn(rect: AimSurface, aim: AimInput): Point;
export declare function aimTargetOn(surface: AimSurface, aim: AimInput): Point | undefined;
export declare const AIM: {
    readonly wristMaxDeg: 62;
    readonly minDeg: -102;
    readonly maxDeg: 64;
    readonly fingerMinDeg: -106;
    readonly minDistance: 120;
    readonly self: {
        readonly minX: 300;
        readonly maxX: 700;
        readonly minY: 60;
    };
};
export declare const AIM_BASE: Readonly<Record<Side, string>>;
export declare function aimedPoseBase(pose: unknown): string | undefined;
export interface AimPoseOptions {
    side?: Side;
    other?: ArmPose;
}
export declare function aimSide(target: Point, side?: Side): Side;
export declare function aimDirection(target: Point, side?: Side): number;
export declare function aimPose(target: Point, options?: AimPoseOptions): Pose;
export declare function aimError(target: Point, pose: Pose): {
    side: Side;
    angle: number;
    offDeg: number;
};
export declare const aimRay: (from: Point, deg: number, distance: number) => Point;
