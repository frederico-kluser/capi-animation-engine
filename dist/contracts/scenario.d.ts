import type { DecorKind } from './scene.js';
export declare const SCENARIO_VERSION = 1;
export declare const SCENARIO_MODES: readonly ['talk', 'podcast', 'review'];
export type ScenarioMode = (typeof SCENARIO_MODES)[number];
export declare const SCENARIO_ASPECTS: readonly ['16:9', '9:16', '1:1', '4:5'];
export type ScenarioAspect = (typeof SCENARIO_ASPECTS)[number];
export declare const SCENARIO_KINDS: readonly ['color', 'image', 'video', 'gif', 'built'];
export type ScenarioKind = (typeof SCENARIO_KINDS)[number];
export interface ScenarioStop {
    at: number;
    color: string;
}
export type ScenarioFill = {
    kind: 'color';
    color: string;
} | {
    kind: 'gradient';
    shape: 'linear' | 'radial';
    angle?: number;
    center?: {
        x: number;
        y: number;
    };
    stops: ScenarioStop[];
};
export declare const SCENARIO_WALLS: readonly ['studio', 'night'];
export type ScenarioWall = (typeof SCENARIO_WALLS)[number];
export declare const SCENARIO_MEDIA_SOURCES: readonly ['image', 'video', 'gif'];
export type ScenarioMediaSource = (typeof SCENARIO_MEDIA_SOURCES)[number];
export interface ScenarioMedia {
    kind: 'image' | 'video';
    source?: ScenarioMediaSource;
    src: string;
    width: number;
    height: number;
    durationMs?: number;
    fps?: number;
    poster?: string;
    name?: string;
    bytes?: number;
    sha1?: string;
    blurBaked?: boolean;
}
export interface ScenarioFit {
    mode: 'cover' | 'contain';
    focusX: number;
    focusY: number;
    zoom: number;
}
export interface ScenarioLook {
    dim: number;
    blur: number;
    vignette: number;
}
export declare const SCENARIO_PIECE_TYPES: readonly ['decor', 'image'];
export type ScenarioPieceType = (typeof SCENARIO_PIECE_TYPES)[number];
export interface ScenarioPiece {
    id: string;
    type: ScenarioPieceType;
    kind?: DecorKind;
    src?: string;
    natural?: {
        width: number;
        height: number;
    };
    x: number;
    y: number;
    size: number;
    rotation?: number;
    flipX?: boolean;
    opacity?: number;
}
export interface ScenarioOverride {
    fit?: Partial<ScenarioFit>;
    look?: Partial<ScenarioLook>;
    hidePieces?: boolean;
}
export interface Scenario {
    version: 1;
    id: string;
    name: string;
    fill: ScenarioFill;
    wall?: ScenarioWall;
    media?: ScenarioMedia;
    fit?: Partial<ScenarioFit>;
    pieces?: ScenarioPiece[];
    look?: Partial<ScenarioLook>;
    aspects?: Partial<Record<ScenarioAspect, ScenarioOverride>>;
    modes?: Partial<Record<ScenarioMode, ScenarioOverride>>;
    createdAt?: string;
    updatedAt?: string;
}
export interface ScenarioTarget {
    mode: ScenarioMode;
    width: number;
    height: number;
}
export interface ScenarioRect {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface ScenarioBackdropMedia extends ScenarioRect {
    kind: 'image' | 'video';
    src: string;
    poster?: string;
    durationMs?: number;
    fps?: number;
    blurBaked?: boolean;
}
export interface ScenarioBackdropPiece {
    id: string;
    type: ScenarioPieceType;
    kind?: DecorKind;
    src?: string;
    x: number;
    y: number;
    width: number;
    height: number;
    scale: number;
    rotation: number;
    flipX: boolean;
    opacity: number;
}
export interface ScenarioBackdrop {
    version: 1;
    id: string;
    name: string;
    mode: ScenarioMode;
    aspect: ScenarioAspect;
    width: number;
    height: number;
    color: string;
    paint: string;
    wall?: {
        tone: ScenarioWall;
        height: number;
    };
    media?: ScenarioBackdropMedia;
    pieces: ScenarioBackdropPiece[];
    blur: number;
    bleed: number;
    dim: number;
    vignette: number;
    files: string[];
}
export type ScenarioDefaults = Partial<Record<ScenarioMode, string>>;
