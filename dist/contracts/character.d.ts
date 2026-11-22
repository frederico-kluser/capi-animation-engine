import type { GlassesId, HairColorId, HairId, TopColorId, TopId } from './outfit.js';
export type CharacterId = 'anchor' | 'capybara' | 'donkey' | 'dog' | 'cat' | 'parrot' | 'monkey' | 'lion' | 'einstein' | 'torvalds' | 'lovelace' | 'turing' | 'unclebob' | 'knuth';
export declare const CHARACTER_IDS: readonly ["anchor", "capybara", "donkey", "dog", "cat", "parrot", "monkey", "lion", "einstein", "torvalds", "lovelace", "turing", "unclebob", "knuth"];
export declare const DEFAULT_CHARACTER: CharacterId;
export type FaceKitId = 'human' | 'capybara' | 'bird' | 'portrait';
export declare const FACE_KIT_IDS: readonly ["human", "capybara", "bird", "portrait"];
export type EyeStyle = 'solid' | 'catchlight' | 'pupil';
export declare const EYE_STYLES: readonly ["solid", "catchlight", "pupil"];
export type CharacterExtra = 'ears' | 'mane';
export declare const CHARACTER_EXTRAS: readonly ["ears", "mane"];
export type WearableSlot = 'hair' | 'hat' | 'glasses' | 'headphones' | 'top';
export declare const WEARABLE_SLOTS: readonly ["hair", "hat", "glasses", "headphones", "top"];
export type HeadShapeId = 'rounder';
export declare const HEAD_SHAPE_IDS: readonly ["rounder"];
export interface CharacterSpec {
    id: CharacterId;
    face: FaceKitId;
    eyes: EyeStyle;
    humanoid: boolean;
    refuses?: Partial<Record<WearableSlot, string>>;
    headRadius: number;
    extras: readonly CharacterExtra[];
    headShape?: HeadShapeId;
    look?: {
        hair?: Exclude<HairId, 'none'>;
        hairColor?: HairColorId;
        glasses?: Exclude<GlassesId, 'none'>;
        top?: TopId;
        topColor?: TopColorId;
    };
}
