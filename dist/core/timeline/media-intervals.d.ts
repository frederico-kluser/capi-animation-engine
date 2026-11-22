export interface MediaInterval {
    fromMs: number;
    toMs: number;
}
export declare const intervalMs: (interval: MediaInterval) => number;
export declare const totalMs: (intervals: readonly MediaInterval[]) => number;
export declare function mergeIntervals(input: readonly MediaInterval[]): MediaInterval[];
export declare function intersectIntervals(a: readonly MediaInterval[], b: readonly MediaInterval[]): MediaInterval[];
export declare function intersectAll(sets: readonly (readonly MediaInterval[])[]): MediaInterval[];
export declare function subtractIntervals(input: readonly MediaInterval[], removed: readonly MediaInterval[]): MediaInterval[];
export declare function complementIntervals(within: readonly MediaInterval[], holes: readonly MediaInterval[]): MediaInterval[];
export declare function longerThan(intervals: readonly MediaInterval[], minMs?: number): MediaInterval[];
export declare function unexplainedDeadAir(silence: readonly MediaInterval[], noMeaningfulActivity: readonly MediaInterval[], approvedPedagogicalHolds?: readonly MediaInterval[], minMs?: number): MediaInterval[];
export declare function evidenceFrames(interval: MediaInterval, fps: number): number[];
