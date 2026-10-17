import type { ExpressionId } from '../../contracts/face.js';
import type { Point } from '../../contracts/pose.js';
import { type CompiledPodcast, type PodcastSeat, type PodcastSpec, type PodcastTurnKind } from '../../contracts/podcast.js';
import { type VideoProfileId } from '../../contracts/profile.js';
import type { TimelineSpec } from '../../contracts/timeline.js';
import { type PoseId } from '../../presets/poses.js';
import { type ResolveResult } from '../talk/resolve.js';
import { type Beat } from '../timeline/choreograph.js';
import { type TimelineIssue } from '../timeline/lint.js';
import { type ListenLayer } from './listen.js';
import { type EffectiveTurn } from './turns.js';
export interface SeatBlock {
    turns: string[];
    fromMs: number;
    toMs: number;
    shiftMs: number;
    resolved: ResolveResult;
}
export type SeatBeat = Beat & {
    priority: number;
    source: 'start' | 'block' | 'listen' | 'action';
    group?: string;
};
export interface CompiledSeatDetail {
    seat: PodcastSeat;
    timeline: TimelineSpec;
    rest: {
        pose: PoseId;
        expression: ExpressionId;
    };
    blocks: SeatBlock[];
    listen: ListenLayer;
    busy: Array<[number, number]>;
    beats: SeatBeat[];
    issues: TimelineIssue[];
    decisions: string[];
}
export interface PodcastCompileDetail {
    compiled: CompiledPodcast;
    turns: EffectiveTurn[];
    seats: Record<PodcastSeat, CompiledSeatDetail>;
}
export declare function restExpressionFor(tone: string | undefined): ExpressionId;
export declare const PODCAST_TV_LOOK: Readonly<Point>;
export interface PodcastCompileOptions {
    tvLook?: Point;
    profile?: VideoProfileId;
}
export declare function podcastProfile(spec: Pick<PodcastSpec, 'render'> | null | undefined, asked?: unknown): VideoProfileId;
export declare const PODCAST_FIT_PROFILES: readonly VideoProfileId[];
export declare function compilePodcastDetailed(spec: PodcastSpec, options?: PodcastCompileOptions): PodcastCompileDetail;
export declare function compilePodcast(spec: PodcastSpec, options?: PodcastCompileOptions): CompiledPodcast;
export interface PodcastCaptionWord {
    text: string;
    fromMs: number;
    toMs: number;
    seat: PodcastSeat;
    turn: string;
    kind: PodcastTurnKind;
    clauseEnd?: boolean;
    sentenceEnd?: boolean;
    prominence: number;
}
export interface PodcastCaptionWordsOptions {
    background?: boolean;
    durationMs?: number;
    turns?: readonly EffectiveTurn[];
}
export declare function podcastCaptionWords(spec: PodcastSpec, options?: PodcastCaptionWordsOptions): PodcastCaptionWord[];
