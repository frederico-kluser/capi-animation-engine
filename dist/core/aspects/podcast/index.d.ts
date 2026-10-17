import { type PodcastAspectId } from '../../../contracts/aspects.js';
import type { PodcastSpec } from '../../../contracts/podcast.js';
import type { NormalizedPodcastScript } from '../../podcast/script.js';
import type { PodcastAspectContext } from './context.js';
import type { PodcastAspectTask } from './shared.js';
export * from './actions.js';
export * from './camera.js';
export * from './context.js';
export * from './expressions.js';
export * from './gestures.js';
export * from './interactions.js';
export * from './shared.js';
export * from './writer.js';
export declare function parseAspectList(value: string | undefined): {
    ids: PodcastAspectId[];
    unknown: string[];
};
export interface PodcastAspectTaskOptions {
    samples?: number;
    notes?: Partial<Record<PodcastAspectId, string>>;
    fallbackSpec?: () => PodcastSpec;
}
export declare function podcastAspectTasks(ctx: PodcastAspectContext, ids: readonly PodcastAspectId[], options?: PodcastAspectTaskOptions): PodcastAspectTask<unknown>[];
export declare function estimatedPodcastSpec(script: NormalizedPodcastScript, options?: {
    model?: string;
}): PodcastSpec;
