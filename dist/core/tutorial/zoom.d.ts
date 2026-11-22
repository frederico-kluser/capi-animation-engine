import type { ReviewRect, ReviewTimeline } from '../../contracts/review.js';
import type { TutorialOverlay, TutorialZoomKey } from '../../contracts/tutorial.js';
import { type TutorialCover } from './focus.js';
export declare const TUTORIAL_ZOOM: {
    readonly maxZoom: 2.2;
    readonly windowMaxZoom: 1.5;
    readonly padding: 0.08;
    readonly leadMs: 500;
    readonly rampBaseMs: 600;
    readonly rampPerLnMs: 550;
    readonly transitionMs: 800;
    readonly mergeMs: 1800;
    readonly bounceMs: 1500;
    readonly tailMs: 1000;
    readonly linesAround: 2;
    readonly minCols: 34;
    readonly breathe: {
        readonly minMs: 2500;
        readonly gain: 0.03;
    };
    readonly relaxStep: 0.95;
};
export interface ZoomState {
    cx: number;
    cy: number;
    zoom: number;
}
export declare function zoomView(s: ZoomState): ReviewRect;
export declare function focusInView(focus: ReviewRect, s: ZoomState): ReviewRect;
export interface FocusFit {
    state: ZoomState;
    clear: boolean;
}
export declare function fitFocus(ideal: ZoomState, focus: ReviewRect, cover: readonly ReviewRect[], options?: {
    aspect?: number;
    margin?: number;
    maxZoom?: number;
}): FocusFit;
export declare function focusHidden(state: ZoomState, focus: ReviewRect, cover: readonly ReviewRect[], margin?: number): number;
export declare function fitRect(rect: ReviewRect, maxZoom: number, occlusion?: readonly ReviewRect[]): ZoomState;
export interface PlanTutorialZoomInput {
    overlay: Pick<TutorialOverlay, 'events' | 'screen' | 'blocks' | 'blockFocus' | 'zoom'>;
    timeline: Pick<ReviewTimeline, 'segments' | 'blocks' | 'durationMs'>;
    occlusion?: readonly ReviewRect[];
    cover?: TutorialCover;
    maxZoom?: number;
    warnings?: string[];
}
export declare function tutorialZoomCeiling(captureWidth: number, frameWidth: number): number;
export declare function planTutorialZoom(input: PlanTutorialZoomInput): TutorialZoomKey[];
export declare function tutorialZoomAt(keys: readonly TutorialZoomKey[], ms: number): ZoomState;
