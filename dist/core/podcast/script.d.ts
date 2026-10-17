import { type CameraAngle, type CameraIntentKind, type CameraMoveKind, type CameraStyle, type CameraTransitionKind, type ShotFraming, type ShotSize } from '../../contracts/camera.js';
import type { CharacterId } from '../../contracts/character.js';
import { type ExpressionId } from '../../contracts/face.js';
import { type OutfitInput } from '../../contracts/outfit.js';
import { type PodcastActionKind, type PodcastEyesMode, type PodcastSeat, type PodcastTurnKind } from '../../contracts/podcast.js';
import { type PodcastScene } from '../../contracts/scene.js';
import { type DrinkSpec, type PodcastChairId, type PodcastMicAdjust, type PodcastMicId, type TableItemKind, type TableItemSpec } from '../../contracts/set.js';
import type { ScriptWord } from '../../contracts/talk.js';
import { type PoseId } from '../../presets/poses.js';
import { type GestureMacro } from '../talk/plan.js';
import { type ToneId } from '../talk/tones.js';
export interface PodcastScriptGesture {
    word: number;
    pose?: PoseId;
    expression?: ExpressionId;
    macro?: GestureMacro;
}
export type PodcastScriptStart = {
    kind: 'auto';
} | {
    kind: 'gap';
    gapMs: number;
} | {
    kind: 'after';
    turn: string;
    gapMs?: number;
} | {
    kind: 'during';
    turn: string;
    word: number;
    offsetMs: number;
};
export interface PodcastScriptTurn {
    id: string;
    index: number;
    speaker: PodcastSeat;
    kind: PodcastTurnKind;
    main: boolean;
    text: string;
    words: ScriptWord[];
    start: PodcastScriptStart;
    cut?: number;
    tone: ToneId;
    expression?: ExpressionId;
    gestures?: PodcastScriptGesture[];
    reaction?: {
        expression?: ExpressionId;
        word?: number;
        macro?: GestureMacro;
    };
    show?: 'speaker' | 'listener';
    camera?: PodcastScriptCameraIntent[];
    actions?: PodcastScriptAction[];
}
export interface PodcastScriptCameraIntent {
    word: number;
    until?: number;
    intent: CameraIntentKind;
    framing?: ShotFraming;
    seat?: PodcastSeat;
    size?: ShotSize;
    move?: CameraMoveKind;
    angle?: CameraAngle;
    transition?: CameraTransitionKind;
    why?: string;
}
export interface PodcastScriptAction {
    kind: PodcastActionKind;
    word: number;
    seat: PodcastSeat;
    why?: string;
}
export interface PodcastScriptSpeaker {
    seat: PodcastSeat;
    character: CharacterId;
    name: string;
    voice?: string;
    tone: ToneId;
    outfit?: OutfitInput;
    personality?: string;
    chair?: PodcastChairId;
    micModel?: PodcastMicId;
    micAdjust?: PodcastMicAdjust;
    items?: TableItemSpec[];
    drink?: DrinkSpec;
}
export interface PodcastScriptCamera {
    reactions: boolean;
    minShotMs: number;
    cutDelayMs: number;
    style?: CameraStyle;
    multiSeat?: boolean;
    zooms?: boolean;
}
export interface NormalizedPodcastScript {
    version: 1;
    title?: string;
    topic?: string;
    language: string;
    seed: number;
    eyes: PodcastEyesMode;
    speakers: Record<PodcastSeat, PodcastScriptSpeaker>;
    turns: PodcastScriptTurn[];
    camera: PodcastScriptCamera;
    pace: {
        gapMs: [number, number];
    };
    scene?: PodcastScene;
}
export interface PodcastScriptCheck {
    script: NormalizedPodcastScript | null;
    errors: string[];
    warnings: string[];
}
export declare const PODCAST_SCRIPT_FIELDS: {
    readonly script: readonly ['version', 'title', 'topic', 'language', 'seed', 'eyes', 'speakers', 'turns', 'camera', 'pace', 'scene'];
    readonly speaker: readonly ['character', 'name', 'voice', 'tone', 'outfit', 'personality', 'chair', 'micModel', 'micAdjust', 'items', 'drink'];
    readonly turn: readonly ['id', 'speaker', 'text', 'kind', 'start', 'cut', 'tone', 'expression', 'gestures', 'reaction', 'show', 'camera', 'actions'];
    readonly start: readonly ['gapMs', 'after', 'during', 'on', 'offsetMs'];
    readonly cut: readonly ['after'];
    readonly gesture: readonly ['on', 'pose', 'expression', 'macro'];
    readonly reaction: readonly ['expression', 'on', 'macro'];
    readonly camera: readonly ['reactions', 'minShotMs', 'cutDelayMs', 'style', 'multiSeat', 'zooms'];
    readonly pace: readonly ['gapMs'];
    readonly drink: readonly ['kind', 'slot'];
    readonly cameraIntent: readonly ['on', 'until', 'intent', 'framing', 'seat', 'size', 'move', 'angle', 'transition', 'why'];
    readonly action: readonly ['kind', 'on', 'seat', 'why'];
};
export declare const PODCAST_SCENE_FIELDS: {
    readonly scene: readonly ['version', 'objects', 'assets'];
    readonly object: readonly ['id', 'type', 'kind', 'src', 'name', 'layer', 'x', 'y', 'rotation', 'scale', 'scaleX', 'scaleY', 'opacity', 'flipX', 'locked', 'hidden', 'order', 'natural', 'seat'];
    readonly asset: readonly ['src', 'sha1', 'mime', 'width', 'height', 'bytes', 'name'];
};
export declare const PODCAST_SCRIPT_LIMITS: {
    readonly idPattern: RegExp;
    readonly idMax: 40;
    readonly titleMax: 200;
    readonly topicMax: 2000;
    readonly languageMax: 20;
    readonly nameMax: 40;
    readonly personalityMax: 600;
    readonly offsetMaxMs: 3000;
    readonly paceMaxMs: 3000;
    readonly minShotMs: readonly [number, number];
    readonly cutDelayMs: readonly [number, number];
    readonly whyMax: 140;
    readonly cameraPerTurn: 4;
    readonly actionsPerTurn: 2;
    readonly sceneObjectsMax: 300;
    readonly sceneIdPattern: RegExp;
    readonly sceneScale: readonly [number, number];
};
export declare const PODCAST_REACTION_MACROS: readonly GestureMacro[];
export declare function parsePodcastScript(raw: unknown): PodcastScriptCheck;
export declare function seatItemKinds(seat: PodcastSeat, speakers: Readonly<Record<PodcastSeat, Pick<PodcastScriptSpeaker, 'items'>>>, scene?: PodcastScene): Set<TableItemKind>;
export declare function podcastActionProblem(kind: PodcastActionKind, seat: PodcastSeat, speaker: Pick<PodcastScriptSpeaker, 'drink' | 'micModel'>, items: ReadonlySet<TableItemKind>): string | undefined;
