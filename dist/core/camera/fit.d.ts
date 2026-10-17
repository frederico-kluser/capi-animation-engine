import { type CameraAngle, type CameraShot, type ShotSize } from '../../contracts/camera.js';
import type { PodcastSeat } from '../../contracts/podcast.js';
import type { VideoProfileId } from '../../contracts/profile.js';
import type { TimelineSpec } from '../../contracts/timeline.js';
import { type PoseId } from '../../presets/poses.js';
import { type FrameAspect } from '../set/frame.js';
export declare const CAMERA_FIT: {
    readonly priority: 4;
    readonly categories: readonly string[];
    readonly energy: 3;
    readonly minOverlapMs: 300;
};
export interface FitGesture {
    pose: PoseId;
    fromMs: number;
    atMs: number;
    untilMs: number;
    priority?: number;
    label?: string;
    seat?: PodcastSeat;
}
export interface CameraFitOptions {
    profile?: VideoProfileId;
    aspect?: FrameAspect;
    mode?: 'talk' | 'podcast';
    minShotMs?: number;
    sizes?: readonly ShotSize[];
}
export interface CameraFitChange {
    fromMs: number;
    toMs: number;
    pose: PoseId;
    label?: string;
    from: ShotSize;
    to: ShotSize;
    shiftX?: number;
    zoom?: number;
    stilled?: true;
    angleDropped?: CameraAngle;
    fits: boolean;
}
export interface CameraFitResult {
    shots: CameraShot[];
    changes: CameraFitChange[];
    warnings: string[];
}
export declare function gestureMatters(pose: PoseId, priority?: number): boolean;
export declare function shotPeakZoom(shot: Pick<CameraShot, 'zoom' | 'angle' | 'move' | 'moveAmount'>): number;
export declare function shotShowsPose(shot: Pick<CameraShot, 'framing' | 'size' | 'zoom' | 'angle' | 'move' | 'moveAmount'> & Partial<Pick<CameraShot, 'seat' | 'view' | 'shiftX'>>, pose: PoseId, options?: CameraFitOptions): boolean;
export declare function fitCameraToGestures(shots: readonly CameraShot[], gestures: readonly FitGesture[], options?: CameraFitOptions): CameraFitResult;
export declare function timelineGestures(spec: Pick<TimelineSpec, 'tracks'>, durationMs: number, priorityAt?: (arriveMs: number) => {
    priority?: number;
    label?: string;
} | undefined): FitGesture[];
