import { type CharacterId } from '../contracts/character.js';
import { type Outfit, type OutfitInput } from '../contracts/outfit.js';
import { type PersonaSpec } from '../contracts/persona.js';
import { type ToneId } from './talk/tones.js';
export declare function isReservedPersonaId(id: string): boolean;
export declare function personaIdProblem(id: unknown): string | undefined;
export declare function personaSlug(name: string, taken?: Iterable<string>): string;
export interface PersonaCheck {
    persona: PersonaSpec | null;
    errors: string[];
    warnings: string[];
}
export declare function parsePersona(raw: unknown, where?: string): PersonaCheck;
export interface PersonaToneChoice {
    tone?: ToneId;
    from: 'explicit' | 'styles' | 'none';
}
export declare function personaTone(persona: Pick<PersonaSpec, 'tone' | 'styles'>): PersonaToneChoice;
export declare function personaPersonality(persona: Pick<PersonaSpec, 'styles' | 'notes'>): string | undefined;
export declare function personaOutfit(persona: Pick<PersonaSpec, 'outfit' | 'base'>, warnings?: string[]): Outfit;
export interface PersonaSeat {
    persona: string;
    character: CharacterId;
    name: string;
    voice?: string;
    tone?: ToneId;
    personality?: string;
    outfit?: OutfitInput;
}
export declare function personaSeat(persona: PersonaSpec): PersonaSeat;
export declare function layerOutfit(under: OutfitInput | undefined, over: OutfitInput | undefined): OutfitInput | undefined;
export interface SeatFields {
    character?: unknown;
    name?: unknown;
    voice?: unknown;
    tone?: unknown;
    personality?: unknown;
    outfit?: unknown;
}
export declare function expandPersonaSeat<T extends SeatFields>(seat: T, persona: PersonaSpec): Omit<T, 'character'> & PersonaSeat;
export declare function findPersona(cast: readonly PersonaSpec[], id: unknown): PersonaSpec | undefined;
export declare function sortCast(cast: readonly PersonaSpec[]): PersonaSpec[];
export declare function missingStock(cast: readonly PersonaSpec[], stock: readonly PersonaSpec[]): PersonaSpec[];
export type CharacterRef = {
    base: CharacterId;
    persona?: PersonaSpec;
} | {
    problem: string;
};
export declare function characterRefChoices(cast: readonly PersonaSpec[]): string;
export declare function resolveCharacterRef(value: unknown, cast: readonly PersonaSpec[], field?: string): CharacterRef;
export declare function describePersonaTone(persona: Pick<PersonaSpec, 'tone' | 'styles'>): string;
export declare function describePersonaOutfit(persona: Pick<PersonaSpec, 'outfit' | 'base'>): string;
export declare function describePersona(persona: PersonaSpec): string;
export interface PersonaModuleOptions {
    contractImport?: string;
}
export declare const CAST_FOLDER = "characters";
export declare function personaModuleSource(persona: PersonaSpec, options?: PersonaModuleOptions): string;
export declare function personaFileName(id: string): string;
