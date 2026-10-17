import { type CameraIntent, type CameraStyle, type CameraTrack } from '../../contracts/camera.js';
import type { PodcastManualCut, PodcastSeat, PodcastTurnKind } from '../../contracts/podcast.js';
import { type VideoProfileId } from '../../contracts/profile.js';
export interface CameraWord {
    index: number;
    startMs: number;
    endMs: number;
    stressMs?: number;
    prominence?: number;
    clauseEnd?: boolean;
    sentenceEnd?: boolean;
    functional?: boolean;
    question?: boolean;
}
export interface CameraSpeech {
    fromMs: number;
    toMs: number;
    seat?: PodcastSeat;
    turn?: string;
    kind?: PodcastTurnKind;
    index?: number;
    words?: readonly CameraWord[];
    show?: 'speaker' | 'listener';
    scriptedReaction?: {
        atMs?: number;
    };
}
export interface CameraTiming {
    durationMs: number;
    wordAt(turn: string | undefined, word: number): {
        startMs: number;
        endMs: number;
        stressMs?: number;
    } | null;
    speech: ReadonlyArray<CameraSpeech>;
}
export interface CameraFloorRules {
    overlapCutMaxMs: number;
    reactionTurnMinMs: number;
    reactionMs: readonly [number, number];
    reactionSpan: readonly [number, number];
    reactionDelayMs: number;
    reactionCount: 'one' | 'cadence';
}
export interface CompileCameraOptions {
    mode: 'talk' | 'podcast';
    profile?: VideoProfileId;
    style?: CameraStyle;
    multiSeat?: boolean;
    zooms?: boolean;
    seed?: number;
    manual?: readonly PodcastManualCut[];
    reactions?: boolean;
    minShotMs?: number;
    cutDelayMs?: number;
    floor?: Partial<CameraFloorRules>;
    drinks?: Partial<Record<PodcastSeat, CameraDrink>>;
}
export interface CameraSip {
    grabMs: number;
    releaseMs: number;
}
export interface CameraDrink {
    sips?: ReadonlyArray<CameraSip>;
}
export declare const CAMERA_FLOOR_RULES: CameraFloorRules;
export declare function isLegacyCamera(intents: readonly CameraIntent[] | undefined, options: CompileCameraOptions): boolean;
export declare function compileCamera(intents: readonly CameraIntent[], timing: CameraTiming, options: CompileCameraOptions): CameraTrack;
