import type { ScriptWord, WordPhones } from '../../../contracts/talk.js';
import type { TalkSpeechTiming } from './context.js';
export interface TextTimingOptions {
    syllablesPerSecond: number;
    leadMs?: number;
    tailMs?: number;
}
export declare function textSpeechTiming(words: readonly ScriptWord[], phones: readonly WordPhones[], options: TextTimingOptions): TalkSpeechTiming;
export declare function rateForDuration(words: readonly ScriptWord[], phones: readonly WordPhones[], durationMs: number): number;
