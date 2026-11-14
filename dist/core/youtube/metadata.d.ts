import { type YouTubeFormat, type YouTubeLicense, type YouTubeMetadata, type YouTubePrivacy, type YouTubeSourceKind } from '../../contracts/youtube.js';
export declare function utf8Bytes(text: string): number;
export declare function cleanText(text: string): string;
export declare function clipChars(text: string, max: number): string;
export declare function cleanTitle(raw: string): string;
export declare function clipBytes(text: string, maxBytes: number): string;
export declare function cleanDescription(raw: string): string;
export declare const tagCost: (tag: string) => number;
export declare function tagsCost(tags: readonly string[]): number;
export declare function normalizeTags(tags: readonly string[]): {
    tags: string[];
    dropped: string[];
};
export declare function hashtagsIn(text: string): string[];
export declare function toHashtag(text: string): string;
export interface YouTubeVideoShape {
    width: number;
    height: number;
    durationSec: number;
}
export declare function youtubeFormatOf(shape: YouTubeVideoShape): {
    format: YouTubeFormat;
    note?: string;
};
export declare function formatClock(seconds: number): string;
export interface YouTubeChapter {
    atSec: number;
    title: string;
}
export declare function parseClock(text: string): number | null;
export declare function parseChapters(description: string): YouTubeChapter[];
export declare function checkChapters(chapters: readonly YouTubeChapter[], durationSec?: number | null): string[];
export interface YouTubeDefaults {
    privacy: YouTubePrivacy;
    categories: Readonly<Record<YouTubeSourceKind, string>>;
    language: string;
    tags: readonly string[];
    hashtags: readonly string[];
    footer: string;
    madeForKids: boolean;
    syntheticMedia: boolean;
    license: YouTubeLicense;
    embeddable: boolean;
    publicStatsViewable: boolean;
    notifySubscribers: boolean;
    shortsHashtag: boolean;
}
export interface YouTubeVideoFacts {
    kind: YouTubeSourceKind;
    format: YouTubeFormat;
    title: string;
    durationSec: number | null;
    summary?: string;
    transcript?: string;
    sources?: ReadonlyArray<{
        title: string;
        url: string;
    }>;
    course?: {
        title?: string;
        number?: number | null;
    } | null;
}
export declare function transcriptLead(transcript: string, maxChars?: number): string;
export declare function lessonTitle(title: string, course: YouTubeVideoFacts['course']): string;
export declare function defaultMetadata(facts: YouTubeVideoFacts, defaults: YouTubeDefaults): YouTubeMetadata;
export declare function readMetadataPatch(raw: unknown): {
    patch: Partial<YouTubeMetadata>;
    problems: string[];
};
export declare function mergeMetadata(base: YouTubeMetadata, ...layers: ReadonlyArray<Partial<YouTubeMetadata> | undefined>): YouTubeMetadata;
export declare function normalizeMetadata(meta: YouTubeMetadata): YouTubeMetadata;
export interface YouTubeCheckContext {
    nowMs?: number;
    durationSec?: number | null;
    format?: YouTubeFormat;
}
export declare function checkMetadata(meta: YouTubeMetadata, context?: YouTubeCheckContext): {
    errors: string[];
    warnings: string[];
};
export declare function videoResource(meta: YouTubeMetadata): {
    snippet: Record<string, unknown>;
    status: Record<string, unknown>;
};
export declare function youtubeUrls(videoId: string, format: YouTubeFormat): {
    url: string;
    watchUrl: string;
    studioUrl: string;
};
