import { type ContentLanguageId } from '../../contracts/languages.js';
import { type YouTubeLocalizedMetadata, type YouTubeMetadata, type YouTubePackaging, type YouTubePackagingChapter, type YouTubeVideoLink } from '../../contracts/youtube.js';
export interface ExportShape {
    format: 'video' | 'short';
    durationMs: number;
    skip?: {
        atMs: number;
        spanMs: number;
    };
    chapters?: readonly YouTubePackagingChapter[];
}
export interface PublishedExtras {
    links?: readonly YouTubeVideoLink[];
    playlist?: {
        id: string;
        title?: string;
    };
    subscribe?: string | null;
    study?: string | null;
    footer?: string;
    channelHashtags?: readonly string[];
    channelTags?: readonly string[];
    shortsHashtag?: boolean;
}
export declare function exportChapters(chapters: readonly YouTubePackagingChapter[], shape: ExportShape): YouTubePackagingChapter[];
export declare function publishedHashtags(own: readonly string[], channel: readonly string[], options: {
    short: boolean;
    shortsHashtag?: boolean;
}): string[];
export declare function publishedDescription(input: {
    body: string;
    lead?: readonly string[];
    blocks?: readonly string[];
    chapters?: readonly YouTubePackagingChapter[];
    language?: ContentLanguageId;
    footer?: string;
    hashtags?: readonly string[];
}): string;
export declare function packagingTitle(titles: readonly string[], format: 'video' | 'short'): string;
export declare function packagingMetadataPatch(packaging: Pick<YouTubePackaging, 'titles' | 'description' | 'chapters' | 'tags' | 'hashtags' | 'category' | 'language'>, shape: ExportShape, extras?: PublishedExtras): Pick<YouTubeMetadata, 'title' | 'description' | 'tags' | 'categoryId' | 'defaultLanguage' | 'defaultAudioLanguage'>;
export declare function packagingLocalizations(packaging: Pick<YouTubePackaging, 'chapters' | 'language' | 'localizations'>, languages: readonly string[], shape: ExportShape, extras?: PublishedExtras): {
    localizations: Record<string, YouTubeLocalizedMetadata>;
    missing: ContentLanguageId[];
};
