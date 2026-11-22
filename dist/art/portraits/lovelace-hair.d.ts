import type { HatId } from '../../contracts/outfit.js';
import { type OutfitItem, type OutfitView, type Tone } from '../solid.js';
type HairTone = Tone & {
    shine: string;
};
export declare function lovelaceHairItems(view: OutfitView, tone: HairTone, hat: HatId): OutfitItem[];
export {};
