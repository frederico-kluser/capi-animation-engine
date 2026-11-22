import type { GestureHint } from '../../contracts/catalog.js';
import type { PoseId } from '../poses.js';
export interface HintWord {
    index: number;
    core: string;
    sentence: number;
    functional: boolean;
}
export declare function foldCue(text: string): string;
export interface GestureHintOptions {
    max?: number;
    minSingle?: number;
    maxPoses?: number;
}
export declare function scriptGestureHints(words: readonly HintWord[], allowed: readonly PoseId[], options?: GestureHintOptions): GestureHint<PoseId>[];
export declare function gestureHintsText(hints: readonly GestureHint<PoseId>[], words: readonly Pick<HintWord, 'index' | 'core'>[]): string;
