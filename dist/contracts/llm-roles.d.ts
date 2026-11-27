import { type PlannerEffort, type TutorialAuthorConfig } from '../core/talk/config.js';
export declare const LLM_GENERATION_ROLES: readonly ['research', 'spine', 'intro', 'pre-computer', 'interview', 'practice', 'conclusion', 'cta', 'stitch', 'direction', 'study-page', 'exercises', 'exam', 'short', 'metadata', 'critic'];
export type LlmGenerationRole = (typeof LLM_GENERATION_ROLES)[number];
export declare const LLM_TIERS: readonly ['cheap', 'strong'];
export type LlmTier = (typeof LLM_TIERS)[number];
export declare const LLM_ROLE_LABELS: Readonly<Record<LlmGenerationRole, string>>;
export declare const LLM_ROLE_DEFAULTS: Readonly<Record<LlmGenerationRole, LlmTier>>;
export declare const LLM_ROLE_REQUIRES_SCHEMA: readonly LlmGenerationRole[];
export declare function roleRequiresSchema(role: LlmGenerationRole): boolean;
export type LlmRolePolicy = Readonly<{
    tier: LlmTier;
    modelId: string;
    effort: PlannerEffort;
    maxOutputTokens: number;
    provider: TutorialAuthorConfig['provider'];
}>;
export type LlmRoles = Partial<Record<LlmGenerationRole, LlmRolePolicy>>;
export declare const LLM_ROLE_POLICY_KEYS: readonly ['tier', 'modelId', 'effort', 'maxOutputTokens', 'provider'];
export declare const LLM_ROLE_PROVIDER_KEYS: readonly ['order', 'ignore', 'allowFallbacks', 'requireParameters'];
export declare function validateLlmRolePolicy(value: unknown, path: string): {
    ok: true;
    policy: LlmRolePolicy;
} | {
    ok: false;
    issues: string[];
};
export declare function validateLlmRoles(value: unknown): {
    ok: boolean;
    roles: LlmRoles;
    issues: string[];
};
