import { type ContentLanguageId } from '../../contracts/languages.js';
import type { YouTubePackaging, YouTubePackagingLocalization } from '../../contracts/youtube.js';
export declare function languageName(id: ContentLanguageId): string;
export type PackagingSource = Pick<YouTubePackaging, 'titles' | 'description' | 'chapters' | 'hashtags' | 'tags' | 'pinnedComment' | 'thumbnail' | 'profile' | 'language'> & {
    lesson?: number;
};
export declare function buildPackagingTranslationMessages(source: PackagingSource, targets: readonly ContentLanguageId[]): {
    system: string;
    user: string;
};
export declare function parsePackagingTranslation(content: string, source: PackagingSource, targets: readonly ContentLanguageId[], meta: {
    model?: string;
    now: Date;
}): {
    localizations: Partial<Record<ContentLanguageId, YouTubePackagingLocalization>>;
    problems: string[];
};
export declare const CAPTION_BATCH = 120;
export declare function buildCaptionTranslationMessages(input: {
    texts: readonly string[];
    target: ContentLanguageId;
    source: ContentLanguageId;
    title?: string;
    glossary?: readonly string[];
    before?: readonly string[];
}): {
    system: string;
    user: string;
};
export declare function parseCaptionTranslation(content: string, count: number): {
    lines: string[] | null;
    problem?: string;
};
export declare function captionGlossary(texts: readonly string[], extra?: readonly string[]): string[];
