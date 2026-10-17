import type { PodcastSeat } from '../../../contracts/podcast.js';
import type { ReviewAnalysis, ReviewAnchor, ReviewBlockMode, ReviewMode, ReviewSide, ReviewStageLayout, ReviewSubtitles, ReviewTimeline } from '../../../contracts/review.js';
export interface ReviewContextBlock {
    id?: string;
    at: ReviewAnchor;
    mode?: ReviewBlockMode;
    moment?: string;
    why?: string;
    text?: string;
    turns?: ReadonlyArray<{
        speaker?: string;
        text?: string;
    }>;
    videoAtMs?: number;
}
export interface ReviewAspectContextInput {
    analysis?: ReviewAnalysis | null;
    subtitles?: ReviewSubtitles | null;
    script: {
        title?: string;
        blocks: readonly ReviewContextBlock[];
    };
    timeline?: ReviewTimeline | null;
    mode: ReviewMode;
    prompt?: string;
    layout?: Pick<ReviewStageLayout, 'side'> | {
        side?: ReviewSide;
    };
    names?: Partial<Record<PodcastSeat, string>>;
    videoDurationMs?: number;
    lookBackMs?: number;
}
export declare const REVIEW_CONTEXT_LIMITS: {
    readonly lookBackMs: 20000;
    readonly maxCueChars: 420;
    readonly maxChars: 24000;
};
export declare function talkBlockWordRanges(blocks: readonly ReviewContextBlock[]): Array<[number, number] | undefined>;
export declare function podcastBlockTurnRanges(blocks: readonly ReviewContextBlock[]): Array<[number, number] | undefined>;
export declare function reviewAspectContext(input: ReviewAspectContextInput): string;
