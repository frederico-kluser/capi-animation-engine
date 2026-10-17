import type { GesturesAspectValue } from '../../../contracts/aspects.js';
import type { PodcastPlannedGesture, PodcastSeat, PodcastSpec } from '../../../contracts/podcast.js';
import { type PodcastAspectContext } from './context.js';
import { type AspectParseResult, type PodcastAspectTask } from './shared.js';
export declare const HOME_POSES: ReadonlySet<string>;
export declare const HOLD_MAX_MS = 5000;
export declare const HOLD_PROMPT_MS = 4000;
export declare const BIG_POSES: ReadonlySet<string>;
export declare function gestureTargets(ctx: PodcastAspectContext, seat: PodcastSeat): {
    seconds: number;
    words: number;
    energy: number;
    target: number;
    minGap: number;
    wordsPerSecond: number;
};
export declare function buildGesturesMessages(ctx: PodcastAspectContext, seat: PodcastSeat): {
    system: string;
    user: string;
};
export declare function parseGestures(content: string, ctx: PodcastAspectContext, seat: PodcastSeat): AspectParseResult<GesturesAspectValue>;
export declare function scoreGestures(value: GesturesAspectValue, ctx: PodcastAspectContext, problems?: readonly string[]): number;
export declare function heldTooLong(value: Pick<GesturesAspectValue, 'seat' | 'gestures'>, ctx: Pick<PodcastAspectContext, 'turns'>): PodcastPlannedGesture[];
export interface GesturesTaskOptions {
    fallbackSpec?: () => PodcastSpec;
    samples?: number;
    note?: string;
}
export declare function gesturesTask(ctx: PodcastAspectContext, seat: PodcastSeat, options?: GesturesTaskOptions): PodcastAspectTask<GesturesAspectValue>;
export declare function gesturesFallback(ctx: PodcastAspectContext, seat: PodcastSeat, spec?: PodcastSpec): GesturesAspectValue;
