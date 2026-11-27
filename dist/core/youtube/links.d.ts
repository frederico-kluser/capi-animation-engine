import { type ContentLanguageId } from '../../contracts/languages.js';
import { type YouTubeCatalogVideo, type YouTubeSourceKind, type YouTubeVideoLink } from '../../contracts/youtube.js';
export type LinkBlockKind = 'study' | 'watch' | 'languages';
export declare const LINK_BLOCK_ORDER: readonly LinkBlockKind[];
export declare const YOUTUBE_LINK_LIMITS: {
    readonly related: 3;
    readonly blockLines: 8;
    readonly minScore: 2;
    readonly titleChars: 70;
};
export interface LinkTarget {
    videoId?: string;
    run?: string;
    title: string;
    text?: string;
    tags?: readonly string[];
    kind?: YouTubeSourceKind;
    format?: 'video' | 'short';
    language: ContentLanguageId;
    course?: {
        id?: string;
        title?: string;
        number?: number;
    };
    dubOf?: string;
}
export declare function topicWords(text: string): Set<string>;
export declare function catalogLanguage(video: Pick<YouTubeCatalogVideo, 'audioLanguage' | 'textLanguage'>): ContentLanguageId;
export declare const isLinkable: (video: Pick<YouTubeCatalogVideo, 'privacy' | 'publishAt'>) => boolean;
export declare const watchUrl: (videoId: string) => string;
export declare const playlistUrl: (playlistId: string) => string;
export declare function subscribeUrl(channel: {
    id?: string;
    customUrl?: string;
} | null | undefined): string | null;
export declare function relatedVideos(target: LinkTarget, catalog: readonly YouTubeCatalogVideo[], max?: number): Array<{
    video: YouTubeCatalogVideo;
    score: number;
    shared: string[];
}>;
export declare function seriesNeighbours(target: LinkTarget, catalog: readonly YouTubeCatalogVideo[]): {
    previous?: YouTubeCatalogVideo;
    next?: YouTubeCatalogVideo;
};
export declare function languageVersions(target: LinkTarget, catalog: readonly YouTubeCatalogVideo[]): YouTubeCatalogVideo[];
export declare function videoLinks(target: LinkTarget, catalog: readonly YouTubeCatalogVideo[], options?: {
    related?: number;
}): YouTubeVideoLink[];
export declare function linkHeading(kind: LinkBlockKind, language: ContentLanguageId): string;
export declare const bareUrl: (url: string) => string;
export declare function studyBlock(url: string | null | undefined, language: ContentLanguageId): string;
export declare function linkLine(link: Pick<YouTubeVideoLink, 'relation' | 'title' | 'url' | 'language'>, language: ContentLanguageId): string;
export declare function linkBlocks(links: readonly YouTubeVideoLink[], language: ContentLanguageId, extras?: {
    playlist?: {
        id: string;
        title?: string;
    };
    subscribe?: string | null;
}): {
    watch: string;
    languages: string;
};
export declare function readLinkBlock(description: string, kind: LinkBlockKind): Array<{
    line: string;
    url: string;
}>;
export declare function upsertLinkBlock(description: string, kind: LinkBlockKind, block: string): {
    description: string;
    changed: boolean;
    fits: boolean;
};
export declare function mergeLinkBlock(description: string, kind: LinkBlockKind, added: readonly YouTubeVideoLink[], language: ContentLanguageId): string;
