import type { ScriptWord, WordPhones } from '../../contracts/talk.js';
export type SpeechLanguage = 'pt-BR' | 'pt-PT' | 'generic';
export declare function detectLanguage(text: string): SpeechLanguage;
export declare function scriptPhones(words: readonly ScriptWord[], language?: SpeechLanguage): WordPhones[];
