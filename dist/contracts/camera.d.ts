import type { PodcastSeat } from './podcast.js';
export declare const SHOT_FRAMINGS: readonly ['single', 'two', 'wide', 'split', 'insert', 'favor', 'pip'];
export type ShotFraming = (typeof SHOT_FRAMINGS)[number];
export declare const SHOT_SIZES: readonly ['loose', 'medium', 'mediumClose', 'close', 'extreme'];
export type ShotSize = (typeof SHOT_SIZES)[number];
export declare const SHOT_SIZE_LADDER: readonly ShotSize[];
export declare const CAMERA_ANGLES: readonly ['main', 'side', 'low', 'high', 'dutch'];
export type CameraAngle = (typeof CAMERA_ANGLES)[number];
export interface CameraView {
    turn?: number;
    nod?: number;
    roll?: number;
}
export declare const CAMERA_MOVES: readonly ['static', 'push', 'pull', 'snap', 'drift', 'punchOut', 'shake', 'handheld', 'pan', 'step'];
export type CameraMoveKind = (typeof CAMERA_MOVES)[number];
export declare const CAMERA_TRANSITIONS: readonly ['cut', 'whip', 'zoom', 'flash', 'dip', 'dissolve'];
export type CameraTransitionKind = (typeof CAMERA_TRANSITIONS)[number];
export declare const CAMERA_INTENTS: readonly ['establish', 'speaker', 'reaction', 'emphasis', 'punchline', 'reveal', 'question', 'topicShift', 'overlap', 'insert', 'closing', 'hook', 'aside', 'list', 'impact', 'cta'];
export type CameraIntentKind = (typeof CAMERA_INTENTS)[number];
export declare const CAMERA_STYLES: readonly ['calm', 'interview', 'dynamic', 'live', 'cinematic'];
export type CameraStyle = (typeof CAMERA_STYLES)[number];
export interface CameraIntent {
    turn?: string;
    word: number;
    untilTurn?: string;
    untilWord?: number;
    intent: CameraIntentKind;
    framing?: ShotFraming;
    seat?: PodcastSeat;
    size?: ShotSize;
    move?: CameraMoveKind;
    angle?: CameraAngle;
    transition?: CameraTransitionKind;
    priority: number;
    why?: string;
}
export declare const CAMERA_SHOT_SOURCES: readonly ['auto', 'plan', 'manual'];
export type CameraShotSource = (typeof CAMERA_SHOT_SOURCES)[number];
export interface CameraShot {
    fromMs: number;
    toMs: number;
    framing: ShotFraming;
    seat?: PodcastSeat;
    size: ShotSize;
    zoom: number;
    move: CameraMoveKind;
    moveAmount?: number;
    moveMs?: number;
    shiftX?: number;
    angle?: CameraAngle;
    view?: CameraView;
    transition?: CameraTransitionKind;
    transitionMs?: number;
    intent: CameraIntentKind;
    source: CameraShotSource;
    why?: string;
}
export interface CameraTrack {
    shots: CameraShot[];
    warnings: string[];
}
export interface CameraBox {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface CameraPanel {
    space: 'seat' | 'world';
    seat?: PodcastSeat;
    box: CameraBox;
    rect: CameraBox;
    view?: CameraView;
    inset?: boolean;
}
export interface CameraFx {
    overlay?: {
        color: 'white' | 'black';
        opacity: number;
    };
    blur?: number;
}
export interface CameraFrame {
    shot: CameraShot;
    panels: CameraPanel[];
    fx?: CameraFx;
    under?: {
        shot: CameraShot;
        panels: CameraPanel[];
    };
    opacity?: number;
}
