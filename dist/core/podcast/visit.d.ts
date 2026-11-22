import type { CharacterId } from '../../contracts/character.js';
import type { PodcastAudioClip, PodcastShot, PodcastSpec, PodcastVisemeSpec, PodcastVisitSpec, PodcastVisitorSpec } from '../../contracts/podcast.js';
import type { CompiledReviewVisit } from '../../contracts/review.js';
import type { PoseId } from '../../presets/poses.js';
import { type VisitDuoTurn } from '../tutorial/visit.js';
export declare const PODCAST_VISIT: {
    readonly openLeadMs: 220;
    readonly voiceAfterOpenMs: 620;
    readonly selfGapMs: 380;
    readonly holdAfterMs: 200;
    readonly replyGapMs: 420;
    readonly tailMs: 500;
    readonly answerCutMs: 400;
    readonly verticalGestures: readonly ['explain', 'steeple', 'explainOneHand', 'explain', 'steeple', 'explainOneHand'];
};
export interface PodcastVisitorDraft {
    id: string;
    name: string;
    character?: string;
    role?: string;
    voice?: string;
    tone?: string;
    outfit?: Record<string, unknown>;
    personality?: string;
}
export interface PodcastVisitLineDraft {
    id: string;
    text: string;
    tone?: string;
    after?: string;
}
export interface PodcastVisitSplit {
    script: Record<string, unknown>;
    visitor?: PodcastVisitorDraft;
    lines: PodcastVisitLineDraft[];
    errors: string[];
    warnings: string[];
}
export declare function splitPodcastVisit(raw: Record<string, unknown>): PodcastVisitSplit;
export interface PodcastVisitVoicedLine extends PodcastVisitLineDraft {
    src: string;
    durationMs: number;
    speechStartMs: number;
    speechEndMs: number;
    words: ReadonlyArray<{
        text: string;
        startMs: number;
        endMs: number;
    }>;
    visemes: readonly PodcastVisemeSpec[];
}
export declare function placePodcastVisit(spec: PodcastSpec, visitor: PodcastVisitorSpec, lines: readonly PodcastVisitVoicedLine[]): {
    spec: PodcastSpec;
    warnings: string[];
};
export declare function podcastVisitEndMs(visit: PodcastVisitSpec | undefined): number;
export declare function visitHandsWidth(poses: readonly PoseId[], margin?: 26): number | undefined;
export declare function compilePodcastVisit(visit: PodcastVisitSpec | undefined, options: {
    duoTurns?: readonly VisitDuoTurn[];
    durationMs: number;
    vertical?: boolean;
}): {
    visit?: CompiledReviewVisit;
    warnings: string[];
};
export declare function podcastVisitWindows(visit: CompiledReviewVisit | undefined): Array<{
    inMs: number;
    outMs: number;
}>;
export declare function visitCameraShots<S extends PodcastShot>(shots: readonly S[], window: {
    inMs: number;
    outMs: number;
}, answerMs?: number): S[];
export declare function podcastVisitClips(visit: CompiledReviewVisit | undefined): PodcastAudioClip[];
export interface PodcastVisitCaptionWord {
    text: string;
    fromMs: number;
    toMs: number;
    speaker: string;
    turn: string;
    prominence: number;
}
export declare function podcastVisitCaptionWords(visit: PodcastVisitSpec | undefined, options?: {
    durationMs?: number;
}): PodcastVisitCaptionWord[];
export declare function podcastVisitorCharacter(visit: PodcastVisitSpec | undefined): CharacterId | undefined;
