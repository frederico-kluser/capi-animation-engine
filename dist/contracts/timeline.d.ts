import type { Expression, ExpressionInput, VisemeId } from './face.js';
import type { BodyPose, HeadPose, Point, PoseChannels, PoseInput, Side } from './pose.js';
export type EasingId = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'easeOutBack' | 'easeInOutSine';
export declare const EASING_IDS: readonly ["linear", "easeIn", "easeOut", "easeInOut", "easeOutBack", "easeInOutSine"];
interface CueBase {
    atMs: number;
    transitionMs?: number;
    ease?: EasingId;
}
export interface PoseCue extends CueBase {
    pose: PoseInput;
}
export interface ExpressionCue extends CueBase {
    expression: ExpressionInput;
}
export interface LookCue extends CueBase {
    x: number;
    y: number;
}
export interface HeadCue extends CueBase {
    head: Partial<HeadPose>;
}
export interface BodyCue extends CueBase {
    body: Partial<BodyPose>;
}
export interface BlinkEvent {
    atMs: number;
    side?: Side | 'both';
    durationMs?: number;
}
export interface VisemeCue {
    startMs: number;
    endMs: number;
    viseme: VisemeId;
    intensity?: number;
}
export declare const TRANSITION_DEFAULTS: {
    readonly pose: {
        readonly transitionMs: 420;
        readonly ease: 'easeOutBack';
    };
    readonly expression: {
        readonly transitionMs: 220;
        readonly ease: 'easeOut';
    };
    readonly look: {
        readonly transitionMs: 180;
        readonly ease: 'easeInOut';
    };
    readonly head: {
        readonly transitionMs: 320;
        readonly ease: 'easeInOut';
    };
    readonly body: {
        readonly transitionMs: 260;
        readonly ease: 'easeInOut';
    };
};
interface TrackBase {
    id?: string;
}
export interface PoseTrack extends TrackBase {
    kind: 'pose';
    cues: PoseCue[];
}
export interface ExpressionTrack extends TrackBase {
    kind: 'expression';
    cues: ExpressionCue[];
}
export interface LookTrack extends TrackBase {
    kind: 'look';
    cues: LookCue[];
}
export interface HeadTrack extends TrackBase {
    kind: 'head';
    cues: HeadCue[];
}
export interface BodyTrack extends TrackBase {
    kind: 'body';
    cues: BodyCue[];
}
export interface BlinkTrack extends TrackBase {
    kind: 'blink';
    events: BlinkEvent[];
}
export interface SpeechTrack extends TrackBase {
    kind: 'speech';
    cues: VisemeCue[];
}
export type TimelineTrack = PoseTrack | ExpressionTrack | LookTrack | HeadTrack | BodyTrack | BlinkTrack | SpeechTrack;
export type TrackKind = TimelineTrack['kind'];
export declare const TRACK_KINDS: readonly ["pose", "expression", "look", "head", "body", "blink", "speech"];
export interface TimelineSpec {
    tracks: TimelineTrack[];
    durationMs?: number;
}
export interface CompiledCue<T> {
    atMs: number;
    transitionMs: number;
    ease: EasingId;
    value: T;
}
export interface CompiledPoseLoop {
    swing: PoseChannels;
    periodMs: number;
    cycles: number;
}
export type CompiledPoseCue = CompiledCue<PoseChannels> & {
    loop?: CompiledPoseLoop;
};
export interface CompiledTimeline {
    readonly __compiled: true;
    readonly durationMs: number;
    readonly pose: readonly CompiledPoseCue[];
    readonly expression: readonly CompiledCue<Expression>[];
    readonly look: readonly CompiledCue<Point>[];
    readonly head: readonly CompiledCue<HeadPose>[];
    readonly body: readonly CompiledCue<BodyPose>[];
    readonly blink: readonly Required<BlinkEvent>[];
    readonly speech: readonly VisemeCue[];
    readonly speechBlendMs: number;
    readonly warnings: readonly string[];
}
export interface TimelineSample {
    timeMs: number;
    pose?: PoseChannels;
    expression?: Expression;
    look?: Point;
    head?: HeadPose;
    body?: BodyPose;
    blink: {
        left: number;
        right: number;
    };
    speech?: SpeechSample;
}
export interface TimelineBase {
    pose: PoseChannels;
    expression: Expression;
    look: Point;
}
export interface CompileOptions {
    strict?: boolean;
    smoothing?: Partial<SpeechSmoothingConfig>;
}
export type VisemeClass = 'rest' | 'closure' | 'labial' | 'dental' | 'alveolar' | 'velar' | 'sibilant' | 'vowel';
export declare const VISME_CLASS: {
    readonly rest: 'rest';
    readonly MBP: 'closure';
    readonly FV: 'labial';
    readonly TH: 'dental';
    readonly TDNL: 'alveolar';
    readonly KG: 'velar';
    readonly CHSH: 'sibilant';
    readonly SZ: 'sibilant';
    readonly A: 'vowel';
    readonly E: 'vowel';
    readonly O: 'vowel';
    readonly U: 'vowel';
};
export type OverlapPolicy = 'error' | 'clip' | 'merge' | 'priority';
export interface SpeechSmoothingConfig {
    blendMs: number;
    mergeBelowMs: number;
    minDurationByClass: Record<VisemeClass, number>;
    preserveClosures: boolean;
    overlapPolicy: OverlapPolicy;
}
export declare const DEFAULT_SPEECH_SMOOTHING: SpeechSmoothingConfig;
export interface NormalizeVisemeCuesOptions extends Partial<SpeechSmoothingConfig> {
    strict?: boolean;
}
export interface NormalizeVisemeCuesResult {
    cues: VisemeCue[];
    warnings: readonly string[];
}
export interface VisemeProviderAdapter<TInput> {
    readonly id: string;
    readonly inputKind: string;
    toCues(input: TInput): VisemeCue[];
}
export interface SpeechSample {
    active: boolean;
    viseme: VisemeId;
    from: VisemeId;
    t: number;
    fromIntensity: number;
    intensity: number;
}
export {};
