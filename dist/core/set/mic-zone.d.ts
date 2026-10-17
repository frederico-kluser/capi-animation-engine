import { type HandShape, type Point, type Side, type SolvedArm, type SolvedPose } from '../../contracts/pose.js';
import type { PodcastMicAdjust, PodcastMicId, ResolvedSet } from '../../contracts/set.js';
export declare const MIC_INK = 3;
export declare const MIC_KEEP_OUT: {
    readonly motor: 8;
    readonly test: 4;
    readonly pushes: 10;
    readonly slack: 0.25;
    readonly pinned: 0.5;
    readonly pinnedReach: 0.2;
    readonly elbowSide: 0.6;
    readonly retreatSteps: 14;
};
export declare const MIC_ADJUST_LIMITS: {
    readonly x: readonly [-60, 60];
    readonly y: readonly [-70, 70];
    readonly angle: readonly [-40, 40];
};
export declare const BOOM_RING: {
    readonly ahead: 6;
    readonly pad: 9;
    readonly stroke: 6;
};
export type MicObstacleGroup = 'head' | 'stand' | 'base';
export interface MicObstacle {
    name: string;
    group: MicObstacleGroup;
    poly: Point[];
}
export declare function micObstacles(mirror?: boolean, model?: PodcastMicId, adjust?: PodcastMicAdjust, pad?: number): MicObstacle[];
export declare const GLOVE_SUPPORT_STEPS = 16;
export declare const GLOVE_SUPPORT_PAD = 2;
export declare const GLOVE_SUPPORT: Readonly<Record<HandShape, {
    palm: readonly number[];
    back?: readonly number[];
}>>;
export declare function gloveEnvelope(arm: SolvedArm): Point[];
export declare function forearmEnvelope(arm: SolvedArm, steps?: number): Point[];
interface Box {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
}
export declare function convexPush(a: readonly Point[], b: readonly Point[]): {
    depth: number;
    normal: Point;
} | null;
export interface MicZone {
    pieces: Array<MicObstacle & {
        box: Box;
    }>;
    box: Box;
}
export declare function hasTableMic(set: ResolvedSet): boolean;
export declare function micZone(model?: PodcastMicId, adjust?: PodcastMicAdjust, pad?: number): MicZone | null;
export declare function hostMicAdjust(adjust: PodcastMicAdjust | undefined, mirror: boolean): PodcastMicAdjust | undefined;
export declare function micZoneOf(set: ResolvedSet, pad?: number, mirror?: boolean): MicZone | null;
export declare const MIC_KEEP_FRONT = 0.64;
export interface MicKeepSpan {
    front: {
        x0: number;
        x1: number;
    };
    all: {
        x0: number;
        x1: number;
    };
}
export declare function micKeepSpan(mirror?: boolean, model?: PodcastMicId, adjust?: PodcastMicAdjust): MicKeepSpan | null;
export declare function armTouchesMic(arm: SolvedArm, zone: MicZone, prop?: Point[] | null): boolean;
export declare function clearArm(arm: SolvedArm, zone: MicZone, home: SolvedArm, pin?: number, propOf?: (arm: SolvedArm) => Point[] | null): SolvedArm;
export declare const MIC_HOME: Readonly<Record<Side, {
    elbow: Point;
    wrist: Point;
}>>;
export declare function keepClearOfMic(live: SolvedPose, set: ResolvedSet, pins?: Partial<Record<Side, number>>, mirror?: boolean): SolvedPose;
export declare const unmeasuredGloves: () => HandShape[];
export {};
