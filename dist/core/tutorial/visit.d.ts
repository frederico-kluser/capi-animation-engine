import type { PodcastSeat } from '../../contracts/podcast.js';
import type { CompiledReviewVisit, CompiledVisitCall, ReviewAnchor, ReviewBlockMode, ReviewFrameVisit, ReviewRect, ReviewStageLayout, ReviewTimeline, ReviewVisitTrack } from '../../contracts/review.js';
import type { TimelineSpec, VisemeCue } from '../../contracts/timeline.js';
import type { TutorialOverlayVisit } from '../../contracts/tutorial.js';
import type { CommentaryWord } from '../review/subtitles.js';
export declare const TUTORIAL_VISIT: {
    readonly padBeforeMs: 140;
    readonly padAfterMs: 200;
    readonly connectMs: 480;
    readonly disconnectMs: 420;
    readonly card: {
        readonly delayMs: 380;
        readonly holdMs: 4800;
        readonly intoSpeechMs: 3200;
        readonly maxMs: 11000;
        readonly enterMs: 380;
        readonly exitMs: 340;
    };
    readonly zoom: {
        readonly speaking: 1.3;
        readonly leadMs: 250;
        readonly inMs: 900;
        readonly outMs: 700;
    };
    readonly livePeriodMs: 1600;
    readonly headTurn: {
        readonly degrees: 26;
        readonly rampMs: 220;
    };
    readonly body: {
        readonly rest: 'idle';
        readonly listen: 'neutral';
        readonly speak: 'friendly';
        readonly ask: 'curious';
        readonly gestures: readonly ['openArms', 'explain', 'explainOneHand', 'steeple', 'presentBoth', 'explainWide'];
        readonly gestureAtMs: 380;
        readonly secondMs: 5200;
        readonly restAfterMs: 320;
        readonly nodMinMs: 1300;
        readonly waveMinMs: 1900;
    };
    readonly view: {
        readonly height: 780;
        readonly anchor: {
            readonly x: 520;
            readonly y: 242;
        };
        readonly anchorAt: {
            readonly x: 0.5;
            readonly y: 0.285;
        };
        readonly topMargin: 0.035;
        readonly handsMargin: 26;
    };
};
export declare function visitSeedOf(text: string): number;
export interface VisitHookFields {
    silentMs?: number;
    padBeforeMs?: number;
    padAfterMs?: number;
}
export declare function visitHookBlocks<B extends {
    id: string;
    turns: string[];
    at: ReviewAnchor;
    mode: ReviewBlockMode;
}>(blocks: readonly B[], visits: readonly TutorialOverlayVisit[] | undefined, durations: Readonly<Record<string, number>>): {
    blocks: Array<B & VisitHookFields>;
    warnings: string[];
};
export interface VisitLineClip {
    id: string;
    visitor: string;
    src: string;
    fromMs: number;
    playMs: number;
}
export declare function visitLineClips(track: ReviewVisitTrack | undefined, timeline: Pick<ReviewTimeline, 'blocks'> | undefined): VisitLineClip[];
export interface VisitDuoTurn {
    speaker: PodcastSeat;
    speechStartMs: number;
    speechEndMs: number;
}
export interface CompileVisitsOptions {
    commentaryDir?: string;
    duoTurns?: readonly VisitDuoTurn[];
    durationMs?: number;
}
export declare function visitCallTimeline(call: Pick<CompiledVisitCall, 'fromMs' | 'toMs' | 'lines'>, speech: readonly VisemeCue[], duo: readonly VisitDuoTurn[], durationMs: number, ask: ReadonlySet<string>, options?: {
    gestures?: readonly string[];
    offset?: number;
}): TimelineSpec;
export declare function compileTutorialVisits(visits: readonly TutorialOverlayVisit[] | undefined, track: ReviewVisitTrack | undefined, timeline: Pick<ReviewTimeline, 'segments' | 'blocks' | 'durationMs'>, options?: CompileVisitsOptions): {
    visit?: CompiledReviewVisit;
    warnings: string[];
};
export declare function visitHeadTurnAt(call: CompiledVisitCall, ms: number, speaking?: boolean): {
    turn: number;
    lookingAt: PodcastSeat | 'visitor' | null;
};
export declare function visitFrameAt(visit: CompiledReviewVisit | undefined, ms: number): ReviewFrameVisit | undefined;
export declare function visitCallViewBox(aspect: number, zoom?: number, headTop?: number, minWidth?: number): ReviewRect;
export declare function visitCardRect(layout: Pick<ReviewStageLayout, 'seats' | 'screen'>): ReviewRect;
export declare function visitCaptionWords(visit: CompiledReviewVisit | undefined, track: ReviewVisitTrack | undefined): CommentaryWord[];
export declare function visitGazeWindows(visit: CompiledReviewVisit | undefined): Array<{
    fromMs: number;
    toMs: number;
}>;
