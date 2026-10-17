import type { CameraStyle } from './camera.js';
import type { CaptionStyleId } from './captions.js';
export declare const VIDEO_PROFILE_IDS: readonly ['video', 'short'];
export type VideoProfileId = (typeof VIDEO_PROFILE_IDS)[number];
export declare const DEFAULT_VIDEO_PROFILE: VideoProfileId;
export type ProfileAspect = '16:9' | '9:16';
export interface SafeArea {
    top: number;
    right: number;
    bottom: number;
    left: number;
}
export interface ProfileSeconds {
    target: number;
    min: number;
    max: number;
    soft?: number;
    limit?: number;
}
export interface VideoProfile {
    id: VideoProfileId;
    aspect: ProfileAspect;
    size: {
        width: number;
        height: number;
    };
    safe: SafeArea;
    captions: CaptionStyleId;
    cameraStyle?: CameraStyle;
    seconds: ProfileSeconds;
    changeEveryMs: readonly [number, number];
    hookFirst: boolean;
}
