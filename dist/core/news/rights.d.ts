import type { NewsArticle, NewsImageAnalysis, NewsImagePolicy, NewsImagesRecord } from '../../contracts/news.js';
export { NEWS_IMAGE_POLICIES, type NewsImagePolicy } from '../../contracts/news.js';
export type NewsImageUse = 'livre' | 'comentario' | 'referencia';
export declare function isOpenLicense(name: string | undefined): boolean;
export declare function newsImageUse(a: Pick<NewsImageAnalysis, 'kind' | 'people' | 'issues'>, licenseName: string | undefined, policy?: NewsImagePolicy): NewsImageUse;
export declare function showableImages(record: Pick<NewsImagesRecord, 'analyses' | 'order' | 'cover'>, article: Pick<NewsArticle, 'license'>, policy?: NewsImagePolicy): {
    show: string[];
    reference: string[];
    cover?: string;
    uses: Record<string, NewsImageUse>;
};
export declare function recordForShow(record: NewsImagesRecord, article: Pick<NewsArticle, 'license'>, policy?: NewsImagePolicy): NewsImagesRecord;
