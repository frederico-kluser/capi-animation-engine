import { type ContractIssue, type LessonPhase } from './lesson-production.js';
export declare const SEGMENT_LAYERS: readonly ['editorial', 'native', 'render'];
export type SegmentLayer = (typeof SEGMENT_LAYERS)[number];
export declare const SEGMENT_ASSET_KINDS: readonly ['audio', 'capture', 'image', 'video', 'timeline', 'card'];
export type SegmentAssetKind = (typeof SEGMENT_ASSET_KINDS)[number];
export declare const PAUSE_INTENTS: readonly ['think', 'read', 'predict', 'beat', 'none'];
export type PauseIntentKind = (typeof PAUSE_INTENTS)[number];
export declare const SEGMENT_EDGE_KINDS: readonly ['state', 'asset', 'evidence', 'fact'];
export type SegmentEdgeKind = (typeof SEGMENT_EDGE_KINDS)[number];
export interface SegmentAssetRef {
    id: string;
    kind: SegmentAssetKind;
    hash: string;
    required: boolean;
}
export interface TextAnchor {
    turnId: string;
    tokenIndex: number;
    speaker?: 'host' | 'guest' | 'visitor';
}
export interface SegmentState {
    id: string;
    hash: string;
    knowledgeIds: readonly string[];
    characterIds: readonly string[];
    terminalSessionId: string | null;
}
export interface PauseIntent {
    kind: PauseIntentKind;
    declaredMs: number;
    evidenceRequired: boolean;
}
export interface ProductionSegment {
    id: string;
    phase: LessonPhase | null;
    layer: SegmentLayer;
    turnIds: readonly string[];
    sourceActionIds: readonly string[];
    assetRefs: readonly SegmentAssetRef[];
    textAnchors: readonly TextAnchor[];
    pauseIntent: PauseIntent;
    stateIn: SegmentState;
    stateOut: SegmentState;
    evidenceRefs: readonly string[];
    captureState?: 'draft' | 'captureObserved';
}
export interface SegmentDependency {
    id: string;
    from: string;
    to: string;
    kind: SegmentEdgeKind;
}
export interface SegmentProductionPlan {
    version: 1;
    lessonHash: string;
    phases: readonly LessonPhase[];
    segments: readonly ProductionSegment[];
    edges: readonly SegmentDependency[];
}
export type SegmentsValidation = {
    ok: true;
    plan: SegmentProductionPlan;
} | {
    ok: false;
    issues: ContractIssue[];
};
export declare function validateSegmentProductionPlan(value: unknown): SegmentsValidation;
