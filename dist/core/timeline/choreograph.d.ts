import { type CharacterId } from '../../contracts/character.js';
import type { ExpressionInput } from '../../contracts/face.js';
import { type OutfitInput } from '../../contracts/outfit.js';
import type { Point, PoseChannels, PoseInput } from '../../contracts/pose.js';
import type { EasingId, TimelineSpec, TimelineTrack, VisemeCue } from '../../contracts/timeline.js';
export declare const CHOREOGRAPHY: {
    readonly eyesLeadMs: 100;
    readonly eyesReturnMs: 320;
    readonly eyesMinHoldMs: 200;
    readonly eyesMinHeadDeg: 6;
    readonly readingNodDeg: 10;
    readonly faceLeadMs: 80;
    readonly anticipationMs: 120;
    readonly anticipationMinTravel: 200;
    readonly settleMs: 280;
    readonly blinkHeadDeg: 10;
    readonly blinkMinGapMs: 1500;
    readonly nodDeg: 6;
    readonly nodDownMs: 120;
    readonly nodUpMs: 240;
    readonly softStretch: 1.3;
    readonly strongGain: 1.6;
    readonly handoverHoldMs: 240;
    readonly takeDipMs: 120;
    readonly takeJumpMs: 140;
    readonly takeHoldMs: 660;
    readonly takeReturnMs: 300;
    readonly takeDip: 9;
    readonly takeJump: -14;
    readonly takeHeadNod: -8;
    readonly takeHeadY: -8;
    readonly takeFaceMs: 140;
};
export type BeatAccent = 'soft' | 'normal' | 'strong';
export interface Beat {
    atMs: number;
    pose?: PoseInput;
    expression?: ExpressionInput;
    look?: 'camera' | 'hold' | Point;
    nod?: boolean | number;
    take?: boolean;
    accent?: BeatAccent;
}
export interface ChoreographOptions {
    base?: PoseInput;
    expression?: ExpressionInput;
    durationMs?: number;
    speech?: readonly VisemeCue[];
    restLook?: Point;
}
export declare function detourThroughRest(from: PoseInput | PoseChannels | undefined, to: PoseInput | PoseChannels | undefined, hub?: PoseInput): {
    totalMs: number;
    share: number;
};
export interface RouteStep {
    pose: PoseInput;
    transitionMs: number;
    ease: EasingId;
    holdMs: number;
}
export type RouteKind = 'direct' | 'cut' | 'swap' | 'handover' | 'detour';
export interface Route {
    kind: RouteKind;
    steps: RouteStep[];
    totalMs: number;
}
export declare function planRoute(from: PoseInput | undefined, to: PoseInput | undefined): Route;
export declare function choreograph(beats: readonly Beat[], options?: ChoreographOptions): TimelineSpec;
export interface AnchorScript {
    base?: PoseInput;
    expression?: ExpressionInput;
    durationMs?: number;
    seed?: number;
    outfit?: OutfitInput;
    character?: CharacterId;
    beats?: Beat[];
    tracks?: TimelineTrack[];
    speech?: VisemeCue[];
}
export declare function scriptToTimeline(script: AnchorScript): TimelineSpec;
export declare const SEQUENCE_HOLD_MS = 700;
export declare function poseSequence(poses: readonly PoseInput[], options?: {
    holdMs?: number;
    base?: PoseInput;
}): AnchorScript & {
    beats: Beat[];
    durationMs: number;
};
export declare function checkScript(script: unknown): string[];
