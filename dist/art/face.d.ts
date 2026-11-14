import type { ReactElement } from 'react';
import type { EyeStyle } from '../contracts/character.js';
import { type EyeShape, type MouthShape, type ResolvedFace } from '../contracts/face.js';
import { type EyeLidBand } from './eyes.js';
import { type Palette } from './palette.js';
export interface HumanEyeLid extends EyeLidBand {
    reach: number;
    width: number;
}
export declare function humanEyeLid(shape: EyeShape, side: 'left' | 'right', browAngle: number): HumanEyeLid | null;
export declare function mouthPath(shape: MouthShape): string;
export interface FaceArtProps {
    face: ResolvedFace;
    mouthClipId: string;
    eyeClip?: {
        id: string;
        d: string;
    } | undefined;
    palette?: Palette | undefined;
    eyes?: EyeStyle | undefined;
    ids?: ((local: string) => string) | undefined;
}
export declare function FaceArt({ face, mouthClipId, eyeClip, palette, eyes: style, ids }: FaceArtProps): ReactElement;
