interface Biquad {
    b0: number;
    b1: number;
    b2: number;
    a1: number;
    a2: number;
}
export declare function butterworth(cutoffHz: number, sampleHz: number): Biquad;
export declare function lowpassZeroPhase(x: readonly number[], cutoffHz: number, sampleHz: number): number[];
export declare function median(list: readonly number[]): number;
export declare function hampel(x: ReadonlyArray<number | null>, half: number, k: number, floor: number): Set<number>;
export declare function unwrapDegrees(x: ReadonlyArray<number | null>): Array<number | null>;
export declare function simplify(t: readonly number[], v: readonly number[], tolerance: number): number[];
export declare function refineForPchip(t: readonly number[], v: readonly number[], tolerance: number, maxRounds?: number): number[];
export declare class OneEuro {
    readonly minCutoff: number;
    readonly beta: number;
    readonly dCutoff: number;
    private x;
    private dx;
    private t;
    constructor(minCutoff: number, beta: number, dCutoff?: number);
    filter(value: number, timeMs: number): number;
    get value(): number | null;
    reset(): void;
}
export declare function backlash(previous: number, target: number, gap: number): number;
export {};
