import type { ReactElement } from 'react';
import type { CharacterSpec, FaceKitId } from '../contracts/character.js';
import { type ResolvedFace } from '../contracts/face.js';
import type { Point } from '../contracts/pose.js';
import { type Palette } from './palette.js';
export interface FaceKitProps {
    face: ResolvedFace;
    palette: Palette;
    spec: CharacterSpec;
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
}
export interface FaceKit {
    Art: (props: FaceKitProps) => ReactElement;
    eye: (spec: CharacterSpec) => Point;
}
export declare const FACE_KITS: Record<FaceKitId, FaceKit>;
