import type { CameraShot } from '../../contracts/camera.js';
import type { PodcastSeat } from '../../contracts/podcast.js';
import type { VideoProfileId } from '../../contracts/profile.js';
import type { FrameAspect } from '../set/frame.js';
export interface KeepSpan {
    front: {
        x0: number;
        x1: number;
    };
    all: {
        x0: number;
        x1: number;
    };
}
export interface CameraKeepOptions {
    profile?: VideoProfileId;
    aspect?: FrameAspect;
    keeps: Partial<Record<PodcastSeat, KeepSpan>>;
}
export interface CameraKeepResult<T> {
    shots: readonly T[];
    mediumZoom: number;
    kept: number;
    dropped: number;
}
type Probe = Pick<CameraShot, 'size' | 'zoom'> & Partial<Pick<CameraShot, 'angle' | 'view' | 'move' | 'moveAmount'>>;
interface KeepPlan {
    kind: 'keep' | 'drop' | 'most' | 'none';
    shiftX: number;
}
export declare function keepPlan(shot: Probe, seat: PodcastSeat, span: KeepSpan, options?: Pick<CameraKeepOptions, 'profile' | 'aspect'>): KeepPlan;
export declare function keepInFrame<T extends CameraShot & {
    seat?: PodcastSeat | undefined;
}>(shots: readonly T[], options: CameraKeepOptions): CameraKeepResult<T>;
export {};
