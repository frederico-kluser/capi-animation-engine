import type { OutlineMomentKind } from '../../../contracts/aspects.js';
import type { CameraStyle } from '../../../contracts/camera.js';
import type { CatalogDetail } from '../../../contracts/catalog.js';
import type { CharacterId } from '../../../contracts/character.js';
import type { ProfileAspect, VideoProfileId } from '../../../contracts/profile.js';
import { type PodcastEyesMode, type PodcastSeat, type PodcastSpec, type PodcastTurnKind } from '../../../contracts/podcast.js';
import type { ReviewAnchor, ReviewBlockMode } from '../../../contracts/review.js';
import type { DrinkSpec, PodcastChairId, PodcastMicId, TableItemKind } from '../../../contracts/set.js';
import { type NormalizedPodcastScript } from '../../podcast/script.js';
import { type SpeechLanguage } from '../../speech/g2p.js';
export interface AspectTurnTiming {
    startMs: number;
    endMs: number;
    words: Array<{
        startMs: number;
        endMs: number;
    }>;
}
export interface AspectTimeline {
    durationMs: number;
    turns: Record<string, AspectTurnTiming>;
    source: 'estimated' | 'measured';
}
export declare function aspectSpeechLanguage(language: string): SpeechLanguage;
export declare function estimatePodcastTimeline(script: NormalizedPodcastScript, options?: {
    model?: string;
}): AspectTimeline;
export declare function measuredTimeline(spec: PodcastSpec): AspectTimeline;
export interface AspectWord {
    index: number;
    text: string;
    core: string;
    functional: boolean;
    startMs: number;
    endMs: number;
}
export interface AspectTurn {
    label: string;
    id: string;
    index: number;
    speaker: PodcastSeat;
    kind: PodcastTurnKind;
    main: boolean;
    text: string;
    words: AspectWord[];
    totalWords: number;
    cut?: number;
    startMs: number;
    endMs: number;
    tone: string;
    segment?: string;
    inside?: string;
    farewell?: number;
    fixed: {
        gestures: boolean;
        expression?: string;
        reaction: boolean;
        camera: boolean;
        actions: boolean;
        show?: 'speaker' | 'listener';
    };
}
export interface AspectSeat {
    seat: PodcastSeat;
    name: string;
    character: CharacterId;
    personality?: string;
    tone: string;
    chair?: PodcastChairId;
    micModel?: PodcastMicId;
    items: TableItemKind[];
    drink?: DrinkSpec;
}
export interface AspectMoment {
    kind: OutlineMomentKind;
    note: string;
    seat?: PodcastSeat;
    segment?: string;
    turn?: string;
}
export interface AspectSegment {
    id: string;
    title: string;
    first: string;
    last: string;
}
export interface PodcastReviewBlockInfo {
    id: string;
    turns: readonly string[];
    at: ReviewAnchor;
    mode: ReviewBlockMode;
    videoAtMs?: number;
}
export interface PodcastReviewContext {
    text: string;
    blocks?: readonly PodcastReviewBlockInfo[];
}
export interface PodcastAspectContext {
    title?: string;
    topic?: string;
    language: string;
    eyes: PodcastEyesMode;
    durationMs: number;
    timing: AspectTimeline['source'];
    seats: Record<PodcastSeat, AspectSeat>;
    turns: AspectTurn[];
    segments: AspectSegment[];
    moments: AspectMoment[];
    camera: {
        style: CameraStyle;
        multiSeat: boolean;
        zooms: boolean;
    };
    notes: Partial<Record<string, string>>;
    direction?: string;
    review?: PodcastReviewContext;
    profile?: VideoProfileId;
    catalog?: CatalogDetail;
}
export declare function promptLook(ctx: Pick<Partial<PodcastAspectContext>, 'profile' | 'catalog'>): {
    profile: VideoProfileId;
    aspect: ProfileAspect;
    detail: CatalogDetail;
};
export type PodcastProfileAspect = 'gestures' | 'expressions' | 'interactions' | 'actions' | 'camera';
export declare function profileBlock(ctx: Pick<Partial<PodcastAspectContext>, 'profile'>, aspect?: PodcastProfileAspect): string;
export interface AspectContextInput {
    script: NormalizedPodcastScript;
    timeline: AspectTimeline;
    segments?: ReadonlyArray<{
        id: string;
        title: string;
        turns: readonly string[];
    }>;
    moments?: ReadonlyArray<{
        kind: OutlineMomentKind;
        note: string;
        seat?: PodcastSeat;
        segment?: string;
        turn?: string;
    }>;
    camera?: Partial<PodcastAspectContext['camera']>;
    notes?: Partial<Record<string, string>>;
    direction?: string;
    review?: PodcastReviewContext;
    profile?: VideoProfileId;
    catalog?: CatalogDetail;
}
export declare function buildAspectContext(input: AspectContextInput): PodcastAspectContext;
export declare function turnByRef(ctx: Pick<PodcastAspectContext, 'turns'>, ref: unknown): AspectTurn | undefined;
export declare function speechSeconds(ctx: Pick<PodcastAspectContext, 'turns'>, seat: PodcastSeat, filter?: (t: AspectTurn) => boolean): number;
export interface ListenWindow {
    turn: AspectTurn;
    startMs: number;
    endMs: number;
    freeUntilMs: number;
}
export declare function listenWindows(ctx: Pick<PodcastAspectContext, 'turns' | 'durationMs'>, seat: PodcastSeat): ListenWindow[];
export declare function freeFromWord(ctx: Pick<PodcastAspectContext, 'turns' | 'durationMs'>, listener: PodcastSeat, turn: AspectTurn, word: number): number;
export declare function seatsBlock(ctx: Pick<PodcastAspectContext, 'seats'>): string;
export declare function momentsBlock(ctx: Pick<PodcastAspectContext, 'moments' | 'segments'>): string;
export declare function segmentsBlock(ctx: Pick<PodcastAspectContext, 'segments'>): string;
export interface ScriptBlockOptions {
    mark?: (t: AspectTurn) => string;
    number?: (t: AspectTurn) => boolean;
}
export declare function scriptBlock(ctx: Pick<PodcastAspectContext, 'turns' | 'seats'> & Pick<Partial<PodcastAspectContext>, 'review'>, options?: ScriptBlockOptions): string;
export declare function podcastReviewBlockHeader(b: PodcastReviewBlockInfo): string;
export declare function reviewBlock(ctx: Pick<PodcastAspectContext, 'review'>): string;
export declare function episodeLine(ctx: Pick<PodcastAspectContext, 'durationMs' | 'turns' | 'timing'>): string;
export declare function contextHeader(ctx: PodcastAspectContext, aspect?: string): string;
