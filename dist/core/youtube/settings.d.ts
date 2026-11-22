import { type ContentLanguageId } from '../../contracts/languages.js';
import type { ThumbSourceKind } from '../../contracts/thumbs.js';
import { type YouTubeCategoryId, type YouTubeSetting, type YouTubeUploadKit } from '../../contracts/youtube.js';
export interface UploadSettingsInput {
    kind: ThumbSourceKind;
    short: boolean;
    verticalLong?: boolean;
    category: YouTubeCategoryId;
    title: string;
    tagsText: string;
    captions?: string;
    thumbnail?: string;
    thumbnails?: string[];
    durationMs: number;
    chapters: number;
    lesson?: {
        course: string;
        number: number;
    };
    pinnedComment?: string;
    today?: string;
    language?: ContentLanguageId;
    translations?: {
        metadata: string[];
        captions: Record<string, string>;
    };
    dubOf?: {
        language: ContentLanguageId;
        url?: string;
    };
    audioTracks?: Record<string, string>;
}
export declare function youtubeUploadSettings(input: UploadSettingsInput): YouTubeSetting[];
export declare function uploadKitMarkdown(kit: YouTubeUploadKit): string;
