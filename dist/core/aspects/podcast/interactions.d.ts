import type { InteractionsAspectValue } from '../../../contracts/aspects.js';
import { type PodcastSeat } from '../../../contracts/podcast.js';
import { type PodcastAspectContext } from './context.js';
import { type AspectParseResult, type PodcastAspectTask } from './shared.js';
export declare const LISTEN_POSE_MIN_MS = 4000;
export declare const LISTEN_MIN_GAP_MS = 2500;
export declare function interactionTargets(ctx: PodcastAspectContext): Record<PodcastSeat, number>;
export declare function buildInteractionsMessages(ctx: PodcastAspectContext): {
    system: string;
    user: string;
};
export declare function parseInteractions(content: string, ctx: PodcastAspectContext): AspectParseResult<InteractionsAspectValue>;
export declare function scoreInteractions(value: InteractionsAspectValue, ctx: PodcastAspectContext, problems?: readonly string[]): number;
export declare function interactionsTask(ctx: PodcastAspectContext, options?: {
    samples?: number;
    note?: string;
}): PodcastAspectTask<InteractionsAspectValue>;
