import { type ArmChannels, type ArmPose, type HandShape, type HandView, type Point, type Side, type SolvedArm } from '../../contracts/pose.js';
export interface ElbowSolution {
    elbow: Point;
    wrist: Point;
    stretch: number;
    clamped: boolean;
}
export declare function solveElbow(shoulder: Point, target: Point, side: Side, bend?: 'natural' | 'reverse'): ElbowSolution;
export declare function thumbNeedsMirror(handAngle: number, side: Side): boolean;
export declare const PROFILE_HAND_SHAPES: ReadonlySet<HandShape>;
export declare const anatomicalView: (side: Side, flip: boolean) => HandView;
export declare const anatomicalFlip: (side: Side, view: HandView) => boolean;
export declare function handAnatomy(arm: Pick<ArmPose, 'shape' | 'flip' | 'view'>, handAngle: number, side: Side): {
    flip: boolean;
    view: HandView;
};
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
    readonly rollWindow: 0.5;
    readonly swapWindow: 0.34;
    readonly swapScale: 0.5;
    readonly flipFromDeg: 100;
    readonly dragDeg: 11;
    readonly dragFrom: 50;
    readonly dragFull: 260;
    readonly followThrough: 0.5;
    readonly dragHeadNear: 310;
    readonly dragHeadFar: 470;
    readonly planarDeg: 60;
    readonly depthDeg: 150;
    readonly depthShare: 0.85;
    readonly halfTurnDeg: 150;
    readonly followTurnDeg: 165;
    readonly pitchMax: 0.5;
    readonly foldedDeg: 165;
    readonly wristTurnDeg: 90;
    readonly upperDepthFrom: 0.2;
    readonly upperDepthSpan: 0.3;
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
export interface ArmPath {
    dUpper: number;
    dFore: number;
    upperDepth: number;
    depth: number;
    screen: number;
    bendA: number;
    bendB: number;
    dHand: number;
    pitch: number;
    turn: HandTurn;
    travelAngle: number;
    drag: number;
}
export type HandTurn = 'none' | 'roll' | 'flip' | 'swap';
export declare function armPath(a: ArmChannels, b: ArmChannels, side?: Side): ArmPath;
export interface ArmMixStage {
    upper: number;
    fore: number;
    hand: number;
}
export interface ArmMixOptions {
    side?: Side;
    stage?: ArmMixStage;
    drag?: boolean;
}
export declare function mixArm(a: ArmChannels, b: ArmChannels, t: number, options?: ArmMixOptions): ArmChannels;
export declare const armThroughDepth: (a: ArmChannels, b: ArmChannels, side?: Side) => boolean;
