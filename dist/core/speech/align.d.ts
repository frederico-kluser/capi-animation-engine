import type { AlignmentResult, ScriptWord, WordPhones } from '../../contracts/talk.js';
import type { AudioFeatures } from './dsp.js';
export type AcousticClass = 'sil' | 'vowel' | 'glide' | 'nasal' | 'liquid' | 'tap' | 'fricS' | 'fricW' | 'fricV' | 'aspir' | 'clo' | 'cloV' | 'burst';
export declare const ACOUSTIC_CLASSES: readonly AcousticClass[];
export interface AlignOptions {
    calibrationRounds?: number;
    debug?: boolean;
}
export interface AlignDebug {
    frameClass: Uint8Array;
    rounds: number;
    rate: number;
    scores: number[];
}
export interface AlignOutput extends AlignmentResult {
    debug?: AlignDebug;
}
export declare function alignScript(words: readonly ScriptWord[], phones: readonly WordPhones[], features: AudioFeatures, options?: AlignOptions): AlignOutput;
