import type { NewsArticle, NewsShortScript } from '../../contracts/news.js';
import type { YouTubePackaging } from '../../contracts/youtube.js';
export declare function newsCreditLines(article: Pick<NewsArticle, 'site' | 'canonical' | 'finalUrl' | 'url' | 'linkKind' | 'license' | 'author'>, imagesShown: boolean): string[];
export declare function newsImagesShown(visuals: ReadonlyArray<{
    visual: string;
}>): boolean;
export declare function newsPackaging(input: {
    script: NewsShortScript;
    article: NewsArticle;
    run: string;
    durationMs: number;
    imagesShown: boolean;
    source: YouTubePackaging['source'];
    model?: string;
    cost?: number;
    warnings?: string[];
    now: Date;
}): YouTubePackaging;
