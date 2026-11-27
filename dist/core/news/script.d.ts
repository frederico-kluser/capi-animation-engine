import type { NewsArticle, NewsCheck, NewsImageAnalysis, NewsImagesRecord, NewsShortScript } from '../../contracts/news.js';
export interface NewsScriptContext {
    article: NewsArticle;
    images: NewsImagesRecord;
    persona: {
        id: string;
        name: string;
        personality?: string;
    };
    seconds: number;
    note?: string;
    previousTitles?: string[];
    previousHooks?: string[];
    reference?: NewsImageAnalysis[];
}
export declare function newsScriptTargets(seconds: number): {
    seconds: number;
    words: number;
    min: number;
    max: number;
    lines: {
        min: number;
        target: number;
        max: number;
    };
};
export declare function estimateNewsSeconds(words: number, lines: number): number;
export declare function countWords(text: string): number;
export declare function sentencesOf(text: string): string[];
export declare function parseNewsScript(content: string | unknown): {
    value: NewsShortScript | null;
    problems: string[];
};
export declare function normalizeForQuote(text: string): string;
export declare function quoteInArticle(quote: string, normalizedArticle: string): boolean;
export declare function checkNewsScript(script: NewsShortScript, ctx: NewsScriptContext): NewsCheck[];
export declare function finalizeNewsScript(script: NewsShortScript): NewsShortScript;
export declare function findingsText(checks: readonly NewsCheck[]): string;
export declare function newsWriterData(ctx: NewsScriptContext): string;
export declare function fallbackNewsScript(ctx: NewsScriptContext): NewsShortScript;
