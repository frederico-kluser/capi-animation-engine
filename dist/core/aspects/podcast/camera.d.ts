import type { CameraAspectValue } from '../../../contracts/aspects.js';
import { type CameraIntent } from '../../../contracts/camera.js';
import { type CameraShape, type CameraVocabulary } from '../../../presets/catalog/camera.js';
import { type PodcastAspectContext } from './context.js';
import { type AspectParseResult, type PodcastAspectTask } from './shared.js';
export type CameraBudgetCategory = 'emphasis' | 'punchline' | 'establish' | 'split' | 'reactions' | 'other';
type IntentLook = Pick<CameraIntent, 'intent' | 'framing' | 'size' | 'move' | 'angle' | 'transition'>;
export declare function effectiveShot(i: IntentLook): CameraShape;
export declare function cameraCategory(i: IntentLook): CameraBudgetCategory;
export declare function cameraVocabularyOf(ctx: Pick<PodcastAspectContext, 'camera'> & Pick<Partial<PodcastAspectContext>, 'profile' | 'review'>): CameraVocabulary;
export declare function cameraTarget(ctx: PodcastAspectContext): number;
export declare function overVideoTurns(ctx: Pick<PodcastAspectContext, 'review'>): ReadonlySet<string>;
export declare function cameraShapeText(vocabulary: CameraVocabulary): string;
export declare function buildCameraMessages(ctx: PodcastAspectContext): {
    system: string;
    user: string;
};
export declare function parseCamera(content: string, ctx: PodcastAspectContext): AspectParseResult<CameraAspectValue>;
export declare function snapTurns(ctx: Pick<PodcastAspectContext, 'moments'>): ReadonlySet<string> | undefined;
export declare function budgetOverflow(intents: readonly CameraIntent[], ctx: PodcastAspectContext): Record<'emphasis' | 'punchline' | 'establish' | 'split', number>;
export declare function scoreCamera(value: CameraAspectValue, ctx: PodcastAspectContext, problems?: readonly string[]): number;
export declare function cameraTask(ctx: PodcastAspectContext, options?: {
    samples?: number;
    note?: string;
}): PodcastAspectTask<CameraAspectValue>;
export {};
