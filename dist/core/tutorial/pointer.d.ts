import type { TutorialPoint } from '../../contracts/tutorial.js';
export declare const TUTORIAL_POINTER: {
    readonly baseMs: 300;
    readonly perOctaveMs: 150;
    readonly unitPx: 40;
    readonly minMs: 380;
    readonly maxMs: 1100;
    readonly arcPx: 26;
    readonly arcShare: 0.12;
};
export declare function minJerk(u: number): number;
export declare function tutorialPointerTravelMs(from: TutorialPoint, to: TutorialPoint, scale?: number): number;
export declare function tutorialPointerAt(from: TutorialPoint, to: TutorialPoint, u: number, scale?: number): TutorialPoint;
