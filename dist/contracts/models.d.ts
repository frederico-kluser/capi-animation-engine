export declare const CREATE_MODEL_ROLES: readonly ['queries', 'notes', 'lenses', 'write', 'critique', 'aspects'];
export type CreateModelRole = (typeof CREATE_MODEL_ROLES)[number];
export type CreateModelChoices = Partial<Record<CreateModelRole, string>>;
export declare const LLM_EFFORTS: readonly ['max', 'xhigh', 'high', 'medium', 'low', 'minimal', 'none'];
export type LlmEffort = (typeof LLM_EFFORTS)[number];
export declare const LLM_DESIGN_CATEGORIES: readonly ['3d', 'gamedev', 'uicomponent', 'website', 'dataviz', 'codecategories', 'svg', 'webapps'];
export type LlmDesignCategory = (typeof LLM_DESIGN_CATEGORIES)[number];
export interface LlmBenchmarks {
    intelligence?: number;
    coding?: number;
    agentic?: number;
    writing?: number;
    instructionFollowing?: number;
    design?: Partial<Record<LlmDesignCategory, number>>;
}
export interface LlmCatalogEntry {
    id: string;
    label: string;
    family: string;
    contextLength: number;
    priceIn: number;
    priceOut: number;
    effortMax: LlmEffort;
    reasoning: boolean;
    benchmarks: LlmBenchmarks;
    note?: string;
}
