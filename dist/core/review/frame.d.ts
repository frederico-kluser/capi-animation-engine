import { type PodcastSeat } from '../../contracts/podcast.js';
import type { SafeArea, VideoProfileId } from '../../contracts/profile.js';
import type { CompiledReview, ReviewFrame, ReviewStageLayout } from '../../contracts/review.js';
export interface ReviewFrameOptions {
    pixels?: {
        width: number;
        height: number;
    };
    videoGainDb?: number;
    duckDb?: number;
    headTops?: Partial<Record<PodcastSeat, number>>;
    profile?: VideoProfileId;
    safe?: SafeArea;
}
export declare function reviewFrameAt(compiled: CompiledReview, layout: ReviewStageLayout, timeMs: number, options?: ReviewFrameOptions): ReviewFrame;
