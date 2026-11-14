import type { ExpressionInput } from '../../contracts/face.js';
import type { PodcastSeat } from '../../contracts/podcast.js';
import type { Point, PoseInput } from '../../contracts/pose.js';
import type { CompiledReview, ReviewScript, ReviewSegment } from '../../contracts/review.js';
import type { TimelineSpec } from '../../contracts/timeline.js';
import type { TutorialBlockRole, TutorialOverlay, TutorialVoice } from '../../contracts/tutorial.js';
import { type ComputerWindow } from './computer.js';
export declare const TUTORIAL_DIRECTION: {
    readonly calm: {
        readonly retractMs: 420;
        readonly minHoldMs: 300;
    };
    readonly watch: {
        readonly enterMs: 120;
        readonly leaveMs: 300;
        readonly lookMs: 340;
        readonly headMs: 480;
        readonly minMs: 800;
    };
    readonly gesture: {
        readonly mergeGapMs: 1200;
        readonly minMs: 1200;
        readonly speechGapMs: 400;
        readonly speechPadMs: 300;
    };
    readonly think: {
        readonly minSilenceMs: 1500;
        readonly enterMs: 150;
        readonly leaveMs: 200;
    };
    readonly face: {
        readonly transitionMs: 380;
    };
    readonly motion: {
        readonly largePx: 60;
    };
    readonly verify: {
        readonly sampleMs: 100;
        readonly thinkCoverage: 0.7;
        readonly largePx: 80;
        readonly minMs: 600;
        readonly graceMs: 100;
        readonly thinkPx: 40;
    };
};
export declare const TUTORIAL_DIRECTION_TRACK = "tutorial-direction";
export interface DirectionSpan {
    fromMs: number;
    toMs: number;
}
export type TutorialLoad = 'low' | 'high' | 'neutral';
export declare const TUTORIAL_LOAD_BY_ROLE: Readonly<Record<TutorialBlockRole, TutorialLoad>>;
export declare function loadOfRole(role: unknown): TutorialLoad | undefined;
export interface BlockDirection {
    tone?: string;
    expression?: string;
}
export declare function teacherFace(role: TutorialBlockRole | string | undefined, speaking: boolean): string;
export declare function blockDirection(role: TutorialBlockRole | string | undefined, voice: TutorialVoice): BlockDirection;
export declare const TUTORIAL_CALM_TONES: readonly string[];
export declare const TUTORIAL_FESTIVE_TONES: readonly string[];
export declare const TUTORIAL_CALM_FACES: readonly string[];
export declare const TUTORIAL_FESTIVE_FACES: readonly string[];
export interface LessonDirectionOptions {
    roles?: TutorialOverlay['blocks'];
    teacher?: PodcastSeat;
    minThinkMs?: number;
}
export interface DirectionFinding {
    block: string;
    role: TutorialBlockRole;
    turn?: number;
    code: 'festive-tone' | 'festive-expression' | 'not-calm' | 'think-no-silence' | 'think-order';
    severity: 'error' | 'warning';
    message: string;
}
export interface DirectionCheck {
    applicable: boolean;
    calm: boolean;
    thinkReady: boolean;
    ok: boolean;
    findings: DirectionFinding[];
    highLoad: {
        blocks: number;
        calm: number;
    };
    think: {
        blocks: number;
        ready: number;
    };
}
export declare function checkLessonDirection(script: Pick<ReviewScript, 'mode' | 'blocks'> & {
    speakers?: ReviewScript['speakers'];
}, options?: LessonDirectionOptions): DirectionCheck;
export declare function poseRestShift(pose: PoseInput | undefined): number;
export declare function isLargeGesturePose(pose: PoseInput | undefined): boolean;
export declare function isThinkPose(pose: PoseInput | undefined): boolean;
export declare function largeGestureSpans(spec: TimelineSpec, options?: {
    endMs?: number;
}): DirectionSpan[];
export interface KineticSeat {
    timeline: TimelineSpec;
    speaking?: readonly DirectionSpan[];
    calmPose: PoseInput;
    look: Point;
    head?: {
        turn: number;
        nod: number;
    };
    restLook?: Point;
    restExpression?: ExpressionInput;
}
export interface KineticChange {
    seat: 'teacher' | 'learner';
    atMs: number;
    kind: 'retract' | 'cancel';
    why: 'screen' | 'think' | 'speaker';
    pose?: string;
}
export interface KineticResult {
    teacher: TimelineSpec;
    learner: TimelineSpec;
    changes: KineticChange[];
}
export interface KineticOptions {
    think?: readonly ComputerWindow[];
    isLarge?: (pose: PoseInput) => boolean;
}
export declare function applyKineticAsymmetry(seats: {
    teacher: KineticSeat;
    learner: KineticSeat;
}, windows: readonly ComputerWindow[], options?: KineticOptions): KineticResult;
export interface DirectionTurn {
    id: string;
    speaker: PodcastSeat;
    speechStartMs: number;
    speechEndMs: number;
}
export interface ThinkWindowOptions {
    learner: PodcastSeat;
    gaze?: Point;
    roles?: readonly TutorialBlockRole[];
    avoid?: ReadonlyArray<{
        fromMs: number;
        toMs: number;
    }>;
}
export declare function tutorialThinkWindows(turns: readonly DirectionTurn[], blocks: TutorialOverlay['blocks'] | undefined, options: ThinkWindowOptions): ComputerWindow[];
export interface RegimePiece {
    fromMs: number;
    toMs: number;
    expression: string;
}
export interface RegimeOptions {
    turns?: readonly DirectionTurn[];
    teacher?: PodcastSeat;
}
export declare function tutorialRegimeSpans(segments: readonly ReviewSegment[], blocks: TutorialOverlay['blocks'] | undefined, options?: RegimeOptions): RegimePiece[];
export declare function applyEmotionRegime(spec: TimelineSpec, pieces: readonly RegimePiece[], options?: {
    restExpression?: ExpressionInput;
}): TimelineSpec;
export type DirectionViolationCode = 'two-large-gestures' | 'teacher-moves-on-screen' | 'teacher-face' | 'teacher-frown' | 'think-no-silence' | 'think-pose-missing' | 'think-broken-silence' | 'think-first-speaker' | 'think-teacher-moves';
export interface DirectionViolation {
    code: DirectionViolationCode;
    atMs: number;
    toMs?: number;
    message: string;
    seat?: PodcastSeat;
    block?: string;
}
export interface DirectionStats {
    applicable: boolean;
    durationMs: number;
    sampleMs: number;
    faceSamples: number;
    bodySamples: number;
    screenWindows: number;
    highLoadPieces: number;
    thinkBlocks: number;
    thinkPosed: number;
    silences: number;
    silencesPosed: number;
    largeGestures: {
        teacher: {
            spans: number;
            ms: number;
        };
        learner: {
            spans: number;
            ms: number;
        };
    };
    simultaneousMs: number;
    skipped: string[];
}
export interface DirectionVerdict {
    ok: boolean;
    violations: DirectionViolation[];
    stats: DirectionStats;
}
export interface VerifyDirectionOptions {
    tutorial: Pick<TutorialOverlay, 'blocks' | 'events'> & {
        driver?: PodcastSeat;
    };
    turns?: readonly DirectionTurn[];
    sampleMs?: number;
    thinkRoles?: readonly TutorialBlockRole[];
}
export interface ThinkAnswer {
    block: string;
    segment: string;
    silenceFromMs: number;
    answerAtMs: number;
}
export declare function tutorialThinkAnswers(turns: readonly DirectionTurn[], blocks: TutorialOverlay['blocks'] | undefined, learner: PodcastSeat): ThinkAnswer[];
export declare function verifyTutorialDirection(compiled: Pick<CompiledReview, 'durationMs' | 'segments' | 'seats'>, options: VerifyDirectionOptions): DirectionVerdict;
