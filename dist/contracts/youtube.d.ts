import type { VideoProfileId } from './profile.js';
export declare const YOUTUBE_PRIVACY: readonly ['private', 'unlisted', 'public'];
export type YouTubePrivacy = (typeof YOUTUBE_PRIVACY)[number];
export declare const YOUTUBE_PRIVACY_LABELS: Readonly<Record<YouTubePrivacy, string>>;
export declare const YOUTUBE_LICENSES: readonly ['youtube', 'creativeCommon'];
export type YouTubeLicense = (typeof YOUTUBE_LICENSES)[number];
export declare const YOUTUBE_LEGAL: {
    readonly terms: 'https://www.youtube.com/t/terms';
    readonly privacy: 'https://policies.google.com/privacy';
    readonly permissions: 'https://myaccount.google.com/permissions';
};
export declare const YOUTUBE_FORMATS: readonly ['video', 'short'];
export type YouTubeFormat = (typeof YOUTUBE_FORMATS)[number];
export declare const YOUTUBE_SOURCE_KINDS: readonly ['talk', 'podcast', 'review', 'lesson'];
export type YouTubeSourceKind = (typeof YOUTUBE_SOURCE_KINDS)[number];
export declare const YOUTUBE_CATEGORIES: Readonly<Record<string, string>>;
export declare const YOUTUBE_LIMITS: {
    readonly titleChars: 100;
    readonly descriptionBytes: 5000;
    readonly tagsChars: 500;
    readonly shortMaxSeconds: 180;
    readonly shortMarginSeconds: 2;
    readonly longUploadSeconds: number;
    readonly thumbnailBytes: number;
    readonly hashtags: 60;
    readonly chapterMinSeconds: 10;
    readonly chapterMinCount: 3;
};
export declare const YOUTUBE_QUOTA: {
    readonly dailyUnits: 10000;
    readonly dailyUploads: 100;
    readonly costs: {
        readonly 'videos.insert': 1;
        readonly 'thumbnails.set': 50;
        readonly 'captions.insert': 400;
        readonly 'captions.list': 50;
        readonly 'playlistItems.insert': 50;
        readonly 'videos.update': 50;
        readonly 'videos.list': 1;
        readonly 'channels.list': 1;
        readonly 'playlists.list': 1;
        readonly 'videoCategories.list': 1;
    };
};
export type YouTubeApiMethod = keyof typeof YOUTUBE_QUOTA.costs;
export interface YouTubeMetadata {
    title: string;
    description: string;
    tags: string[];
    categoryId: string;
    defaultLanguage: string;
    defaultAudioLanguage: string;
    privacy: YouTubePrivacy;
    publishAt?: string;
    madeForKids: boolean;
    syntheticMedia: boolean;
    license: YouTubeLicense;
    embeddable: boolean;
    publicStatsViewable: boolean;
    notifySubscribers: boolean;
}
export interface YouTubePublishOptions {
    thumbnail: boolean;
    captions: boolean;
    playlistId?: string;
}
export interface YouTubeDraft {
    version: 1;
    kind: 'capi-youtube-draft';
    metadata: Partial<YouTubeMetadata>;
    options?: Partial<YouTubePublishOptions>;
    short?: Partial<Pick<YouTubeMetadata, 'title' | 'description' | 'tags'>>;
    updatedAt: string;
}
export interface YouTubeStepOutcome {
    status: 'done' | 'skipped' | 'failed' | 'pending';
    reason?: string;
    file?: string;
    id?: string;
}
export interface YouTubeChannel {
    id: string;
    title: string;
    customUrl?: string;
    thumbnail?: string;
}
export interface YouTubePublication {
    version: 1;
    kind: 'capi-youtube';
    run: string;
    file: string;
    name: string;
    format: YouTubeFormat;
    videoId: string;
    url: string;
    studioUrl: string;
    channel: YouTubeChannel | null;
    uploadedAt: string;
    metadata: YouTubeMetadata;
    privacy: YouTubePrivacy;
    uploadStatus?: string;
    problem?: string;
    thumbnail: YouTubeStepOutcome;
    captions: YouTubeStepOutcome;
    playlist: YouTubeStepOutcome;
    warnings: string[];
    elapsedMs: number;
    bytes: number;
    quota: number;
    replaces?: string;
}
export interface YouTubeUploadProgress {
    sent: number;
    total: number;
    rate?: number;
}
export declare const YOUTUBE_PUBLISH_STAGES: readonly ['prepare', 'render', 'upload', 'thumbnail', 'captions', 'playlist', 'processing', 'record'];
export type YouTubePublishStage = (typeof YOUTUBE_PUBLISH_STAGES)[number];
export declare const YOUTUBE_STAGE_LABELS: Readonly<Record<YouTubePublishStage, string>>;
export type YouTubePublishEvent = {
    type: 'event';
    stage: YouTubePublishStage;
    status: 'start' | 'info' | 'warn' | 'done';
    message: string;
    elapsedMs: number;
    progress?: YouTubeUploadProgress;
} | {
    type: 'result';
    publication: YouTubePublication;
    record: string;
} | {
    type: 'error';
    message: string;
    stage?: YouTubePublishStage;
};
export type YouTubeCategoryId = 27 | 28 | 24 | 22 | 25;
export declare const YOUTUBE_CATEGORY_IDS: readonly [27, 28, 24, 22, 25];
export declare const THUMB_MOOD_IDS: readonly ['shock', 'excited', 'question', 'warning', 'teach', 'approve', 'secret', 'versus'];
export type ThumbMoodId = (typeof THUMB_MOOD_IDS)[number];
export interface YouTubeThumbnailText {
    lines: string[];
    highlight?: string;
    question?: string;
    number?: {
        value: string;
        label: string;
    };
    versus?: [string, string];
    keyword?: string;
    mood: ThumbMoodId;
    scenes: string[];
}
export interface YouTubePackagingChapter {
    atMs: number;
    title: string;
}
export interface YouTubePackaging {
    version: 1;
    kind: 'capi-youtube-packaging';
    run: string;
    source: 'llm' | 'fallback';
    model?: string;
    cost?: number;
    createdAt: string;
    language: 'pt-BR';
    profile: VideoProfileId;
    durationMs: number;
    titles: string[];
    titleNotes: Array<{
        angle: string;
        why: string;
    }>;
    description: string;
    tags: string[];
    hashtags: string[];
    chapters: YouTubePackagingChapter[];
    category: YouTubeCategoryId;
    pinnedComment?: string;
    thumbnail: YouTubeThumbnailText;
    warnings: string[];
}
export interface YouTubeSetting {
    id: string;
    section: string;
    field: string;
    value: string;
    why: string;
    level: 'required' | 'recommended' | 'optional';
    api?: string;
}
export interface YouTubeUploadKit {
    version: 1;
    kind: 'capi-youtube-upload';
    run: string;
    name: string;
    createdAt: string;
    profile: VideoProfileId;
    short: boolean;
    durationMs: number;
    files: {
        video: string[];
        thumbnail?: string;
        thumbnails?: string[];
        captions?: string;
    };
    title: string;
    titles: string[];
    titleNotes: Array<{
        angle: string;
        why: string;
    }>;
    description: string;
    tags: string[];
    tagsText: string;
    hashtags: string[];
    chapters: YouTubePackagingChapter[];
    category: YouTubeCategoryId;
    pinnedComment?: string;
    settings: YouTubeSetting[];
    packaging: 'llm' | 'fallback';
    warnings: string[];
}
