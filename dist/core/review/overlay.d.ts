import type { ExpressionInput } from '../../contracts/face.js';
import type { Point } from '../../contracts/pose.js';
import type { ReviewMode, ReviewReaction, ReviewReactionInput, ReviewSegment, ReviewTimeline } from '../../contracts/review.js';
import type { TimelineSpec } from '../../contracts/timeline.js';
export declare const REVIEW_WATCH_TRACK = "review-watch";
export declare const REVIEW_REACT_TRACK = "review-react";
export interface ReviewSpan {
    fromMs: number;
    toMs: number;
}
export declare function watchWindows(segments: readonly ReviewSegment[], busy: readonly ReviewSpan[], options?: {
    minMs?: number;
}): ReviewSpan[];
export interface OverlayWatchOptions {
    look: Point;
    head?: {
        turn: number;
        nod: number;
    };
    restLook?: Point;
    restExpression?: ExpressionInput;
    enterMs?: number;
    leaveMs?: number;
    lookMs?: number;
    headMs?: number;
}
export declare function overlayWatch(spec: TimelineSpec, windows: readonly ReviewSpan[], options: OverlayWatchOptions): TimelineSpec;
export declare function retargetTvGlances(spec: TimelineSpec, from: Point | undefined, to: Point | undefined): TimelineSpec;
export declare function talkManifestTvLook(manifest: unknown): Point | undefined;
export interface OverlayReactionsOptions {
    tvLook: Point;
    otherLook?: Point;
    restLook?: Point;
    restExpression?: ExpressionInput;
}
export declare function overlayReactions(spec: TimelineSpec, reactions: readonly ReviewReaction[], options: OverlayReactionsOptions): TimelineSpec;
export declare function placeReviewReactions(inputs: readonly ReviewReactionInput[] | undefined, timeline: Pick<ReviewTimeline, 'segments'>, options: {
    mode: ReviewMode;
}): {
    reactions: ReviewReaction[];
    warnings: string[];
};
