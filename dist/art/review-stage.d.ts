import type { ReactElement } from 'react';
import type { ReviewRect } from '../contracts/review.js';
import { type Palette } from './palette.js';
type Ids = (local: string) => string;
export declare const REVIEW_BACKDROP_TONES: readonly ['studio', 'night'];
export type ReviewBackdropTone = (typeof REVIEW_BACKDROP_TONES)[number];
export declare const REVIEW_SCREEN_FILLS: readonly ['hole', 'off', 'poster'];
export type ReviewScreenFill = (typeof REVIEW_SCREEN_FILLS)[number];
export declare function reviewBackdropFloorY(width: number, height: number): number;
export interface ReviewBackdropArtProps {
    width: number;
    height: number;
    ids: Ids;
    tone?: ReviewBackdropTone | undefined;
    palette?: Palette | undefined;
}
export declare function ReviewBackdropArt({ width, height, ids, tone, palette }: ReviewBackdropArtProps): ReactElement;
export interface ReviewScreenArtProps {
    screen: ReviewRect;
    bezel: number;
    fill: ReviewScreenFill;
    posterHref?: string | undefined;
    ids: Ids;
    stand?: boolean | undefined;
    floorY?: number | undefined;
    wallShadow?: boolean | undefined;
    inkWidth?: number | undefined;
    palette?: Palette | undefined;
}
export declare function reviewScreenArtBounds({ screen, bezel, stand, floorY, wallShadow, inkWidth }: Pick<ReviewScreenArtProps, 'screen' | 'bezel' | 'stand' | 'floorY' | 'wallShadow' | 'inkWidth'>): ReviewRect;
export declare function ReviewScreenArt({ screen, bezel, fill, posterHref, ids, stand, floorY, wallShadow, inkWidth, palette, }: ReviewScreenArtProps): ReactElement;
export {};
