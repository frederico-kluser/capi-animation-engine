import type { ScriptWord, WordPhones } from '../../contracts/talk.js';
import { type SpeechLanguage } from '../speech/g2p.js';
import { type SpeechAnalysis } from './analyze.js';
import { type Synth } from './synth-speech.js';
import type { Tone } from './tones.js';
export declare const ESTIMATED_SYLLABLES_PER_SECOND = 6.5;
export interface SpeechRate {
    syllablesPerSecond: number;
    source: 'measured' | 'model' | 'estimate';
    model?: string;
}
export declare function speechRate(tone: Pick<Tone, 'id' | 'pace'>, model?: string): SpeechRate;
export interface EstimateSpeechOptions {
    tone?: Pick<Tone, 'pace' | 'energy' | 'mouthGain'>;
    syllablesPerSecond?: number;
    targetSyllablesPerSecond?: number;
    language?: SpeechLanguage;
    seed?: number;
}
export interface EstimatedSpeech {
    analysis: SpeechAnalysis;
    synth: Synth;
    focus: number[];
    syllablesPerSecond: number;
}
export declare function focusWords(words: readonly ScriptWord[], phones: readonly WordPhones[]): number[];
export declare function estimateSpeech(text: string, options?: EstimateSpeechOptions): EstimatedSpeech;
