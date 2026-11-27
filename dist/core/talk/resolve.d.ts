import type { ExpressionId } from '../../contracts/face.js';
import type { Point, PoseInput } from '../../contracts/pose.js';
import type { AlignmentResult, ScriptWord, WordProsody } from '../../contracts/talk.js';
import type { TimelineSpec, TimelineTrack, VisemeCue } from '../../contracts/timeline.js';
import { type Beat } from '../timeline/choreograph.js';
import { type TimelineIssue } from '../timeline/lint.js';
import type { PoseId } from '../../presets/poses.js';
import type { GestureMacro, TalkPlan } from './plan.js';
import { type AimSurface } from '../pose/aim.js';
import { type CountFamily } from './counting.js';
export interface ResolveOptions {
    leadInMs?: number;
    energy?: number;
    autoNods?: boolean;
    maxRepairs?: number;
    restLook?: Point;
    restPose?: PoseId;
    skipSilentGaps?: boolean;
    retractTo?: readonly PoseId[] | false;
    seamWords?: readonly {
        from: number;
        to: number;
    }[];
    aimSurface?: AimSurface;
    counting?: CountFamily;
}
export type GestureStatus = 'kept' | 'moved' | 'pose-dropped' | 'dropped';
export interface ResolvedGesture {
    id: number;
    word: number;
    text: string;
    atMs: number;
    status: GestureStatus;
    pose?: PoseId;
    expression?: ExpressionId;
    macro?: GestureMacro;
    priority: number;
    note?: string;
}
export interface ResolveResult {
    spec: TimelineSpec;
    beats: Beat[];
    speech: VisemeCue[];
    leadInMs: number;
    durationMs: number;
    base: PoseInput;
    baseExpression: ExpressionId;
    gestures: ResolvedGesture[];
    autoNods: {
        atMs: number;
        word: number;
        deg: number;
    }[];
    issues: TimelineIssue[];
    decisions: string[];
}
export declare const MACRO_HOLD_MS: Readonly<Record<GestureMacro, number>>;
export declare const RETRACT: {
    readonly holdMs: 2000;
    readonly minRestMs: 1600;
    readonly loopTailMs: 300;
};
export declare const TALK_REST_POSES: readonly PoseId[];
export declare function gestureMacroTracks(macro: GestureMacro | undefined, atMs: number, id?: number | string): TimelineTrack[];
export interface ResolveInput {
    plan: TalkPlan;
    words: readonly ScriptWord[];
    alignment: AlignmentResult;
    prosody: readonly WordProsody[];
    speech: readonly VisemeCue[];
    options?: ResolveOptions;
}
export declare function resolvePlan(input: ResolveInput): ResolveResult;
