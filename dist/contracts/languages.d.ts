export declare const CONTENT_LANGUAGE_IDS: readonly ['pt-BR', 'en', 'es', 'fr', 'de', 'it', 'ja', 'ko', 'hi', 'id'];
export type ContentLanguageId = (typeof CONTENT_LANGUAGE_IDS)[number];
export declare const SOURCE_LANGUAGE: ContentLanguageId;
export declare const DEFAULT_TARGET_LANGUAGES: readonly ContentLanguageId[];
export interface LanguageTexts {
    watchNext: string;
    otherLanguages: string;
    chapters: string;
    nextLesson: string;
    previousLesson: string;
    playlist: string;
    subscribe: string;
    fullVideo: string;
    lesson: string;
    practice: string;
    exercises: string;
}
export interface ContentLanguageInfo {
    id: ContentLanguageId;
    youtube: string;
    label: string;
    native: string;
    iso: string;
    script: 'latin' | 'other';
    texts: LanguageTexts;
}
export declare const CONTENT_LANGUAGES: Readonly<Record<ContentLanguageId, ContentLanguageInfo>>;
export declare function isContentLanguage(value: unknown): value is ContentLanguageId;
export declare function contentLanguageOf(value: unknown): ContentLanguageId | null;
export declare function readLanguageList(value: unknown): {
    languages: ContentLanguageId[];
    unknown: string[];
};
