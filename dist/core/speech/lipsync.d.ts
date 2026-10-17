import type { AlignmentResult } from '../../contracts/talk.js';
import type { VisemeCue } from '../../contracts/timeline.js';
import { type AudioFeatures } from './dsp.js';
export interface LipSyncOptions {
    leadMs?: number;
    gain?: number;
    pauseMs?: number;
    tailMs?: number;
}
export interface LipSyncResult {
    cues: VisemeCue[];
    merged: number;
    levels: {
        p20: number;
        p50: number;
        p95: number;
    };
}
export declare function alignmentToVisemes(alignment: AlignmentResult, features: AudioFeatures, options?: LipSyncOptions): LipSyncResult;
