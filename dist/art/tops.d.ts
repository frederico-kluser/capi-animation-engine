import type { ReactElement } from 'react';
import { type Outfit, type TopColorId, type TopId } from '../contracts/outfit.js';
import { type SolvedPose } from '../contracts/pose.js';
import type { SleeveTone, SleeveWear } from './arm.js';
import { type Palette } from './palette.js';
import { type SuitTone, type TorsoShade } from './torso.js';
export type TopTone = SleeveTone;
export declare const TOP_TONES: Record<TopColorId, TopTone>;
interface SleeveStyle {
    length: 'long' | {
        to: number;
        flare: number;
        band?: 'shade' | 'trim' | undefined;
    };
    cuff: 'shirt' | 'fabric' | 'rib' | 'none';
    fabric?: 'shirt' | undefined;
}
export declare const TOP_SLEEVES: Record<TopId, SleeveStyle>;
export interface Wear {
    top: TopId;
    color: TopColorId;
    tone: TopTone;
    trim: {
        base: string;
        shade: string;
    };
    inner: TopTone;
    tie: {
        base: string;
        shade: string;
    };
    neck: {
        base: string;
        shade: string;
    };
    sleeve: SleeveWear;
    suit?: SuitTone | undefined;
}
export declare function wearOf(outfit: Pick<Outfit, 'top' | 'topColor'> | undefined, palette?: Palette): Wear | undefined;
export interface WearProps {
    wear: Wear | undefined;
    turn: number;
    ids: (local: string) => string;
    shade: TorsoShade;
}
export declare function WearInk(props: WearProps): ReactElement;
export declare function WearBack(props: WearProps): ReactElement;
export declare function WearNeck({ wear, pose, palette }: {
    wear: Wear | undefined;
    pose: SolvedPose;
    palette?: Palette | undefined;
}): ReactElement;
export declare function WearFront(props: WearProps): ReactElement;
export {};
