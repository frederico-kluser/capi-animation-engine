export declare function resample(input: Float32Array, fromRate: number, toRate: number): Float32Array;
export declare function pcm16ToMono(bytes: Uint8Array, channels?: number): Float32Array;
export declare function pcmFormatOf(contentType: string | null | undefined, fallback?: {
    rate: number;
    channels: number;
}): {
    rate: number;
    channels: number;
};
