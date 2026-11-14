import { type BodyPose, type HeadPose, type Point, type Pose, type PoseChannels, type PoseInput, type SolvedPose } from '../../contracts/pose.js';
export declare const DEFAULT_POSE_ID = "idle";
export declare const BREATH_LIFT = 4;
export declare function flattenPose(input: PoseInput | undefined, warnings?: string[]): Pose;
export declare function clampHead(head: Partial<HeadPose> | undefined, warnings?: string[]): HeadPose;
export declare function clampBody(body: Partial<BodyPose> | undefined, warnings?: string[]): BodyPose;
export declare function bodyPoint(p: Point, body: BodyPose & {
    accompany?: number | undefined;
}): Point;
export declare function poseToChannels(input: PoseInput | undefined, warnings?: string[]): PoseChannels;
export declare function mixHead(a: HeadPose, b: HeadPose, t: number): HeadPose;
export declare function mixBody(a: BodyPose, b: BodyPose, t: number): BodyPose;
export declare function mixPose(a: PoseChannels, b: PoseChannels, t: number, options?: {
    drag?: boolean;
}): PoseChannels;
export declare const POSE_STAGING: {
    readonly body: {
        readonly start: 0;
        readonly end: 0.86;
    };
    readonly head: {
        readonly start: 0;
        readonly end: 0.9;
    };
    readonly upper: {
        readonly start: 0;
        readonly end: 0.88;
    };
    readonly fore: {
        readonly start: 0.02;
        readonly end: 0.94;
    };
    readonly hand: {
        readonly start: 0.03;
        readonly end: 1;
    };
};
export declare function mixPoseStaged(a: PoseChannels, b: PoseChannels, u: number, ease: (x: number) => number, softStart?: boolean): PoseChannels;
export interface SolveExtras {
    breath?: number;
    sway?: number;
    headOffset?: Partial<HeadPose>;
    bodyOffset?: Partial<BodyPose>;
}
export declare function solvePose(channels: PoseChannels, extras?: SolveExtras): SolvedPose;
