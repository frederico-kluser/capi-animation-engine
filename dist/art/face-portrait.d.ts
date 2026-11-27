import type { ReactElement } from 'react';
import type { CharacterId } from '../contracts/character.js';
import type { EyeShape, MouthShape, ResolvedFace } from '../contracts/face.js';
import type { Point } from '../contracts/pose.js';
import type { Palette } from './palette.js';
export interface PortraitFace {
    eye: {
        x: number;
        y: number;
        rx: number;
        ry: number;
        slant: number;
        stroke: number;
        iris?: {
            pupil: number;
            ring: number;
        };
        lash?: {
            weight: number;
            wing: number;
            soft?: boolean;
        };
        socket?: number;
    };
    lid: {
        rest: number;
        close: number;
        follow: number;
        crease: number;
        droop?: number;
        hood?: number;
        tint?: number;
    };
    bag: {
        drop: number;
        opacity: number;
        fold?: number;
        trough?: number;
        puff?: number;
    } | null;
    brow: {
        x: number;
        y: number;
        halfLength: number;
        thickness: number;
        taper: number;
        tilt: number;
        tufts: number;
        tone: 'feature' | 'hair';
        arch?: number;
        peak?: number;
    };
    nose: {
        top: number;
        bulbY: number;
        bulb: {
            rx: number;
            ry: number;
        };
        wing: number;
        depth: number;
        bridge?: number;
        shade?: number;
        nostrils?: number;
        outline?: number;
    } | null;
    mouth: {
        y: number;
        scale: number;
        widen?: number;
        lowerLip: number;
        line?: number;
        lips?: {
            upper: number;
            lower: number;
            bow: number;
            tint: number;
        };
    };
    moustache: {
        y: number;
        halfWidth: number;
        thickness: number;
        droop: number;
        strands: number;
        follow: number;
    } | null;
    beard: {
        kind: 'full' | 'goatee' | 'stubble';
        top: number;
    } | null;
    wrinkles: {
        forehead: {
            count: number;
            y: number;
            gap: number;
            halfWidth: number;
            opacity: number;
            arch?: number;
        } | null;
        glabella: number;
        crowsFeet: number;
        nasolabial: number;
        taper?: boolean;
        marionette?: number;
        cheek?: number;
        chin?: number;
        jowl?: number;
    };
    cheeks?: {
        blush: number;
        x?: number;
        y?: number;
        rx?: number;
        ry?: number;
    };
    spots?: ReadonlyArray<{
        x: number;
        y: number;
        r: number;
        kind?: 'mole' | 'freckle';
    }>;
    lookRange: Point;
    temper?: {
        smile: number;
        corners: number;
        brows: {
            y: number;
            angle: number;
        };
    };
}
export declare const EINSTEIN_FACE: PortraitFace;
export declare const PORTRAIT_FACES: Partial<Record<CharacterId, PortraitFace>>;
export declare function portraitFaceOf(id: CharacterId): PortraitFace;
export declare function temperedFace(face: ResolvedFace, temper: PortraitFace['temper']): ResolvedFace;
export declare function taperedPath(points: readonly Point[], width: number, from?: number, to?: number): string;
interface PortraitLid {
    top: number;
    bottom: number;
    angle: number;
    reach: number;
    width: number;
}
export declare function portraitLid(m: PortraitFace, shape: EyeShape, browAngle: number, lookY: number): PortraitLid | null;
export declare function portraitMouth(m: PortraitFace, shape: MouthShape): MouthShape;
export declare function portraitMouthStroke(m: PortraitFace): number;
export declare function lipShapes(shape: MouthShape, lips: NonNullable<PortraitFace['mouth']['lips']>, stroke: number): {
    upper: string;
    lower: string;
    glint: {
        cx: number;
        cy: number;
        rx: number;
        ry: number;
    } | null;
};
export declare function moustachePose(m: PortraitFace, mouth: MouthShape): {
    x: number;
    y: number;
    left: number;
    right: number;
    spread: number;
} | null;
export interface PortraitFaceArtProps {
    face: ResolvedFace;
    palette: Palette;
    ids: (local: string) => string;
    head: {
        turn: number;
        nod: number;
        tilt: number;
    };
    eyeClip?: {
        id: string;
        d: string;
    } | undefined;
    measures: PortraitFace;
}
export declare function PortraitFaceArt({ face: asked, palette, ids, head, eyeClip, measures: m }: PortraitFaceArtProps): ReactElement;
export {};
