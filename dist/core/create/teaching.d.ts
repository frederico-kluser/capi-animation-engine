import type { BriefPacingId } from '../../contracts/aspects.js';
import { type CreateDurationPlan, type CreateFacetId, type CreateMaterialCheck, type CreateNote, type CreatePoint, type CreateSource } from '../../contracts/create.js';
import { type JevAnswer, type JevRequest } from '../decide/jev.js';
import { type CreateFormatSpec } from './formats.js';
import type { CreateIntake, NormalizedCreate } from './request.js';
export declare const PASTED_MATERIAL: {
    readonly minMaterialChars: 600;
    readonly maxInstructionChars: 700;
    readonly ratio: 2;
    readonly titleChars: 140;
};
export declare function splitPromptMaterial(prompt: string): {
    instruction: string;
    material?: string;
    title?: string;
};
export declare const requestPacing: (n: Pick<NormalizedCreate, 'format' | 'profile'> & {
    audience?: NormalizedCreate['audience'];
    pacing?: BriefPacingId;
}, audience?: CreateIntake['audience']) => BriefPacingId;
export declare const pacedWords: (minutes: number, pacing: BriefPacingId, presenters: 1 | 2) => number;
export declare function teachingResearch(n: Pick<NormalizedCreate, 'format' | 'profile' | 'research'> & {
    pacing?: BriefPacingId;
}, audience: CreateIntake['audience']): 'quick' | undefined;
export declare const EXPLAIN_SECONDS: Readonly<Record<BriefPacingId, {
    frame: number;
    concept: number;
    point: number;
}>>;
export interface DurationPlanInput {
    format: Pick<CreateFormatSpec, 'minutes'>;
    minutes: number;
    presenters: 1 | 2;
    pacing: BriefPacingId;
    points: readonly CreatePoint[];
    specific: boolean;
}
export declare const DURATION_PLAN: {
    readonly extendSlack: 1.1;
    readonly extendMax: 1.6;
    readonly shrinkBelow: 0.75;
    readonly shrinkSlack: 1.15;
};
export declare function planCreateDuration(input: DurationPlanInput): CreateDurationPlan;
export declare function conceptBudget(minutes: number, pacing: BriefPacingId): number;
export declare const MATERIAL_FACETS: Readonly<Record<CreateFacetId, {
    label: string;
    vital: boolean;
    ask: string;
    yes: string;
    no: string;
    words: RegExp;
    need: number;
}>>;
export interface MaterialCheckInput {
    request: Pick<NormalizedCreate, 'prompt' | 'sources' | 'format' | 'minutes' | 'presenters'> & {
        videos?: readonly unknown[] | undefined;
    };
    intake: Pick<CreateIntake, 'timely' | 'research' | 'researchP'>;
    sources: readonly CreateSource[];
    videoSources?: readonly string[];
    notes: readonly CreateNote[];
    points: readonly CreatePoint[];
    pacing: BriefPacingId;
    canSearch: boolean;
}
export declare function specificRequest(input: Pick<MaterialCheckInput, 'request' | 'intake'>): boolean;
export declare function materialNotesBlock(input: Pick<MaterialCheckInput, 'notes' | 'videoSources'>, maxChars?: number): string;
export declare function materialRequest(input: MaterialCheckInput): JevRequest | null;
export declare function readMaterialCheck(input: MaterialCheckInput, answers: Readonly<Record<string, JevAnswer>> | null, capacityMinutes: number): CreateMaterialCheck;
export declare function thinMaterialRules(check: CreateMaterialCheck): string[];
export declare function refusalText(check: CreateMaterialCheck): string;
