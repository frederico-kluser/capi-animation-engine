import type { PodcastSeat } from '../../contracts/podcast.js';
import type { ReviewCaption, ReviewSubtitles, ReviewTimeline, SubtitleCue, SubtitleFormat, SubtitleWord } from '../../contracts/review.js';
export interface SubtitleBuildOptions {
    maxChars: number;
    maxLines: number;
    maxCueMs: number;
    minCueMs: number;
    gapSplitMs: number;
    minGapMs: number;
}
export declare function parseSubtitleTime(text: string): number | null;
export declare function parseSubtitles(text: string, format?: SubtitleFormat, options?: {
    file?: string;
    maxChars?: number;
}): ReviewSubtitles;
type CueLike = Pick<SubtitleCue, 'startMs' | 'endMs' | 'text'> & {
    speaker?: string;
};
export declare function serializeSrt(cues: readonly CueLike[]): string;
export declare function serializeVtt(cues: readonly CueLike[], options?: {
    language?: string;
}): string;
export declare function cuesFromWords(words: readonly SubtitleWord[], options?: Partial<SubtitleBuildOptions>): SubtitleCue[];
export declare function subtitlesFromWords(words: readonly SubtitleWord[], options?: Partial<SubtitleBuildOptions> & {
    language?: string;
    model?: string;
}): ReviewSubtitles;
export declare function cueAt<T extends {
    startMs: number;
    endMs: number;
}>(cues: readonly T[], ms: number): T | undefined;
export declare function cuesToOutput(cues: readonly SubtitleCue[], timeline: Pick<ReviewTimeline, 'segments'>, options?: {
    minPieceMs?: number;
}): ReviewCaption[];
export interface CommentaryWord extends SubtitleWord {
    seat?: PodcastSeat;
    group?: string;
}
export declare function commentaryCaptions(words: readonly CommentaryWord[], options?: Partial<SubtitleBuildOptions> & {
    names?: Partial<Record<PodcastSeat, string>>;
}): ReviewCaption[];
export {};
