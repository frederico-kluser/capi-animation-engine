import type { CaptionSourceWord } from '../captions/cues.js';
export interface TalkCaptionWords {
    words: CaptionSourceWord[];
    note?: string;
}
export declare function talkCaptionWords(alignment: unknown, text: string): TalkCaptionWords;
