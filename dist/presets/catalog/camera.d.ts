import { type CameraCard, type CameraCardKind } from '../../contracts/catalog.js';
import { type CameraAngle, type CameraIntentKind, type CameraMoveKind, type CameraStyle, type CameraTransitionKind, type ShotFraming, type ShotSize } from '../../contracts/camera.js';
import type { VideoProfileId } from '../../contracts/profile.js';
export declare const CAMERA_CARD_IDS: Readonly<Record<CameraCardKind, readonly string[]>>;
export declare const CAMERA_CARD_LABELS: Readonly<Record<CameraCardKind, Readonly<Record<string, string>>>>;
export declare const CAMERA_NEED_IDS: readonly ['twoSeats', 'multiSeat', 'drink', 'zooms', 'snaps', 'single', 'talkOnly', 'sizeAtLeast', 'mainAngle', 'budget', 'notFirst', 'notTwice', 'firstSentence', 'lastSentences', 'oncePerVideo', 'poseFits', 'listener', 'until', 'minMs', 'meaning'];
export type CameraNeedId = (typeof CAMERA_NEED_IDS)[number];
export declare const CAMERA_BUDGET_KINDS: readonly ['emphasis', 'punchline', 'establish', 'split', 'special'];
export type CameraBudgetKind = (typeof CAMERA_BUDGET_KINDS)[number];
export declare const CAMERA_CARDS: Readonly<Record<CameraCardKind, readonly CameraCard[]>>;
export declare function cameraCard(kind: CameraCardKind, id: string): CameraCard | undefined;
export declare function cameraCardsMissing(kind: CameraCardKind): string[];
export declare function cameraCatalogComplete(): boolean;
export interface CameraVocabularyRequest {
    mode: 'talk' | 'podcast';
    style: CameraStyle;
    profile?: VideoProfileId;
    multiSeat?: boolean;
    zooms?: boolean;
    review?: boolean;
    intents?: readonly CameraIntentKind[];
}
export interface CameraVocabulary {
    framings: ShotFraming[];
    sizes: ShotSize[];
    angles: CameraAngle[];
    moves: CameraMoveKind[];
    transitions: CameraTransitionKind[];
    intents: CameraIntentKind[];
}
export declare const CAMERA_FAST_MOVES: readonly CameraMoveKind[];
export declare function cameraVocabulary(request: CameraVocabularyRequest): CameraVocabulary;
export interface CameraShape {
    framing: ShotFraming;
    size: ShotSize;
    move: CameraMoveKind;
    angle: CameraAngle;
    transition: CameraTransitionKind;
}
export declare function cameraShapeOf(intent: {
    intent: CameraIntentKind;
    framing?: ShotFraming;
    size?: ShotSize;
    move?: CameraMoveKind;
    angle?: CameraAngle;
    transition?: CameraTransitionKind;
}): CameraShape;
export declare function fitCameraShape(shape: CameraShape, vocabulary: CameraVocabulary): {
    shape: CameraShape;
    changed: Array<keyof CameraShape>;
};
export declare function cameraBudgetPerMinute(style: CameraStyle): Record<CameraBudgetKind, number>;
export declare function cameraShotLimits(style: CameraStyle, profile?: VideoProfileId): {
    minMs: number;
    maxMs: number;
};
export interface SequencedIntent extends CameraShape {
    intent: CameraIntentKind;
    at: number;
    sentence?: number;
    returns: boolean;
}
export interface SequenceIssue {
    index: number;
    need: CameraNeedId;
    text: string;
}
export declare function cameraResourceOf(s: Pick<CameraShape, 'framing' | 'size' | 'angle'>): string;
export declare function checkCameraSequence(intents: readonly SequencedIntent[], options?: {
    sentences?: number;
    firstAt?: number;
}): SequenceIssue[];
