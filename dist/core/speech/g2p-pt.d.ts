import type { VisemeId } from '../../contracts/face.js';
import type { Phone } from '../../contracts/talk.js';
export interface G2POptions {
    dialect?: 'pt-BR' | 'pt-PT';
    unstressed?: boolean;
}
export declare const VISIBLE_VISEMES: ReadonlySet<VisemeId>;
export interface PhonesOfWord {
    phones: Phone[];
    syllables: number;
    stressSyllable: number;
}
export declare function wordToPhones(word: string, options?: G2POptions): PhonesOfWord;
export declare function spokenToPhones(spoken: readonly string[], isFunctional: (word: string) => boolean, options?: G2POptions): PhonesOfWord;
export declare function phonesToString(phones: readonly Phone[]): string;
