import type { AspectRecordId } from '../../../contracts/aspects.js';
import type { ReviewSubtitles, SubtitleCue } from '../../../contracts/review.js';
export interface ReviewParseResult<T> {
    value: T | null;
    problems: string[];
    notes: string[];
    fatal: boolean;
}
export interface ReviewTaskSpec<T> {
    id: AspectRecordId;
    mode: 'review';
    system: string;
    user: string;
    parse(content: string): ReviewParseResult<T>;
    score(value: T, problems: readonly string[]): number;
    needsRepair?(parsed: {
        value: T | null;
        problems: readonly string[];
        fatal: boolean;
    }): boolean;
    repairUser?(previous: string, problems: readonly string[]): string;
    fallback?(): T | null;
    samples?: number;
    note?: string;
    keepValid?: boolean;
}
export declare const isRecord: (v: unknown) => v is Record<string, unknown>;
export declare const cleanText: (v: unknown, max: number) => string;
export declare function enumValue<V extends string>(value: unknown, list: readonly V[]): V | undefined;
export declare function timeToMs(value: unknown, unit: 's' | 'ms'): number | undefined;
export declare function readTime(item: Record<string, unknown>, names: readonly string[]): number | undefined;
export declare function secondsWritten(item: unknown, names: readonly string[]): number | undefined;
export declare const sec: (ms: number) => string;
export declare function clock(ms: number): string;
export declare function languageLabel(code: string | undefined): string;
export declare const isBrazilian: (code: string | undefined) => boolean;
export declare function languageCode(value: unknown): string | undefined;
export declare function cuesIn(subtitles: ReviewSubtitles | null | undefined, fromMs: number, toMs: number): SubtitleCue[];
export declare function cueLines(cues: readonly SubtitleCue[], originMs?: number, maxChars?: number): string;
export declare function foldTokens(text: string): string[];
export declare function tokenCoverage(quote: string, haystack: string): number;
export declare function copiedFraction(text: string, source: string): number;
export declare function speechAround(subtitles: ReviewSubtitles | null | undefined, fromMs: number, toMs: number): boolean | undefined;
export declare function speechFreeStretches(subtitles: ReviewSubtitles | null | undefined, durationMs: number, minMs?: number): Array<{
    fromMs: number;
    toMs: number;
}>;
export declare function reviewRepairMessage(user: string, previous: string, problems: readonly string[]): string;
