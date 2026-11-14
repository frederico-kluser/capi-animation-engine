import type { ReactElement } from 'react';
import type { CharacterId, EyeStyle } from '../contracts/character.js';
import type { MouthShape, ResolvedFace } from '../contracts/face.js';
import type { Point } from '../contracts/pose.js';
import { type AnimalFaceMeasures } from './face-capybara.js';
import type { Palette } from './palette.js';
export interface BeakMeasures {
    top: number;
    topHalf: number;
    shoulder: number;
    shoulderHalf: number;
    gape: number;
    gapeHalf: number;
    tip: number;
    chin: number;
    chinHalf: number;
    drop: number;
    lift: number;
    cornerGain: number;
    depth: number;
    stroke: number;
    nostril: {
        x: number;
        y: number;
        r: number;
    };
}
export interface BirdFaceMeasures extends Pick<AnimalFaceMeasures, 'eye' | 'happy' | 'lid' | 'brow' | 'lookRange' | 'patches'> {
    beak: BeakMeasures;
    mouth: {
        y: number;
    };
}
export declare const PARROT_FACE: BirdFaceMeasures;
export declare const BIRD_FACES: Partial<Record<CharacterId, Partial<BirdFaceMeasures>>>;
export declare function birdFaceOf(id: CharacterId): BirdFaceMeasures;
export interface BeakGeometry {
    x: number;
    widen: number;
    cornerL: number;
    cornerR: number;
    drop: number;
    lift: number;
    smile: number;
    frown: number;
    tongue: number;
}
export declare function beakGeometry(shape: MouthShape, measures?: BirdFaceMeasures): BeakGeometry;
export declare const upperBeakPath: (g: BeakGeometry, measures?: BirdFaceMeasures) => string;
export declare const lowerBeakPath: (g: BeakGeometry, measures?: BirdFaceMeasures) => string;
export declare const beakOpeningPath: (g: BeakGeometry, measures?: BirdFaceMeasures) => string;
export declare function beakZonePoints(shape: MouthShape, measures?: BirdFaceMeasures): Point[];
export declare function beakShiftOf(turn: number, nod: number, measures?: BirdFaceMeasures): Point;
export interface BirdFaceArtProps {
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
    measures?: BirdFaceMeasures | undefined;
}
export declare function BirdFaceArt({ face, palette, eyes: style, ids, head, eyeClip, measures }: BirdFaceArtProps): ReactElement;
