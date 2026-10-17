export declare function hash32(seed: number, index: number): number;
export declare function hashUnit(seed: number, ...indices: number[]): number;
export declare function mulberry32(seed: number): () => number;
export declare function seriesUnit(seed: number, channel: number, bucket: number): number;
