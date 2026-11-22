export declare const FRAME_SCENE_VERSION = 1;
export interface RasterProfile {
    id: string;
    rendererVersion: string;
    fonts: readonly SceneFontRef[];
    colorSpace: 'srgb';
    alpha: 'premultiplied';
}
export interface SceneFontRef {
    path: string;
    hash: string;
    family: string;
    weight: number;
    style: 'normal' | 'italic';
}
export interface SceneMatrix {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
}
export interface SceneRect {
    x: number;
    y: number;
    width: number;
    height: number;
}
export type SceneColor = string;
export interface SceneSourceRef {
    hash: string;
    path: string;
    kind: 'image' | 'video';
    width?: number;
    height?: number;
    durationMs?: number;
    label?: string;
}
export interface SceneTextShadow {
    outlineEm: number;
    dyEm: number;
    blurEm: number;
    ringSteps: number;
    color: SceneColor;
    opacity: number;
}
export interface SceneTextRun {
    text: string;
    color: SceneColor;
    scale?: number;
    originXPercent?: number;
    weight?: number;
    letterSpacingEm?: number;
}
export interface SceneTextLine {
    runs: readonly SceneTextRun[];
}
export interface SceneTextNode {
    kind: 'text';
    id: string;
    box: SceneRect;
    lines: readonly SceneTextLine[];
    font: SceneFontRef;
    fontSizePx: number;
    lineHeight: number;
    wordGapEm: number;
    originYPercent?: number;
    align: 'center' | 'left' | 'right';
    verticalAlign: 'center' | 'top';
    shadow?: SceneTextShadow;
    uppercase?: boolean;
    speaker?: {
        text: string;
        color: SceneColor;
        sizeEm: number;
        letterSpacingEm: number;
    };
    opacity?: number;
    transform?: SceneMatrix;
}
export interface SceneSvgNode {
    kind: 'svg';
    id: string;
    markup: string;
    viewBox: SceneRect;
    width: number;
    height: number;
    opacity?: number;
    transform?: SceneMatrix;
}
export interface SceneRectNode {
    kind: 'rect';
    id: string;
    rect: SceneRect;
    fill: SceneColor;
    radius?: number;
    opacity?: number;
    transform?: SceneMatrix;
}
export interface SceneImageNode {
    kind: 'image';
    id: string;
    rect: SceneRect;
    source: SceneSourceRef;
    fit: 'cover' | 'contain' | 'fill';
    crop?: SceneRect;
    opacity?: number;
    transform?: SceneMatrix;
}
export interface SceneVideoNode {
    kind: 'video';
    id: string;
    rect: SceneRect;
    source: SceneSourceRef;
    sourceTimeMs: number;
    fit: 'cover' | 'contain' | 'fill';
    crop?: SceneRect;
    atEnd: 'hold' | 'error';
    opacity?: number;
    transform?: SceneMatrix;
}
export type SceneClip = {
    kind: 'rect';
    rect: SceneRect;
} | {
    kind: 'svg';
    markup: string;
    viewBox: SceneRect;
};
export interface SceneTint {
    color: SceneColor;
    opacity: number;
}
export interface SceneGroupNode {
    kind: 'group';
    id: string;
    children: readonly SceneNode[];
    opacity?: number;
    transform?: SceneMatrix;
    clip?: SceneClip;
    blurPx?: number;
    isolate?: boolean;
    blend?: 'normal' | 'plus-lighter';
    tint?: SceneTint;
}
export type SceneNode = SceneGroupNode | SceneSvgNode | SceneTextNode | SceneRectNode | SceneImageNode | SceneVideoNode;
export declare const SCENE_FEATURES: readonly ['group', 'svg', 'text', 'rect', 'image', 'video', 'clip', 'blur', 'group-opacity', 'blend', 'tint-content', 'text-shadow', 'video-hold'];
export type SceneFeature = (typeof SCENE_FEATURES)[number];
export interface FrameScene {
    version: typeof FRAME_SCENE_VERSION;
    jobId: string;
    frameIndex: number;
    fps: number;
    timeMs: number;
    width: number;
    height: number;
    background: SceneColor | null;
    root: SceneGroupNode;
    profile: RasterProfile;
    features: readonly SceneFeature[];
}
export interface PixelPlan {
    jobId: string;
    attemptId: string;
    fence: string;
    snapshotHash: string;
    identity: string;
    profileId: string;
    width: number;
    height: number;
    fps: number;
    frameFrom: number;
    frameTo: number;
    outputDir: string;
    resourcesDir: string;
    renderer: {
        path: string;
        version: string;
    };
}
export interface RenderedFrameReceipt {
    frameIndex: number;
    file: string;
    byteSize: number;
    width: number;
    height: number;
    sha256: string;
    renderMs: number;
}
export interface RenderBatchReceipt {
    version: 1;
    rendererVersion: string;
    profileId: string;
    plan: {
        jobId: string;
        attemptId: string;
        fence: string;
    };
    frames: readonly RenderedFrameReceipt[];
    resources: readonly {
        hash: string;
        path: string;
        kind: 'font' | 'image' | 'video';
    }[];
    elapsedMs: number;
    warnings: readonly string[];
}
export interface CanonicalFrame {
    frameIndex: number;
    width: number;
    height: number;
    format: 'rgba8-premultiplied';
    stride: number;
}
export interface RasterIdentityInput {
    artFingerprint: string;
    sceneFingerprint: string;
    profileId: string;
    width: number;
    height: number;
    fps: number;
    snapshotHash: string;
}
export declare function isSha256Hex(value: unknown): value is string;
export declare function sceneIdentityMatrix(): SceneMatrix;
export declare function sceneMatrixMultiply(a: SceneMatrix, b: SceneMatrix): SceneMatrix;
export declare function sceneTranslate(x: number, y: number): SceneMatrix;
export declare function sceneScale(sx: number, sy: number): SceneMatrix;
export declare function frameTimeMs(frameIndex: number, fps: number): number;
export declare function framePresentationMs(scene: Pick<FrameScene, 'frameIndex' | 'fps'>): number;
export declare function frameCountOf(durationMs: number, fps: number): number;
export declare function sceneFeaturesOf(root: SceneNode): SceneFeature[];
