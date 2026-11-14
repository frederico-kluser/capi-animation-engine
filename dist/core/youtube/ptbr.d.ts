export declare const PT_PT_TO_BR: ReadonlyArray<readonly [RegExp, string]>;
export declare function toBrazilian(text: string): {
    text: string;
    swaps: string[];
};
export declare const KIDS_WORDS: RegExp;
export declare const CLICKBAIT_WORDS: RegExp;
export declare const EXPERT_TOPICS: RegExp;
export declare function guardWarnings(texts: {
    title?: string;
    description?: string;
    tags?: readonly string[];
}): string[];
