import { type Outfit, type OutfitPresetId, type OutfitSlot } from '../contracts/outfit.js';
export declare function isOutfitValue<K extends OutfitSlot>(slot: K, value: unknown): value is Outfit[K];
export declare const isOutfitSlot: (slot: string) => slot is OutfitSlot;
export declare function outfitChoices(slot: OutfitSlot): string;
export declare function outfitProblem(slot: OutfitSlot, value: unknown): string;
export declare function outfitPresetChoices(): string;
export declare function outfitPresetProblem(value: unknown): string;
export declare function unknownOutfitPiece(key: string): string;
export interface OutfitRead {
    outfit: Partial<Outfit>;
    problems: string[];
    unknown: string[];
    preset?: OutfitPresetId | null;
}
export declare function readOutfitInput(raw: Readonly<Record<string, unknown>>): OutfitRead;
