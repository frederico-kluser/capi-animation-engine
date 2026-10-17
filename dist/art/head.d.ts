import type { ReactElement } from 'react';
import type { CharacterSpec } from '../contracts/character.js';
import type { ResolvedFace } from '../contracts/face.js';
import type { Outfit } from '../contracts/outfit.js';
import { type Point, type SolvedPose } from '../contracts/pose.js';
import { type Palette } from './palette.js';
export declare function featureShiftOf(turn: number, nod: number): Point;
export interface HeadArtProps {
    head: SolvedPose['head'];
    face: ResolvedFace;
    ids: (local: string) => string;
    outfit?: Outfit | undefined;
    character?: CharacterSpec | undefined;
    palette?: Palette | undefined;
}
export declare function HeadArt({ head, face, ids, outfit, character, palette }: HeadArtProps): ReactElement;
