import { type RefObject } from 'react';
export interface PlayerClock {
    frame: number;
    timeMs: number;
    playing: boolean;
    started: boolean;
    played: boolean;
    ended: boolean;
    seek(ms: number, play?: boolean): void;
    toggle(): void;
    play(): void;
    pause(): void;
}
export interface PlayerClockOptions {
    durationMs: number;
    fps: number;
    source: string;
    frameStep?: number;
}
export declare function usePlayerClock(audioRef: RefObject<HTMLAudioElement | null>, options: PlayerClockOptions): PlayerClock;
