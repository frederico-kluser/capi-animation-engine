import type { CameraAngle, CameraMoveKind, CameraTransitionKind, CameraView, ShotFraming, ShotSize } from '../../contracts/camera.js';
import { type PodcastSeat } from '../../contracts/podcast.js';
import type { SafeArea, VideoProfileId } from '../../contracts/profile.js';
import { type ReviewMode, type ReviewReaction, type ReviewRect, type ReviewShot, type ReviewSpec, type ReviewStageLayout, type ReviewTimeline } from '../../contracts/review.js';
declare const C: {
    readonly tvAfterMs: 2400;
    readonly tvMinPlayMs: 7000;
    readonly stageBeforeCommentMs: 1400;
    readonly minShotMs: 500;
    readonly carryMaxMs: 1200;
    readonly favorZoom: 1.25;
    readonly transitionOverVideoMs: 200;
    readonly transitionMinMs: 80;
};
export interface ReviewCommentaryShot {
    fromMs: number;
    toMs: number;
    framing?: ShotFraming;
    seat?: PodcastSeat;
    size?: ShotSize;
    zoom?: number;
    move?: CameraMoveKind;
    moveAmount?: number;
    moveMs?: number;
    angle?: CameraAngle;
    view?: CameraView;
    transition?: CameraTransitionKind;
    transitionMs?: number;
    why?: string;
}
export interface ReviewShotsInput {
    mode: ReviewMode;
    timeline: Pick<ReviewTimeline, 'durationMs' | 'segments' | 'blocks'>;
    commentary?: readonly ReviewCommentaryShot[];
    reactions?: readonly ReviewReaction[];
    camera?: Partial<Pick<ReviewSpec['camera'], 'duringVideo' | 'zooms' | 'cuts'>>;
    seats?: readonly PodcastSeat[];
    options?: Partial<Record<keyof typeof C | 'cameraMs' | 'cameraMinMs', number>>;
    warnings?: string[];
}
type Look = Omit<ReviewShot, 'fromMs' | 'toMs'>;
export declare function translateCommentaryShot(shot: ReviewCommentaryShot, mode: ReviewMode, context: 'pause' | 'over', zooms?: boolean, notes?: string[]): Look;
export declare function reviewShots(input: ReviewShotsInput): ReviewShot[];
export declare function reviewShotIndexAt(shots: readonly ReviewShot[], timeMs: number): number;
export declare function reviewShotAt(shots: readonly ReviewShot[], timeMs: number): ReviewShot | undefined;
export declare function tvCropBox(layout: Pick<ReviewStageLayout, 'width' | 'height' | 'screen' | 'bezel'>): ReviewRect;
export interface ReviewCropOptions {
    headTops?: Partial<Record<PodcastSeat, number>>;
    profile?: VideoProfileId;
    safe?: SafeArea;
}
export declare function reviewShortSafe(layout: Pick<ReviewStageLayout, 'width' | 'height'>, options: Pick<ReviewCropOptions, 'profile' | 'safe'>): SafeArea | undefined;
type CropShot = Pick<ReviewShot, 'fromMs' | 'toMs' | 'framing' | 'size' | 'zoom' | 'move'> & Partial<Pick<ReviewShot, 'seat' | 'moveAmount' | 'moveMs' | 'source' | 'angle' | 'view'>>;
export declare function reviewCrop(shot: CropShot, layout: ReviewStageLayout, timeMs: number, options?: ReviewCropOptions): ReviewRect;
export interface ReviewCropWarp {
    scale: number;
    travel: number;
}
export interface ReviewShotView {
    crop: ReviewRect;
    roll?: number;
    view?: {
        turn?: number;
        nod?: number;
    };
}
export declare function reviewShotView(shot: CropShot, layout: ReviewStageLayout, timeMs: number, options?: ReviewCropOptions, warp?: ReviewCropWarp): ReviewShotView;
export declare function reviewViewSeat(shot: Pick<ReviewShot, 'framing' | 'seat'>, layout: Pick<ReviewStageLayout, 'seats'>): PodcastSeat | undefined;
export {};
