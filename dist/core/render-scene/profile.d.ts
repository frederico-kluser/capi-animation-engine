import { type RasterIdentityInput, type RasterProfile, type SceneFeature, type SceneFontRef } from '../../contracts/render-scene.js';
export declare const NATIVE_RENDERER_VERSION = "capi-native-1";
export declare const RASTER_COLOR_SPACE: 'srgb';
export declare const RASTER_ALPHA: 'premultiplied';
export interface SceneFeatureCapability {
    readonly native: boolean;
    readonly note: string;
}
export declare const SCENE_FEATURE_CAPABILITIES: Readonly<Record<SceneFeature, SceneFeatureCapability>>;
export declare const NATIVE_SCENE_FEATURES: readonly SceneFeature[];
export declare function nativeSupportsSceneFeature(feature: SceneFeature): boolean;
export declare function unsupportedSceneFeatures(features: readonly SceneFeature[]): SceneFeature[];
export declare class RasterProfileError extends Error {
    readonly code: 'invalid_input';
    constructor(message: string);
}
export declare function validateSceneFontRef(font: SceneFontRef): SceneFontRef;
export declare function sceneFontKey(font: SceneFontRef): string;
export declare function normalizeSceneFonts(fonts: readonly SceneFontRef[]): SceneFontRef[];
export declare function sameSceneFont(a: SceneFontRef, b: SceneFontRef): boolean;
export declare function sceneFontDigest(fonts: readonly SceneFontRef[]): string;
export declare function rasterProfileId(rendererVersion: string, fonts: readonly SceneFontRef[]): string;
export interface RasterProfileInput {
    rendererVersion?: string;
    fonts: readonly SceneFontRef[];
}
export declare function rasterProfile(input: RasterProfileInput): RasterProfile;
export declare function rasterProfileHasFont(profile: Pick<RasterProfile, 'fonts'>, font: SceneFontRef): boolean;
export declare function sameRasterProfile(a: RasterProfile, b: RasterProfile): boolean;
export interface RasterIdentityParts {
    artFingerprint: string;
    sceneFingerprint: string;
    profile: Pick<RasterProfile, 'id'>;
    width: number;
    height: number;
    fps: number;
    snapshotHash: string;
}
export declare function rasterIdentityInput(parts: RasterIdentityParts): RasterIdentityInput;
