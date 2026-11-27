import type { CharacterId } from './character.js';
import type { ExpressionId } from './face.js';
import type { OutfitInput } from './outfit.js';
import type { ThumbMoodId, YouTubeThumbnailText } from './youtube.js';
export declare const THUMB_LAYOUTS: readonly ['hero', 'duo', 'screen', 'reaction', 'versus', 'number', 'tv'];
export type ThumbLayout = (typeof THUMB_LAYOUTS)[number];
export declare const THUMB_SCHEMES: readonly ['night', 'lilac', 'sun', 'coral', 'teal'];
export type ThumbScheme = (typeof THUMB_SCHEMES)[number];
export declare const THUMB_ROTATION_SCHEMES: readonly ThumbScheme[];
export declare const THUMB_ASPECTS: readonly ['16:9', '9:16'];
export type ThumbAspect = (typeof THUMB_ASPECTS)[number];
export declare const THUMB_IDS: readonly ['a', 'b', 'c'];
export type ThumbId = (typeof THUMB_IDS)[number];
export declare const THUMB_ACCENTS: readonly ['question', 'exclaim', 'check', 'cross', 'arrow', 'bulb'];
export type ThumbAccent = (typeof THUMB_ACCENTS)[number];
export declare const THUMB_SOURCE_KINDS: readonly ['talk', 'podcast', 'review', 'tutorial', 'news'];
export type ThumbSourceKind = (typeof THUMB_SOURCE_KINDS)[number];
export interface ThumbCrop {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface ThumbCast {
    character: CharacterId;
    name?: string;
    outfit?: OutfitInput;
    pose: string;
    expression: ExpressionId;
    mirror?: boolean;
    look?: {
        x: number;
        y: number;
    };
    crop?: ThumbCrop;
    slot?: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
}
export interface ThumbBackground {
    file: string;
    mirror?: boolean;
    blur?: number;
    dim?: number;
    tint?: number;
    focus?: {
        x: number;
        y: number;
    };
}
export interface ThumbCuratedPose {
    pose: string;
    expression: ExpressionId;
}
export interface ThumbCurated {
    title: string;
    highlight?: string;
    terminal?: string[];
    accentLine?: number;
    teacher?: ThumbCuratedPose;
    second?: (ThumbCuratedPose & {
        who?: string;
    }) | null;
    accent?: ThumbAccent | null;
}
export interface ThumbSource {
    kind: ThumbSourceKind;
    title: string;
    hook?: string;
    topic?: string;
    number?: number;
    code?: string;
    terminal?: string[];
    curated?: ThumbCurated;
    cast: Array<{
        character: CharacterId;
        name?: string;
        outfit?: OutfitInput;
        id?: string;
    }>;
    packaging?: YouTubeThumbnailText;
    screenImage?: string;
}
export interface ThumbSpec {
    layout: ThumbLayout;
    flip?: boolean;
    scheme: ThumbScheme;
    aspect: ThumbAspect;
    title: string;
    highlight?: string;
    kicker?: string;
    badge?: string;
    code?: string;
    terminal?: string[];
    accentLine?: number;
    series?: string;
    panel?: string;
    number?: {
        value: string;
        label: string;
    };
    versus?: [string, string];
    accent?: ThumbAccent | 'none';
    mood?: ThumbMoodId;
    background?: ThumbBackground;
    screenImage?: string;
    cast: ThumbCast[];
    seed: number;
}
export interface ThumbVariant {
    id: ThumbId;
    spec: ThumbSpec;
    why: string;
}
export interface ThumbPlate {
    file: string;
    aspect: ThumbAspect;
    scene: string;
    key: string;
    model: string;
    prompt: string;
    style: number;
    cost?: number;
    width?: number;
    height?: number;
    createdAt: string;
    check?: {
        ok: boolean;
        model: string;
        problems: string[];
    };
}
export interface ThumbsRecord {
    version: 1 | 2;
    kind: 'capi-thumbs';
    run: string;
    source: ThumbSource;
    seed: number;
    aspect: ThumbAspect;
    createdAt: string;
    variants: Array<ThumbVariant & {
        file: string;
        upload?: string;
    }>;
    plates?: ThumbPlate[];
    plateNote?: string;
    approved?: ThumbId;
    approvedAt?: string;
}
