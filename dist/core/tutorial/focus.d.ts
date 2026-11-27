import { type PodcastSeat } from '../../contracts/podcast.js';
import { type PoseChannels, type PoseInput, type SolvedPose } from '../../contracts/pose.js';
import type { ReviewRect, ReviewStageLayout } from '../../contracts/review.js';
import type { CompiledTimeline, TimelineSpec } from '../../contracts/timeline.js';
import type { TutorialEvent } from '../../contracts/tutorial.js';
export declare const TUTORIAL_FOCUS: {
    readonly margin: 0.012;
    readonly cellPerHeight: 0.6;
    readonly armHalf: 45;
    readonly glove: number;
    readonly motionStepMs: 50;
    readonly motionChunkMs: 250;
};
export declare function unionRect(a: ReviewRect | undefined, b: ReviewRect): ReviewRect;
export interface TerminalCommand {
    text: string;
    window?: string;
    line: ReviewRect;
    promptMs: number;
    textX: number;
    cellWidth: number;
    rowHeight: number;
    keys: number[];
    typedFromMs: number;
    typedToMs: number;
    enterMs?: number;
    output?: {
        rect: ReviewRect;
        ids: string[];
        shownMs: number;
    };
}
export declare function tutorialTerminalCommands(events: readonly TutorialEvent[]): TerminalCommand[];
export declare function commandAt(commands: readonly TerminalCommand[], videoMs: number): TerminalCommand | undefined;
export declare function nextCommand(commands: readonly TerminalCommand[], videoMs: number): TerminalCommand | undefined;
export declare function commandOfResult(commands: readonly TerminalCommand[], resultId: string): TerminalCommand | undefined;
export declare function commandFocus(c: TerminalCommand, withOutput: boolean): ReviewRect;
export declare function commandPrompt(c: TerminalCommand): ReviewRect;
export interface TutorialFocusLine {
    rect: ReviewRect;
    what: string;
}
export type TutorialFocusMoment = 'announce' | 'predict' | 'explain' | 'play';
export declare function tutorialFocusLines(commands: readonly TerminalCommand[], videoMs: number, moment: TutorialFocusMoment, resultId?: string): TutorialFocusLine[];
export declare function tutorialSeatSilhouettes(layout: Pick<ReviewStageLayout, 'seats' | 'screen'>): Array<{
    seat: PodcastSeat;
    rect: ReviewRect;
}>;
export declare function frameRectToScreen(rect: ReviewRect, layout: Pick<ReviewStageLayout, 'width' | 'height' | 'screen' | 'bezel'>, crop?: ReviewRect): ReviewRect;
export interface TutorialCoverBox {
    rect: ReviewRect;
    what: string;
}
export interface TutorialCover {
    always: TutorialCoverBox[];
    windows: Array<TutorialCoverBox & {
        fromMs: number;
        toMs: number;
    }>;
    aspect: number;
}
export interface TutorialFocusOverlays {
    steps?: ReadonlyArray<{
        label: string;
        fromMs: number;
        toMs: number;
    }>;
    cards?: ReadonlyArray<{
        id: string;
        overScreen?: boolean;
        fromMs: number;
        toMs: number;
    }>;
    captions?: boolean;
}
export declare function tutorialFocusCover(layout: Pick<ReviewStageLayout, 'width' | 'height' | 'screen' | 'bezel' | 'seats' | 'captionBox'>, overlays?: TutorialFocusOverlays): TutorialCover;
export declare function coverDuring(cover: TutorialCover | undefined, fromMs: number, toMs: number): TutorialCoverBox[];
export declare function unionArea(rects: readonly ReviewRect[]): number;
export declare function hiddenShare(rect: ReviewRect, cover: readonly ReviewRect[], view?: ReviewRect): number;
export declare function inflate(r: ReviewRect, m: number): ReviewRect;
export interface SeatSampler {
    seat: PodcastSeat;
    placement: NonNullable<ReviewStageLayout['seats'][PodcastSeat]>;
    compiled: CompiledTimeline;
    base: PoseChannels;
    rest: SolvedPose;
}
export declare function seatSampler(seat: PodcastSeat, placement: SeatSampler['placement'] | undefined, timeline: TimelineSpec | undefined, base: PoseInput | undefined): SeatSampler | undefined;
export declare function seatStageBoxes(s: SeatSampler, t: number): ReviewRect[];
export declare function tutorialSeatMotion(samplers: readonly SeatSampler[], layout: Pick<ReviewStageLayout, 'seats' | 'screen'>, spans: ReadonlyArray<{
    fromMs: number;
    toMs: number;
}>): TutorialCover['windows'];
