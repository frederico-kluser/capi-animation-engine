import type { ReactNode } from 'react';
import type { HairColorId, HairId, HatId } from '../contracts/outfit.js';
import { type Point3, type TubePoint } from '../core/head/solid.js';
import type { PhonesFit } from './headphones.js';
import { type OutfitItem, type OutfitView, type ShellSpec, type Tone } from './solid.js';
export interface HairTone extends Tone {
    shine: string;
}
export declare const HAIR_TONES: Record<HairColorId, HairTone>;
export declare const LOOSE_HAIR_IDS: readonly ["mundodev-flame"];
export type ShellHairId = Exclude<HairId, 'none' | (typeof LOOSE_HAIR_IDS)[number]>;
export declare function hasHairShell(hair: HairId): hair is ShellHairId;
export declare const HAIR_SHELLS: Record<ShellHairId, ShellSpec>;
export declare function pressedShell(spec: ShellSpec): ShellSpec;
export declare function cappedShell(hair: ShellHairId, hat: HatId): ShellSpec;
export declare function hairFit(hair: HairId): PhonesFit | null;
export interface PlateSolid {
    key: string;
    front: Point3[];
    back: Point3[];
    edge: number;
}
export declare function hairPlates(hair: HairId, hat?: HatId): PlateSolid[];
export declare function mergedHairTubes(hair: ShellHairId, hat: HatId): {
    spec: ShellSpec;
    tubes: TubePoint[][];
};
export declare function hairItems(view: OutfitView, hair: HairId, color: HairColorId, hat?: HatId): OutfitItem[];
export declare function openingHair(view: OutfitView, hair: HairId, color: HairColorId, arch: {
    z: number;
    y0: number;
    halfWidth: number;
    height: number;
}): ReactNode;
