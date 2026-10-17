import { type PodcastScript, type PodcastTurnInput } from '../../contracts/podcast.js';
import { type ReviewAnchor, type ReviewBlockMode, type ReviewMode, type ReviewScript, type ReviewSubtitles, type SubtitleCue } from '../../contracts/review.js';
export interface NormalizedReviewTurn extends PodcastTurnInput {
    id: string;
}
export interface NormalizedReviewBlock {
    id: string;
    at: ReviewAnchor;
    mode: ReviewBlockMode;
    videoMs: number;
    moment?: string;
    why?: string;
    turns: NormalizedReviewTurn[];
    text: string;
    words: number;
}
export interface ReviewScriptCheck {
    script: ReviewScript | null;
    blocks: NormalizedReviewBlock[];
    errors: string[];
    warnings: string[];
}
export interface NormalizeReviewOptions {
    videoDurationMs: number;
    subtitles?: Pick<ReviewSubtitles, 'cues'> | readonly SubtitleCue[];
    mode: ReviewMode;
}
export declare const REVIEW_SCRIPT_FIELDS: {
    readonly script: readonly ['version', 'kind', 'mode', 'title', 'language', 'seed', 'prompt', 'speakers', 'blocks', 'reactions', 'camera', 'subtitles', 'audio', 'layout', 'eyes', 'densityNote'];
    readonly block: readonly ['id', 'at', 'mode', 'moment', 'why', 'turns', 'text'];
    readonly reaction: readonly ['at', 'seat', 'expression', 'macro', 'look', 'holdMs', 'camera', 'why'];
    readonly camera: readonly ['style', 'duringVideo', 'zooms', 'cuts'];
    readonly cut: readonly ['atMs', 'framing', 'seat', 'size', 'zoom', 'move', 'angle', 'transition'];
    readonly subtitles: readonly ['video', 'commentary'];
    readonly audio: readonly ['videoGainDb', 'duckDb'];
    readonly layout: readonly ['aspect', 'side'];
};
export declare const REVIEW_SCRIPT_LIMITS: {
    readonly blockIdPattern: RegExp;
    readonly titleMax: 200;
    readonly languageMax: 20;
    readonly promptMax: 4000;
    readonly whyMax: 200;
    readonly momentMax: 40;
    readonly duckDb: readonly [number, number];
    readonly overMsPerWord: 370;
    readonly overSpeechMs: 400;
    readonly innerPauseMs: 150;
    readonly snapBackMs: 300;
    readonly overEndMs: 500;
};
export declare function normalizeReviewScript(raw: unknown, options: NormalizeReviewOptions): ReviewScriptCheck;
type Normalized = Pick<ReviewScriptCheck, 'script' | 'blocks'>;
export declare function toPodcastScript(normalized: Normalized): PodcastScript;
export declare function podcastReviewBlocks(normalized: Pick<ReviewScriptCheck, 'blocks'>): Array<{
    id: string;
    turns: string[];
    at: ReviewAnchor;
    mode: ReviewBlockMode;
}>;
export declare function toTalkBlocks(normalized: Pick<ReviewScriptCheck, 'blocks'>): {
    text: string;
    blocks: Array<{
        id: string;
        at: ReviewAnchor;
        mode: ReviewBlockMode;
    }>;
};
export {};
