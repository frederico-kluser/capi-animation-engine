import type { BoxDims } from '../core/head/box3d.js';
import { type EarShape } from '../core/head/ears.js';
import type { Palette } from './palette.js';
import { type OutfitItem, type OutfitView } from './solid.js';
export declare function earItems(view: OutfitView, dims: BoxDims, palette: Palette, shape?: EarShape): OutfitItem[];
