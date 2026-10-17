import type { SpeechSample, VisemeCue } from '../../contracts/timeline.js';
export declare function sampleSpeech(cues: readonly VisemeCue[], timeMs: number, blendMs?: number): SpeechSample;
