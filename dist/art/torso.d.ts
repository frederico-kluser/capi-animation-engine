import type { ReactElement } from 'react';
import { type Point, type SolvedPose } from '../contracts/pose.js';
import { type Palette } from './palette.js';
export declare const INK_WIDTH = 3;
export declare const JACKET_PATH: string;
export declare function sideShadowPath(m: 1 | -1, width: number): string;
export declare function shoulderRimPath(m: 1 | -1): string;
export declare function bodyTransform(body: SolvedPose['body']): string;
export declare function frontX(dx: number, turnDeg: number, low?: boolean): number;
export interface TorsoShade {
    left: number;
    right: number;
}
export declare function torsoShade(pose: SolvedPose): TorsoShade;
export interface SuitTone {
    jacket: string;
    jacketShade: string;
    jacketRim: string;
    ink: string;
    button: string;
    tie: string;
    tieShade: string;
}
export interface TorsoProps {
    turn: number;
    ids: (local: string) => string;
    tone?: SuitTone | undefined;
}
export declare function TorsoInk({ tone }?: {
    tone?: SuitTone | undefined;
}): ReactElement;
export declare function TorsoBack({ turn, ids, shade, tone }: TorsoProps & {
    shade: TorsoShade;
}): ReactElement;
export declare function TorsoFront({ turn, tone }: Pick<TorsoProps, 'turn' | 'tone'>): ReactElement;
export declare function NeckArt({ pose, palette }: {
    pose: SolvedPose;
    palette?: Palette | undefined;
}): ReactElement;
export declare function neckShape(pose: SolvedPose, grow?: number): {
    column: Point[];
    shade: Point[];
    top: Point;
    base: Point;
    half: number;
    collarY: number;
    shadeY: number;
};
