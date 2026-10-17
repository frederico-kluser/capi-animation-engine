import type { PodcastSeat } from '../../../contracts/podcast.js';
import { type ReviewAnalysis, type ReviewAnalysisSegment, type ReviewMode, type ReviewMomentKind, type ReviewSubtitles } from '../../../contracts/review.js';
import { type ReviewParseResult, type ReviewTaskSpec } from './shared.js';
export declare const ANALYSIS_PROMPT_VERSION = "review-analysis-v3";
export declare const ANALYSIS_LIMITS: {
    readonly speechFreeRadiusMs: 1500;
    readonly quoteCoverage: 0.6;
    readonly quoteWindowMs: 15000;
    readonly minSegmentMs: 1500;
    readonly duplicateMomentMs: 1200;
    readonly maxSegments: 40;
    readonly maxMoments: 80;
    readonly maxEntities: 30;
    readonly maxClaims: 30;
    readonly maxOnScreen: 40;
    readonly maxTopics: 8;
    readonly segmentMaxMs: 60000;
    readonly segmentMinMeanMs: 8000;
    readonly momentEveryMs: 20000;
    readonly momentDenseMs: 6000;
};
export declare const MOMENT_KIND_TEXT: Readonly<Record<ReviewMomentKind, string>>;
export declare function momentKindOf(value: unknown): ReviewMomentKind | undefined;
export interface AnalysisPartInput {
    index: number;
    count: number;
    offsetMs: number;
    durationMs: number;
    videoDurationMs: number;
    withVideo: boolean;
    hasAudio?: boolean;
    subtitles?: ReviewSubtitles | null;
    prompt?: string;
    mode: ReviewMode;
    names?: Partial<Record<PodcastSeat, string>>;
    language?: string;
    fileName?: string;
}
export declare const ANALYSIS_SCHEMA_TEXT = "{\n  \"title\": \"what the clip is, in a few words\",\n  \"summary\": \"3-6 sentences: what happens, who, how it goes\",\n  \"language\": \"the language spoken in the clip (pt, en, es\u2026) or null if nobody speaks\",\n  \"genre\": \"tutorial | news | vlog | ad | interview | music | gameplay | talk | sketch | other\u2026\",\n  \"tone\": \"a few words (didactic and upbeat, tense, ironic\u2026)\",\n  \"audience\": \"who it is for\",\n  \"topics\": [\"2-6 short topics\"],\n  \"segments\": [\n    { \"from\": 0.0, \"to\": 34.5, \"title\": \"short title\", \"summary\": \"2-4 sentences\", \"visual\": \"what is SEEN (shots, people, on-screen text, graphics)\", \"speech\": \"what is SAID, summarised\", \"mood\": \"a word or two\" }\n  ],\n  \"moments\": [\n    { \"at\": 12.3, \"to\": 14.0, \"kind\": \"<kind>\", \"description\": \"what happens\", \"quote\": \"exact words, if it is speech\", \"why\": \"why it deserves a comment\", \"intensity\": 1-5, \"speechFree\": false, \"angle\": \"joke | context | counterpoint | question | praise\u2026, in a few words\" }\n  ],\n  \"entities\": [ { \"name\": \"as said or written in the clip\", \"kind\": \"person | brand | product | place | work | other\", \"note\": \"who/what it is, only from the clip\" } ],\n  \"claims\": [ { \"at\": 51.0, \"claim\": \"the statement, as made\", \"verify\": \"what would be worth checking\" } ],\n  \"onScreenText\": [ { \"at\": 3.0, \"text\": \"titles, burned-in captions, slides \u2014 as written\" } ],\n  \"angle\": \"the angle this review could take, in the light of the request\"\n}";
export declare function buildAnalysisMessages(input: AnalysisPartInput): {
    system: string;
    user: string;
};
export interface AnalysisParseOptions {
    offsetMs: number;
    durationMs: number;
    videoDurationMs: number;
    subtitles?: ReviewSubtitles | null;
    model?: string;
    hasAudio?: boolean;
}
export declare function timeConvention(rawSeconds: readonly number[], opts: Pick<AnalysisParseOptions, 'offsetMs' | 'durationMs'>): 'relative' | 'absolute' | 'ms';
export declare function parseAnalysis(content: string, opts: AnalysisParseOptions): ReviewParseResult<ReviewAnalysis>;
export declare function scoreAnalysis(value: ReviewAnalysis, problems: readonly string[], opts: Pick<AnalysisParseOptions, 'offsetMs' | 'durationMs' | 'videoDurationMs'>): number;
export declare function analysisTask(input: AnalysisPartInput & {
    model?: string;
    samples?: number;
}): ReviewTaskSpec<ReviewAnalysis>;
export declare function titleFromFileName(name: string): string;
export declare function clipAnalysis(analysis: ReviewAnalysis, fromMs: number, toMs: number): ReviewAnalysis;
export declare function mergeAnalysisChunks(chunks: readonly ReviewAnalysis[], opts: {
    durationMs: number;
}): ReviewAnalysis;
export declare function closeSegments(segments: readonly ReviewAnalysisSegment[], fromMs: number, toMs: number): ReviewAnalysisSegment[];
export interface AnalysisSynthesis {
    title?: string;
    summary?: string;
    angle?: string;
    topics?: string[];
    genre?: string;
    tone?: string;
    audience?: string;
}
export declare function buildAnalysisSynthesisMessages(merged: ReviewAnalysis, input: {
    prompt?: string;
    language?: string;
    durationMs: number;
}): {
    system: string;
    user: string;
};
export declare function parseAnalysisSynthesis(content: string): ReviewParseResult<AnalysisSynthesis>;
export declare function applySynthesis(analysis: ReviewAnalysis, synthesis: AnalysisSynthesis | null | undefined): ReviewAnalysis;
export declare function analysisSynthesisTask(merged: ReviewAnalysis, input: {
    prompt?: string;
    language?: string;
    durationMs: number;
}): ReviewTaskSpec<AnalysisSynthesis>;
export declare const FALLBACK_ANALYSIS: {
    readonly pauseMs: 2500;
    readonly minSegmentMs: 15000;
    readonly maxSegmentMs: 45000;
    readonly fixedSegmentMs: 30000;
    readonly visualGapMs: 6000;
    readonly momentEveryMs: 20000;
};
export declare function fallbackAnalysis(subtitles: ReviewSubtitles | null | undefined, durationMs: number, opts?: {
    title?: string;
    language?: string;
}): ReviewAnalysis;
