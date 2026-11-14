import type { CtaPlacement, CtaWhere } from '../../contracts/cta.js';
import type { ScriptWord } from '../../contracts/talk.js';
export declare function ctaInsertionPoint(words: readonly ScriptWord[]): {
    at: number;
    where: 'before-farewell' | 'end';
};
export declare const CTA_PLACEMENT: {
    readonly window: readonly [0.2, 0.4];
    readonly wider: readonly [0.15, 0.5];
    readonly minSeconds: 45;
    readonly secondsPerWord: 0.4;
};
export interface CtaBlock {
    words: number;
    endsInQuestion: boolean;
    blocked?: boolean;
    speakerChange?: boolean;
}
export interface CtaPlaceOptions {
    short?: boolean;
    farewell?: boolean;
    secondsPerWord?: number;
}
export declare function ctaBoundary(blocks: readonly CtaBlock[], options?: Pick<CtaPlaceOptions, 'secondsPerWord'>): {
    after: number;
    position: number;
    reason: string;
} | null;
export declare function ctaTextPoint(words: readonly ScriptWord[], options?: CtaPlaceOptions): {
    at: number;
    placement: CtaPlacement;
};
export interface CtaTextInserted {
    text: string;
    words: {
        from: number;
        to: number;
    };
    where: CtaWhere;
    placement: CtaPlacement;
}
export declare function insertCtaText(text: string, passage: string, options?: CtaPlaceOptions): CtaTextInserted;
export interface CtaTurnLike {
    id?: string;
    speaker: string;
    text: string;
    kind?: string;
    start?: unknown;
}
export interface CtaTurnsPlaceOptions extends CtaPlaceOptions {
    segments?: ReadonlyArray<{
        turns: readonly string[];
    }>;
}
export declare function ctaTurnsPoint(turns: readonly CtaTurnLike[], options?: CtaTurnsPlaceOptions): {
    at: number;
    placement: CtaPlacement;
};
export declare function insertCtaTurns<T extends CtaTurnLike>(turns: readonly T[], lines: ReadonlyArray<{
    seat: 'host' | 'guest';
    text: string;
}>, options?: CtaTurnsPlaceOptions): {
    turns: Array<T | CtaTurnLike>;
    ids: string[];
    where: CtaWhere;
    placement: CtaPlacement;
};
