export declare const SEALED_CLOCK: {
    readonly decodeRate: 48000;
    readonly restartWindowMs: 20;
    readonly blockedMs: 1500;
};
export interface SealedClock {
    frame: number;
    playing: boolean;
    loaded: boolean;
    played: boolean;
    ended: boolean;
    error: boolean;
    soundMs: number | null;
    play(): void;
    pause(): void;
}
export interface SealedClockOptions {
    audio: Uint8Array | null;
    durationMs: number;
    fps: number;
    frames: number;
    posterMs?: number | undefined;
    onPlay?: (() => void) | undefined;
    onEnded?: (() => void) | undefined;
}
export declare function useSealedClock(options: SealedClockOptions): SealedClock;
