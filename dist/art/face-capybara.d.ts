import type { ReactElement } from 'react';
import type { CharacterId, EyeStyle } from '../contracts/character.js';
import type { BrowShape, EyeShape, MouthShape, ResolvedFace } from '../contracts/face.js';
import type { Point } from '../contracts/pose.js';
import { type EyeLidBand } from './eyes.js';
import type { Palette } from './palette.js';
export interface AnimalFaceMeasures {
    eye: {
        x: number;
        y: number;
        rx: number;
        ry: number;
        stroke: number;
    };
    happy: {
        top: number;
        bottom: number;
        widen: number;
        drop: number;
        stroke: number;
    };
    lid: {
        close: number;
        stroke: number;
        overhang: number;
        follow: number;
        sad: number;
        sadFrom: number;
        sadTo: number;
        lift: number;
    };
    brow: {
        x: number;
        y: number;
        halfLength: number;
        thickness: number;
    };
    snout: {
        top: number;
        shoulder: number;
        bottom: number;
        minBottom: number;
        maxBottom: number;
        toMouth: boolean;
        topHalf: number;
        shoulderHalf: number;
        bottomHalf: number;
        radii: {
            top: number;
            shoulder: number;
            bottom: number;
        };
        depth: number;
    };
    nostril: {
        x: number;
        y: number;
        length: number;
        width: number;
        angle: number;
    };
    philtrum: {
        from: number;
        width: number;
    };
    mouth: {
        y: number;
        stroke: number;
        outline: number;
        rim: number;
    };
    lookRange: {
        x: number;
        y: number;
    };
}
export declare const CAPYBARA_FACE: AnimalFaceMeasures;
export declare const ANIMAL_FACES: Partial<Record<CharacterId, Partial<AnimalFaceMeasures>>>;
export declare function animalFaceOf(id: CharacterId): AnimalFaceMeasures;
export interface CapybaraEyeGeometry {
    outline: string;
    rx: number;
    ry: number;
    cover: number;
    lid: EyeLidBand | null;
    stroke: number;
    drop: number;
    top: number;
    bottom: number;
}
export declare function lidCover(open: number, smile: number, browAngle?: number, lookY?: number, measures?: AnimalFaceMeasures): number;
export declare function capybaraEye(shape: EyeShape, side: 'left' | 'right', browAngle: number, lookY?: number, measures?: AnimalFaceMeasures): CapybaraEyeGeometry;
export declare function capybaraBrowPath(shape: BrowShape, measures?: AnimalFaceMeasures): string;
export declare function roundedPolygonPath(points: readonly Point[], radii: readonly number[]): string;
export declare function snoutBottomFor(mouth: CapybaraMouthGeometry | null, measures?: AnimalFaceMeasures): number;
export declare function snoutOutline(bottom?: number, measures?: AnimalFaceMeasures): Point[];
export declare function snoutPath(bottom?: number, measures?: AnimalFaceMeasures): string;
export declare function snoutShiftOf(turn: number, nod: number, measures?: AnimalFaceMeasures): Point;
export interface CapybaraMouthGeometry {
    x: number;
    y: number;
    halfWidth: number;
    top: Point[];
    bottom: Point[] | null;
    gap: number;
    teeth: number;
    tongue: number;
    smile: number;
    frown: number;
    pursed: number;
    round: number;
    rim: number;
}
export declare const MOUTH_SAMPLES = 40;
export declare const MOUTH_MID: number;
export declare function capybaraMouth(shape: MouthShape, measures?: AnimalFaceMeasures): CapybaraMouthGeometry;
export interface CapybaraFaceArtProps {
    face: ResolvedFace;
    palette: Palette;
    eyes: EyeStyle;
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
    measures?: AnimalFaceMeasures | undefined;
}
export declare function CapybaraFaceArt({ face, palette, eyes: style, ids, head, eyeClip, measures }: CapybaraFaceArtProps): ReactElement;
