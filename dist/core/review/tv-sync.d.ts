export declare const TV_DRIFT_JUMP_S = 0.12;
export declare const TV_DRIFT_RATE_S = 0.035;
export interface TvMedia {
    currentTime: number;
    playbackRate: number;
    readonly paused: boolean;
    readonly seeking: boolean;
    readonly ended: boolean;
    readonly duration: number;
    pause(): void;
    play(): Promise<void> | void;
}
export interface TvSyncTarget {
    targetS: number;
    clockPlaying: boolean;
    framePlaying: boolean;
    fps: number;
}
export interface TvSyncActions {
    pause?: true;
    seekTo?: number;
    rate?: number;
    play?: true;
}
export declare function tvSyncStep(media: Readonly<Omit<TvMedia, 'pause' | 'play'>>, target: TvSyncTarget): TvSyncActions;
export declare function tvOnSeeked(media: Readonly<Omit<TvMedia, 'pause' | 'play'>>, target: TvSyncTarget): TvSyncActions;
export declare function applyTvSync(media: TvMedia, actions: TvSyncActions): void;
export declare function mixSeekPlan(t: number, state: {
    audioEndMs: number;
    durationMs: number;
    play: boolean;
    hasAudio?: boolean;
}): 'audio' | 'tail' | 'parked';
export declare function mixEndedPlan(audioEndMs: number, durationMs: number): 'tail' | 'stop';
