import { type BodyPose, type HeadPose, type PoseChannels, type Point, type Side, type SolvedPose } from '../contracts/pose.js';
import type { CompiledPoseCue } from '../contracts/timeline.js';
import { type SolveExtras } from './pose/solve.js';
export declare const MICRO_MOTION: {
    readonly weight: {
        readonly x: 1.5;
        readonly lean: 0.12;
        readonly headTilt: 0.15;
        readonly bucketMs: 5000;
        readonly chance: 0.4;
        readonly maxQuietBuckets: 3;
        readonly shiftMs: readonly [1100, 2100];
    };
    readonly body: {
        readonly lean: 0.1;
        readonly turn: 1.4;
        readonly y: 1;
        readonly knotMs: readonly [3300, 2900, 3700];
    };
    readonly head: {
        readonly turn: 3;
        readonly nod: 1.6;
        readonly nodUp: 0.35;
        readonly tilt: 2.4;
        readonly knotMs: readonly [2500, 2900, 2700];
    };
    readonly gesture: {
        readonly bucketMs: 3900;
        readonly chance: 0.5;
        readonly accentPadMs: 350;
        readonly nodAccentPadMs: 900;
        readonly curious: {
            readonly tilt: 3.2;
            readonly turn: 1.2;
            readonly nod: -0.8;
            readonly ms: readonly [1700, 2500];
        };
        readonly nod: {
            readonly nod: 2.2;
            readonly ms: readonly [560, 780];
        };
        readonly glance: {
            readonly turn: 2.8;
            readonly tilt: 0.6;
            readonly ms: readonly [1300, 2000];
        };
    };
    readonly shrug: {
        readonly bodyY: -5;
        readonly headY: 5;
        readonly bucketMs: 7300;
        readonly chance: 0.3;
        readonly ms: readonly [950, 1350];
    };
    readonly hand: {
        readonly x: 4;
        readonly y: 4;
        readonly angle: 3;
        readonly knotMs: readonly [2100, 2400, 2300];
    };
    readonly pointDrift: 0.6;
    readonly pointRotate: 0.3;
    readonly headOnFace: 0.5;
    readonly quiet: {
        readonly handsFadeFrac: 0.75;
        readonly handsFadeMinMs: 250;
        readonly handsSettleMs: 500;
        readonly bodyFloor: 0.6;
        readonly bodyFadeMs: 500;
        readonly bodySettleMs: 500;
    };
    readonly onsetMs: 1500;
};
export declare const MICRO_LIMITS: {
    readonly body: {
        readonly x: 1.5;
        readonly y: number;
        readonly lean: number;
        readonly turn: 1.4;
    };
    readonly head: {
        readonly turn: number;
        readonly nod: number;
        readonly nodUp: number;
        readonly tilt: number;
        readonly x: 0;
        readonly y: 5;
    };
    readonly hand: {
        readonly x: 4;
        readonly y: 4;
        readonly angle: 3;
    };
};
export interface HandDrift {
    x: number;
    y: number;
    angle: number;
}
export interface MicroMotionSample {
    body: BodyPose;
    head: HeadPose;
    hands: Record<Side, HandDrift>;
}
export declare function smoothNoise(timeMs: number, seed: number, channel: number, knotMs: number): number;
export interface AccentWindow {
    atMs: number;
    transitionMs: number;
}
export declare function sampleMicroMotion(timeMs: number, seed: number, accents?: readonly AccentWindow[]): MicroMotionSample;
export interface MicroWeights {
    body: number;
    hands: number;
    contacts: number;
    settled: number;
}
export declare function microWeights(timeMs: number, poseCues?: readonly CompiledPoseCue[], loopActive?: boolean): MicroWeights;
export interface HandContact {
    face: number;
    body: number;
    point: boolean;
    holds: boolean;
}
export interface HandContacts {
    left: HandContact;
    right: HandContact;
    pair: number;
}
export declare const HAND_POINT_REACH: readonly [65, 130];
export declare function handContacts(pose: SolvedPose): HandContacts;
export interface PosesInPlay {
    held: PoseChannels;
    passing: PoseChannels[];
}
export declare function posesInPlay(poseCues: readonly CompiledPoseCue[], t: number, base: PoseChannels): PosesInPlay;
export interface ContactGate {
    face: Record<Side, number>;
    body: Record<Side, number>;
    heldFace: Record<Side, number>;
}
export declare function contactGate(inPlay: PosesInPlay): ContactGate;
export declare function faceFollow(p: Point, from: SolvedPose['head'], to: SolvedPose['head']): Point;
export declare function torsoFollow(p: Point, from: BodyPose, to: BodyPose): Point;
export interface LiveSway {
    lean: number;
    headTilt: number;
}
export declare function solveLivePose(channels: PoseChannels, extras: Pick<SolveExtras, 'breath' | 'headOffset' | 'bodyOffset'>, sway: LiveSway, micro: MicroMotionSample, weights: MicroWeights, gate?: ContactGate): SolvedPose;
