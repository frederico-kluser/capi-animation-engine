import { type PodcastSeat, type PodcastSpeakerInput } from '../../../contracts/podcast.js';
import type { VideoProfileId } from '../../../contracts/profile.js';
import { type ReviewAnalysis, type ReviewAnalysisMoment, type ReviewAnchor, type ReviewBlockInput, type ReviewMode, type ReviewPointMode, type ReviewReactionInput, type ReviewReactionKind, type ReviewScript, type ReviewSubtitles } from '../../../contracts/review.js';
import type { ReviewDensity } from '../../talk/config.js';
import { type ReviewParseResult, type ReviewTaskSpec } from './shared.js';
export declare const WRITER_PROMPT_VERSION = "review-writer-v3";
export declare const REVIEW_DENSITY_RATES: Readonly<Record<ReviewDensity, number>>;
export declare const WRITER_LIMITS: {
    readonly minGapMs: 2500;
    readonly maxOverWords: 22;
    readonly overMsPerWord: 380;
    readonly overLeadMs: 500;
    readonly overTailMs: 300;
    readonly overNudgeMs: 1000;
    readonly snapMs: 1500;
    readonly reactionClearMs: 1500;
    readonly reactionLeadMs: 2000;
    readonly maxPauseWords: {
        readonly talk: 60;
        readonly podcast: 80;
    };
    readonly maxEdgeWords: 95;
    readonly copiedFraction: 0.34;
    readonly copiedWindowMs: 20000;
    readonly coverAfterMs: 15000;
    readonly coverBeforeMs: 2500;
    readonly reactionHold: {
        readonly min: 600;
        readonly max: 5000;
    };
};
export declare const SHORT_REVIEW: {
    readonly blocksPerMinute: 2;
    readonly maxOpeningWords: {
        readonly talk: 20;
        readonly podcast: 28;
    };
    readonly maxClosingWords: {
        readonly talk: 28;
        readonly podcast: 36;
    };
    readonly maxPauseWords: {
        readonly talk: 26;
        readonly podcast: 34;
    };
};
export declare const shortReviewCap: (durationMs: number) => number;
export declare function reviewDensityBand(target: number, exact?: boolean): {
    lo: number;
    hi: number;
    min: number;
    max: number;
};
export declare function reviewBlockTarget(durationMs: number, density?: ReviewDensity): number;
export declare function overWindow(atMs: number, words: number): {
    fromMs: number;
    toMs: number;
};
export declare function nudgeOver(subtitles: ReviewSubtitles | null, atMs: number, words: number, durationMs: number): number | undefined;
export interface ReviewWriterPlan {
    text: string;
    picks: number;
    moments?: ReadonlyArray<{
        moment: string;
        atMs: number;
        toMs?: number;
        mode: ReviewPointMode;
        kind?: ReviewReactionKind;
    }>;
}
export interface ReviewWriterInput {
    analysis: ReviewAnalysis;
    subtitles?: ReviewSubtitles | null;
    prompt?: string;
    mode: ReviewMode;
    speakers?: Partial<Record<PodcastSeat, PodcastSpeakerInput>>;
    language?: string;
    density?: ReviewDensity;
    videoDurationMs: number;
    hasAudio?: boolean;
    videoAttached?: boolean;
    videoParts?: ReadonlyArray<{
        offsetMs: number;
        durationMs: number;
    }>;
    note?: string;
    previous?: ReviewScript | null;
    plan?: ReviewWriterPlan;
    profile?: VideoProfileId;
}
export interface ReviewWriterContext {
    analysis: ReviewAnalysis;
    subtitles: ReviewSubtitles | null;
    prompt?: string;
    mode: ReviewMode;
    seats: PodcastSeat[];
    speakers: Partial<Record<PodcastSeat, PodcastSpeakerInput & {
        name: string;
    }>>;
    language: string;
    density: ReviewDensity;
    durationMs: number;
    target: number;
    hasAudio: boolean;
    videoAttached: boolean;
    videoParts: Array<{
        offsetMs: number;
        durationMs: number;
    }>;
    note?: string;
    previous?: ReviewScript | null;
    plan?: ReviewWriterPlan;
    profile?: VideoProfileId;
}
export declare function reviewWriterContext(input: ReviewWriterInput): ReviewWriterContext;
export declare function blockWordLimit(at: ReviewAnchor, ctx: Pick<ReviewWriterContext, 'mode' | 'profile'>): number;
export declare const farewellCheckable: (language: string | undefined) => boolean;
export declare function buildReviewWriterMessages(input: ReviewWriterInput | ReviewWriterContext): {
    system: string;
    user: string;
};
export declare const REVIEW_SCRIPT_SCHEMA_TALK = "{\n  \"title\": \"a short title for this review\",\n  \"densityNote\": \"ONLY if the request or the note asks for fewer or more comment blocks than the TARGET: what it asked (<= 15 words)\",\n  \"blocks\": [\n    { \"at\": \"start\", \"why\": \"<= 12 words\", \"text\": \"what the anchor says\" },\n    { \"at\": <seconds>, \"mode\": \"pause\" | \"over\", \"moment\": \"<moment id, optional>\", \"why\": \"<= 12 words\", \"text\": \"what the anchor says\" },\n    { \"at\": \"end\", \"why\": \"<= 12 words\", \"text\": \"verdict + goodbye\" }\n  ],\n  \"reactions\": [ { \"at\": <seconds>, \"expression\": \"<id>\", \"macro\": \"agree|deny|laugh\", \"look\": \"tv|camera\", \"camera\": false, \"why\": \"<= 12 words\" } ]\n}";
export declare const REVIEW_SCRIPT_SCHEMA_PODCAST = "{\n  \"title\": \"a short title for this review\",\n  \"densityNote\": \"ONLY if the request or the note asks for fewer or more comment blocks than the TARGET: what it asked (<= 15 words)\",\n  \"blocks\": [\n    { \"at\": \"start\" | <seconds> | \"end\", \"mode\": \"pause\" | \"over\", \"moment\": \"<moment id, optional>\", \"why\": \"<= 12 words\",\n      \"turns\": [ { \"speaker\": \"host\" | \"guest\", \"text\": \"\u2026\", \"kind\": \"turn | backchannel | interruption | attempt (omit = turn)\", \"on\": \"<a word of the other's previous turn, only for backchannel/interruption/attempt>\" } ] }\n  ],\n  \"reactions\": [ { \"at\": <seconds>, \"seat\": \"host|guest\", \"expression\": \"<id>\", \"macro\": \"agree|deny|laugh\", \"look\": \"tv|camera|other\", \"camera\": false, \"why\": \"<= 12 words\" } ]\n}";
export declare const momentLine: (m: ReviewAnalysisMoment) => string;
export declare const TALK_ANCHOR_PERSONALITY = "Apresentador simp\u00E1tico e bem-humorado do canal \u00CDNDICE IA: fala direto com o p\u00FAblico, reage com sinceridade, explica sem complicar, desconfia de promessas sem prova e n\u00E3o perde uma boa piada.";
export declare const blockText: (block: Pick<ReviewBlockInput, 'text' | 'turns'>) => string;
export declare function parseReviewScript(content: string, input: ReviewWriterInput | ReviewWriterContext): ReviewParseResult<ReviewScript>;
type PlanMoment = NonNullable<ReviewWriterPlan['moments']>[number];
export declare function matchReviewPlan(blocks: readonly ReviewBlockInput[], reactions: readonly Pick<ReviewReactionInput, 'at'>[], plan: ReviewWriterPlan): {
    missing: PlanMoment[];
    missingReactions: PlanMoment[];
    extra: ReviewBlockInput[];
};
export interface ReviewScriptMeasures {
    comments: number;
    target: number;
    strong: number;
    covered: number;
    opening: boolean;
    closing: boolean;
    goodbye: boolean;
    strayGoodbyes: number;
    copied: number;
    longestGapMs: number;
    badOvers: number;
    planned?: number;
    plannedMissing?: number;
    plannedExtra?: number;
}
export declare function measureReviewScript(script: ReviewScript, ctx: ReviewWriterContext): ReviewScriptMeasures;
export declare function scoreReviewScript(script: ReviewScript, problems: readonly string[], input: ReviewWriterInput | ReviewWriterContext): number;
export declare function reviewScriptNeedsRepair(parsed: {
    value: ReviewScript | null;
    problems: readonly string[];
    fatal: boolean;
}, ctx: ReviewWriterContext): boolean;
export declare function reviewScriptTask(input: ReviewWriterInput & {
    samples?: number;
}): ReviewTaskSpec<ReviewScript>;
export declare function fallbackReviewScript(input: ReviewWriterInput | ReviewWriterContext): ReviewScript;
export {};
