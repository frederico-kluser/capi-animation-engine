import { type YouTubeFormat, type YouTubeLicense, type YouTubePrivacy, type YouTubeSourceKind } from '../../contracts/youtube.js';
import type { PlannerEffort } from '../talk/config.js';
import { type YouTubeDefaults } from './metadata.js';
export declare const YOUTUBE_IMAGE_RESOLUTIONS: readonly ['1K', '2K', '4K'];
export type YouTubeImageResolution = (typeof YOUTUBE_IMAGE_RESOLUTIONS)[number];
export interface YouTubeConfig {
    account: string;
    privacy: YouTubePrivacy;
    categories: Record<YouTubeSourceKind, string>;
    language: string;
    tags: string[];
    hashtags: string[];
    footer: string;
    madeForKids: boolean;
    syntheticMedia: boolean;
    license: YouTubeLicense;
    embeddable: boolean;
    publicStatsViewable: boolean;
    notifySubscribers: boolean;
    shortsHashtag: boolean;
    thumbnail: boolean;
    captions: boolean;
    playlists: Partial<Record<YouTubeFormat | YouTubeSourceKind, string>>;
    waitProcessing: boolean;
    processingMinutes: number;
    auto: boolean;
    model: string;
    effort: PlannerEffort;
    maxTokens: number;
    backgrounds: boolean;
    imageModel: string;
    imageResolution: YouTubeImageResolution;
    checkModel: string | null;
    scenes: number;
    channels: Record<string, Partial<Omit<YouTubeConfig, 'account' | 'channels'>>>;
}
export declare const DEFAULT_YOUTUBE_CONFIG: YouTubeConfig;
export declare const YOUTUBE_CONFIG_KEYS: Array<keyof YouTubeConfig>;
export declare const YOUTUBE_CONFIG_LIMITS: {
    readonly processingMinutes: {
        readonly min: 1;
        readonly max: 240;
    };
    readonly footerBytes: 3000;
    readonly maxTokens: {
        readonly min: 1000;
        readonly max: 262144;
    };
    readonly scenes: {
        readonly min: 1;
        readonly max: 2;
    };
};
export declare const PLAYLIST_ID: RegExp;
export declare function validateYouTubeConfig(raw: unknown, origin?: string): {
    config: Partial<YouTubeConfig>;
    errors: string[];
    warnings: string[];
};
export declare function mergeYouTubeConfig(base: YouTubeConfig, ...layers: ReadonlyArray<Partial<YouTubeConfig> | undefined>): YouTubeConfig;
export declare function configForAccount(config: YouTubeConfig, account: string): YouTubeConfig;
export declare function youtubeDefaults(config: YouTubeConfig): YouTubeDefaults;
export declare function playlistFor(config: Pick<YouTubeConfig, 'playlists'>, kind: YouTubeSourceKind, format: YouTubeFormat): string | undefined;
