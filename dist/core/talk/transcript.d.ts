import type { ScriptWord, WordAlignment } from '../../contracts/talk.js';
export interface TimedWord {
    word: string;
    startMs: number;
    endMs: number;
}
export interface WordTimesCheck {
    matched: number;
    total: number;
    medianMs: number;
    p90Ms: number;
    within250: number;
    agrees: boolean;
    warning?: string;
}
export declare const WORD_TIMES_LIMITS: {
    readonly minCoverage: 0.6;
    readonly maxMedianMs: 200;
    readonly minWithin250: 0.7;
};
export declare const foldToken: (s: string) => string;
export declare function sameToken(a: string, b: string): boolean;
export declare function spokenTokens(text: string): string[];
export declare function checkWordTimes(words: readonly ScriptWord[], aligned: readonly Pick<WordAlignment, 'startMs' | 'endMs'>[], timed: readonly TimedWord[], modelLabel?: string): WordTimesCheck;
export declare const agreementScore: (check: Pick<WordTimesCheck, 'within250' | 'p90Ms' | 'matched'>) => number;
export declare function timesPerWord(words: readonly ScriptWord[], timed: readonly TimedWord[]): ({
    startMs: number;
    endMs: number;
} | undefined)[];
export interface LevelFrames {
    hopMs: number;
    frames: number;
    durationMs: number;
    db: Float32Array;
    refDb: number;
    floorDb: number;
}
export declare const ANCHOR_LIMITS: {
    readonly slackMs: 250;
    readonly minGapMs: 200;
    readonly quietFraction: 0.35;
    readonly minPauseMs: 120;
    readonly minMsPerWord: 120;
};
export declare function anchorChunks(words: readonly ScriptWord[], timed: readonly TimedWord[], level: LevelFrames): {
    firstWord: number;
    lastWord: number;
    startMs: number;
    endMs: number;
}[] | undefined;
export declare function transcriptAgreement(a: string, b: string): number;
