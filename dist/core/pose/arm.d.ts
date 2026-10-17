import { type ArmChannels, type ArmPose, type Point, type Side, type SolvedArm } from '../../contracts/pose.js';
export interface ElbowSolution {
    elbow: Point;
    wrist: Point;
    stretch: number;
    clamped: boolean;
}
export declare function solveElbow(shoulder: Point, target: Point, side: Side, bend?: 'natural' | 'reverse'): ElbowSolution;
export declare function thumbNeedsMirror(handAngle: number, side: Side): boolean;
export declare function armToChannels(arm: ArmPose, shoulder: Point, side: Side, warnings?: string[]): ArmChannels;
export declare function armFromChannels(channels: ArmChannels, shoulder: Point): SolvedArm;
export declare const wristBend: (arm: {
    foreAngle: number;
    handAngle: number;
}) => number;
export declare const HAND_MOTION: {
    readonly wristLimitDeg: 90;
    readonly smallWristDeg: 45;
    readonly sideForearm: 0.7;
    readonly rollWindow: 0.22;
};
export declare function wristIsReal(arm: ArmChannels): boolean;
export declare const WRIST_STRAIN: {
    readonly bendDeg: 75;
    readonly minForearm: 0.7;
};
export declare function wristStrain(arm: ArmChannels): {
    bend: number;
    foreAngle: number;
} | null;
export declare function mixArm(a: ArmChannels, b: ArmChannels, t: number): ArmChannels;
