import type { CharacterId, CharacterSpec } from '../contracts/character.js';
import { type Point } from '../contracts/pose.js';
import type { BoxDims } from '../core/head/box3d.js';
import type { SceneCharacter } from './outfit.js';
export declare function characterBox(spec: CharacterSpec): BoxDims;
export declare function characterEye(spec: CharacterSpec): Point;
export declare function eyeLiftOf(spec: CharacterSpec): Point;
export declare function sceneCharacterOf(spec: CharacterSpec): SceneCharacter | undefined;
export declare function sceneCharacterById(id: CharacterId): SceneCharacter | undefined;
