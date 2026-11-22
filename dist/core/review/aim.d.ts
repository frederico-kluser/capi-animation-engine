import type { PodcastSeat } from '../../contracts/podcast.js';
import { type Point } from '../../contracts/pose.js';
import type { ReviewRect, ReviewStageLayout } from '../../contracts/review.js';
import { type AimInput, type AimSurface } from '../pose/aim.js';
export declare function reviewAimSurface(layout: Pick<ReviewStageLayout, 'seats' | 'screen'>, seat: PodcastSeat): AimSurface | undefined;
export declare function reviewAimTarget(layout: Pick<ReviewStageLayout, 'seats' | 'screen'>, seat: PodcastSeat, aim: AimInput): Point | undefined;
export declare function focusAim(region: Pick<ReviewRect, 'x' | 'y' | 'width' | 'height'>): Point;
