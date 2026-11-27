export declare const NEWS_LINK_KINDS: readonly ['news', 'paper', 'repo', 'release', 'post'];
export type NewsLinkKind = (typeof NEWS_LINK_KINDS)[number];
export declare const NEWS_LINK_LABELS: Readonly<Record<NewsLinkKind, string>>;
export declare const NEWS_IMAGE_SOURCES: readonly ['og', 'twitter', 'jsonld', 'figure', 'article', 'markdown'];
export type NewsImageSource = (typeof NEWS_IMAGE_SOURCES)[number];
export interface NewsRect {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface NewsImage {
    id: string;
    url: string;
    from: NewsImageSource;
    alt?: string;
    caption?: string;
    file?: string;
    width?: number;
    height?: number;
    bytes?: number;
    sha1?: string;
    skipped?: string;
}
export interface NewsArticle {
    version: 1;
    kind: 'capi-news-article';
    url: string;
    finalUrl: string;
    canonical?: string;
    host: string;
    site: string;
    title: string;
    description?: string;
    author?: string;
    publishedAt?: string;
    language?: string;
    linkKind: NewsLinkKind;
    text: string;
    textFrom: 'html' | 'tavily' | 'arxiv';
    chars: number;
    images: NewsImage[];
    license?: {
        name?: string;
        url?: string;
    };
    fetchedAt: string;
    warnings: string[];
}
export declare const NEWS_IMAGE_KINDS: readonly ['photo', 'screenshot', 'chart', 'diagram', 'code', 'logo', 'illustration', 'text', 'other'];
export type NewsImageKind = (typeof NEWS_IMAGE_KINDS)[number];
export interface NewsImageDetail {
    id: string;
    label: string;
    box: NewsRect;
    text?: string;
}
export interface NewsImageAnalysis {
    id: string;
    description: string;
    kind: NewsImageKind;
    relevance: number;
    cover: number;
    hasText: boolean;
    text?: string;
    subject: NewsRect;
    details: NewsImageDetail[];
    colors: string[];
    people: boolean;
    issues: string[];
}
export interface NewsImagesRecord {
    version: 1;
    kind: 'capi-news-images';
    model?: string;
    cost?: number;
    analyses: NewsImageAnalysis[];
    cover?: string;
    order: string[];
    warnings: string[];
}
export declare const NEWS_CARD_KINDS: readonly ['numero', 'codigo', 'citacao', 'lista'];
export type NewsCardKind = (typeof NEWS_CARD_KINDS)[number];
export interface NewsScriptCard {
    id: string;
    kind: NewsCardKind;
    text: string;
    items?: string[];
    label?: string;
}
export interface NewsScriptLine {
    id: string;
    text: string;
    image?: string;
    detail?: string;
}
export interface NewsFact {
    claim: string;
    quote: string;
}
export interface NewsPackagingDraft {
    titles: string[];
    titleNotes: Array<{
        angle: string;
        why: string;
    }>;
    description: string;
    hashtags: string[];
    tags: string[];
    pinnedComment?: string;
    thumbnail: {
        lines: string[];
        highlight?: string;
        keyword?: string;
        mood?: string;
        number?: {
            value: string;
            label: string;
        } | null;
        versus?: [string, string] | null;
        scenes: string[];
    };
}
export interface NewsShortScript {
    version: 1;
    kind: 'capi-news-script';
    title: string;
    lines: NewsScriptLine[];
    cards?: NewsScriptCard[];
    facts: NewsFact[];
    packaging: NewsPackagingDraft;
    model?: string;
    cost?: number;
    rounds?: number;
    findings?: NewsCheck[];
}
export type NewsCheckLevel = 'error' | 'warn';
export interface NewsCheck {
    id: string;
    level: NewsCheckLevel;
    message: string;
    at?: string;
}
export declare const NEWS_STEP_IDS: readonly ['ler', 'imagens', 'roteiro', 'video', 'embalagem', 'capa'];
export type NewsStepId = (typeof NEWS_STEP_IDS)[number];
export declare const NEWS_STEP_LABELS: Readonly<Record<NewsStepId, string>>;
export type NewsStepStatus = 'pending' | 'running' | 'done' | 'reused' | 'skipped' | 'failed';
export interface NewsStepState {
    status: NewsStepStatus;
    ms?: number;
    cost?: number;
    spent?: number;
    note?: string;
    error?: string;
}
export interface NewsRunManifest {
    version: 1;
    kind: 'capi-news-short';
    name: string;
    url: string;
    createdAt: string;
    updatedAt: string;
    character: string;
    seconds: {
        target: number;
        min: number;
        max: number;
    };
    steps: Record<NewsStepId, NewsStepState>;
    review?: {
        dir: string;
        name: string;
    };
    request: NewsRequestRecord;
    cost: number;
    warnings: string[];
    reached: NewsStepId | 'done';
}
export declare const NEWS_IMAGE_POLICIES: readonly ['comentario', 'referencia', 'todas'];
export type NewsImagePolicy = (typeof NEWS_IMAGE_POLICIES)[number];
export interface NewsRequestRecord {
    url: string;
    character?: string;
    seconds?: number;
    note?: string;
    title?: string;
    summary?: string;
    tags?: string[];
    origin?: 'crawler' | 'custom';
    until?: NewsStepId;
    noLlm?: boolean;
    fakeTts?: boolean;
    noBackgrounds?: boolean;
    imagePolicy?: NewsImagePolicy;
}
export declare const NEWS_SHORT_DEFAULTS: {
    readonly seconds: {
        readonly target: 35;
        readonly min: 20;
        readonly max: 60;
    };
    readonly wordsPerSecond: 2.4;
    readonly pauseBetweenLinesMs: 700;
    readonly overheadMs: 3100;
    readonly wordsSlack: 0.15;
    readonly wordsPerLine: 14;
    readonly lines: {
        readonly min: 4;
        readonly max: 9;
    };
    readonly hookMaxWords: 16;
    readonly sentenceMaxWords: 20;
    readonly lineMaxWords: 34;
    readonly titleTarget: 45;
    readonly titleMax: 60;
    readonly hashtags: {
        readonly min: 3;
        readonly max: 5;
    };
    readonly articleChars: 24000;
    readonly maxImages: 6;
    readonly minImage: {
        readonly width: 480;
        readonly height: 270;
    };
};
