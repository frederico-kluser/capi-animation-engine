import { type CtaAskId } from '../../contracts/cta.js';
export declare const ASK_PATTERNS: Readonly<Record<CtaAskId, RegExp>>;
export declare function countAsk(text: string, id: CtaAskId): number;
export declare function asksIn(text: string): CtaAskId[];
export declare const findPromise: (text: string) => string | undefined;
export declare function sharedContent(cta: string, script: string, ignore?: readonly string[]): string[];
