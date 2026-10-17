import { type BodyPose, type HeadPose, type Point, type Pose, type PoseChannels, type PoseInput, type SolvedPose } from '../../contracts/pose.js';
export declare const DEFAULT_POSE_ID = "idle";
export declare const BREATH_LIFT = 4;
export declare function flattenPose(input: PoseInput | undefined, warnings?: string[]): Pose;
export declare function clampHead(head: Partial<HeadPose> | undefined, warnings?: string[]): HeadPose;
export declare function clampBody(body: Partial<BodyPose> | undefined, warnings?: string[]): BodyPose;
export declare function bodyPoint(p: Point, body: BodyPose): Point;
export declare function poseToChannels(input: PoseInput | undefined, warnings?: string[]): PoseChannels;
export declare function mixHead(a: HeadPose, b: HeadPose, t: number): HeadPose;
export declare function mixBody(a: BodyPose, b: BodyPose, t: number): BodyPose;
export declare function mixPose(a: PoseChannels, b: PoseChannels, t: number): PoseChannels;
export interface SolveExtras {
    breath?: number;
    sway?: number;
    headOffset?: Partial<HeadPose>;
    bodyOffset?: Partial<BodyPose>;
}
export declare function solvePose(channels: PoseChannels, extras?: SolveExtras): SolvedPose;
