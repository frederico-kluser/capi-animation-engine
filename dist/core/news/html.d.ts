import type { NewsImageSource } from '../../contracts/news.js';
export interface PageImage {
    url: string;
    from: NewsImageSource;
    alt?: string;
    caption?: string;
    width?: number;
    height?: number;
}
export interface PageRead {
    refresh?: string;
    title?: string;
    heading?: string;
    description?: string;
    siteName?: string;
    canonical?: string;
    author?: string;
    publishedAt?: string;
    language?: string;
    type?: string;
    keywords: string[];
    license?: {
        name?: string;
        url?: string;
    };
    citation?: {
        title?: string;
        authors: string[];
        abstract?: string;
        pdf?: string;
        date?: string;
    };
    images: PageImage[];
    text: string;
    blocks: number;
}
export declare function decodeEntities(text: string): string;
export declare function absoluteUrl(raw: string | undefined, base: string): string | undefined;
export declare function bestFromSrcset(srcset: string | undefined): string | undefined;
export declare function imageKey(url: string): string;
export declare function readNewsHtml(html: string, url: string): PageRead;
export declare function licenseName(url: string): string | undefined;
export declare function markdownImages(markdown: string, base: string): PageImage[];
export declare function markdownText(markdown: string): string;
