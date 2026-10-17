export interface PickSeedOptions {
    preferred?: number;
    tries?: number;
    beforeMs?: number;
    afterMs?: number;
}
export interface PickedSeed {
    seed: number;
    clashes: number;
}
export declare function countBlinkClashes(seed: number, moments: readonly number[], beforeMs?: number, afterMs?: number): number;
export declare function pickSeed(moments: readonly number[], options?: PickSeedOptions): PickedSeed;
