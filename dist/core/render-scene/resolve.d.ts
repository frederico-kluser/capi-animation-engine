import { type FrameScene, type RasterProfile, type SceneColor, type SceneFontRef, type SceneRect, type SceneSourceRef, type SceneTextNode } from '../../contracts/render-scene.js';
import type { CameraBox, CameraFrame, CameraView } from '../../contracts/camera.js';
import type { CaptionFrame, CaptionTrack } from '../../contracts/captions.js';
import type { VideoProfileId } from '../../contracts/profile.js';
import type { Scenario, ScenarioBackdrop, ScenarioBackdropPiece, ScenarioWall } from '../../contracts/scenario.js';
import type { AnchorInput, AnchorView, ResolvedAnchorState } from '../../contracts/state.js';
import { type CameraHead, type CameraShotLike } from '../camera/frame.js';
import { type ChromaKey } from '../talk/chroma.js';
export interface TalkSceneLayout {
    width: number;
    height: number;
    scale?: number;
    hAlign?: 'left' | 'center' | 'right';
    vAlign?: 'top' | 'center' | 'bottom';
    offsetX?: number;
    offsetY?: number;
}
export type TalkSceneBackground = {
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
export interface TalkSceneBox {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface TalkCharacterPaint {
    viewBox: string;
    width: number;
    height: number;
    view?: AnchorView;
    state?: ResolvedAnchorState;
    idPrefix: string;
    title?: string;
}
export interface TalkScenarioWallPaint {
    tone: ScenarioWall;
    width: number;
    height: number;
    wallHeight: number;
    idPrefix: string;
}
export interface TalkScenarioDecorPaint {
    piece: ScenarioBackdropPiece;
    natural: {
        width: number;
        height: number;
    };
    idPrefix: string;
}
export interface TalkScenePainters {
    character: (paint: TalkCharacterPaint) => string;
    scenarioWall?: (paint: TalkScenarioWallPaint) => string;
    scenarioDecor?: (paint: TalkScenarioDecorPaint) => string;
}
export interface TalkSceneResources {
    asset?: (relativePath: string) => SceneSourceRef | null;
    backgroundImage?: SceneSourceRef;
    scenario?: {
        resolved: ScenarioBackdrop;
        media?: SceneSourceRef;
        loopMs?: number;
    };
    captionFont?: SceneFontRef;
}
export interface TalkSceneUnsupported {
    feature: string;
    layer: 'background' | 'scenario' | 'character' | 'camera' | 'captions';
    reason: string;
}
export interface TalkFrameScene extends FrameScene {
    readonly unsupported?: readonly TalkSceneUnsupported[];
}
export interface TalkSceneResolveInput {
    jobId: string;
    frameIndex: number;
    fps: number;
    width: number;
    height: number;
    layout: TalkSceneLayout;
    background: TalkSceneBackground;
    anchor: AnchorInput;
    camera?: readonly CameraShotLike[];
    videoProfile?: VideoProfileId;
    captions?: CaptionTrack;
    headTop?: number | null;
    profile: RasterProfile;
    resources: TalkSceneResources;
    painters: TalkScenePainters;
    idPrefix?: string;
    title?: string;
}
export declare function talkLayoutBox(layout: TalkSceneLayout): TalkSceneBox;
export declare function talkCameraBase(layout: TalkSceneLayout): CameraBox;
export declare function talkFxTarget(background: Pick<TalkSceneBackground, 'kind'> | undefined): 'frame' | 'content';
export declare function panelAnchorView(panel: {
    view?: CameraView | undefined;
} | undefined): AnchorView | undefined;
export interface TalkCameraOptions {
    headTop?: number | undefined;
    profile?: VideoProfileId | undefined;
    head?: CameraHead | undefined;
}
export declare function talkCameraFrame(camera: readonly CameraShotLike[] | undefined, timeMs: number, layout: TalkSceneLayout, options?: TalkCameraOptions): CameraFrame | null;
export interface TalkCameraScene {
    camera: CameraFrame;
    state?: ResolvedAnchorState;
}
export declare function talkCameraScene(camera: readonly CameraShotLike[] | undefined, timeMs: number, layout: TalkSceneLayout, anchor: AnchorInput, options?: TalkCameraOptions): TalkCameraScene | null;
export declare function captionAccentColor(seat?: CaptionFrame['seat']): SceneColor;
export declare function captionWordColor(state: CaptionFrame['lines'][number][number]['state'], style: CaptionFrame['style'], accent: SceneColor): SceneColor;
export declare function captionWordGrow(input: {
    text: string;
    index: number;
    count: number;
    strong: boolean;
    style: CaptionFrame['style'];
}): {
    scale: number;
    originX: number;
};
export interface TalkCaptionRequest {
    camera?: readonly CameraShotLike[] | undefined;
    frame?: CameraFrame | null | undefined;
    headTop?: number | null | undefined;
    profile?: VideoProfileId | undefined;
}
export declare function talkCaptionFrame(captions: CaptionTrack | undefined, timeMs: number, layout: TalkSceneLayout, request?: TalkCaptionRequest): CaptionFrame | null;
export declare function captionSceneNode(frame: CaptionFrame, width: number, height: number, font: SceneFontRef, id: string): SceneTextNode | null;
export declare function parseObjectPosition(value: string | undefined): {
    x: number;
    y: number;
} | null;
export declare function imageCropForPosition(input: {
    position: string | undefined;
    fit: 'cover' | 'contain' | 'fill';
    source: Pick<SceneSourceRef, 'width' | 'height'>;
    box: SceneRect;
}): {
    rect: SceneRect;
    fit: 'cover' | 'contain' | 'fill';
    crop?: SceneRect;
} | null;
export declare function studioSvgMarkup(box: TalkSceneBox, width: number, height: number, id: string): string;
export declare function scenarioVignetteSvgMarkup(width: number, height: number, vignette: number, id: string): string;
export declare function scenarioBaseSvgMarkup(paint: string, width: number, height: number, id: string): string | null;
export declare function resolveTalkScene(input: TalkSceneResolveInput): TalkFrameScene;
export declare function sanitizeId(raw: string): string;
