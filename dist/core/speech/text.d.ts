import type { ScriptWord } from '../../contracts/talk.js';
export declare function cardinalPt(value: number): string;
export declare function isFunctionalWord(word: string): boolean;
export declare function normalizeSpeechText(text: string): string;
export declare function tokenizeScript(text: string): ScriptWord[];
export declare function chunkWords(words: readonly ScriptWord[], maxChars: number): [number, number][];
