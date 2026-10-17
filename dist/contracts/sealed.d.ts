import type { CameraBox, CameraFx } from './camera.js';
import type { CaptionFrame } from './captions.js';
import type { CharacterId } from './character.js';
import type { EmbedKind } from './embed.js';
import type { ResolvedFace } from './face.js';
import type { Outfit } from './outfit.js';
import type { PodcastSeat } from './podcast.js';
import type { SolvedPose } from './pose.js';
import type { VideoProfileId } from './profile.js';
import type { ReviewFrame, ReviewFrameLayer, ReviewStageLayout } from './review.js';
import type { Scenario, ScenarioBackdrop } from './scenario.js';
import type { ResolvedSet } from './set.js';
export declare const SEALED_FORMAT = "anchor-sealed";
export declare const SEALED_VERSION = 1;
export declare const SEALED_FILES: {
    readonly module: 'anchor-view.js';
    readonly types: 'anchor-view.d.ts';
    readonly standalone: 'anchor-view.standalone.js';
    readonly example: 'Example.jsx';
    readonly demo: 'index.html';
    readonly readme: 'README.md';
    readonly record: 'sealed.json';
    readonly video: 'anchor-view.video.mp4';
};
export declare const SEALED_GLOBAL = "AnchorView";
export declare const SEALED_MOUNT_ATTRIBUTE = "data-anchor-view";
export declare const SEALED_PAYLOAD_TOKEN = "@@ANCHOR-SEALED-PAYLOAD@@";
export declare const SEALED_FORMAT_TOKEN = "@@ANCHOR-SEALED-FORMAT@@";
export interface SealedActor {
    character: CharacterId;
    outfit: Outfit;
    set: ResolvedSet;
    mirror: boolean;
    title?: string;
}
export type SealedStyle = Record<string, string | number>;
export interface SealedBackground {
    style: SealedStyle;
    image?: {
        src: string;
        style: SealedStyle;
        dim?: SealedStyle;
    };
    scenario?: ScenarioBackdrop;
}
export interface SealedSceneBase {
    version: number;
    kind: EmbedKind;
    title: string;
    lang?: string;
    profile: VideoProfileId;
    width: number;
    height: number;
    fps: number;
    frames: number;
    durationMs: number;
    audio: {
        type: string;
        durationMs?: number;
    };
    assets: string[];
    sources: Record<string, number>;
    captions: boolean;
    allowPause?: true;
}
export interface SealedCameraScene extends SealedSceneBase {
    kind: 'talk' | 'podcast';
    actors: SealedActor[];
    background: SealedBackground;
    fx: 'frame' | 'content';
}
export interface SealedReviewScene extends SealedSceneBase {
    kind: 'review';
    layout: ReviewStageLayout;
    actors: Partial<Record<PodcastSeat, SealedActor>>;
    background: {
        kind: 'studio';
    } | {
        kind: 'color';
        color: string;
    } | {
        kind: 'image';
        src: string;
        dim?: number;
    } | {
        kind: 'scenario';
        scenario: Scenario;
    };
    video: {
        file: string;
        type: string;
        fps: number;
        bytes?: number;
        width?: number;
        height?: number;
    };
}
export type SealedScene = SealedCameraScene | SealedReviewScene;
export interface SealedState {
    pose: SolvedPose;
    face: ResolvedFace;
}
export interface SealedPanel extends SealedState {
    actor: number;
    rect: CameraBox;
    view?: [number, number, number, number];
    roll?: number;
    inset?: boolean;
    id: string;
}
export interface SealedSeam {
    horizontal: boolean;
    at: number;
    thick: number;
}
export interface SealedCameraFrame {
    panels: SealedPanel[];
    still?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    under?: SealedPanel[];
    opacity?: number;
    fx?: CameraFx;
    seam?: SealedSeam;
    underSeam?: SealedSeam;
    caption?: CaptionFrame;
}
export type SealedReviewLayer = Omit<ReviewFrameLayer, 'shot'>;
export interface SealedReviewFrame extends Omit<ReviewFrame, 'shot' | 'segment' | 'under' | 'timeMs' | 'videoVolume'> {
    under?: SealedReviewLayer;
    states: Partial<Record<PodcastSeat, SealedState>>;
    underStates?: Partial<Record<PodcastSeat, SealedState>>;
}
export declare const SEALED_RECORD_VERSION = 1;
export interface SealedRecordFile {
    name: string;
    bytes: number;
    gzip?: number;
    role: string;
}
export interface SealedRecord {
    format: typeof SEALED_FORMAT;
    version: number;
    kind: EmbedKind;
    run: string;
    createdAt: string;
    profile: VideoProfileId;
    frame: {
        aspect: string;
        width: number;
        height: number;
    };
    durationMs: number;
    fps: number;
    frames: number;
    captions: boolean;
    allowPause: boolean;
    background: string;
    inside: {
        code: number;
        frames: number;
        scene: number;
        audio: number;
        assets: number;
    };
    audio: {
        type: string;
        bytes: number;
    };
    precision: number | 'exact';
    files: SealedRecordFile[];
    bytes: number;
    warnings: string[];
}
