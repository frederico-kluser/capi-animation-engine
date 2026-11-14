import type { CharacterId } from '../../contracts/character.js';
import type { ExpressionId } from '../../contracts/face.js';
import type { FoodKind } from '../../contracts/set.js';
import type { Beat } from './choreograph.js';
export interface SnackOptions {
    food?: FoodKind;
    bites?: number;
    take?: number;
    expression?: ExpressionId;
    character?: CharacterId;
    chews?: number;
}
export interface SnackRecipe {
    beats: Beat[];
    endMs: number;
    bites: number;
}
export declare function snackBeats(atMs: number, options?: SnackOptions): SnackRecipe;
