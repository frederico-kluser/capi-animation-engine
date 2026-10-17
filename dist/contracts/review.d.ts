import type { CameraAngle, CameraFx, CameraMoveKind, CameraShot, CameraStyle, CameraTransitionKind, CameraView, ShotSize } from './camera.js';
import type { CharacterId } from './character.js';
import type { OutfitInput } from './outfit.js';
import type { PodcastEyesMode, PodcastSeat, PodcastSpec, PodcastSpeakerInput, PodcastTurnInput } from './podcast.js';
import type { Point, PoseInput } from './pose.js';
import type { VideoProfileId } from './profile.js';
import type { SetInput } from './set.js';
import type { TimelineSpec } from './timeline.js';
export declare const REVIEW_MODES: readonly ['talk', 'podcast'];
export type ReviewMode = (typeof REVIEW_MODES)[number];
export declare const REVIEW_ASPECTS: readonly ['16:9', '9:16', '1:1'];
export type ReviewAspect = (typeof REVIEW_ASPECTS)[number];
export declare const REVIEW_SIDES: readonly ['left', 'right'];
export type ReviewSide = (typeof REVIEW_SIDES)[number];
export declare const REVIEW_UNTIL_STEPS: readonly ['subtitles', 'analysis', 'points', 'script'];
export type ReviewUntil = (typeof REVIEW_UNTIL_STEPS)[number];
export declare const REVIEW_REDO_STEPS: readonly ['subtitles', 'analysis', 'points', 'script', 'commentary'];
export type ReviewRedoStep = (typeof REVIEW_REDO_STEPS)[number];
export declare const REVIEW_EXPORT_FORMATS: readonly ['mp4', 'webm', 'mov'];
export type ReviewExportFormat = (typeof REVIEW_EXPORT_FORMATS)[number];
export declare const REVIEW_EXPORT_SUBS: readonly ['video', 'all', 'none'];
export type ReviewExportSubs = (typeof REVIEW_EXPORT_SUBS)[number];
export interface ReviewVideoInfo {
    src: string;
    original?: string;
    name?: string;
    sha1: string;
    bytes: number;
    durationMs: number;
    width: number;
    height: number;
    fps: number;
    hasAudio: boolean;
    audio?: string;
    proxy?: string;
}
export interface SubtitleWord {
    text: string;
    startMs: number;
    endMs: number;
}
export interface SubtitleCue {
    index: number;
    startMs: number;
    endMs: number;
    text: string;
    speaker?: string;
    words?: SubtitleWord[];
}
export declare const SUBTITLE_SOURCES: readonly ['file', 'stt', 'none'];
export type SubtitleSource = (typeof SUBTITLE_SOURCES)[number];
export declare const SUBTITLE_FORMATS: readonly ['srt', 'vtt'];
export type SubtitleFormat = (typeof SUBTITLE_FORMATS)[number];
export interface ReviewSubtitles {
    version: 1;
    source: SubtitleSource;
    format?: SubtitleFormat;
    language?: string;
    model?: string;
    file?: string;
    cues: SubtitleCue[];
    warnings?: string[];
}
export declare const REVIEW_MOMENT_KINDS: readonly ['hook', 'highlight', 'funny', 'surprising', 'claim', 'question', 'emotional', 'visual', 'controversial', 'keyPoint', 'twist', 'ending'];
export type ReviewMomentKind = (typeof REVIEW_MOMENT_KINDS)[number];
export interface ReviewAnalysisSegment {
    id: string;
    fromMs: number;
    toMs: number;
    title: string;
    summary: string;
    visual?: string;
    speech?: string;
    mood?: string;
}
export interface ReviewAnalysisMoment {
    id: string;
    atMs: number;
    toMs?: number;
    kind: ReviewMomentKind;
    description: string;
    quote?: string;
    why: string;
    intensity: number;
    speechFree?: boolean;
    angle?: string;
}
export interface ReviewAnalysisEntity {
    name: string;
    kind: 'person' | 'brand' | 'product' | 'place' | 'work' | 'other';
    note?: string;
}
export interface ReviewAnalysisClaim {
    atMs: number;
    claim: string;
    verify?: string;
}
export interface ReviewAnalysis {
    version: 1;
    title: string;
    summary: string;
    language?: string;
    genre?: string;
    tone?: string;
    audience?: string;
    topics: string[];
    segments: ReviewAnalysisSegment[];
    moments: ReviewAnalysisMoment[];
    entities?: ReviewAnalysisEntity[];
    claims?: ReviewAnalysisClaim[];
    onScreenText?: Array<{
        atMs: number;
        text: string;
    }>;
    angle?: string;
    source: {
        model?: string;
        chunks?: number;
        fallback?: boolean;
        cached?: boolean;
        elapsedMs?: number;
        cost?: number;
    };
    warnings?: string[];
}
export declare const REVIEW_REACTION_KINDS: readonly ['joke', 'context', 'counterpoint', 'question', 'factcheck', 'praise', 'skeptic', 'emotion', 'silent'];
export type ReviewReactionKind = (typeof REVIEW_REACTION_KINDS)[number];
export declare const REVIEW_POINT_MODES: readonly ['pause', 'over', 'reaction'];
export type ReviewPointMode = (typeof REVIEW_POINT_MODES)[number];
export interface ReviewReactionOption {
    kind: ReviewReactionKind;
    idea: string;
    seat?: PodcastSeat;
}
export interface ReviewPointDecision {
    worth: number;
    factcheck?: boolean;
    jokeSafe?: boolean;
    band: 'auto' | 'hitl' | 'abstain';
}
export interface ReviewReactionPoint {
    id: string;
    moment: string;
    atMs: number;
    toMs?: number;
    kind: ReviewMomentKind;
    what: string;
    quote?: string;
    why: string;
    options: ReviewReactionOption[];
    mode: ReviewPointMode;
    verify?: string;
    decide?: ReviewPointDecision;
    rank: number;
    recommended: boolean;
}
export interface ReviewPoints {
    version: 1;
    stance: string;
    points: ReviewReactionPoint[];
    source: {
        model?: string;
        fallback?: boolean;
        decide?: 'jev' | 'model';
        elapsedMs?: number;
        cost?: number;
    };
    warnings?: string[];
}
export interface ReviewReactionPick {
    point: string;
    option?: number;
    kind?: ReviewReactionKind;
    note?: string;
    seat?: PodcastSeat;
    mode?: ReviewPointMode;
}
export interface ReviewReactionPlan {
    version: 1;
    stance?: string;
    picks: ReviewReactionPick[];
}
export declare const REVIEW_BLOCK_MODES: readonly ['pause', 'over'];
export type ReviewBlockMode = (typeof REVIEW_BLOCK_MODES)[number];
export type ReviewAnchor = number | 'start' | 'end';
export interface ReviewBlockInput {
    id?: string;
    at: ReviewAnchor;
    mode?: ReviewBlockMode;
    moment?: string;
    why?: string;
    turns?: PodcastTurnInput[];
    text?: string;
}
export declare const REVIEW_REACTION_MACROS: readonly ['agree', 'deny', 'laugh'];
export type ReviewReactionMacro = (typeof REVIEW_REACTION_MACROS)[number];
export declare const REVIEW_LOOKS: readonly ['tv', 'camera', 'other'];
export type ReviewLook = (typeof REVIEW_LOOKS)[number];
export interface ReviewReactionInput {
    at: number;
    seat?: PodcastSeat;
    expression?: string;
    macro?: ReviewReactionMacro;
    look?: ReviewLook;
    holdMs?: number;
    camera?: boolean;
    why?: string;
}
export declare const REVIEW_VIDEO_FRAMINGS: readonly ['stage', 'tv', 'auto'];
export type ReviewVideoFraming = (typeof REVIEW_VIDEO_FRAMINGS)[number];
export interface ReviewCameraInput {
    style?: CameraStyle;
    duringVideo?: ReviewVideoFraming;
    zooms?: boolean;
    cuts?: ReviewManualCut[];
}
export interface ReviewSubtitleOptions {
    video?: boolean;
    commentary?: boolean;
}
export interface ReviewAudioOptions {
    videoGainDb?: number | 'auto';
    duckDb?: number;
}
export interface ReviewScript {
    version: 1;
    kind: 'anchor-review';
    mode: ReviewMode;
    title?: string;
    language?: string;
    seed?: number;
    prompt?: string;
    speakers: Partial<Record<PodcastSeat, PodcastSpeakerInput>>;
    blocks: ReviewBlockInput[];
    reactions?: ReviewReactionInput[];
    camera?: ReviewCameraInput;
    subtitles?: ReviewSubtitleOptions;
    audio?: ReviewAudioOptions;
    layout?: {
        aspect?: ReviewAspect;
        side?: ReviewSide;
    };
    eyes?: PodcastEyesMode;
    densityNote?: string;
}
export interface ReviewPlaySegment {
    kind: 'play';
    fromMs: number;
    toMs: number;
    videoFromMs: number;
}
export interface ReviewHoldSegment {
    kind: 'hold';
    fromMs: number;
    toMs: number;
    videoAtMs: number;
    reason: 'leadIn' | 'block' | 'tail';
    block?: string;
}
export type ReviewSegment = ReviewPlaySegment | ReviewHoldSegment;
export interface ReviewDuckWindow {
    fromMs: number;
    toMs: number;
    block: string;
}
export interface ReviewBlockPlacement {
    id: string;
    at: ReviewAnchor;
    mode: ReviewBlockMode;
    videoAtMs: number;
    fromMs: number;
    toMs: number;
}
export interface ReviewTimeline {
    durationMs: number;
    segments: ReviewSegment[];
    duck: ReviewDuckWindow[];
    blocks: ReviewBlockPlacement[];
    warnings: string[];
}
export interface ReviewTimingOptions {
    leadInMs: number;
    padBeforeMs: number;
    padAfterMs: number;
    tailMs: number;
    minPlayMs: number;
}
export interface ReviewRect {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface ReviewSeatPlacement {
    seat: PodcastSeat;
    x: number;
    y: number;
    scale: number;
    mirror: boolean;
}
export interface ReviewStageLayout {
    mode: ReviewMode;
    aspect: ReviewAspect;
    side: ReviewSide;
    width: number;
    height: number;
    screen: ReviewRect;
    bezel: number;
    seats: Partial<Record<PodcastSeat, ReviewSeatPlacement>>;
    seam?: number;
    subtitleBox: ReviewRect;
    captionBox: ReviewRect;
    tvLook: Partial<Record<PodcastSeat, Point>>;
    tvHead: Partial<Record<PodcastSeat, {
        turn: number;
        nod: number;
    }>>;
    table: boolean;
}
export declare const REVIEW_FRAMINGS: readonly ['stage', 'tv', 'seat'];
export type ReviewFraming = (typeof REVIEW_FRAMINGS)[number];
export declare const REVIEW_SHOT_SOURCES: readonly ['auto', 'commentary', 'reaction', 'manual'];
export type ReviewShotSource = (typeof REVIEW_SHOT_SOURCES)[number];
export interface ReviewShot {
    fromMs: number;
    toMs: number;
    framing: ReviewFraming;
    seat?: PodcastSeat;
    size: ShotSize;
    zoom: number;
    move: CameraMoveKind;
    moveAmount?: number;
    moveMs?: number;
    source: ReviewShotSource;
    why?: string;
    angle?: CameraAngle;
    view?: CameraView;
    transition?: CameraTransitionKind;
    transitionMs?: number;
}
export interface ReviewManualCut {
    atMs: number;
    framing: ReviewFraming;
    seat?: PodcastSeat;
    size?: ShotSize;
    zoom?: number;
    move?: CameraMoveKind;
    angle?: CameraAngle;
    transition?: CameraTransitionKind;
}
export interface ReviewReaction {
    atMs: number;
    seat: PodcastSeat;
    expression?: string;
    macro?: ReviewReactionMacro;
    look?: ReviewLook;
    holdMs: number;
    camera: boolean;
    why?: string;
}
export interface ReviewCastMember {
    character: CharacterId;
    name: string;
    outfit?: OutfitInput;
    voice?: string;
    tone?: string;
}
export type ReviewCommentaryRef = {
    kind: 'talk';
    dir: string;
    tvLook?: Point;
} | {
    kind: 'podcast';
    dir: string;
};
export interface ReviewSpec {
    version: 1;
    kind: 'anchor-review';
    mode: ReviewMode;
    title?: string;
    language: string;
    fps: number;
    seed: number;
    video: ReviewVideoInfo;
    subtitles: ReviewSubtitles;
    analysis?: {
        file: string;
        title?: string;
        summary?: string;
        model?: string;
    };
    script?: {
        file: string;
    };
    timeline: ReviewTimeline;
    reactions: ReviewReaction[];
    profile?: VideoProfileId;
    layout: {
        aspect: ReviewAspect;
        side: ReviewSide;
    };
    camera: {
        style: CameraStyle;
        duringVideo: ReviewVideoFraming;
        zooms: boolean;
        cuts: ReviewManualCut[];
    };
    audio: {
        mix: string;
        durationMs: number;
        videoGainDb: number;
        duckDb: number;
        targetLufs?: number | null;
        loudness?: {
            inputLufs?: number;
            outputLufs?: number;
            gainDb: number;
            truePeakDb?: number;
        };
    };
    subtitlesShow: Required<ReviewSubtitleOptions>;
    commentary: ReviewCommentaryRef;
    cast: Partial<Record<PodcastSeat, ReviewCastMember>>;
    captions?: {
        srt: string;
        vtt: string;
    };
    source?: {
        createdAt?: string;
        analysisModel?: string;
        writerModel?: string;
        ttsModel?: string;
        prompt?: string;
        engine?: string;
    };
}
export type ReviewCommentary = {
    kind: 'talk';
    timeline: TimelineSpec;
    base?: PoseInput;
    expression?: string;
    seed: number;
    character: CharacterId;
    outfit?: OutfitInput;
    camera?: CameraShot[];
    audio: string;
    tvLook?: Point;
} | {
    kind: 'podcast';
    spec: PodcastSpec;
    dir: string;
};
export interface CompiledReviewSeat {
    seat: PodcastSeat;
    timeline: TimelineSpec;
    character: CharacterId;
    outfit?: OutfitInput;
    mirror: boolean;
    seed: number;
    set?: SetInput;
    base?: PoseInput;
    expression?: string;
}
export interface ReviewCaption {
    startMs: number;
    endMs: number;
    text: string;
    kind: 'video' | 'commentary';
    speaker?: string;
    seat?: PodcastSeat;
}
export interface CompiledReview {
    durationMs: number;
    segments: ReviewSegment[];
    duck: ReviewDuckWindow[];
    seats: Partial<Record<PodcastSeat, CompiledReviewSeat>>;
    shots: ReviewShot[];
    captions: ReviewCaption[];
    warnings: string[];
    profile?: VideoProfileId;
}
export interface ReviewPanel {
    seat: PodcastSeat;
    rect: ReviewRect;
    box: ReviewRect;
    viewBox: string;
    view?: {
        turn?: number;
        nod?: number;
    };
}
export interface ReviewFrameLayer {
    shot: ReviewShot;
    crop: ReviewRect;
    stage: ReviewRect;
    screen: ReviewRect;
    bezel: ReviewRect;
    panels: ReviewPanel[];
    roll?: number;
}
export interface ReviewFrame {
    timeMs: number;
    videoMs: number;
    playing: boolean;
    segment: ReviewSegment;
    shot: ReviewShot;
    crop: ReviewRect;
    stage: ReviewRect;
    screen: ReviewRect;
    bezel: ReviewRect;
    panels: ReviewPanel[];
    subtitle?: {
        text: string;
        rect: ReviewRect;
        fontSize: number;
    };
    caption?: {
        text: string;
        speaker?: string;
        rect: ReviewRect;
        fontSize: number;
    };
    videoVolume: number;
    roll?: number;
    fx?: CameraFx;
    under?: ReviewFrameLayer;
    opacity?: number;
}
