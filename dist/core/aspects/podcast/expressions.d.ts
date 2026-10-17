import type { ExpressionsAspectValue } from '../../../contracts/aspects.js';
import { type PodcastSeat } from '../../../contracts/podcast.js';
import { type PodcastAspectContext } from './context.js';
import { type AspectParseResult, type PodcastAspectTask } from './shared.js';
export declare const MIN_FACE_WORDS = 3;
export declare function expressionTargets(ctx: PodcastAspectContext): Record<PodcastSeat, number>;
export declare function buildExpressionsMessages(ctx: PodcastAspectContext): {
    system: string;
    user: string;
};
export declare function parseExpressions(content: string, ctx: PodcastAspectContext): AspectParseResult<ExpressionsAspectValue>;
export declare function scoreExpressions(value: ExpressionsAspectValue, ctx: PodcastAspectContext, problems?: readonly string[]): number;
export declare function expressionsTask(ctx: PodcastAspectContext, options?: {
    samples?: number;
    note?: string;
}): PodcastAspectTask<ExpressionsAspectValue>;
