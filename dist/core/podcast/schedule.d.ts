import type { PodcastSeat, PodcastTurnKind } from '../../contracts/podcast.js';
import type { NormalizedPodcastScript } from './script.js';
export interface TurnTiming {
    durationMs: number;
    speechStartMs: number;
    speechEndMs: number;
    words: ReadonlyArray<{
        startMs: number;
        endMs: number;
    }>;
}
export interface ScheduledTurn {
    id: string;
    speaker: PodcastSeat;
    kind: PodcastTurnKind;
    atMs: number;
    speechStartMs: number;
    speechEndMs: number;
    cutWord?: number;
    endMs?: number;
    how: string;
}
export interface PodcastSchedule {
    turns: ScheduledTurn[];
    durationMs: number;
    warnings: string[];
    decisions: string[];
}
export interface ScheduleOptions {
    leadInMs?: number;
    tailMs?: number;
}
export declare function naturalGap(range: readonly [number, number], u: number, v: number, w: number): number;
export declare function schedulePodcast(script: NormalizedPodcastScript, timings: Readonly<Record<string, TurnTiming>>, options?: ScheduleOptions): PodcastSchedule;
