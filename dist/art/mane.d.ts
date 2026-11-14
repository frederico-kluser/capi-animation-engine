import type { BoxDims } from '../core/head/box3d.js';
import { type EarSide } from '../core/head/ears.js';
import { type ManeShape, type ManeTuft } from '../core/head/mane.js';
import type { Palette } from './palette.js';
import { type OutfitItem, type OutfitView } from './solid.js';
export declare const MANE_STRANDS: {
    readonly width: 2.4;
    readonly opacity: 0.5;
    readonly from: 0.3;
    readonly to: 0.86;
    readonly across: readonly [0.12];
    readonly bend: 0.22;
};
export declare function maneStrands(view: OutfitView, tuft: ManeTuft, side: EarSide): string[];
export declare function maneItems(view: OutfitView, dims: BoxDims, palette: Palette, shape: ManeShape, hatOn?: boolean): OutfitItem[];
