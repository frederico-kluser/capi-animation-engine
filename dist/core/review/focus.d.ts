import type { ReviewBlockInput, ReviewFocus, ReviewFocusInput, ReviewRect, ReviewShotFocus, ReviewTimeline } from '../../contracts/review.js';
export type FocusRectRead = {
    rect: ReviewRect;
    notes: string[];
} | {
    rect?: undefined;
    problem: string;
};
export declare function readFocusRect(value: unknown, video?: {
    width?: number;
    height?: number;
}): FocusRectRead;
export declare function placeReviewFocus(script: {
    blocks?: readonly Pick<ReviewBlockInput, 'id' | 'focus'>[];
    focus?: readonly ReviewFocusInput[];
} | undefined, timeline: Pick<ReviewTimeline, 'segments' | 'blocks' | 'durationMs'>): {
    focus: ReviewFocus[];
    warnings: string[];
};
export interface FocusState {
    cx: number;
    cy: number;
    zoom: number;
}
export declare function focusContentBox(videoAspect: number | undefined, screenAspect: number): ReviewRect;
export declare function focusStateOf(region: ReviewRect | undefined, content: ReviewRect): FocusState;
export declare function reviewFocusView(focus: ReviewShotFocus | undefined, shot: {
    fromMs: number;
    toMs: number;
}, timeMs: number, screenAspect: number): ReviewRect;
