import { type PodcastSeat, type PodcastSpeakerInput } from '../../../contracts/podcast.js';
import { type ReviewAnalysis, type ReviewAnalysisClaim, type ReviewAnalysisMoment, type ReviewMode, type ReviewPointMode, type ReviewPoints, type ReviewReactionKind, type ReviewReactionPlan, type ReviewReactionPoint, type ReviewSubtitles } from '../../../contracts/review.js';
import { type JevAnswer, type JevRequest } from '../../decide/jev.js';
import type { ReviewDensity } from '../../talk/config.js';
import { type ReviewParseResult, type ReviewTaskSpec } from './shared.js';
import { type ReviewWriterContext, type ReviewWriterPlan } from './writer.js';
export declare const POINTS_PROMPT_VERSION = "review-points-v1";
export declare const POINTS_LIMITS: {
    readonly maxOptions: 3;
    readonly aimFactor: 1.5;
    readonly claimWindowMs: 3000;
    readonly maxPoints: 80;
    readonly maxWhy: 240;
    readonly maxIdea: 320;
    readonly maxStance: 900;
    readonly subtitleChars: 40000;
};
export declare const REACTION_PLAN_LIMITS: {
    readonly maxPicks: 200;
    readonly maxNote: 500;
    readonly maxStance: 1000;
};
export declare const REACTION_KIND_TEXT: Readonly<Record<ReviewReactionKind, string>>;
export declare const REACTION_KIND_LABELS: Readonly<Record<ReviewReactionKind, string>>;
export declare const POINT_MODE_LABELS: Readonly<Record<ReviewPointMode, string>>;
export interface ReactionPointsInput {
    analysis: ReviewAnalysis;
    subtitles?: ReviewSubtitles | null;
    prompt?: string;
    mode: ReviewMode;
    speakers?: Partial<Record<PodcastSeat, PodcastSpeakerInput>>;
    language?: string;
    density?: ReviewDensity;
    videoDurationMs: number;
    note?: string;
}
export interface ReactionPointsContext {
    analysis: ReviewAnalysis;
    subtitles: ReviewSubtitles | null;
    prompt?: string;
    mode: ReviewMode;
    seats: PodcastSeat[];
    speakers: ReviewWriterContext['speakers'];
    language: string;
    density: ReviewDensity;
    durationMs: number;
    target: number;
    aim: number;
    note?: string;
}
export declare function reactableMoments(analysis: Pick<ReviewAnalysis, 'moments'>): ReviewAnalysisMoment[];
export declare function reactionPointsContext(input: ReactionPointsInput): ReactionPointsContext;
export declare const REACTION_POINTS_SCHEMA: (podcast: boolean) => string;
export declare function buildReactionPointsMessages(input: ReactionPointsInput | ReactionPointsContext): {
    system: string;
    user: string;
};
export declare function reactionKindOf(value: unknown): ReviewReactionKind | undefined;
export declare function claimNear(analysis: Pick<ReviewAnalysis, 'claims'>, moment: Pick<ReviewAnalysisMoment, 'atMs' | 'toMs'>): ReviewAnalysisClaim | undefined;
export declare function parseReactionPoints(content: string, input: ReactionPointsInput | ReactionPointsContext): ReviewParseResult<ReviewPoints>;
export interface ReactionPointsMeasures {
    points: number;
    aim: number;
    strong: number;
    covered: number;
    withChoice: number;
    recommendedKinds: number;
    stance: boolean;
}
export declare function measureReactionPoints(value: ReviewPoints, input: ReactionPointsInput | ReactionPointsContext): ReactionPointsMeasures;
export declare function scoreReactionPoints(value: ReviewPoints, input: ReactionPointsInput | ReactionPointsContext, problems?: readonly string[]): number;
export declare function reactionPointsNeedRepair(parsed: {
    value: ReviewPoints | null;
    problems: readonly string[];
    fatal: boolean;
}, input: ReactionPointsInput | ReactionPointsContext): boolean;
export declare function fallbackReactionPoints(input: ReactionPointsInput | ReactionPointsContext): ReviewPoints;
export declare function reactionPointsTask(input: ReactionPointsInput & {
    samples?: number;
}): ReviewTaskSpec<ReviewPoints>;
export declare const POINT_WORTH_LEVELS: readonly string[];
export declare function pointDecisionRequest(point: ReviewReactionPoint, analysis: Pick<ReviewAnalysis, 'title' | 'summary'>, prompt?: string): JevRequest;
export interface PointDecisionAnswers {
    answers: Record<string, JevAnswer>;
}
export declare function applyPointDecisions(value: ReviewPoints, decisions: ReadonlyArray<PointDecisionAnswers | null | undefined>, opts: {
    durationMs: number;
    density?: ReviewDensity;
    analysis?: Pick<ReviewAnalysis, 'moments'>;
}): ReviewPoints;
export declare function defaultReactionPlan(points: Pick<ReviewPoints, 'points'>): ReviewReactionPlan;
export declare function parseReactionPlan(raw: unknown): {
    plan: ReviewReactionPlan | null;
    errors: string[];
};
export interface ResolvedReactionPick {
    point: ReviewReactionPoint;
    option: number;
    kind: ReviewReactionKind;
    idea: string;
    note?: string;
    seat?: PodcastSeat;
    mode: ReviewPointMode;
}
export interface ResolvedReactionPlan {
    stance: string;
    picks: ResolvedReactionPick[];
    blocks: number;
    warnings: string[];
}
export declare function resolveReactionPlan(points: Pick<ReviewPoints, 'points' | 'stance'>, plan: ReviewReactionPlan | null | undefined): ResolvedReactionPlan;
export declare function normalizeReactionPlan(points: Pick<ReviewPoints, 'points' | 'stance'>, plan: ReviewReactionPlan | null | undefined): {
    plan: ReviewReactionPlan;
    warnings: string[];
};
export interface ReactionPlanTextOptions {
    mode: ReviewMode;
    names?: Partial<Record<PodcastSeat, string>>;
}
export declare function reactionPlanText(points: Pick<ReviewPoints, 'points' | 'stance'>, plan: ReviewReactionPlan | null | undefined, opts: ReactionPlanTextOptions): string;
export declare function reactionPlanForWriter(points: Pick<ReviewPoints, 'points' | 'stance'>, plan: ReviewReactionPlan | null | undefined, opts: ReactionPlanTextOptions): {
    plan: ReviewWriterPlan;
    resolved: ResolvedReactionPlan;
};
