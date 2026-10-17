import type { CameraTiming } from './compile.js';
export interface CameraTimingWord {
    startMs: number;
    endMs: number;
    stressMs?: number;
    prominence?: number;
    sentence?: number;
    clauseEnd?: boolean;
    sentenceEnd?: boolean;
    functional?: boolean;
    question?: boolean;
}
export declare function cameraTimingFromWords(words: readonly CameraTimingWord[], durationMs: number): CameraTiming;
