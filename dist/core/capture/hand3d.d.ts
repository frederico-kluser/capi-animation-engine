import type { CaptureHand3D, CaptureHands3D, CaptureTake, CaptureTakeHands3D, TrackerFrame, TrackerHand } from '../../contracts/capture.js';
import type { Point } from '../../contracts/pose.js';
export declare const HAND3D: {
    readonly palm: 88;
    readonly holdMs: 280;
};
export declare const HAND_JOINTS = 21;
export declare const HAND_VALUES: number;
export declare const HAND3D_FINGERS: {
    readonly thumb: readonly [1, 2, 3, 4];
    readonly index: readonly [5, 6, 7, 8];
    readonly middle: readonly [9, 10, 11, 12];
    readonly ring: readonly [13, 14, 15, 16];
    readonly pinky: readonly [17, 18, 19, 20];
};
export interface HandPoint3D {
    x: number;
    y: number;
    z: number;
}
export declare function handJoints(hand: TrackerHand, aspect: number, mirror: boolean): number[] | null;
export declare function solveHands3D(frame: TrackerFrame, options?: {
    mirror?: boolean;
}): CaptureHands3D;
export declare function handPoints3D(wrist: Point, hand: CaptureHand3D): HandPoint3D[];
export declare function mirrorHands3D(hands: CaptureHands3D): CaptureHands3D;
export declare function isHand3D(raw: unknown): raw is CaptureHand3D;
export declare function readHands3D(raw: unknown): CaptureHands3D | null;
export interface Hand3DFilterOptions {
    smoothing?: number;
    holdMs?: number;
}
export declare class Hand3DFilter {
    private sides;
    private readonly smoothing;
    private readonly holdMs;
    constructor(options?: Hand3DFilterOptions);
    push(hands: CaptureHands3D, timeMs: number): CaptureHands3D;
    reset(): void;
}
export declare function takeHands3DProblems(raw: unknown, n: number, where?: string): string[];
export declare function sampleTakeHands3D(take: Pick<CaptureTake, 'times'>, hands: CaptureTakeHands3D | undefined, tMs: number): CaptureHands3D;
export declare function smoothTakeHands3D(take: Pick<CaptureTake, 'fps'>, hands: CaptureTakeHands3D | undefined, cutoffHz?: number): CaptureTakeHands3D | undefined;
export declare function takeHands3D(frames: ReadonlyArray<CaptureHands3D | undefined>): CaptureTakeHands3D | undefined;
