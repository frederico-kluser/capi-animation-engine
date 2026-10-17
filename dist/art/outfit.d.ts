import { type ReactElement } from 'react';
import type { CharacterSpec } from '../contracts/character.js';
import { type Outfit } from '../contracts/outfit.js';
import { type Point } from '../contracts/pose.js';
import type { BoxDims } from '../core/head/box3d.js';
import type { EarShape } from '../core/head/ears.js';
import type { Palette } from './palette.js';
import { type BoundCircle, type OutfitItem } from './solid.js';
export declare function hasOutfit(outfit: Outfit | undefined): outfit is Outfit;
export interface OutfitScene {
    back: OutfitItem[];
    front: OutfitItem[];
    eyeWindow: string | null;
}
export interface SceneCharacter {
    spec: CharacterSpec;
    palette: Palette;
    box: BoxDims;
    eyeOffset: Point;
    ears: EarShape;
}
export declare function outfitScene(outfit: Outfit | undefined, head: {
    turn: number;
    nod: number;
    tilt: number;
}, featureShift: Point, ids: (local: string) => string, character?: SceneCharacter): OutfitScene;
export declare function outfitBounds(outfit: Outfit | undefined, head: {
    turn: number;
    nod: number;
    tilt: number;
    center: Point;
}, featureShift?: Point, character?: SceneCharacter): BoundCircle[];
export declare function outfitTop(outfit: Outfit | undefined, head: {
    turn: number;
    nod: number;
    tilt: number;
    center: Point;
}, character?: SceneCharacter): number;
export declare function OutfitLayer({ items, layer }: {
    items: readonly OutfitItem[];
    layer: 'back' | 'front';
}): ReactElement | null;
