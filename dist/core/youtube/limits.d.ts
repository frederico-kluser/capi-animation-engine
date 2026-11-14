import type { YouTubePackagingChapter } from '../../contracts/youtube.js';
export declare const YOUTUBE_PACKAGING_LIMITS: {
    readonly titleMax: 100;
    readonly titleSoft: 70;
    readonly titleTarget: 60;
    readonly shortTitleSoft: 50;
    readonly shortTitleTarget: 40;
    readonly descriptionMax: 5000;
    readonly descriptionMaxBytes: 5000;
    readonly descriptionTarget: 1000;
    readonly descriptionHook: 150;
    readonly tagsMax: 500;
    readonly tagMax: 30;
    readonly hashtagsIgnoredAbove: 60;
    readonly hashtagsShown: 3;
    readonly hashtagsMax: 5;
    readonly chaptersMin: 3;
    readonly chapterMinMs: 10000;
    readonly chaptersMax: 12;
    readonly shortMaxMs: 180000;
};
export declare function cleanYouTubeText(text: unknown, keepNewlines?: boolean): string;
export declare function clipText(text: string, max: number): string;
export declare function cleanTag(tag: unknown): string | null;
export declare function tagsLength(tags: readonly string[]): number;
export declare function fitTags(tags: readonly unknown[], max?: number): string[];
export declare function cleanHashtag(raw: unknown): string | null;
export declare function fitHashtags(list: readonly unknown[], max?: number): string[];
export declare function formatTimestamp(ms: number): string;
export declare function parseTimestamp(text: unknown): number | null;
export declare function normalizeChapters(chapters: readonly YouTubePackagingChapter[], durationMs: number, limits?: {
    min?: number;
    minMs?: number;
    max?: number;
}): YouTubePackagingChapter[];
export declare function shiftChapters(chapters: readonly YouTubePackagingChapter[], skip?: {
    atMs: number;
    spanMs: number;
}): YouTubePackagingChapter[];
export declare function chaptersText(chapters: readonly YouTubePackagingChapter[]): string;
export declare function utf8Length(text: string): number;
export declare function clipTextBytes(text: string, maxChars: number, maxBytes: number): string;
export declare function assembleDescription(body: string, chapters: readonly YouTubePackagingChapter[], hashtags: readonly string[], extras?: readonly string[]): string;
export declare function isShortUpload(size: {
    width: number;
    height: number;
}, durationMs: number): boolean;
