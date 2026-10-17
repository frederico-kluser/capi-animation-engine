import { type CharacterId, type CharacterSpec } from '../contracts/character.js';
export declare const CHARACTERS: Record<CharacterId, CharacterSpec>;
export declare const CHARACTER_LABELS: Record<CharacterId, string>;
export declare function isCharacterId(value: unknown): value is CharacterId;
export declare function outfitFor<T extends {
    hair: string;
    hairColor?: string;
}>(outfit: T, character: CharacterId, warnings?: string[]): T;
export declare function resolveCharacter(input: unknown, warnings?: string[]): CharacterId;
