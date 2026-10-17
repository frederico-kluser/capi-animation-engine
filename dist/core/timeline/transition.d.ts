import { type Point, type PoseChannels, type PoseInput, type Side, type SolvedPose } from '../../contracts/pose.js';
import type { EasingId } from '../../contracts/timeline.js';
export type PropChange = 'none' | 'same' | 'enter' | 'exit' | 'handoff' | 'pickup' | 'putdown' | 'pop';
export interface TransitionAnalysis {
    travel: Record<Side, number>;
    headDelta: number;
    prop: PropChange;
    throughHead: Side[];
    transitionMs: number;
    ease: EasingId;
    minMs: number;
}
export declare const FACE_ZONE: {
    readonly x: 118;
    readonly y: 104;
};
export declare function propCorners(pose: SolvedPose): Point[] | null;
export declare function heldDrinkFoot(pose: SolvedPose): Point | null;
export declare function propVisible(pose: SolvedPose): boolean;
export declare const PICKUP_STILL_PX = 1;
export declare const PICKUP_SLOT_PX = 1;
export declare function propStandsOnTable(pose: SolvedPose): boolean;
export declare const FACE_PLATE: {
    readonly x: 150;
    readonly y: 130;
};
export declare const GLOVE_REACH: readonly [20, 40, 60, 80, 100, 120, 140];
export declare const GLOVE_OVER_MIN = 2;
export declare function gloveOverPlate(pose: SolvedPose, side: Side): number;
export declare function gloveOnHead(pose: SolvedPose, side: Side): number;
export declare function gloveCrossesFace(from: PoseInput | PoseChannels | undefined, to: PoseInput | PoseChannels | undefined, side: Side): boolean;
export declare function analyzeTransition(from: PoseInput | PoseChannels | undefined, to: PoseInput | PoseChannels | undefined): TransitionAnalysis;
