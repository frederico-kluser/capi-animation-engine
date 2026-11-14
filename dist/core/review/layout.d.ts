import type { CompiledReview, ReviewAspect, ReviewMode, ReviewSide, ReviewStageLayout } from '../../contracts/review.js';
export declare function reviewCompiledLayout(compiled: Pick<CompiledReview, 'tutorial'> | undefined, mode: ReviewMode, aspect: ReviewAspect, side: ReviewSide): ReviewStageLayout;
