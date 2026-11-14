import type { CaptureCue, CaptureCurves, CaptureGroupId, CaptureSample, CompiledCaptureClip, CompiledCaptureCue, CompiledCaptureCurve } from '../../contracts/capture.js';
export declare function pchipSlopes(t: readonly number[], v: readonly number[]): number[];
export declare function compileCurve(flat: readonly number[]): CompiledCaptureCurve;
export declare function evalCurve(curve: CompiledCaptureCurve, time: number): number;
export declare function stepAt<T>(steps: ReadonlyArray<readonly [number, T]>, time: number): T | undefined;
export interface CurvesCheck {
    curves?: CaptureCurves;
    errors: string[];
    warnings: string[];
}
export declare function parseCaptureCurves(raw: unknown, where?: string): CurvesCheck;
export declare function compileCaptureClip(clip: CaptureCurves): CompiledCaptureClip;
export declare function sampleCaptureClip(clip: CompiledCaptureClip, localMs: number, groups?: readonly CaptureGroupId[], weight?: number): CaptureSample;
export declare function compileCaptureCue(cue: CaptureCue, label: string, fail: (message: string) => void): CompiledCaptureCue | null;
export declare function captureEnvelope(cue: CompiledCaptureCue, time: number): number;
export declare function sampleCaptureCues(cues: readonly CompiledCaptureCue[], time: number): CaptureSample[];
