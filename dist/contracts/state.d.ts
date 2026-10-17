import type { ExpressionId, ExpressionInput, MouthId, MouthShape, ResolvedFace, VisemeId } from './face.js';
import type { CharacterId } from './character.js';
import type { ResolvedSet, SetInput } from './set.js';
import type { Outfit, OutfitInput } from './outfit.js';
import type { Point, PoseInput, SolvedPose } from './pose.js';
import type { CompiledTimeline } from './timeline.js';
export declare const DEFAULT_FPS = 60;
export type BlinkInput = number | {
    left?: number;
    right?: number;
};
export interface AutoMotion {
    blink?: boolean;
    breath?: boolean;
    sway?: boolean;
    micro?: boolean;
    loop?: boolean;
}
export interface SpeechInput {
    viseme: VisemeId;
    intensity?: number;
}
export interface AnchorInput {
    pose?: PoseInput;
    expression?: ExpressionInput;
    mouth?: MouthId | Partial<MouthShape>;
    look?: Point;
    blink?: BlinkInput;
    speech?: SpeechInput;
    auto?: AutoMotion | false;
    timeline?: CompiledTimeline;
    frame?: number;
    fps?: number;
    seed?: number;
    outfit?: OutfitInput;
    character?: CharacterId;
    set?: SetInput;
    mirror?: boolean;
    view?: AnchorView;
}
export interface AnchorView {
    turn?: number;
    nod?: number;
}
export declare const ANCHOR_VIEW_LIMITS: {
    readonly turn: 30;
    readonly nod: 15;
};
export interface ResolveMeta {
    seed: number;
    speaking: boolean;
    viseme: VisemeId;
    expressionId?: ExpressionId;
    warnings: readonly string[];
}
export interface ResolvedAnchorState {
    timeMs: number;
    frame: number;
    fps: number;
    pose: SolvedPose;
    face: ResolvedFace;
    outfit: Outfit;
    character: CharacterId;
    mirror: boolean;
    set: ResolvedSet;
    meta: ResolveMeta;
}
