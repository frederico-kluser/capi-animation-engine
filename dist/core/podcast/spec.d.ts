import type { CameraIntent } from '../../contracts/camera.js';
import { type CaptionStyleId } from '../../contracts/captions.js';
import type { CharacterId } from '../../contracts/character.js';
import { type VideoProfileId } from '../../contracts/profile.js';
import { type PodcastAction, type PodcastPlannedGesture, type PodcastRenderPrefs, type PodcastSeat, type PodcastSpec } from '../../contracts/podcast.js';
import type { AlignmentResult, ScriptWord, WordProsody } from '../../contracts/talk.js';
import type { VisemeCue } from '../../contracts/timeline.js';
import type { VoiceEmotion } from '../talk/emotion.js';
import { type PodcastSchedule } from './schedule.js';
import type { NormalizedPodcastScript, PodcastScriptTurn } from './script.js';
export interface PodcastTurnAnalysis {
    words: readonly ScriptWord[];
    alignment: Pick<AlignmentResult, 'words' | 'speechStartMs' | 'speechEndMs' | 'durationMs'>;
    prosody: readonly WordProsody[];
    lip: {
        cues: readonly VisemeCue[];
    };
}
export interface BuildPodcastOptions {
    audioSrc?: (turn: PodcastScriptTurn) => string;
    leadInMs?: number;
    tailMs?: number;
    fps?: number;
    voices?: Partial<Record<PodcastSeat, string>>;
    availableVoices?: readonly string[];
    pickSeeds?: boolean;
    render?: PodcastRenderPrefs;
    mix?: {
        src: string;
        durationMs: number;
    };
    source?: PodcastSpec['source'];
}
export interface PodcastBuild {
    spec: PodcastSpec;
    schedule: PodcastSchedule;
    warnings: string[];
}
export declare const PODCAST_FRAME_ASPECTS: readonly ['16:9', '9:16', '1:1', '4:5', 'native'];
export type PodcastFrameAspect = (typeof PODCAST_FRAME_ASPECTS)[number];
export declare function readPodcastRenderPrefs(render: unknown, warnings?: string[]): PodcastRenderPrefs | undefined;
export declare function podcastFrameAspect(spec: Pick<PodcastSpec, 'render'> | null | undefined, options?: {
    aspect?: unknown;
    profile?: unknown;
}): PodcastFrameAspect;
export interface PodcastRenderPatch {
    profile?: VideoProfileId | null;
    captions?: CaptionStyleId | 'auto' | null;
    aspect?: PodcastFrameAspect | null;
}
export declare function withPodcastRender(spec: PodcastSpec, patch: PodcastRenderPatch): PodcastSpec;
export declare function scriptCameraIntents(script: Pick<NormalizedPodcastScript, 'turns'>, known?: ReadonlySet<string>): CameraIntent[];
export declare function scriptActions(script: Pick<NormalizedPodcastScript, 'turns'>, known?: ReadonlySet<string>): Record<PodcastSeat, PodcastAction[]>;
export declare function pickSeatSeeds(spec: PodcastSpec): void;
export interface PodcastVoiceOptions {
    voices?: Partial<Record<PodcastSeat, string>>;
    available?: readonly string[];
    saved?: Partial<Record<CharacterId, string>> | undefined;
    vary?: {
        key: string | number;
        emotion?: Partial<Record<PodcastSeat, VoiceEmotion>>;
    } | undefined;
}
export declare function podcastVoices(script: Pick<NormalizedPodcastScript, 'speakers'>, options?: PodcastVoiceOptions): Record<PodcastSeat, string>;
export declare function planPodcastSpec(script: NormalizedPodcastScript, analyses: Readonly<Record<string, PodcastTurnAnalysis>>, plans?: Partial<Record<PodcastSeat, readonly PodcastPlannedGesture[]>>, options?: BuildPodcastOptions): PodcastBuild;
export declare function buildPodcastSpec(script: NormalizedPodcastScript, analyses: Readonly<Record<string, PodcastTurnAnalysis>>, plans?: Partial<Record<PodcastSeat, readonly PodcastPlannedGesture[]>>, options?: BuildPodcastOptions): PodcastSpec;
