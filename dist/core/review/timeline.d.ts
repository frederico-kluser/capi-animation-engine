import type { ReviewAnchor, ReviewBlockMode, ReviewSegment, ReviewTimeline, ReviewTimingOptions } from '../../contracts/review.js';
export interface ReviewBlockTiming {
    id: string;
    at: ReviewAnchor;
    mode: ReviewBlockMode;
    durationMs: number;
}
export interface PlanReviewTimelineOptions extends Partial<ReviewTimingOptions> {
    videoDurationMs: number;
    videoFrameMs?: number;
}
export declare function planReviewTimeline(blocks: readonly ReviewBlockTiming[], options: PlanReviewTimelineOptions): ReviewTimeline;
export declare function segmentAt(timeline: Pick<ReviewTimeline, 'segments'>, ms: number): ReviewSegment;
export declare function videoTimeAt(timeline: Pick<ReviewTimeline, 'segments'>, ms: number): {
    videoMs: number;
    playing: boolean;
    segment: ReviewSegment;
};
export declare function outputTimeOfVideo(timeline: Pick<ReviewTimeline, 'segments'>, videoMs: number): number | null;
export declare function playWindows(timeline: Pick<ReviewTimeline, 'segments'>): Array<{
    fromMs: number;
    toMs: number;
}>;
export declare function duckGainAt(timeline: Pick<ReviewTimeline, 'duck'>, ms: number, duckDb?: number, rampMs?: number): number;
