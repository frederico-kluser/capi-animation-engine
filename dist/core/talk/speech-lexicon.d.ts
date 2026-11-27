import type { SpeechLanguage } from '../speech/g2p.js';
export interface LexiconEntry {
    term: string;
    say: string;
    note: string;
}
export declare const PT_CODE_LEXICON: readonly LexiconEntry[];
export declare const lexiconApplies: (language: SpeechLanguage | string | undefined) => boolean;
export declare function ttsSpeechText(text: string, language: SpeechLanguage | string | undefined, lexicon?: readonly LexiconEntry[]): string;
export declare function lexiconHits(text: string, lexicon?: readonly LexiconEntry[]): string[];
