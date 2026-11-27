import type { NewsRect } from '../../contracts/news.js';
export declare const NEWS_CARD: {
    readonly width: 1280;
    readonly height: 720;
    readonly margin: 26;
};
export interface PxRect {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare function containRect(w: number, h: number, box: PxRect): PxRect;
export declare function cardInner(): PxRect;
export declare function newsFocusRect(detail: NewsRect, image: {
    width: number;
    height: number;
}, minSide?: number): NewsRect;
export declare const NEWS_CARD_TONES: {
    readonly bgCenter: '#0F6E7A';
    readonly bgEdge: '#04212A';
    readonly accent: '#FFE14D';
    readonly text: '#FFFFFF';
    readonly chipBg: 'rgba(4,20,28,0.78)';
    readonly chipText: '#E9FBFF';
    readonly chipDot: '#2FE0C8';
};
export declare function cardDate(raw: string | undefined): string | undefined;
export declare function sourceChip(site: string, date?: string): string;
export declare function imageCardHtml(input: {
    src: string;
    width: number;
    height: number;
    chip: string;
    fontFace?: string;
}): string;
export declare function introCardHtml(input: {
    src?: string;
    title: string;
    duration: string;
    tags: readonly string[];
    chip: string;
    fontFace?: string;
    fontFamily?: string;
}): string;
export declare function headlineCardHtml(input: {
    kicker: string;
    headline: string;
    chip: string;
    fontFace?: string;
    fontFamily?: string;
}): string;
export declare function textCardHtml(input: {
    kind: 'numero' | 'codigo' | 'citacao' | 'lista';
    text: string;
    items?: readonly string[];
    label?: string;
    chip: string;
    fontFace?: string;
    fontFamily?: string;
}): string;
