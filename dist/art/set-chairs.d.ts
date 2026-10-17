import { type ReactElement } from 'react';
import type { CharacterSpec } from '../contracts/character.js';
import { type SolvedPose } from '../contracts/pose.js';
import type { PodcastChairId } from '../contracts/set.js';
import { type ChairMaterial } from '../core/set/chairs.js';
import { type Palette, type PaletteKey } from './palette.js';
type Ids = (local: string) => string;
export declare const CHAIR_MATERIAL_TONES: Record<ChairMaterial, {
    shade: PaletteKey;
    tone: PaletteKey;
    light: PaletteKey;
}>;
export interface ChairArtProps {
    pose: SolvedPose;
    ids: Ids;
    chair?: PodcastChairId | undefined;
    character?: CharacterSpec | undefined;
    palette?: Palette | undefined;
}
export declare function ChairArt({ pose, ids, chair: model, character, palette }: ChairArtProps): ReactElement;
export {};
