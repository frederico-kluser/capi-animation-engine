import type { HeadphonesId } from '../contracts/outfit.js';
import { type Point3, type TubePoint } from '../core/head/solid.js';
import { type OutfitItem, type OutfitView, type Tone } from './solid.js';
export interface PhonesModel {
    cup: {
        y: number;
        z: number;
        cushionOut: number;
        cushionR: number;
        shellIn: number;
        shellOut: number;
        shellR: number;
        round: number;
        stretch: number;
        deep: number;
        capInset: number;
    };
    band: {
        r: number;
        gap: number;
        edge: number;
        arch: {
            apexY: number;
            shoulderY: number;
            legX: number;
        } | null;
        ribbon: {
            top: number;
            legs: number;
            fromY: number;
            toY: number;
        } | null;
        step: number;
        sample: number | null;
    };
    tones: {
        shell: Tone;
        cushion: Tone;
        band: Tone;
        bandSide: Tone;
        light: string;
        capFace: readonly [string, string];
        accent: string | null;
    };
    mic: boolean;
}
export declare const PHONES_MODELS: Record<Exclude<HeadphonesId, 'none'>, PhonesModel>;
export interface PhonesFit {
    points: readonly Point3[];
    round: number;
    press?: number;
    under?: {
        points: readonly Point3[];
        round: number;
    };
    spheres?: readonly TubePoint[];
}
export declare function bandPoints(fit: PhonesFit | null, model?: PhonesModel): TubePoint[];
export declare function headphonesItems(view: OutfitView, kind: HeadphonesId, fit: PhonesFit | null, occluders?: readonly string[]): OutfitItem[];
