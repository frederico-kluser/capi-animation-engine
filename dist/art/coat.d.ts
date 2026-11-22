import type { ReactElement } from 'react';
import type { CharacterId } from '../contracts/character.js';
import type { Point } from '../contracts/pose.js';
import type { BoxDims } from '../core/head/box3d.js';
import type { Palette } from './palette.js';
export type CoatKind = 'fur' | 'feathers';
export interface CoatMark {
    x: number;
    y: number;
    angle: number;
    size?: number;
    n?: number;
    fan?: number;
    gap?: number;
    tone?: 'coat' | 'light' | 'tuft' | 'muzzle' | 'mask' | 'mark';
    layer?: 'face' | 'snout';
    mirror?: boolean;
}
export interface CoatSpec {
    kind: CoatKind;
    face: readonly CoatMark[];
    blush?: {
        x: number;
        y: number;
        rx: number;
        ry: number;
        opacity: number;
        style?: 'soft' | 'hash';
    };
    sparkle?: number;
    eye?: {
        dark?: boolean;
        spot?: number;
        glow?: number;
    };
    side?: readonly CoatMark[];
    soft?: {
        glow: number;
        shade: number;
        rim: number;
    };
    hands?: 'tufts' | 'clean';
}
export interface CoatTones {
    dark: string;
    darkOpacity?: number;
    light: string;
    lightOpacity?: number;
}
export declare const COATS: Partial<Record<CharacterId, CoatSpec>>;
export declare const coatOf: (id: CharacterId) => CoatSpec | undefined;
export declare const SCREEN_LIGHT: Point;
export declare function coatMarks(props: {
    kind: CoatKind;
    marks: readonly CoatMark[];
    tones: CoatTones;
    light: Point;
    mirror?: boolean;
    keyId?: string;
    offset?: number;
}): ReactElement | null;
export declare function faceCoatTones(palette: Palette): CoatTones;
export declare function FaceCoat(props: {
    coat: CoatSpec | undefined;
    layer: 'face' | 'snout';
    pass: 'under' | 'over';
    palette: Palette;
    light: Point;
}): ReactElement | null;
export declare function sideSurfaceX(box: BoxDims, y: number): number;
export declare function SideCoat(props: {
    coat: CoatSpec | undefined;
    palette: Palette;
    head: {
        turn: number;
        nod: number;
    };
    box: BoxDims;
    light: Point;
}): ReactElement | null;
export declare const handCoatOf: (id: CharacterId) => CoatKind | undefined;
export declare const isBareHand: (palette: Palette) => boolean;
export declare function HandCoat(props: {
    kind: CoatKind;
    view: 'palm' | 'back';
    palette: Palette;
    light: Point;
}): ReactElement | null;
export declare function boneCoat(bone: {
    a: Point;
    ra: number;
    b: Point;
    rb: number;
}, kind: CoatKind, tone: {
    edge: string;
    rim: string;
}): ReactElement | null;
