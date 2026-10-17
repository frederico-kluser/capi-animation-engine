import { type CSSProperties, type ReactElement } from 'react';
import type { CameraBox, CameraFrame, CameraPanel, CameraShot, CameraView } from '../../contracts/camera.js';
import type { CaptionFrame, CaptionStyleId, CaptionTrack } from '../../contracts/captions.js';
import type { VideoProfileId } from '../../contracts/profile.js';
import type { PodcastScene } from '../../contracts/scene.js';
import { type CompiledPodcast, type PodcastAudioClip, type PodcastRenderPrefs, type PodcastSeat, type PodcastShot, type PodcastSpec } from '../../contracts/podcast.js';
import type { CompiledTimeline } from '../../contracts/timeline.js';
import type { ResolvedAnchorState } from '../../contracts/state.js';
import { type CameraFrameOptions } from '../../core/camera/frame.js';
import { type AnchorProps } from '../../render/Anchor.js';
import { talkBackgroundStyle, type TalkAspectId, type TalkBackground } from './AnchorTalk.js';
export type PodcastAspectId = TalkAspectId;
export declare const PODCAST_ASPECTS: Record<PodcastAspectId, {
    width: number;
    height: number;
}>;
export type PodcastBackground = TalkBackground;
export type PodcastTimelines = Record<PodcastSeat, CompiledTimeline>;
export interface AnchorPodcastProps {
    spec: PodcastSpec;
    assetsBase?: string;
    aspect?: PodcastAspectId;
    background?: PodcastBackground;
    profile?: VideoProfileId;
    captions?: CaptionStyleId;
}
export type PodcastAnchorProps = Omit<AnchorProps, 'width' | 'height' | 'state' | 'debug' | 'idPrefix' | 'className' | 'decorative' | 'characterSpec'>;
export interface PodcastPanelView {
    seat: PodcastSeat;
    rect: CameraBox;
    box: CameraBox;
    anchor: PodcastAnchorProps;
    view?: CameraView;
    inset?: boolean;
    state?: ResolvedAnchorState;
}
export interface PodcastFrame {
    timeMs: number;
    aspect: PodcastAspectId;
    shot: PodcastShot;
    seat: PodcastSeat;
    anchor: PodcastAnchorProps;
    camera: CameraFrame;
    panels: PodcastPanelView[];
    under?: PodcastPanelView[];
    profile: VideoProfileId;
    caption?: CaptionFrame;
}
export interface PodcastFrameRequest {
    frame: number;
    fps: number;
    aspect?: PodcastAspectId;
    profile?: VideoProfileId;
    captions?: CaptionTrack | null;
}
export interface PodcastClipPlan {
    fromFrame: number;
    durationInFrames: number;
    fadeOutFrames: number;
    gain: number;
}
export declare function podcastAspectId(spec: PodcastSpec, aspect?: PodcastAspectId, profile?: VideoProfileId): PodcastAspectId;
export declare function podcastDurationMs(spec: PodcastSpec, profile?: VideoProfileId): number;
export declare function podcastMetadata(props: Pick<AnchorPodcastProps, 'spec' | 'aspect' | 'profile'>): {
    durationInFrames: number;
    fps: number;
    width: number;
    height: number;
};
export declare function podcastShotAt(compiled: CompiledPodcast, timeMs: number): PodcastShot;
export declare function podcastSeatTitle(spec: PodcastSpec, seat: PodcastSeat): string;
export declare function podcastAnchorProps(spec: PodcastSpec, compiled: CompiledPodcast, timelines: PodcastTimelines, seat: PodcastSeat, request: {
    frame: number;
    fps: number;
    aspect?: PodcastAspectId;
    profile?: VideoProfileId;
}): PodcastAnchorProps;
export declare function podcastCameraShots(compiled: CompiledPodcast): CameraShot[];
export declare function podcastFrameAt(spec: PodcastSpec, compiled: CompiledPodcast, timelines: PodcastTimelines, request: PodcastFrameRequest): PodcastFrame;
export declare function podcastCaptionTrack(spec: PodcastSpec, compiled: CompiledPodcast, asked?: {
    captions?: CaptionStyleId | undefined;
    profile?: VideoProfileId | undefined;
}): CaptionTrack | null;
export declare function podcastFxTarget(background: Pick<PodcastBackground, 'kind'> | undefined): 'frame' | 'content';
export declare function podcastCameraLook(spec: PodcastSpec, compiled: CompiledPodcast): Pick<CameraFrameOptions, 'drinks' | 'headTops'>;
export declare function podcastSceneImages(scene: PodcastScene | undefined): string[];
export declare function podcastClipPlan(clip: PodcastAudioClip, fps: number): PodcastClipPlan;
export declare function podcastClipVolume(plan: PodcastClipPlan, frame: number): number;
export declare function podcastAssetUrl(src: string, assetsBase?: string): string;
export declare function podcastBackgroundFromPrefs(prefs: PodcastRenderPrefs['background'] | undefined): PodcastBackground | null;
export declare function podcastBackgroundStyle(background: PodcastBackground, size: {
    width: number;
    height: number;
}): ReturnType<typeof talkBackgroundStyle>;
export interface PodcastFrameViewProps {
    frame: PodcastFrame;
    size?: {
        width: number;
        height: number;
    };
    idPrefix?: string;
    assetUrl?: (src: string) => string;
    fxOn?: 'frame' | 'content';
}
export declare function PodcastFrameView(props: PodcastFrameViewProps): ReactElement;
export declare function splitDivider(panels: readonly CameraPanel[], format: {
    width: number;
    height: number;
}, size?: {
    width: number;
    height: number;
}): CSSProperties | null;
export declare function AnchorPodcast(props: AnchorPodcastProps): ReactElement;
