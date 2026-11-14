import type { HandShape, HandView, Side } from './pose.js';
export declare const CAPTURE_GROUP_IDS: readonly ['torso', 'head', 'mouth', 'eyes', 'brows', 'armLeft', 'armRight', 'handLeft', 'handRight'];
export type CaptureGroupId = (typeof CAPTURE_GROUP_IDS)[number];
export declare const CAPTURE_CHANNEL_IDS: readonly ['torso.turn', 'torso.lean', 'torso.x', 'head.turn', 'head.nod', 'head.tilt', 'mouth.open', 'mouth.round', 'mouth.wide', 'mouth.smile', 'mouth.shift', 'eyes.closeLeft', 'eyes.closeRight', 'eyes.lookX', 'eyes.lookY', 'eyes.squint', 'brows.raiseLeft', 'brows.raiseRight', 'brows.inner', 'armLeft.upper', 'armLeft.upperLen', 'armLeft.fore', 'armLeft.foreLen', 'armRight.upper', 'armRight.upperLen', 'armRight.fore', 'armRight.foreLen', 'armLeft.contact', 'armRight.contact', 'handLeft.bend', 'handRight.bend'];
export type CaptureChannelId = (typeof CAPTURE_CHANNEL_IDS)[number];
export declare const CAPTURE_STEP_IDS: readonly ['handLeft.shape', 'handLeft.view', 'handRight.shape', 'handRight.view'];
export type CaptureStepId = (typeof CAPTURE_STEP_IDS)[number];
export type CaptureStepValue = HandShape | HandView;
export interface CaptureCurves {
    version: 1;
    durationMs: number;
    groups: CaptureGroupId[];
    curves: Partial<Record<CaptureChannelId, number[]>>;
    steps: Partial<Record<CaptureStepId, Array<[number, CaptureStepValue]>>>;
    presence: Partial<Record<CaptureGroupId, number[]>>;
}
export type CaptureClipInput = CaptureCurves | string;
export interface CaptureCue {
    atMs: number;
    clip: CaptureClipInput;
    groups?: CaptureGroupId[];
    fadeInMs?: number;
    fadeOutMs?: number;
    weight?: number;
    speed?: number;
    hold?: boolean;
}
export declare const CAPTURE_CUE_DEFAULTS: {
    readonly fadeInMs: 160;
    readonly fadeOutMs: 240;
    readonly weight: 1;
    readonly speed: 1;
    readonly speedRange: {
        readonly min: 0.25;
        readonly max: 4;
    };
};
export interface CompiledCaptureCue {
    atMs: number;
    endMs: number;
    speed: number;
    weight: number;
    fadeInMs: number;
    fadeOutMs: number;
    hold: boolean;
    groups: readonly CaptureGroupId[];
    clip: CompiledCaptureClip;
}
export interface CompiledCaptureCurve {
    t: readonly number[];
    v: readonly number[];
    m: readonly number[];
}
export interface CompiledCaptureClip {
    durationMs: number;
    groups: readonly CaptureGroupId[];
    curves: Partial<Record<CaptureChannelId, CompiledCaptureCurve>>;
    steps: Partial<Record<CaptureStepId, ReadonlyArray<readonly [number, CaptureStepValue]>>>;
    presence: Partial<Record<CaptureGroupId, CompiledCaptureCurve>>;
}
export interface CaptureSample {
    values: Partial<Record<CaptureChannelId, number>>;
    steps: Partial<Record<CaptureStepId, CaptureStepValue>>;
    weights: Partial<Record<CaptureGroupId, number>>;
    hands3d?: CaptureHands3D;
}
export interface CaptureHand3D {
    joints: number[];
}
export type CaptureHands3D = Partial<Record<Side, CaptureHand3D>>;
export type CaptureTakeHands3D = Partial<Record<Side, Array<number[] | null>>>;
export interface TrackerFrame {
    t: number;
    width: number;
    height: number;
    pose?: {
        landmarks: number[];
    };
    face?: {
        blendshapes: Record<string, number>;
        matrix?: number[];
        points?: number[];
        mesh?: number[];
    };
    hands: TrackerHand[];
}
export interface TrackerHand {
    landmarks: number[];
    world?: number[];
    label: 'Left' | 'Right';
    score: number;
    subject?: 'left' | 'right';
}
export interface CaptureCalibration {
    head: {
        turn: number;
        nod: number;
        tilt: number;
    };
    torso: {
        turn: number;
        lean: number;
        x: number;
    };
    face: Record<string, number>;
    arms: Record<Side, {
        upper: number;
        fore: number;
    }>;
    shoulderWidth: number;
}
export interface CaptureSolveOptions {
    mirror?: boolean;
    exaggerate?: number;
}
export interface SolvedCaptureFrame {
    t: number;
    values: Partial<Record<CaptureChannelId, number>>;
    steps: Partial<Record<CaptureStepId, CaptureStepValue>>;
    confidence: Partial<Record<CaptureGroupId, number>>;
    hands3d?: CaptureHands3D;
}
export interface CaptureTake {
    fps: number;
    durationMs: number;
    times: number[];
    channels: Partial<Record<CaptureChannelId, Array<number | null>>>;
    steps: Partial<Record<CaptureStepId, Array<CaptureStepValue | null>>>;
    confidence: Partial<Record<CaptureGroupId, number[]>>;
    mirror: boolean;
    hands3d?: CaptureTakeHands3D;
    source?: {
        kind: 'live' | 'video';
        frames?: number;
        model?: string;
        delegate?: 'GPU' | 'CPU';
    };
}
export interface CaptureCleanSettings {
    smoothing: number;
    stillness: number;
    handHoldMs: number;
    exaggerate: number;
}
export interface CaptureEdit {
    inMs: number;
    outMs: number;
    groups: CaptureGroupId[];
    clean: CaptureCleanSettings;
}
export interface CaptureCleanReport {
    glitches: number;
    gapsFilled: number;
    stills: number;
    flickers: number;
    keysBefore: number;
    keysAfter: number;
}
export declare const CAPTURE_FILE_FORMAT: 'capi-capture';
export declare const CAPTURE_COLLECTION_FORMAT: 'capi-capture-collection';
export interface CaptureClipFile {
    format: typeof CAPTURE_FILE_FORMAT;
    version: 1;
    id: string;
    name: string;
    description: string;
    labels: string[];
    createdAt: string;
    updatedAt: string;
    take: CaptureTake;
    edit: CaptureEdit;
    clip: CaptureCurves;
}
export interface CaptureCollectionFile {
    format: typeof CAPTURE_COLLECTION_FORMAT;
    version: 1;
    id: string;
    name: string;
    description: string;
    labels: string[];
}
export declare const CAPTURE_LIMITS: {
    readonly idMax: 48;
    readonly nameMax: 60;
    readonly descriptionMax: 600;
    readonly labelMax: 32;
    readonly labelsMax: 16;
    readonly takeMaxMs: 180000;
};
export declare const CAPTURE_ID_PATTERN: RegExp;
