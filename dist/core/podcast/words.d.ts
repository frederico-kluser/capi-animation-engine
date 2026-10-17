import type { PodcastWordRef } from '../../contracts/podcast.js';
import type { ScriptWord } from '../../contracts/talk.js';
export declare function foldWord(text: string): string;
export declare function turnWords(text: string): {
    text: string;
    words: ScriptWord[];
};
export declare function listWords(words: readonly ScriptWord[], max?: number): string;
export type WordRefResult = {
    ok: true;
    index: number;
} | {
    ok: false;
    error: string;
};
export declare function resolveWordRef(words: readonly ScriptWord[], ref: unknown, pick?: 'first' | 'last', where?: string): WordRefResult;
export declare function isWordRef(value: unknown): value is PodcastWordRef;
