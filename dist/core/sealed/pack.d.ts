export declare const SEALED_PACK: {
    readonly version: 1;
    readonly bits: 13;
    readonly minExp: 4;
    readonly maxExp: 14;
    readonly decimals: 4;
};
export type Packable = null | undefined | boolean | number | string | readonly Packable[] | {
    readonly [key: string]: Packable;
};
export interface PackOptions {
    deflate: (bytes: Uint8Array) => Uint8Array;
    bits?: number;
    exact?: boolean;
    renameKey?: (key: string) => string;
}
export interface PackStats {
    frames: number;
    nodes: number;
    columns: number;
    tagColumns: number;
    values: number;
    valueBytes: number;
    rawBytes: number;
    bytes: number;
}
export declare function packFrames(frames: readonly Packable[], options: PackOptions, stats?: Partial<PackStats>): Uint8Array;
export interface FrameReader {
    readonly count: number;
    at(index: number): Packable;
}
export declare function unpackFrames(bytes: Uint8Array): FrameReader;
