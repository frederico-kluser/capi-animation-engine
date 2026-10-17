import { type PodcastSeat } from '../../contracts/podcast.js';
import { type Point } from '../../contracts/pose.js';
import { type ReviewAspect, type ReviewMode, type ReviewRect, type ReviewSeatPlacement, type ReviewSide, type ReviewStageLayout } from '../../contracts/review.js';
import type { SetInput } from '../../contracts/set.js';
export interface ReviewStageNumbers {
    width: number;
    height: number;
    screen: ReviewRect;
    bezel: number;
    seats: Partial<Record<PodcastSeat, {
        x: number;
        y: number;
        scale: number;
    }>>;
    seam?: number;
    subtitleBox: ReviewRect;
    captionBox: ReviewRect;
}
export declare const REVIEW_STAGE: Readonly<Record<ReviewMode, Readonly<Record<ReviewAspect, ReviewStageNumbers>>>>;
export declare function reviewSeatSet(set: SetInput, layout: Pick<ReviewStageLayout, 'seats' | 'seam'>, seat: PodcastSeat): SetInput;
export declare function reviewSeatSet(set: SetInput | undefined, layout: Pick<ReviewStageLayout, 'seats' | 'seam'>, seat: PodcastSeat): SetInput | undefined;
export declare function seatToStage(placement: Pick<ReviewSeatPlacement, 'x' | 'y' | 'scale' | 'mirror'>, p: Point): Point;
export declare function stageToSeatBox(placement: Pick<ReviewSeatPlacement, 'x' | 'y' | 'scale'>, rect: ReviewRect): ReviewRect;
export declare function reviewSeatHead(layout: Pick<ReviewStageLayout, 'seats'>, seat: PodcastSeat): {
    center: Point;
    box: ReviewRect;
} | undefined;
export declare function reviewWatchHeadTop(tvHead?: {
    turn?: number;
    nod?: number;
}): number;
export declare function reviewHeadZone(layout: Pick<ReviewStageLayout, 'seats' | 'tvHead'>, seat: PodcastSeat, headTop?: number): ReviewRect | undefined;
export declare function reviewSubtitleRect(layout: Pick<ReviewStageLayout, 'subtitleBox' | 'screen' | 'seats' | 'tvHead'>, options?: {
    headTops?: Partial<Record<PodcastSeat, number>>;
}): ReviewRect;
export declare function reviewSeatShoulders(layout: Pick<ReviewStageLayout, 'seats'>, seat: PodcastSeat): ReviewRect | undefined;
export declare function reviewBezelRect(layout: Pick<ReviewStageLayout, 'screen' | 'bezel'>): ReviewRect;
export declare function reviewScreenSide(layout: Pick<ReviewStageLayout, 'seats' | 'screen'>, seat: PodcastSeat): 'left' | 'right';
export declare function tvGaze(placement: Pick<ReviewSeatPlacement, 'x' | 'y' | 'scale' | 'mirror'>, screen: ReviewRect): {
    look: Point;
    head: {
        turn: number;
        nod: number;
    };
};
export declare function reviewStageLayout(mode: ReviewMode, aspect?: ReviewAspect, side?: ReviewSide): ReviewStageLayout;
export declare function rectsOverlap(a: ReviewRect, b: ReviewRect): boolean;
