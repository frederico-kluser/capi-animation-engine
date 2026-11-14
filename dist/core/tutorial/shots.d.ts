import type { PodcastSeat } from '../../contracts/podcast.js';
import type { ReviewShot, ReviewTimeline } from '../../contracts/review.js';
import type { TutorialOverlay } from '../../contracts/tutorial.js';
export declare function tutorialShots(timeline: Pick<ReviewTimeline, 'segments'>, overlay: Pick<TutorialOverlay, 'blocks'>, options: {
    durationMs: number;
    driver?: PodcastSeat;
    duo?: boolean;
    vertical?: boolean;
}): ReviewShot[];
