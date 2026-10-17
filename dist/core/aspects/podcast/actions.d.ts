import type { ActionsAspectValue } from '../../../contracts/aspects.js';
import { type PodcastActionKind, type PodcastSeat } from '../../../contracts/podcast.js';
import { type AspectTurn, type PodcastAspectContext } from './context.js';
import { type AspectParseResult, type PodcastAspectTask } from './shared.js';
export declare const actionNeedMs: (kind: PodcastActionKind) => number;
export declare function actionTargets(ctx: PodcastAspectContext): Record<PodcastSeat, {
    target: number;
    max: number;
}>;
export declare function actionBlockedTurns(ctx: Pick<PodcastAspectContext, 'turns' | 'moments'>): Map<string, string>;
export declare function actionWord(ctx: Pick<PodcastAspectContext, 'turns' | 'durationMs'>, seat: PodcastSeat, turn: AspectTurn, kind: PodcastActionKind): number | undefined;
export declare function buildActionsMessages(ctx: PodcastAspectContext): {
    system: string;
    user: string;
};
export declare function parseActions(content: string, ctx: PodcastAspectContext): AspectParseResult<ActionsAspectValue>;
export declare const ACTION_SHIFT_MAX_MS = 15000;
export declare function scoreActions(value: ActionsAspectValue, ctx: PodcastAspectContext, problems?: readonly string[]): number;
export declare function actionsFallback(ctx: PodcastAspectContext): ActionsAspectValue;
export declare function actionsTask(ctx: PodcastAspectContext, options?: {
    samples?: number;
    note?: string;
}): PodcastAspectTask<ActionsAspectValue>;
