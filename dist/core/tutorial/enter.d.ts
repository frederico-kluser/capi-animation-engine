import type { PodcastSeat } from '../../contracts/podcast.js';
import type { ReviewSegment } from '../../contracts/review.js';
import type { TutorialEvent, TutorialOverlay } from '../../contracts/tutorial.js';
export declare const PREDICT_STEP_SUFFIX = "-enter";
export declare const TUTORIAL_PREDICT_SETTLE_MS = 400;
export declare const TUTORIAL_ENTER: {
    readonly keyGuardMs: 10;
    readonly maxLagMs: 1500;
};
export interface PredictWindow {
    step: string;
    typedMs: number;
    enterMs: number;
    split: boolean;
}
export declare function predictWindow(events: readonly TutorialEvent[], stepId: string): PredictWindow | null;
export interface PredictStill {
    atMs: number;
    frame: number;
    margin: 0.5 | 0 | null;
}
export declare function predictStillMs(window: Pick<PredictWindow, 'typedMs' | 'enterMs'>, videoFps: number, options?: {
    exactBase?: boolean;
}): PredictStill;
export declare function enterSpeech(text: string): 'press' | 'hold' | null;
export interface EnterTurn {
    id: string;
    speaker: PodcastSeat;
    text: string;
    speechStartMs: number;
    speechEndMs: number;
}
export interface EnterCheckInput {
    overlay: Pick<TutorialOverlay, 'events' | 'blocks'>;
    segments: readonly ReviewSegment[];
    fps: number;
    videoFps: number;
    turns: readonly EnterTurn[];
    exactBase?: boolean;
}
export declare const TUTORIAL_ENTER_CODES: readonly ['enter-early', 'predict-untyped', 'output-late', 'enter-before-line', 'enter-late', 'no-enter-broken', 'no-enter-unpredicted'];
export type EnterFindingCode = (typeof TUTORIAL_ENTER_CODES)[number];
export interface EnterFinding {
    code: EnterFindingCode;
    severity: 'error' | 'warning';
    segment: string;
    turn?: string;
    atMs: number;
    message: string;
}
export interface EnterStepReport {
    segment: string;
    predict: boolean;
    enterMs: number | null;
    enterAtMs: number | null;
    enterHeardAtMs: number | null;
    outputAtMs: number | null;
    predictEndMs?: number;
    predictFrame?: number;
    lines: Array<{
        turn: string;
        says: 'press' | 'hold';
        startMs: number;
        endMs: number;
        lagMs?: number;
    }>;
}
export interface EnterVerdict {
    ok: boolean;
    findings: EnterFinding[];
    steps: EnterStepReport[];
}
export declare function checkTutorialEnters(input: EnterCheckInput): EnterVerdict;
