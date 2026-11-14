import type { VideoProfileId } from '../../contracts/profile.js';
import type { ThumbSourceKind } from '../../contracts/thumbs.js';
import { type ThumbMoodId, type YouTubeCategoryId, type YouTubePackagingChapter, type YouTubePackaging } from '../../contracts/youtube.js';
export interface YouTubeBriefLine {
    atMs: number;
    text: string;
    speaker?: string;
}
export interface YouTubeBrief {
    kind: ThumbSourceKind;
    profile: VideoProfileId;
    durationMs: number;
    title?: string;
    topic?: string;
    prompt?: string;
    format?: string;
    lesson?: {
        number: number;
        course: string;
        goal?: string;
    };
    cast: Array<{
        name: string;
        character: string;
    }>;
    lines: YouTubeBriefLine[];
    sources?: Array<{
        title?: string;
        url: string;
    }>;
    reviewed?: {
        title?: string;
        summary?: string;
    };
    code?: string;
    previousTitles?: string[];
}
export type PackagingDraft = Omit<YouTubePackaging, 'version' | 'kind' | 'run' | 'source' | 'model' | 'cost' | 'createdAt'>;
export declare function defaultCategory(kind: ThumbSourceKind): YouTubeCategoryId;
export declare function titleAngles(kind: ThumbSourceKind): Array<'busca' | 'promessa' | 'curiosidade'>;
export declare function briefTranscript(lines: readonly YouTubeBriefLine[], maxChars?: number): string;
export declare function briefText(brief: YouTubeBrief): string;
export declare function buildPackagingMessages(brief: YouTubeBrief): {
    system: string;
    user: string;
};
export declare function cleanPackagingTitle(raw: unknown, max: number): string | undefined;
export declare function cleanThumbLine(raw: unknown): string | undefined;
export declare function snapChapters(raw: unknown, lines: readonly YouTubeBriefLine[], durationMs: number): YouTubePackagingChapter[];
export declare function inferThumbMood(text: string, kind: ThumbSourceKind): ThumbMoodId;
export declare function fallbackScenes(brief: Pick<YouTubeBrief, 'kind' | 'title' | 'topic' | 'prompt' | 'lines'>): string[];
export declare function rankTitles(titles: readonly string[], notes: ReadonlyArray<{
    angle: string;
    why: string;
}>, spoken: string): {
    titles: string[];
    notes: Array<{
        angle: string;
        why: string;
    }>;
    warnings: string[];
};
export declare function parsePackaging(content: string, brief: YouTubeBrief): {
    value: PackagingDraft | null;
    problems: string[];
    fatal: boolean;
};
export declare function keywordsOf(text: string, max?: number): string[];
export declare function stripAccents(text: string): string;
export declare function fallbackPackaging(brief: YouTubeBrief): PackagingDraft;
