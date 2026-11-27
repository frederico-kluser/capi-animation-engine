import { type PodcastSeat, type PodcastSpec } from '../../contracts/podcast.js';
import { type VideoProfileId } from '../../contracts/profile.js';
import type { CompiledReview, ReviewCommentary, ReviewSpec, ReviewStageLayout, SubtitleWord } from '../../contracts/review.js';
import type { SetInput } from '../../contracts/set.js';
export declare const TUTORIAL_VISIT_TRACK = "tutorial-visit";
export declare function reviewSpecLayout(spec: Pick<ReviewSpec, 'tutorial' | 'captionsAt'> | undefined, mode: 'talk' | 'podcast', aspect: ReviewSpec['layout']['aspect'], side: ReviewSpec['layout']['side']): ReviewStageLayout;
export interface CompileReviewOptions {
    layout?: ReviewStageLayout;
    talkWords?: readonly SubtitleWord[];
    captions?: 'show' | 'all';
    profile?: VideoProfileId;
}
export declare function reviewPodcastSet(spec: PodcastSpec, seat: PodcastSeat, warnings?: string[]): SetInput;
export declare function compileReview(spec: ReviewSpec, commentary: ReviewCommentary, opts?: CompileReviewOptions): CompiledReview;
