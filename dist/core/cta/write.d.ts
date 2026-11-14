import { type CtaAskId, type CtaLine, type CtaWhere } from '../../contracts/cta.js';
import type { AspectRecordId } from '../../contracts/aspects.js';
export declare const CTA_PROMPT_VERSION = "cta-v3";
export declare const CTA_LIMITS: {
    readonly video: {
        readonly words: {
            readonly min: 24;
            readonly max: 40;
        };
        readonly duoWords: {
            readonly min: 24;
            readonly max: 45;
        };
        readonly duoTurns: {
            readonly min: 1;
            readonly max: 2;
        };
        readonly shared: 1;
    };
    readonly short: {
        readonly words: {
            readonly min: 6;
            readonly max: 12;
        };
        readonly duoWords: {
            readonly min: 6;
            readonly max: 12;
        };
        readonly duoTurns: {
            readonly min: 1;
            readonly max: 1;
        };
        readonly shared: 1;
    };
    readonly turnWords: 30;
};
export declare const CTA_SHORT_ASKS: readonly CtaAskId[];
export interface CtaInput {
    script: string;
    title?: string;
    presenters: 1 | 2;
    names?: {
        host?: string;
        guest?: string;
    };
    language?: string;
    short?: boolean;
    asks?: readonly CtaAskId[];
    notes?: string;
    before?: string;
    after?: string;
    where?: CtaWhere;
}
export interface CtaContext {
    script: string;
    title?: string;
    presenters: 1 | 2;
    names: {
        host: string;
        guest: string;
    };
    language: string;
    short: boolean;
    asks: CtaAskId[];
    notes?: string;
    before?: string;
    after?: string;
    where: CtaWhere;
    already: CtaAskId[];
}
export declare function ctaContext(input: CtaInput): CtaContext;
export declare function buildCtaMessages(ctx: CtaContext): {
    system: string;
    user: string;
};
export declare function checkCta(lines: readonly CtaLine[], ctx: CtaContext): string[];
export interface CtaParsed {
    value: CtaLine[] | null;
    problems: string[];
    fatal: boolean;
}
export declare function parseCta(content: string, ctx: CtaContext): CtaParsed;
export declare const scoreCta: (_value: readonly CtaLine[], problems: readonly string[]) => number;
export declare function fallbackCta(ctx: CtaContext): CtaLine[];
export interface CtaTask {
    id: AspectRecordId;
    mode: 'create';
    system: string;
    user: string;
    parse(content: string): CtaParsed;
    score(value: CtaLine[], problems: readonly string[]): number;
    needsRepair(parsed: {
        value: CtaLine[] | null;
        problems: readonly string[];
        fatal: boolean;
    }): boolean;
    repairUser(previous: string, problems: readonly string[]): string;
    fallback(): CtaLine[] | null;
    samples: number;
    keepValid: true;
}
export declare function ctaTask(input: CtaInput | CtaContext): CtaTask;
export declare function ctaText(lines: readonly CtaLine[], presenters: 1 | 2, names?: {
    host?: string;
    guest?: string;
}): string;
