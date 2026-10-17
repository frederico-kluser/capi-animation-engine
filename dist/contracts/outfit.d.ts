export type HairId = 'none' | 'tuft' | 'spiky' | 'curly' | 'sidePart' | 'bun' | 'mundodev-flame';
export declare const HAIR_IDS: readonly ["none", "tuft", "spiky", "curly", "sidePart", "bun", "mundodev-flame"];
export type HairColorId = 'dark' | 'brown' | 'blond' | 'ginger' | 'silver' | 'mundodev-orange';
export declare const HAIR_COLOR_IDS: readonly ["dark", "brown", "blond", "ginger", "silver", "mundodev-orange"];
export type HatId = 'none' | 'cap' | 'capBackwards';
export declare const HAT_IDS: readonly ["none", "cap", "capBackwards"];
export type GlassesId = 'none' | 'round' | 'square' | 'sunglasses' | 'mundodev-glasses';
export declare const GLASSES_IDS: readonly ["none", "round", "square", "sunglasses", "mundodev-glasses"];
export type HeadphonesId = 'none' | 'over' | 'headset' | 'mundodev-headphones';
export declare const HEADPHONES_IDS: readonly ["none", "over", "headset", "mundodev-headphones"];
export type TopId = 'suit' | 'hoodie' | 'tshirt' | 'polo' | 'sweater' | 'shirt' | 'blazer' | 'bomber' | 'turtleneck' | 'jersey' | 'vest';
export declare const TOP_IDS: readonly ["suit", "hoodie", "tshirt", "polo", "sweater", "shirt", "blazer", "bomber", "turtleneck", "jersey", "vest"];
export type TopColorId = 'navy' | 'black' | 'grey' | 'white' | 'lilac' | 'burgundy' | 'coral' | 'mustard' | 'teal' | 'orange';
export declare const TOP_COLOR_IDS: readonly ["navy", "black", "grey", "white", "lilac", "burgundy", "coral", "mustard", "teal", "orange"];
export interface Outfit {
    hair: HairId;
    hairColor: HairColorId;
    hat: HatId;
    glasses: GlassesId;
    headphones: HeadphonesId;
    top: TopId;
    topColor: TopColorId;
}
export declare const OUTFIT_PRESET_IDS: readonly ['mundodev', 'casual', 'streamer', 'sporty', 'tech'];
export type OutfitPresetId = (typeof OUTFIT_PRESET_IDS)[number];
export declare const OUTFIT_PRESETS: Record<OutfitPresetId, Outfit>;
export declare const isOutfitPresetId: (value: unknown) => value is OutfitPresetId;
export type OutfitInput = Partial<Outfit> & {
    preset?: OutfitPresetId | null;
};
export declare const DEFAULT_OUTFIT: Outfit;
export declare const OUTFIT_OPTIONS: {
    readonly hair: readonly ["none", "tuft", "spiky", "curly", "sidePart", "bun", "mundodev-flame"];
    readonly hairColor: readonly ["dark", "brown", "blond", "ginger", "silver", "mundodev-orange"];
    readonly hat: readonly ["none", "cap", "capBackwards"];
    readonly glasses: readonly ["none", "round", "square", "sunglasses", "mundodev-glasses"];
    readonly headphones: readonly ["none", "over", "headset", "mundodev-headphones"];
    readonly top: readonly ["suit", "hoodie", "tshirt", "polo", "sweater", "shirt", "blazer", "bomber", "turtleneck", "jersey", "vest"];
    readonly topColor: readonly ["navy", "black", "grey", "white", "lilac", "burgundy", "coral", "mustard", "teal", "orange"];
};
export type OutfitSlot = keyof Outfit;
export declare const OUTFIT_SLOTS: readonly ["hair", "hairColor", "hat", "glasses", "headphones", "top", "topColor"];
export declare const HEAD_OUTFIT_SLOTS: readonly ["hair", "hairColor", "hat", "glasses", "headphones"];
export declare const topHasTie: (top: TopId) => boolean;
