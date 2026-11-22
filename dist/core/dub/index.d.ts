import { type ContentLanguageId } from '../../contracts/languages.js';
import type { YouTubePackagingChapter } from '../../contracts/youtube.js';
export interface WordSpan {
    index: number;
    start: number;
    end: number;
    paragraph: number;
}
export declare function wordSpans(text: string): {
    normalized: string;
    spans: WordSpan[];
};
export declare function markSourceParagraphs(text: string, anchors: Iterable<number>): {
    paragraphs: string[];
    markers: Map<number, number>;
    normalized: string;
    spans: WordSpan[];
};
export declare function dubAnchors(values: {
    gestures?: unknown;
    face?: unknown;
    camera?: unknown;
}, extra?: readonly number[]): number[];
export declare function buildDubTranslationMessages(input: {
    paragraphs: readonly string[];
    source: ContentLanguageId;
    target: ContentLanguageId;
    tone?: string;
    title?: string;
    speakers?: readonly string[];
}): {
    system: string;
    user: string;
};
export declare function parseDubTranslation(content: string, count: number): {
    paragraphs: string[] | null;
    problem?: string;
};
export interface DubWordMap {
    text: string;
    targetWords: number;
    sourceWords: number;
    anchors: Map<number, number>;
    lost: number[];
    paragraphs: Array<{
        source: [number, number] | null;
        target: [number, number] | null;
    }>;
}
export declare function buildDubMap(source: {
    spans: readonly WordSpan[];
    markers: ReadonlyMap<number, number>;
}, translated: readonly string[]): DubWordMap;
export declare function mapWord(map: DubWordMap, word: number): number;
export declare function remapRange(map: DubWordMap, range: {
    from: number;
    to: number;
}): {
    from: number;
    to: number;
};
export declare function remapTalkAspects(values: {
    gestures?: unknown;
    face?: unknown;
    camera?: unknown;
}, map: DubWordMap): {
    gestures?: unknown;
    face?: unknown;
    camera?: unknown;
};
export interface TimedWordRef {
    startMs: number;
}
export declare function retimeChapters(chapters: readonly YouTubePackagingChapter[], source: readonly TimedWordRef[], target: readonly TimedWordRef[], map: DubWordMap): YouTubePackagingChapter[];
export declare const DUB_LANGUAGES: readonly ContentLanguageId[];
export declare const canDub: (language: ContentLanguageId) => boolean;
