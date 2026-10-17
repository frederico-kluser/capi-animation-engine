import type { VisemeId } from './face.js';
export interface ScriptWord {
    index: number;
    text: string;
    core: string;
    lead: string;
    trail: string;
    sentence: number;
    clause: number;
    paragraph: number;
    spoken: string[];
    functional: boolean;
    sentenceEnd: boolean;
    clauseEnd: boolean;
    pauseAfterMs: number;
}
export type PhoneClass = 'vowel' | 'glide' | 'nasal' | 'liquid' | 'tap' | 'fricS' | 'fricW' | 'fricV' | 'aspir' | 'stopU' | 'stopV' | 'affrU' | 'affrV';
export interface Phone {
    ph: string;
    cls: PhoneClass;
    viseme: VisemeId;
    syllable: number;
    stressed: boolean;
    nucleus: boolean;
    reduced?: boolean;
    optional?: boolean;
}
export interface WordPhones {
    word: number;
    phones: Phone[];
    syllables: number;
    stressSyllable: number;
}
export interface PhoneSegment extends Phone {
    startMs: number;
    endMs: number;
    score: number;
}
export interface WordAlignment {
    index: number;
    startMs: number;
    endMs: number;
    phones: PhoneSegment[];
    stressStartMs: number;
    stressEndMs: number;
    confidence: number;
}
export interface PauseSegment {
    startMs: number;
    endMs: number;
    afterWord: number;
}
export interface AlignmentQuality {
    confidence: number;
    syllablesPerSecond: number;
    rateRatio: number;
    speechRatio: number;
    warnings: string[];
}
export interface AlignmentResult {
    words: WordAlignment[];
    pauses: PauseSegment[];
    speechStartMs: number;
    speechEndMs: number;
    durationMs: number;
    quality: AlignmentQuality;
}
export interface WordProsody {
    index: number;
    startMs: number;
    endMs: number;
    stressAtMs: number;
    peakDb: number;
    f0: number;
    f0RangeSt: number;
    pauseAfterMs: number;
    stretch: number;
    prominence: number;
}
