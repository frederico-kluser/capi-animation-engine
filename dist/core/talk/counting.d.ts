import type { PoseId } from '../../presets/poses.js';
export type FingerCount = 1 | 2 | 3 | 4 | 5;
export type CountFamily = 'standing' | 'table';
export declare const COUNT_POSE_FINGERS: Readonly<Partial<Record<PoseId, FingerCount>>>;
export declare const NUMBER_SHAPED_POSES: Readonly<Partial<Record<PoseId, FingerCount>>>;
export declare const COUNT_POSES: Readonly<Record<CountFamily, Readonly<Record<FingerCount, PoseId>>>>;
export declare const COUNT_HOLD_WORDS = 14;
export declare const countFingersOf: (pose: unknown) => FingerCount | undefined;
export declare function countFamilyOf(pose: unknown): CountFamily | undefined;
export declare const countPoseFor: (n: FingerCount, family: CountFamily) => PoseId;
export interface CountingWord {
    text: string;
    core?: string;
    functional?: boolean;
    sentence?: number;
}
export interface SpokenNumber {
    index: number;
    value: FingerCount;
    kind: 'cardinal' | 'ordinal';
    text: string;
}
export declare function spokenNumbers(words: readonly CountingWord[]): SpokenNumber[];
export type CountEdit = {
    kind: 'remap';
    index: number;
    word: number;
    at: string;
    from: PoseId;
    fingers: FingerCount;
    to: PoseId;
    said: SpokenNumber;
} | {
    kind: 'drop';
    index: number;
    word: number;
    at: string;
    from: PoseId;
    fingers: FingerCount;
} | {
    kind: 'follow';
    index: number;
    word: number;
    at: string;
    from: PoseId;
    fingers: FingerCount;
    to: PoseId;
    said: SpokenNumber;
};
export interface CountFitOptions {
    family?: CountFamily;
    holdWords?: number;
}
export interface CountFitGesture {
    word: number;
    pose?: string;
}
export declare function describeCountEdit(e: CountEdit, lang?: 'pt' | 'en'): string;
export declare function countEdits(gestures: readonly CountFitGesture[], words: readonly CountingWord[], options?: CountFitOptions): CountEdit[];
export declare function applyCountEdits<G extends CountFitGesture>(gestures: readonly G[], edits: readonly CountEdit[], follow: (source: G, word: number, pose: PoseId, edit: CountEdit) => G): G[];
