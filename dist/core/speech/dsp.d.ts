export declare function fft(re: Float64Array, im: Float64Array): void;
export declare function percentile(values: ArrayLike<number>, p: number): number;
export declare function medianFilter(values: Float32Array, size: number): Float32Array;
export interface AudioFeatures {
    sampleRate: number;
    hopMs: number;
    frames: number;
    durationMs: number;
    db: Float32Array;
    voicing: Float32Array;
    f0: Float32Array;
    hfr: Float32Array;
    lfr: Float32Array;
    zcr: Float32Array;
    flux: Float32Array;
    change: Float32Array;
    refDb: number;
    floorDb: number;
}
export interface AnalyzeOptions {
    hopMs?: number;
}
export declare function analyzeAudio(samples: Float32Array, sampleRate: number, options?: AnalyzeOptions): AudioFeatures;
export interface WavData {
    sampleRate: number;
    channels: number;
    samples: Float32Array;
}
export interface WavHeader {
    format: number;
    channels: number;
    sampleRate: number;
    bits: number;
    dataStart: number;
    dataLength: number;
    durationMs: number;
    supported: boolean;
}
export declare function readWavHeader(bytes: Uint8Array): WavHeader;
export declare function parseWav(bytes: Uint8Array): WavData;
export declare function encodeWav(samples: Float32Array, sampleRate: number): Uint8Array;
