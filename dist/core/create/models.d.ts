import type { CreateModelChoices, CreateModelRole, LlmCatalogEntry } from '../../contracts/models.js';
import type { PlannerEffort } from '../talk/config.js';
import { LLM_CATALOG, LLM_CATALOG_DATE, LLM_CATALOG_SOURCES } from './models-catalog.js';
export { LLM_CATALOG, LLM_CATALOG_DATE, LLM_CATALOG_SOURCES };
export declare const DEFAULT_LLM_MODEL = "xiaomi/mimo-v2.6-pro";
export type LlmFitMetric = 'intelligence' | 'coding' | 'agentic' | 'writing' | 'instructionFollowing' | 'design3d' | 'designGamedev';
export declare const MODEL_ROLE_GROUPS: readonly ['Pesquisa e material', 'Roteiro e crítica', 'Câmara e corpo'];
export type ModelRoleGroup = (typeof MODEL_ROLE_GROUPS)[number];
export interface ModelRoleSpec {
    id: CreateModelRole;
    label: string;
    what: string;
    group: ModelRoleGroup;
    weights: Partial<Record<LlmFitMetric, number>>;
    why: string;
}
export declare const MODEL_ROLES: readonly ModelRoleSpec[];
export declare function modelRole(role: CreateModelRole): ModelRoleSpec;
export declare function llmById(id: string): LlmCatalogEntry | undefined;
export declare function llmLabel(id: string): string;
export declare function llmShortLabel(id: string): string;
export declare const LLM_ID: RegExp;
export declare function llmEffort(id: string): PlannerEffort;
export declare function llmMetrics(entry: LlmCatalogEntry): Partial<Record<LlmFitMetric, number>>;
export interface LlmFit {
    score: number;
    why: string;
}
export declare const LLM_METRIC_LABELS: Readonly<Record<LlmFitMetric, string>>;
export declare function llmFit(id: string, role: CreateModelRole): LlmFit | null;
export declare function llmFitOf(entry: LlmCatalogEntry, role: CreateModelRole): LlmFit | null;
export declare const LLM_SORTS: readonly ['fit', 'intelligence', 'writing', 'price', 'context', 'name'];
export type LlmSort = (typeof LLM_SORTS)[number];
export interface LlmFilter {
    query?: string;
    family?: string;
    maxPriceOut?: number;
    minContext?: number;
    onlyMeasured?: boolean;
    sort?: LlmSort;
}
export declare function llmFamilies(): string[];
export declare function filterLlms(filter: LlmFilter | undefined, role: CreateModelRole): LlmCatalogEntry[];
export declare function llmBestFor(role: CreateModelRole): LlmCatalogEntry | null;
export declare function defaultModelChoices(): Record<CreateModelRole, string>;
export declare function completeModelChoices(choices: CreateModelChoices | undefined): Record<CreateModelRole, string>;
export declare function changedModelChoices(choices: Record<CreateModelRole, string>): CreateModelChoices;
export declare function modelChoicesField(choices: Record<CreateModelRole, string>): {
    models: CreateModelChoices;
} | Record<string, never>;
