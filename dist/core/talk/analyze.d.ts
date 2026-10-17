import type { AlignmentResult, ScriptWord, WordPhones, WordProsody } from '../../contracts/talk.js';
import { type AlignOptions } from '../speech/align.js';
import { type AudioFeatures } from '../speech/dsp.js';
import { type SpeechLanguage } from '../speech/g2p.js';
import { type LipSyncOptions, type LipSyncResult } from '../speech/lipsync.js';
export interface SpeechChunk {
    firstWord: number;
    lastWord: number;
    startMs: number;
    endMs: number;
}
export interface AnalyzeSpeechInput {
    text: string;
    samples: Float32Array;
    sampleRate: number;
    language?: SpeechLanguage;
    lipsync?: LipSyncOptions;
    align?: AlignOptions;
    chunks?: readonly SpeechChunk[];
}
export interface SpeechAnalysis {
    language: SpeechLanguage;
    text: string;
    words: ScriptWord[];
    phones: WordPhones[];
    features: AudioFeatures;
    alignment: AlignmentResult;
    lip: LipSyncResult;
    prosody: WordProsody[];
    syllables: number;
}
export declare function analyzeSpeech(input: AnalyzeSpeechInput): SpeechAnalysis;
