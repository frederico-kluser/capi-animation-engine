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
    };
    lid: {
        rest: number;
        close: number;
        follow: number;
        crease: number;
    };
    bag: {
        drop: number;
        opacity: number;
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
    } | null;
    mouth: {
        y: number;
        scale: number;
        lowerLip: number;
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
        } | null;
        glabella: number;
        crowsFeet: number;
        nasolabial: number;
    };
    lookRange: Point;
}
export declare const EINSTEIN_FACE: PortraitFace;
export declare const PORTRAIT_FACES: Partial<Record<CharacterId, PortraitFace>>;
export declare function portraitFaceOf(id: CharacterId): PortraitFace;
interface PortraitLid {
    top: number;
    bottom: number;
    angle: number;
    reach: number;
    width: number;
}
export declare function portraitLid(m: PortraitFace, shape: EyeShape, browAngle: number, lookY: number): PortraitLid | null;
export declare function portraitMouth(m: PortraitFace, shape: MouthShape): MouthShape;
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
export declare function PortraitFaceArt({ face, palette, ids, head, eyeClip, measures: m }: PortraitFaceArtProps): ReactElement;
export {};
