import type { ShotSize } from './camera.js';
import type { HandShape, PropId, Side } from './pose.js';
import type { ProfileAspect, VideoProfileId } from './profile.js';
export declare const CATALOG_MODES: readonly ['talk', 'podcast', 'review'];
export type CatalogMode = (typeof CATALOG_MODES)[number];
export declare const CATALOG_DETAILS: readonly ['brief', 'full'];
export type CatalogDetail = (typeof CATALOG_DETAILS)[number];
export type CatalogEnergy = 1 | 2 | 3;
export interface CatalogBox {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare const POSE_CATEGORIES: readonly ['home', 'point', 'present', 'explain', 'emphasize', 'count', 'approve', 'refuse', 'doubt', 'emotion', 'think', 'social', 'listen', 'attitude', 'business', 'tablet'];
export type PoseCategory = (typeof POSE_CATEGORIES)[number];
export declare const POSE_REGISTERS: readonly ['neutral', 'warm', 'serious', 'assertive', 'playful', 'comic', 'rude'];
export type PoseRegister = (typeof POSE_REGISTERS)[number];
export interface PoseCard<Id extends string = string> {
    category: PoseCategory;
    says: string;
    when: readonly string[];
    avoid: readonly string[];
    energy: CatalogEnergy;
    register: PoseRegister;
    cues: readonly string[];
    pairs?: {
        from?: readonly Id[];
        to?: readonly Id[];
    };
    hands?: readonly Side[];
}
export declare const POSE_FAMILIES: readonly ['free', 'tabletLeft', 'tabletRight'];
export type PoseFamily = (typeof POSE_FAMILIES)[number];
export declare const HAND_ZONES: readonly ['aboveHead', 'head', 'chest', 'waist', 'out'];
export type HandZone = (typeof HAND_ZONES)[number];
export declare const HAND_ROLES: readonly ['gesture', 'rest', 'prop', 'hidden'];
export type HandRole = (typeof HAND_ROLES)[number];
export declare const FINGER_DIRECTIONS: readonly ['up', 'upRight', 'right', 'downRight', 'down', 'downLeft', 'left', 'upLeft', 'camera'];
export type FingerDirection = (typeof FINGER_DIRECTIONS)[number];
export declare const FACE_CONTACTS: readonly ['clear', 'touches', 'covers'];
export type FaceContact = (typeof FACE_CONTACTS)[number];
export interface PoseHandFacts {
    side: Side;
    role: HandRole;
    zone: HandZone;
    screen: 'left' | 'center' | 'right';
    shape: HandShape;
    back: boolean;
    holdsProp: boolean;
    fingers: FingerDirection;
    thumb?: 'up' | 'down';
    face: FaceContact;
    coversEyes: boolean;
    coversMouth: boolean;
    wrist: {
        x: number;
        y: number;
    };
    box: CatalogBox;
}
export interface PoseHeadFacts {
    turn: number;
    nod: number;
    tilt: number;
    stance: boolean;
    bodyTurn: number;
    bodyLean: number;
    bodyX: number;
    bodyY: number;
    words: string;
}
export interface PoseLoopFacts {
    cycles: number;
    periodMs: number;
    totalMs: number;
}
export declare const FRAME_FITS: readonly ['in', 'partial', 'out'];
export type FrameFit = (typeof FRAME_FITS)[number];
export type PoseMinSize = ShotSize | 'none';
export interface PoseFrameFit {
    fit: FrameFit;
    visible: number;
    hands: Partial<Record<Side, number>>;
}
export interface PoseFacts<Id extends string = string> {
    id: Id;
    family: PoseFamily;
    prop: PropId | null;
    propHand?: Side;
    hands: Record<Side, PoseHandFacts>;
    gestureHands: readonly Side[];
    symmetric: boolean;
    head: PoseHeadFacts;
    coversFace: boolean;
    coversMouth: boolean;
    box: CatalogBox;
    loop?: PoseLoopFacts;
    manualOnly: boolean;
    tableOnly: boolean;
    reviewOnly: boolean;
    listen: boolean;
    modes: readonly CatalogMode[];
    inFrame: Record<ProfileAspect, Record<ShotSize, PoseFrameFit>>;
    minSize: Record<ProfileAspect, PoseMinSize>;
}
export interface PoseCatalogCard<Id extends string = string, Face extends string = string> extends PoseCard<Id> {
    id: Id;
    label: string;
    faces: readonly Face[];
    facts: PoseFacts<Id>;
}
export interface ExpressionCard {
    says: string;
    looks: string;
    when: readonly string[];
    avoid: readonly string[];
    valence: -1 | 0 | 1;
    intensity: CatalogEnergy;
}
export interface ExpressionFacts {
    mouthOpen: boolean;
    mouth: 'smile' | 'flat' | 'frown';
    eyesClosed: 'none' | 'one' | 'both';
    brows: 'raised' | 'level' | 'lowered' | 'uneven' | 'worried';
    gaze: 'camera' | 'up' | 'down' | 'side' | 'upSide';
}
export interface ExpressionCatalogCard<Id extends string = string, Pose extends string = string> extends ExpressionCard {
    id: Id;
    label: string;
    facts: ExpressionFacts;
    poses: readonly Pose[];
}
export declare const CAMERA_CARD_KINDS: readonly ['framing', 'size', 'angle', 'move', 'transition', 'intent', 'style'];
export type CameraCardKind = (typeof CAMERA_CARD_KINDS)[number];
export interface CameraNeed {
    id: string;
    value?: number | string;
    text: string;
}
export type CameraNumber = number | string | boolean | readonly (number | string)[];
export interface CameraCard<Id extends string = string> {
    id: Id;
    kind: CameraCardKind;
    label: string;
    shows: string;
    when: readonly string[];
    avoid: readonly string[];
    needs: readonly CameraNeed[];
    energy: CatalogEnergy;
    modes: readonly CatalogMode[];
    numbers?: Readonly<Record<string, CameraNumber>>;
    profiles?: readonly VideoProfileId[];
    origin?: CameraCardOrigin;
    auto?: string;
}
export declare const CAMERA_CARD_ORIGINS: readonly ['verified', 'craft'];
export type CameraCardOrigin = (typeof CAMERA_CARD_ORIGINS)[number];
export declare const CATALOG_SECTION_IDS: readonly ['poses', 'expressions', 'macros', 'actions', 'cameraFramings', 'cameraSizes', 'cameraAngles', 'cameraMoves', 'cameraTransitions', 'cameraIntents', 'cameraStyles', 'tableItems', 'drinks', 'chairs', 'mics', 'decor', 'characters', 'outfit', 'outfitPresets', 'tones', 'voices', 'formats', 'profiles'];
export type CatalogSectionId = (typeof CATALOG_SECTION_IDS)[number];
export interface CatalogEntry {
    id: string;
    label: string;
    description: string;
    group?: string;
    facts?: Readonly<Record<string, string | number | boolean>>;
}
export interface CatalogSection {
    id: CatalogSectionId;
    title: string;
    servesWho: string;
    source: string;
    lang: 'en' | 'pt' | 'mixed';
    reserved?: true;
    entries: readonly CatalogEntry[];
}
