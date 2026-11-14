import type { ReactElement } from 'react';
import type { Point } from '../contracts/pose.js';
import type { FoodKind } from '../contracts/set.js';
import { type Palette } from './palette.js';
type Ids = (local: string) => string;
export interface FoodArtProps {
    palette: Palette;
    ids: Ids;
    flip: boolean;
    ink: number;
    bites?: number | undefined;
}
export interface BiteTooth {
    x: number;
    y: number;
    r: number;
    ex: number;
    ey: number;
}
export declare function biteTeeth(kind: FoodKind, bites: number, sx: number): BiteTooth[];
export declare function PopcornHandfulArt({ palette, flip, ink, bites }: FoodArtProps): ReactElement;
export declare const FOOD_ART: Record<FoodKind, (props: FoodArtProps) => ReactElement>;
export declare function handfulKernels(bites: number): ReadonlyArray<{
    x: number;
    y: number;
    r: number;
}>;
export declare function foodSilhouettePath(kind: FoodKind, flip?: boolean, bites?: number): string;
export declare function FoodPlateArt({ at, scale, palette }: {
    at: Point;
    scale: number;
    palette?: Palette;
}): ReactElement;
export {};
