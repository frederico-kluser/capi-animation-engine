import type { GlassesId } from '../contracts/outfit.js';
import { type Point } from '../contracts/pose.js';
import { type TubePoint } from '../core/head/solid.js';
import { type OutfitItem, type OutfitView } from './solid.js';
export declare function glassesEyeWindow(view: OutfitView, glasses: GlassesId): string | null;
export declare function frameSlide(view: OutfitView): Point;
export declare function frameOutline(glasses: 'square' | 'mundodev-glasses', cx: number): {
    outer: Point[];
    hole: Point[];
};
export declare function templePoints(glasses: Exclude<GlassesId, 'none'>, s: -1 | 1, shift?: Point): TubePoint[];
export declare function lateralFace(view: OutfitView, s: -1 | 1): Point[];
export declare function templeRegions(view: OutfitView, glasses: Exclude<GlassesId, 'none'>, s: -1 | 1, points?: readonly TubePoint[]): Array<Point[] | null>;
export declare function glassesItems(view: OutfitView, glasses: GlassesId, phones?: boolean): OutfitItem[];
