import { type CaptionCue, type CaptionStyleId, type CaptionTrack } from '../../contracts/captions.js';
import { type PodcastSeat } from '../../contracts/podcast.js';
import { type VideoProfileId } from '../../contracts/profile.js';
export interface CaptionSourceWord {
    text: string;
    fromMs: number;
    toMs: number;
    seat?: PodcastSeat;
    clauseEnd?: boolean;
    sentenceEnd?: boolean;
    prominence?: number;
}
export interface CaptionCueOptions {
    style: CaptionStyleId;
    profile?: VideoProfileId;
}
export declare function isCaptionStyleId(value: unknown): value is CaptionStyleId;
export declare function resolveCaptionStyle(asked: CaptionStyleId | 'auto' | undefined, profile?: VideoProfileId): CaptionStyleId;
export declare function captionCues(words: readonly CaptionSourceWord[], options: CaptionCueOptions): CaptionCue[];
export declare function captionTrack(words: readonly CaptionSourceWord[], options: CaptionCueOptions): CaptionTrack;
