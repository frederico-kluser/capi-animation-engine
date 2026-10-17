import type { ReactElement } from 'react';
import type { EyeStyle } from '../contracts/character.js';
import type { EyeShape } from '../contracts/face.js';
import type { Point } from '../contracts/pose.js';
import type { Palette } from './palette.js';
export interface EyeLidBand {
    top: number;
    bottom: number;
    angle: number;
}
export interface SpotEyeProps {
    style: Exclude<EyeStyle, 'solid'>;
    shape: EyeShape;
    at: Point;
    outline: string;
    rx: number;
    ry: number;
    baseRx: number;
    stroke: number;
    look: Point;
    lid?: EyeLidBand | undefined;
    palette: Palette;
    clipId: string;
    light?: Point | undefined;
}
export declare const SPOT_PART: {
    readonly catchlight: 'catchlight';
    readonly pupil: 'pupil';
};
export declare function SpotEye(props: SpotEyeProps): ReactElement;
