import type { ReactElement, ReactNode } from 'react';
import type { Point } from '../contracts/pose.js';
import type { Wear } from './tops.js';
import type { TorsoShade } from './torso.js';
export interface VictorianDressColors {
    cream: {
        base: string;
        shade: string;
    };
    lace: {
        base: string;
        edge: string;
    };
}
export declare const VICTORIAN_DRESS_COLORS: VictorianDressColors;
type XY = readonly [number, number];
type Front = (dx: number, y: number) => Point;
type FrontPath = (f: Front, points: readonly XY[]) => string;
export interface VictorianArtHelpers {
    poly: FrontPath;
    line: FrontPath;
    curve: FrontPath;
    blob: FrontPath;
    cast: (distance: number) => string;
    SideShade: (props: {
        shade: TorsoShade;
        color: string;
        clip: string;
    }) => ReactElement;
}
interface VictorianArtProps {
    f: Front;
    wear: Wear;
    shade: TorsoShade;
    ids: (local: string) => string;
    clip: string;
}
interface VictorianTopArt {
    back: (props: VictorianArtProps) => ReactNode;
    front: (props: VictorianArtProps) => ReactNode;
}
export declare function createVictorianDressArt(helpers: VictorianArtHelpers, colors?: VictorianDressColors): VictorianTopArt;
export interface VictorianSleevePattern {
    kind: 'victorian';
    cream: string;
    piping: string;
}
export declare const victorianSleevePattern: (colors?: VictorianDressColors) => VictorianSleevePattern;
interface SleeveBoneShape {
    a: Point;
    b: Point;
    ra: number;
    rb: number;
}
export declare function victorianSleeveMarks(bone: SleeveBoneShape, pattern: VictorianSleevePattern): ReactElement;
export declare const VICTORIAN_DRESS_SLEEVES: {
    readonly length: 'long';
    readonly cuff: 'none';
    readonly pattern: 'victorian';
};
export {};
