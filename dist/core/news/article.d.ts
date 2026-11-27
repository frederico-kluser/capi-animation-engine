import type { NewsLinkKind } from '../../contracts/news.js';
export declare function normalizeNewsUrl(raw: string): string | undefined;
export declare function arxivId(url: string): string | undefined;
export declare function linkKindOf(url: string, hints?: {
    title?: string;
    type?: string;
    citation?: boolean;
}): NewsLinkKind;
export declare function hostOf(url: string): string;
export declare function siteLabel(host: string, siteName?: string): string;
export declare function cleanNewsTitle(title: string, siteNames?: readonly string[]): string;
export declare function titleFromSlug(url: string): string | undefined;
export declare function isBlockedPage(status: number, title: string | undefined, textChars: number): boolean;
export declare function clipArticleText(text: string, max: number, kind: NewsLinkKind): string;
