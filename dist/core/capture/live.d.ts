import type { CaptureSample, SolvedCaptureFrame } from '../../contracts/capture.js';
export interface LiveCaptureOptions {
    smoothing?: number;
    stillness?: number;
    handHoldMs?: number;
    minConfidence?: number;
}
export declare class LiveCaptureFilter {
    private readonly smoothing;
    private readonly stillness;
    private readonly handHoldMs;
    private readonly minConfidence;
    private readonly channels;
    private readonly stepsState;
    private readonly weights;
    private readonly values;
    private last;
    constructor(options?: LiveCaptureOptions);
    private channel;
    push(frame: SolvedCaptureFrame): CaptureSample;
    sample(): CaptureSample;
    reset(): void;
}
