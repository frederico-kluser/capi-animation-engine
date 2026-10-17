import type { CatalogDetail } from '../../contracts/catalog.js';
import type { ProfileAspect } from '../../contracts/profile.js';
import type { ScriptWord, WordProsody } from '../../contracts/talk.js';
import type { PoseId } from '../../presets/poses.js';
import type { Tone } from './tones.js';
export { PLANNER_POSES } from './planner-poses.js';
export interface DescribeCatalogOptions {
    detail?: CatalogDetail;
    aspects?: readonly ProfileAspect[];
}
export declare function describeCatalog(poses?: readonly PoseId[], options?: DescribeCatalogOptions): string;
export declare function estimateSpeechMs(words: readonly ScriptWord[], syllables: number, syllablesPerSecond?: number): number;
export interface PlannerPromptInput {
    words: readonly ScriptWord[];
    tone: Tone;
    direction?: string;
    estimatedMs: number;
    durationMeasured?: boolean;
    languageLabel?: string;
    prosody?: readonly WordProsody[];
    repair?: {
        previous: string;
        problems: readonly string[];
    };
}
export declare const PLAN_SCHEMA_TEXT: string;
export declare function buildPlannerMessages(input: PlannerPromptInput): {
    system: string;
    user: string;
};
