import { type TvMedia, type TvSyncActions, type TvSyncTarget } from '../review/tv-sync.js';
export interface BackdropClock {
    frame: number;
    fps: number;
    playing: boolean;
}
export interface BackdropSyncTarget extends TvSyncTarget {
    loopS: number;
}
export declare function backdropSyncTarget(clock: BackdropClock, media: {
    durationMs?: number | undefined;
    fps?: number | undefined;
}, fileDurationS?: number): BackdropSyncTarget;
export declare function loopDrift(currentS: number, targetS: number, loopS: number): number;
export declare function backdropSyncStep(media: Readonly<Omit<TvMedia, 'pause' | 'play'>>, target: BackdropSyncTarget): TvSyncActions;
export declare function backdropOnSeeked(media: Readonly<Omit<TvMedia, 'pause' | 'play'>>, target: BackdropSyncTarget): TvSyncActions;
