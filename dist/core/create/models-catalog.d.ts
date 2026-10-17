import type { LlmCatalogEntry } from '../../contracts/models.js';
export declare const LLM_CATALOG_DATE = "2026-10-15";
export declare const LLM_CATALOG_SOURCES: {
    readonly openrouter: 'https://openrouter.ai/api/v1/models';
    readonly writing: 'https://github.com/lechmazur/writing';
    readonly instructionFollowing: 'https://benchlm.ai/instruction-following';
    readonly designArena: 'https://designarena.ai';
    readonly artificialAnalysis: 'https://artificialanalysis.ai';
};
export declare const LLM_CATALOG: readonly LlmCatalogEntry[];
