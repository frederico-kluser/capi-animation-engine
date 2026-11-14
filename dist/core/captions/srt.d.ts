import type { CaptionTrack } from '../../contracts/captions.js';
import { type CaptionSourceWord } from './cues.js';
export declare const YOUTUBE_SRT: {
    readonly maxChars: 42;
    readonly maxLines: 2;
    readonly minCueMs: 1000;
    readonly mergeGapMs: 250;
};
export declare function captionsToSrt(track: CaptionTrack): string;
export interface PlatformCue {
    startMs: number;
    endMs: number;
    text: string;
}
export declare function youtubeSrt(cues: readonly PlatformCue[], options?: Partial<typeof YOUTUBE_SRT>): string;
export declare function captionsToYouTubeSrt(words: readonly CaptionSourceWord[]): string;
