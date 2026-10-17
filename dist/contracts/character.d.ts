export type CharacterId = 'anchor' | 'capybara' | 'donkey';
export declare const CHARACTER_IDS: readonly ["anchor", "capybara", "donkey"];
export declare const DEFAULT_CHARACTER: CharacterId;
export type FaceKitId = 'human' | 'capybara';
export declare const FACE_KIT_IDS: readonly ["human", "capybara"];
export type EyeStyle = 'solid' | 'catchlight' | 'pupil';
export declare const EYE_STYLES: readonly ["solid", "catchlight", "pupil"];
export type CharacterExtra = 'ears';
export interface CharacterSpec {
    id: CharacterId;
    face: FaceKitId;
    eyes: EyeStyle;
    humanoid: boolean;
    headRadius: number;
    extras: readonly CharacterExtra[];
}
