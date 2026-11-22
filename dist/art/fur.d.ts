import type { HatId } from '../contracts/outfit.js';
import { type Point } from '../contracts/pose.js';
import { type OutfitItem, type OutfitView } from './solid.js';
export type FurPoint = readonly [number, number];
export interface FurTone {
    base: string;
    shade: string;
    edge: string;
    shine?: string;
}
export declare function tuftRun(points: readonly FurPoint[], center: FurPoint, map: (p: FurPoint) => Point, bulge?: number, hollow?: number): string;
export declare function furStrand(a: FurPoint, b: FurPoint, center: FurPoint, map: (p: FurPoint) => Point, k?: number): string;
export interface ManeSpec {
    back: readonly FurPoint[];
    backCapped: readonly FurPoint[];
    hairline: readonly FurPoint[];
    side: readonly FurPoint[];
    jitter: readonly number[];
    waves?: {
        bulge: number;
        hollow: number;
    };
    nape?: boolean;
    style?: 'tufts' | 'sleek';
    shine?: number;
    part?: number;
    halo?: number;
    crown?: readonly FurPoint[];
    fuzz?: number;
}
export declare function maneItems(view: OutfitView, spec: ManeSpec, tone: FurTone, hat: HatId): OutfitItem[];
