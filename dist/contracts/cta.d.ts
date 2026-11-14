export declare const CTA_ASK_IDS: readonly ['like', 'subscribe', 'bell'];
export type CtaAskId = (typeof CTA_ASK_IDS)[number];
export declare const CTA_FILE = "cta.json";
export declare const CTA_MARK_VERSION = 1;
export interface CtaLine {
    seat: 'host' | 'guest';
    text: string;
}
export declare const CTA_WHERE: readonly ['middle', 'before-farewell', 'end'];
export type CtaWhere = (typeof CTA_WHERE)[number];
export interface CtaPlacement {
    where: CtaWhere;
    position: number;
    reason: string;
}
export interface CtaMark {
    version: typeof CTA_MARK_VERSION;
    asks: CtaAskId[];
    text: string;
    words?: {
        from: number;
        to: number;
    };
    turns?: string[];
    placement?: CtaPlacement;
    model?: string;
    costUsd?: number;
    createdAt: string;
}
