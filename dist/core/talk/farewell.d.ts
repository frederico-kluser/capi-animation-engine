import type { ScriptWord } from '../../contracts/talk.js';
import type { PoseId } from '../../presets/poses.js';
export declare const GREETING_WORDS: ReadonlySet<string>;
export declare function farewellStartsAt(words: readonly ScriptWord[], i: number): boolean;
export declare function findFarewell(words: readonly ScriptWord[]): ScriptWord | undefined;
export declare function findGreeting(words: readonly ScriptWord[]): ScriptWord | undefined;
export declare function greetingAt(words: readonly ScriptWord[], index: number): boolean;
export type WaveRole = {
    role: 'farewell';
    word: number;
} | {
    role: 'greeting';
} | {
    role: 'stray';
};
export declare function waveRole(words: readonly ScriptWord[], index: number): WaveRole;
export type WavePose = 'waveRight' | 'waveLeft';
export declare const WAVE_POSES: ReadonlySet<PoseId>;
export declare function waveHandFrom(from: PoseId, preferred?: WavePose): WavePose;
export declare function wavesCleanlyFrom(from: PoseId): boolean;
