import type { PodcastTurnSpec } from '../../contracts/podcast.js';
import type { ReviewTimeline } from '../../contracts/review.js';
export interface PodcastReviewBlock {
    id: string;
    turns: readonly string[];
}
export interface PodcastBlockSpan {
    id: string;
    startMs: number;
    endMs: number;
    durationMs: number;
}
export declare function podcastBlockSpans(turns: readonly Pick<PodcastTurnSpec, 'id' | 'atMs' | 'audio'>[], blocks: readonly PodcastReviewBlock[]): {
    spans: PodcastBlockSpan[];
    warnings: string[];
};
export declare function retimePodcastTurns<T extends Pick<PodcastTurnSpec, 'id' | 'atMs'>>(turns: readonly T[], blocks: readonly PodcastReviewBlock[], spans: readonly PodcastBlockSpan[], timeline: Pick<ReviewTimeline, 'blocks'>): {
    turns: T[];
    shifts: Record<string, number>;
    warnings: string[];
};
