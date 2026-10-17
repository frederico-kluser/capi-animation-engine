import { type CSSProperties, type ReactElement } from 'react';
import type { CameraBox, CameraFrame, CameraShot } from '../../contracts/camera.js';
import type { CaptionFrame, CaptionTrack } from '../../contracts/captions.js';
import type { VideoProfileId } from '../../contracts/profile.js';
import type { Scenario } from '../../contracts/scenario.js';
import { type CharacterId } from '../../contracts/character.js';
import type { ExpressionInput } from '../../contracts/face.js';
import type { OutfitInput } from '../../contracts/outfit.js';
import { type PoseInput } from '../../contracts/pose.js';
import type { ResolvedAnchorState } from '../../contracts/state.js';
import type { TimelineSpec } from '../../contracts/timeline.js';
import { type CameraHead, type CameraShotLike } from '../../core/camera/frame.js';
import { type ChromaKey } from '../../core/talk/chroma.js';
import { type AnchorProps } from '../../render/Anchor.js';
import { type FrameSize } from '../../render/CameraFrame.js';
export type TalkBackground = {
    kind: 'transparent';
} | {
    kind: 'color';
    color: string;
} | {
    kind: 'studio';
} | {
    kind: 'chroma';
    key?: ChromaKey;
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
export interface TalkLayout {
    width: number;
    height: number;
    scale?: number;
    hAlign?: 'left' | 'center' | 'right';
    vAlign?: 'top' | 'center' | 'bottom';
    offsetX?: number;
    offsetY?: number;
}
export interface AnchorTalkProps {
    timeline: TimelineSpec;
    base?: PoseInput;
    expression?: ExpressionInput;
    seed?: number;
    outfit?: OutfitInput;
    character?: CharacterId;
    durationMs: number;
    fps: number;
    layout: TalkLayout;
    background: TalkBackground;
    audioSrc?: string;
    title?: string;
    camera?: readonly CameraShot[];
    profile?: VideoProfileId;
    captions?: CaptionTrack;
}
export type TalkAspectId = 'native' | '16:9' | '9:16' | '1:1' | '4:5';
export declare const TALK_ASPECTS: Record<TalkAspectId, {
    width: number;
    height: number;
}>;
export interface TalkBox {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare function talkLayoutBox(layout: TalkLayout): TalkBox;
export declare function talkMetadata(props: Pick<AnchorTalkProps, 'durationMs' | 'fps' | 'layout'>): {
    durationInFrames: number;
    fps: number;
    width: number;
    height: number;
};
export declare function talkStudioGradient(box: TalkBox): string;
export declare function talkBackgroundStyle(background: TalkBackground, box: TalkBox): CSSProperties;
export declare function talkImageStyles(background: Extract<TalkBackground, {
    kind: 'image';
}>): {
    image: CSSProperties;
    dim: CSSProperties | null;
};
export declare function talkCameraBase(layout: TalkLayout): CameraBox;
export declare function cameraHeadTop(character: CharacterId | undefined, outfit: OutfitInput | undefined): number | undefined;
export interface TalkCameraOptions {
    headTop?: number | undefined;
    profile?: VideoProfileId | undefined;
    head?: CameraHead | undefined;
}
export declare function talkCameraFrame(camera: readonly CameraShotLike[] | undefined, timeMs: number, layout: TalkLayout, options?: TalkCameraOptions): CameraFrame | null;
export interface TalkCameraScene {
    camera: CameraFrame;
    state?: ResolvedAnchorState;
}
export declare function talkCameraScene(camera: readonly CameraShotLike[] | undefined, timeMs: number, layout: TalkLayout, anchor: TalkAnchorProps, options?: TalkCameraOptions): TalkCameraScene | null;
export declare function talkCaptionFrame(captions: CaptionTrack | undefined, timeMs: number, layout: TalkLayout, request?: {
    camera?: readonly CameraShotLike[] | undefined;
    frame?: CameraFrame | null | undefined;
    headTop?: number | undefined;
    profile?: VideoProfileId | undefined;
}): CaptionFrame | null;
export declare function talkCameraViewBox(camera: readonly CameraShotLike[] | undefined, timeMs: number, layout: TalkLayout, headTop?: number, profile?: VideoProfileId): string | null;
export declare function talkFxTarget(background: Pick<TalkBackground, 'kind'> | undefined): 'frame' | 'content';
export type TalkAnchorProps = Omit<AnchorProps, 'viewBox' | 'view' | 'width' | 'height' | 'idPrefix' | 'state'>;
export interface TalkFrameViewProps {
    camera: CameraFrame;
    anchor: TalkAnchorProps;
    format: FrameSize;
    size?: FrameSize | undefined;
    idPrefix?: string | undefined;
    fxOn?: 'frame' | 'content' | undefined;
    caption?: CaptionFrame | null | undefined;
    state?: ResolvedAnchorState | undefined;
}
export declare function TalkFrameView(props: TalkFrameViewProps): ReactElement;
export interface TalkStillViewProps {
    anchor: TalkAnchorProps;
    layout: TalkLayout;
    size?: FrameSize | undefined;
    idPrefix?: string | undefined;
    caption?: CaptionFrame | null | undefined;
}
export declare function TalkStillView(props: TalkStillViewProps): ReactElement;
export declare function AnchorTalk(props: AnchorTalkProps): ReactElement;
