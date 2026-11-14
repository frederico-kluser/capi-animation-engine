import type { ReactElement } from 'react';
import type { CaptureHand3D } from '../contracts/capture.js';
import type { Point, Side } from '../contracts/pose.js';
import { HAND3D_FINGERS } from '../core/capture/hand3d.js';
import { type Palette } from './palette.js';
export declare const HAND3D_RADII: {
    readonly wrist: 27;
    readonly cuff: 33;
    readonly palm: Readonly<Record<number, number>>;
    readonly thumb: readonly [20.5, 18, 16, 14.5];
    readonly index: readonly [17, 15.5, 14.5, 13.5];
    readonly middle: readonly [17.5, 16, 15, 14];
    readonly ring: readonly [16.5, 15, 14, 13];
    readonly pinky: readonly [14.5, 13.5, 12.5, 11.5];
};
export interface Hand3DVolume {
    id: 'cuff' | 'palm' | keyof typeof HAND3D_FINGERS;
    z: number;
    parts: string[];
    creases: string[];
    fingers: Array<keyof typeof HAND3D_FINGERS>;
}
export declare const HAND3D_MERGE: {
    readonly baseBend: 48;
    readonly midBend: 50;
    readonly front: 0.32;
    readonly thumbCross: 1.1;
};
export declare function hand3dVolumes(wrist: Point, foreAngle: number, hand: CaptureHand3D): Hand3DVolume[];
export interface Hand3DArtProps {
    wrist: Point;
    foreAngle: number;
    hand: CaptureHand3D;
    side: Side;
    ids: (local: string) => string;
    palette?: Palette | undefined;
}
export declare function Hand3DArt({ wrist, foreAngle, hand, side, ids, palette }: Hand3DArtProps): ReactElement;
