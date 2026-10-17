import type { CameraBox } from '../../contracts/camera.js';
import { DEFAULT_VIDEO_PROFILE, VIDEO_PROFILE_IDS, type SafeArea, type VideoProfile, type VideoProfileId } from '../../contracts/profile.js';
export declare const VIDEO_PROFILES: Readonly<Record<VideoProfileId, VideoProfile>>;
export declare function isVideoProfileId(value: unknown): value is VideoProfileId;
export declare function resolveProfile(value: unknown): VideoProfile;
export declare function profileOfAspect(aspect: string | {
    width: number;
    height: number;
} | undefined): VideoProfileId;
export declare function safeBox(profile: VideoProfileId | VideoProfile | SafeArea): CameraBox;
export declare function profileSeconds(profile: VideoProfileId, asked?: number): number;
export declare function profileWarnings(profile: VideoProfileId, durationMs: number): string[];
export declare const PROFILE_WRITING: Readonly<Record<VideoProfileId, readonly string[]>>;
export { DEFAULT_VIDEO_PROFILE, VIDEO_PROFILE_IDS };
