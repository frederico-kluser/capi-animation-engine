import type { EasingId } from '../../contracts/timeline.js';
export type EasingFn = (t: number) => number;
export declare const EASINGS: Record<EasingId, EasingFn>;
export declare function getEasing(id?: EasingId): EasingFn;
