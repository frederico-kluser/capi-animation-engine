import type { CameraShot } from './camera.js';
import type { CaptionTrack } from './captions.js';
import type { CharacterId } from './character.js';
import type { ExpressionInput } from './face.js';
import type { OutfitInput } from './outfit.js';
import type { CompiledPodcast, PodcastSeat, PodcastSeatSpec, PodcastSpec } from './podcast.js';
import type { PoseInput } from './pose.js';
import type { VideoProfileId } from './profile.js';
import type { CompiledReview, ReviewMode, ReviewSide } from './review.js';
import type { Scenario } from './scenario.js';
import type { TimelineSpec } from './timeline.js';
export declare const EMBED_FORMAT = "anchor-embed";
export declare const EMBED_DATA_VERSION = 1;
export declare const EMBED_KINDS: readonly ['talk', 'podcast', 'review'];
export type EmbedKind = (typeof EMBED_KINDS)[number];
export interface EmbedMedia {
    src: string;
    type?: string;
    bytes?: number;
    durationMs?: number;
}
export declare const EMBED_BACKGROUND_KINDS: readonly ['transparent', 'color', 'studio', 'image', 'scenario'];
export type EmbedBackgroundKind = (typeof EMBED_BACKGROUND_KINDS)[number];
export type EmbedBackground = {
    kind: 'transparent';
} | {
    kind: 'color';
    color: string;
} | {
    kind: 'studio';
} | {
    kind: 'image';
    src: string;
    fit?: 'cover' | 'contain' | 'fill';
    dim?: number;
    blur?: number;
    position?: string;
} | {
    kind: 'scenario';
    scenario: Scenario;
};
export interface EmbedCaptions {
    track: CaptionTrack;
    on: boolean;
}
export interface EmbedFrame {
    aspect: string;
    width: number;
    height: number;
}
export interface EmbedSource {
    run: string;
    exportedAt?: string;
    generator?: string;
}
export interface EmbedDataBase {
    format: typeof EMBED_FORMAT;
    version: number;
    kind: EmbedKind;
    title?: string;
    lang?: string;
    source?: EmbedSource;
    durationMs: number;
    fps: number;
    profile: VideoProfileId;
    frame: EmbedFrame;
    background: EmbedBackground;
    audio: EmbedMedia;
}
export interface EmbedTalkLayout {
    scale?: number;
    hAlign?: 'left' | 'center' | 'right';
    vAlign?: 'top' | 'center' | 'bottom';
    offsetX?: number;
    offsetY?: number;
}
export interface EmbedTalkData extends EmbedDataBase {
    kind: 'talk';
    character: CharacterId;
    outfit?: OutfitInput;
    seed?: number;
    base?: PoseInput;
    expression?: ExpressionInput;
    timeline: TimelineSpec;
    layout?: EmbedTalkLayout;
    camera?: CameraShot[];
    captions?: EmbedCaptions;
}
export type EmbedPodcastSeat = Omit<PodcastSeatSpec, 'plan' | 'voice' | 'tone' | 'personality'>;
export type EmbedPodcastSpec = Omit<PodcastSpec, 'turns' | 'camera' | 'mix' | 'source' | 'aspects' | 'seats' | 'topic'> & {
    seats: Record<PodcastSeat, EmbedPodcastSeat>;
};
export interface EmbedPodcastData extends EmbedDataBase {
    kind: 'podcast';
    spec: EmbedPodcastSpec;
    compiled: Pick<CompiledPodcast, 'durationMs' | 'seats' | 'shots' | 'profile'>;
    captions?: EmbedCaptions;
}
export interface EmbedReviewVideo extends EmbedMedia {
    fps: number;
    width?: number;
    height?: number;
}
export interface EmbedReviewData extends EmbedDataBase {
    kind: 'review';
    mode: ReviewMode;
    side: ReviewSide;
    compiled: Omit<CompiledReview, 'warnings'>;
    video: EmbedReviewVideo;
    mix?: {
        videoGainDb?: number;
        duckDb?: number;
    };
    subtitles: {
        video: boolean;
        commentary: boolean;
    };
    names?: Partial<Record<PodcastSeat, string>>;
}
export type EmbedData = EmbedTalkData | EmbedPodcastData | EmbedReviewData;
export { ENCRYPTED_MOVEMENT_ALG, ENCRYPTED_MOVEMENT_FORMAT, ENCRYPTED_MOVEMENT_VERSION, type DecryptMovementResult, type EncryptedMovementEnvelope, } from '../core/embed/crypto.js';
export type EmbedTalkInput = EmbedTalkData | import('../core/embed/crypto.js').EncryptedMovementEnvelope;
export declare const EMBED_FILES: {
    readonly data: 'data.json';
    readonly dataScript: 'data.js';
    readonly player: 'anchor-player.js';
    readonly playerTypes: 'anchor-player.d.ts';
    readonly standalone: 'anchor-player.standalone.js';
    readonly componentJsx: 'AnchorEmbed.jsx';
    readonly componentTsx: 'AnchorEmbed.tsx';
    readonly demo: 'index.html';
    readonly readme: 'README.md';
    readonly record: 'embed.json';
};
export declare const EMBED_DATA_GLOBAL = "AnchorEmbedData";
export declare const EMBED_PLAYER_GLOBAL = "AnchorPlayer";
export declare const EMBED_MOUNT_ATTRIBUTE = "data-anchor-player";
export declare const EMBED_RECORD_VERSION = 1;
export interface EmbedRecordFile {
    name: string;
    bytes: number;
    gzip?: number;
    role: string;
}
export interface EmbedRecord {
    version: number;
    kind: EmbedKind;
    run: string;
    createdAt: string;
    profile: VideoProfileId;
    frame: EmbedFrame;
    durationMs: number;
    fps: number;
    background: EmbedBackgroundKind;
    scenario?: {
        id: string;
        name: string;
        kind: string;
    };
    captions: {
        style: string;
        on: boolean;
        cues: number;
    } | {
        style: 'off';
    };
    files: EmbedRecordFile[];
    bytes: number;
    warnings: string[];
}
