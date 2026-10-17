export declare const LIVE_CLOCK_FPS = 30;
export interface LiveClock {
    frame: number;
    timeMs: number;
    fps: number;
    playing: boolean;
    play(): void;
    pause(): void;
    toggle(): void;
    seek(ms: number): void;
}
export interface LiveClockOptions {
    fps?: number | undefined;
    paused?: boolean | undefined;
}
export declare function useLiveClock(options?: LiveClockOptions): LiveClock;
