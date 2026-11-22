import type { PodcastSeat } from '../../contracts/podcast.js';
import type { ReviewShot, ReviewTimeline } from '../../contracts/review.js';
import type { TutorialOverlay } from '../../contracts/tutorial.js';
export declare const TUTORIAL_TURN_CUT_LEAD_MS = 160;
export declare const TUTORIAL_TURN_SHOT_MIN_MS = 1100;
export declare const TUTORIAL_VISIT_ESTABLISH_MS: number;
export interface TutorialShotTurn {
    speaker: PodcastSeat;
    speechStartMs: number;
    speechEndMs: number;
}
export declare function tutorialShots(timeline: Pick<ReviewTimeline, 'segments'>, overlay: Pick<TutorialOverlay, 'blocks'> & Partial<Pick<TutorialOverlay, 'visits'>>, options: {
    durationMs: number;
    driver?: PodcastSeat;
    duo?: boolean;
    vertical?: boolean;
    turns?: readonly TutorialShotTurn[];
}): ReviewShot[];
