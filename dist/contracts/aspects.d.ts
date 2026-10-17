import type { CameraIntent } from './camera.js';
import type { PodcastAction, PodcastListenCue, PodcastPlannedGesture, PodcastSeat, PodcastSpeakerInput } from './podcast.js';
import type { VideoProfileId } from './profile.js';
export declare const PODCAST_ASPECT_IDS: readonly ['gestures-host', 'gestures-guest', 'expressions', 'interactions', 'actions', 'camera'];
export type PodcastAspectId = (typeof PODCAST_ASPECT_IDS)[number];
export declare const TALK_ASPECT_IDS: readonly ['gestures', 'face', 'camera'];
export type TalkAspectId = (typeof TALK_ASPECT_IDS)[number];
export declare const WRITER_STEP_IDS: readonly ['outline', 'dialogue'];
export type WriterStepId = (typeof WRITER_STEP_IDS)[number];
export declare const REVIEW_STEP_IDS: readonly ['video-analysis', 'reaction-points', 'review-script'];
export type ReviewStepId = (typeof REVIEW_STEP_IDS)[number];
export type AspectRecordId = PodcastAspectId | TalkAspectId | ReviewStepId | 'outline' | `dialogue:${string}` | `create:${string}`;
export declare const PODCAST_BRIEF_STYLES: readonly ['casual', 'interview', 'debate', 'comedy', 'explainer'];
export type PodcastBriefStyle = (typeof PODCAST_BRIEF_STYLES)[number];
export interface PodcastBrief {
    topic: string;
    title?: string;
    minutes?: number;
    language?: string;
    style?: PodcastBriefStyle;
    notes?: string;
    facts?: string[];
    speakers?: Partial<Record<PodcastSeat, Pick<PodcastSpeakerInput, 'character' | 'name' | 'personality' | 'voice' | 'tone'>>>;
    format?: PodcastBriefFormat;
    profile?: VideoProfileId;
}
export interface PodcastBriefFormat {
    id: string;
    label: string;
    direction: string;
    roles?: Partial<Record<PodcastSeat, string>>;
    audience?: string;
    structure?: string[];
    rules?: string[];
    material?: string[];
}
export declare const OUTLINE_MOMENT_KINDS: readonly ['hook', 'punchline', 'reveal', 'question', 'topicShift', 'emotional', 'callback', 'disagreement'];
export type OutlineMomentKind = (typeof OUTLINE_MOMENT_KINDS)[number];
export interface OutlineSegment {
    id: string;
    title: string;
    goal: string;
    lead: PodcastSeat;
    beats: string[];
    targetWords: number;
    mood: string;
    moments: Array<{
        kind: OutlineMomentKind;
        note: string;
        seat?: PodcastSeat;
    }>;
    handoff?: string;
}
export interface EpisodeOutline {
    title: string;
    summary: string;
    hook: string;
    segments: OutlineSegment[];
    closing: string;
}
export interface GesturesAspectValue {
    seat: PodcastSeat;
    energy?: number;
    gestures: PodcastPlannedGesture[];
}
export interface ExpressionAspectCue {
    seat: PodcastSeat;
    turn: string;
    word: number;
    expression: string;
    look?: 'camera' | 'hold' | 'tv';
    priority: number;
    why?: string;
}
export interface ExpressionsAspectValue {
    cues: ExpressionAspectCue[];
}
export interface InteractionsAspectValue {
    listen: Record<PodcastSeat, PodcastListenCue[]>;
}
export interface ActionsAspectValue {
    actions: Record<PodcastSeat, PodcastAction[]>;
}
export interface CameraAspectValue {
    intents: CameraIntent[];
}
export interface TalkFaceCue {
    word: number;
    expression?: string;
    look?: 'camera' | 'hold' | 'tv';
    nod?: boolean | number;
    priority: number;
    why?: string;
}
export interface TalkFaceAspectValue {
    cues: TalkFaceCue[];
}
export interface DialogueAspectValue {
    segment: string;
    turns: Array<{
        speaker: PodcastSeat;
        text: string;
        kind?: 'turn' | 'interruption' | 'attempt' | 'backchannel';
        tone?: string;
        on?: string;
        cutAfter?: string;
    }>;
}
export declare const ASPECT_STATUSES: readonly ['ok', 'repaired', 'fallback', 'failed', 'skipped', 'locked'];
export type AspectStatus = (typeof ASPECT_STATUSES)[number];
export interface AspectSampleInfo {
    index: number;
    ok: boolean;
    score?: number;
    problems: string[];
    elapsedMs: number;
    provider?: string;
    promptTokens?: number;
    completionTokens?: number;
    cost?: number;
    repairs?: number;
}
export interface AspectRecord<T = unknown> {
    version: 1;
    id: AspectRecordId;
    mode: 'podcast' | 'talk' | 'review' | 'create';
    status: AspectStatus;
    model?: string;
    value: T | null;
    samples: AspectSampleInfo[];
    chosen?: number;
    problems: string[];
    note?: string;
    elapsedMs: number;
    raw?: string;
}
export interface AspectEvent {
    aspect: AspectRecordId;
    phase: 'start' | 'sample' | 'repair' | 'done' | 'fallback' | 'failed';
    sample?: number;
    score?: number;
    elapsedMs: number;
    message: string;
}
export interface CompositionReport {
    taken: Record<string, number>;
    dropped: Array<{
        aspect: string;
        what: string;
        why: string;
    }>;
    adjusted: Array<{
        aspect: string;
        what: string;
        why: string;
    }>;
}
