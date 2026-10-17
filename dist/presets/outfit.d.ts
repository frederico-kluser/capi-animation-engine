import { type GlassesId, type HairColorId, type HairId, type HatId, type HeadphonesId, type Outfit, type OutfitInput, type OutfitPresetId, type OutfitSlot, type TopColorId, type TopId } from '../contracts/outfit.js';
export declare const HAIR_LABELS: Record<HairId, string>;
export declare const HAIR_COLOR_LABELS: Record<HairColorId, string>;
export declare const HAT_LABELS: Record<HatId, string>;
export declare const GLASSES_LABELS: Record<GlassesId, string>;
export declare const HEADPHONES_LABELS: Record<HeadphonesId, string>;
export declare const TOP_LABELS: Record<TopId, string>;
export declare const TOP_COLOR_LABELS: Record<TopColorId, string>;
export declare const TOP_NOTES: Record<TopId, string>;
export declare const OUTFIT_LABELS: {
    [K in OutfitSlot]: Record<Outfit[K], string>;
};
export declare const OUTFIT_SLOT_LABELS: Record<OutfitSlot, string>;
export declare const OUTFIT_PRESET_LABELS: Record<OutfitPresetId, string>;
export declare const OUTFIT_PRESET_NOTES: Record<OutfitPresetId, string>;
export declare function outfitPresetOf(outfit: Outfit): OutfitPresetId | undefined;
export declare function resolveOutfit(input: OutfitInput | undefined, warnings?: string[]): Outfit;
export declare function outfitHasPieces(outfit: Outfit): boolean;
