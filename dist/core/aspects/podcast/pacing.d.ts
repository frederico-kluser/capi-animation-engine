import type { BriefPacingId } from '../../../contracts/aspects.js';
import type { PodcastSeat } from '../../../contracts/podcast.js';
export interface BriefPauses {
    turnMs: readonly [number, number];
    segmentMs: number;
    conceptMs: number;
    questionMs: number;
}
export interface BriefTurns {
    explain: readonly [number, number];
    react: readonly [number, number];
    backchannels: number;
    attempts: number;
    interruptions: boolean;
    joinMax: number;
}
export interface BriefPacing {
    wordsPerMinute: {
        solo: number;
        duo: number;
    };
    pauses?: BriefPauses;
    turns?: BriefTurns;
}
export declare const BRIEF_PACING: Readonly<Record<BriefPacingId, BriefPacing>>;
export declare const pacingIdOf: (format?: {
    pacing?: BriefPacingId;
} | undefined) => BriefPacingId;
export declare const isTeachingPacing: (id: BriefPacingId) => boolean;
export declare const pacingWordsPerMinute: (id: BriefPacingId, presenters: 1 | 2) => number;
export declare function pacedGap(range: readonly [number, number], seed: number, index: number): number;
export declare function asksTheViewer(text: string): boolean;
export declare function teachingSeat(roles: Partial<Record<PodcastSeat, string>> | undefined): PodcastSeat | undefined;
export declare function questionPause(turn: {
    speaker: PodcastSeat;
    text: string;
}, teacher: PodcastSeat | undefined): boolean;
