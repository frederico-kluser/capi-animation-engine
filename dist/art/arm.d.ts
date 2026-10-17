import type { ReactElement } from 'react';
import { type Side, type SolvedArm } from '../contracts/pose.js';
export interface SleeveTone {
    base: string;
    shade: string;
    rim: string;
    edge: string;
}
export interface CuffWear {
    kind: 'plain' | 'rib';
    fill: string;
    edge: string;
    shade: string;
}
export interface SleeveWear {
    tone: SleeveTone;
    cuff: CuffWear | null;
    short?: {
        to: number;
        flare: number;
        band?: {
            color: string;
            width: number;
        } | undefined;
    } | undefined;
    skin: SleeveTone;
}
export declare const BARE_ARM_SCALE = 0.8;
export declare const forearmPath: (arm: SolvedArm, sleeve?: SleeveWear) => string;
export declare const upperArmPath: (arm: SolvedArm) => string;
export interface SleeveProps {
    arm: SolvedArm;
    side: Side;
    ids: (local: string) => string;
    sleeve?: SleeveWear | undefined;
}
export declare function ArmInk({ arm, sleeve }: {
    arm: SolvedArm;
    sleeve?: SleeveWear | undefined;
}): ReactElement;
export declare function UpperArm({ arm, side, ids, sleeve }: SleeveProps): ReactElement;
export declare function UpperArmInk({ arm, sleeve }: {
    arm: SolvedArm;
    sleeve?: SleeveWear | undefined;
}): ReactElement;
export declare function Forearm({ arm, side, ids, ink, sleeve }: SleeveProps & {
    ink: boolean;
}): ReactElement;
export declare function CuffArt({ arm, sleeve }: {
    arm: SolvedArm;
    sleeve?: SleeveWear | undefined;
}): ReactElement | null;
