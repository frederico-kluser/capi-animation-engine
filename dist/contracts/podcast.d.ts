import type { Scenario } from './scenario.js';
import type { CameraAngle, CameraIntent, CameraIntentKind, CameraMoveKind, CameraShot, CameraStyle, CameraTransitionKind, ShotFraming, ShotSize } from './camera.js';
import type { CaptionStyleId } from './captions.js';
import type { CharacterId } from './character.js';
import type { OutfitInput } from './outfit.js';
import type { VideoProfileId } from './profile.js';
import type { PodcastScene } from './scene.js';
import type { DrinkSpec, PodcastChairId, PodcastMicAdjust, PodcastMicId, SetPieces, TableItemSpec } from './set.js';
import type { TimelineSpec } from './timeline.js';
export declare const PODCAST_SEATS: readonly ['host', 'guest'];
export type PodcastSeat = (typeof PODCAST_SEATS)[number];
export declare const PODCAST_DEFAULT_CHARACTERS: Readonly<Record<PodcastSeat, CharacterId>>;
export declare const PODCAST_TURN_KINDS: readonly ['turn', 'interruption', 'attempt', 'backchannel'];
export type PodcastTurnKind = (typeof PODCAST_TURN_KINDS)[number];
export declare const PODCAST_MAIN_KINDS: ReadonlySet<PodcastTurnKind>;
export declare const PODCAST_EYES_MODES: readonly ['auto', 'eachOther', 'camera'];
export type PodcastEyesMode = (typeof PODCAST_EYES_MODES)[number];
export declare const PODCAST_ACTION_KINDS: readonly ['drink', 'adjustMic', 'checkNotes', 'checkPhone', 'leanBack', 'sitUp'];
export type PodcastActionKind = (typeof PODCAST_ACTION_KINDS)[number];
export type PodcastWordRef = string | number;
export type PodcastStart = {
    gapMs: number;
} | {
    after: string;
    gapMs?: number;
} | {
    during: string;
    on: PodcastWordRef;
    offsetMs?: number;
};
export interface PodcastGestureInput {
    on: PodcastWordRef;
    pose?: string;
    expression?: string;
    macro?: string;
}
export interface PodcastReactionInput {
    expression?: string;
    on?: PodcastWordRef;
    macro?: string;
}
export interface PodcastTurnInput {
    id?: string;
    speaker: PodcastSeat;
    text: string;
    kind?: PodcastTurnKind;
    start?: PodcastStart;
    cut?: {
        after: PodcastWordRef;
    };
    tone?: string;
    expression?: string;
    gestures?: PodcastGestureInput[];
    reaction?: PodcastReactionInput;
    show?: 'speaker' | 'listener';
    camera?: PodcastCameraIntentInput[];
    actions?: PodcastActionInput[];
}
export interface PodcastSpeakerInput {
    character?: CharacterId;
    name?: string;
    voice?: string;
    tone?: string;
    outfit?: OutfitInput;
    personality?: string;
    chair?: PodcastChairId;
    micModel?: PodcastMicId;
    micAdjust?: PodcastMicAdjust;
    items?: TableItemSpec[];
    drink?: DrinkSpec;
}
export interface PodcastCameraIntentInput {
    on: PodcastWordRef;
    until?: PodcastWordRef;
    intent: CameraIntentKind;
    framing?: ShotFraming;
    seat?: PodcastSeat;
    size?: ShotSize;
    move?: CameraMoveKind;
    angle?: CameraAngle;
    transition?: CameraTransitionKind;
    why?: string;
}
export interface PodcastActionInput {
    kind: PodcastActionKind;
    on: PodcastWordRef;
    seat?: PodcastSeat;
    why?: string;
}
export interface PodcastCameraInput {
    reactions?: boolean;
    minShotMs?: number;
    cutDelayMs?: number;
    style?: CameraStyle;
    multiSeat?: boolean;
    zooms?: boolean;
}
export interface PodcastPaceInput {
    gapMs?: [number, number];
}
export interface PodcastScript {
    version: 1;
    title?: string;
    topic?: string;
    language?: string;
    seed?: number;
    eyes?: PodcastEyesMode;
    speakers: Partial<Record<PodcastSeat, PodcastSpeakerInput>>;
    turns: PodcastTurnInput[];
    camera?: PodcastCameraInput;
    pace?: PodcastPaceInput;
    scene?: PodcastScene;
}
export interface PodcastWordSpec {
    text: string;
    startMs: number;
    endMs: number;
    stressStartMs: number;
    stressEndMs: number;
    confidence: number;
    peakDb: number;
    f0: number;
    f0RangeSt: number;
    stretch: number;
    prominence: number;
}
export interface PodcastVisemeSpec {
    startMs: number;
    endMs: number;
    viseme: string;
    intensity?: number;
}
export interface PodcastClip {
    src: string;
    durationMs: number;
    endMs?: number;
    gainDb?: number;
}
export interface PodcastTurnSpec {
    id: string;
    speaker: PodcastSeat;
    kind: PodcastTurnKind;
    text: string;
    atMs: number;
    audio: PodcastClip;
    words: PodcastWordSpec[];
    visemes: PodcastVisemeSpec[];
    expression?: string;
    reaction?: {
        expression?: string;
        word?: number;
        macro?: string;
    };
    show?: 'speaker' | 'listener';
    tone?: string;
    scripted?: boolean;
}
export interface PodcastPlannedGesture {
    turn: string;
    word: number;
    pose?: string;
    expression?: string;
    macro?: string;
    accent?: 'soft' | 'normal' | 'strong';
    nod?: boolean | number;
    take?: boolean;
    look?: 'camera' | 'hold' | 'tv';
    priority: number;
    why?: string;
}
export interface PodcastListenCue {
    turn: string;
    word: number;
    pose?: string;
    expression?: string;
    macro?: string;
    look?: 'camera' | 'other' | 'tv';
    holdWords?: number;
    priority: number;
    why?: string;
}
export interface PodcastAction {
    kind: PodcastActionKind;
    turn: string;
    word: number;
    priority: number;
    why?: string;
    scripted?: boolean;
}
export interface PodcastSeatSpec {
    character: CharacterId;
    name: string;
    outfit?: OutfitInput;
    voice?: string;
    tone?: string;
    personality?: string;
    chair?: PodcastChairId;
    micModel?: PodcastMicId;
    micAdjust?: PodcastMicAdjust;
    items?: TableItemSpec[];
    drink?: DrinkSpec;
    mirror: boolean;
    seed: number;
    plan: {
        rest: {
            pose: string;
            expression: string;
        };
        gestures: PodcastPlannedGesture[];
        listen?: PodcastListenCue[];
        actions?: PodcastAction[];
    };
}
export interface PodcastCameraSpec {
    reactions: boolean;
    minShotMs: number;
    cutDelayMs: number;
    cuts: PodcastManualCut[];
    style?: CameraStyle;
    multiSeat?: boolean;
    zooms?: boolean;
    plan?: CameraIntent[];
}
export interface PodcastManualCut {
    atMs: number;
    show: PodcastSeat;
    framing?: ShotFraming;
    size?: ShotSize;
    zoom?: number;
    move?: CameraMoveKind;
    angle?: CameraAngle;
    transition?: CameraTransitionKind;
}
export interface PodcastRenderPrefs {
    profile?: VideoProfileId;
    captions?: CaptionStyleId;
    aspect?: '16:9' | '9:16' | '1:1' | '4:5' | 'native';
    background?: {
        kind: 'studio' | 'chroma' | 'color' | 'image' | 'transparent' | 'scenario';
        color?: string;
        key?: 'green' | 'blue';
        src?: string;
        scenario?: Scenario;
        library?: string;
    };
}
export interface PodcastSpec {
    version: 1;
    kind: 'anchor-podcast';
    title?: string;
    topic?: string;
    language: string;
    fps: number;
    seed: number;
    leadInMs: number;
    tailMs: number;
    set: SetPieces;
    eyes?: PodcastEyesMode;
    seats: Record<PodcastSeat, PodcastSeatSpec>;
    turns: PodcastTurnSpec[];
    camera: PodcastCameraSpec;
    mix?: {
        src: string;
        durationMs: number;
    };
    render?: PodcastRenderPrefs;
    source?: {
        script?: string;
        ttsModel?: string;
        createdAt?: string;
        engine?: string;
    };
    scene?: PodcastScene;
    aspects?: Record<string, {
        status: string;
        model?: string;
        file?: string;
        score?: number;
        elapsedMs?: number;
    }>;
}
export interface PodcastShot extends Partial<Omit<CameraShot, 'fromMs' | 'toMs' | 'seat'>> {
    fromMs: number;
    toMs: number;
    seat: PodcastSeat;
    reason: 'speaker' | 'reaction' | 'manual' | 'plan';
}
export interface PodcastAudioClip {
    turn: string;
    seat: PodcastSeat;
    src: string;
    fromMs: number;
    playMs: number;
    fadeOutMs: number;
    gainDb: number;
}
export interface CompiledPodcastSeat {
    timeline: TimelineSpec;
    character: CharacterId;
    outfit?: OutfitInput;
    mirror: boolean;
    seed: number;
}
export interface CompiledPodcast {
    durationMs: number;
    seats: Record<PodcastSeat, CompiledPodcastSeat>;
    shots: PodcastShot[];
    clips: PodcastAudioClip[];
    warnings: string[];
    profile?: VideoProfileId;
    cameraFit?: PodcastCameraFit[];
}
export interface PodcastCameraFit {
    fromMs: number;
    toMs: number;
    seat: PodcastSeat;
    pose: string;
    from: ShotSize;
    to: ShotSize;
    shiftX?: number;
    zoom?: number;
    stilled?: true;
    angleDropped?: CameraAngle;
    fits: boolean;
    note: string;
}
