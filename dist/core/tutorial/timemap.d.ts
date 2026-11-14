import type { TutorialEvent, TutorialTimeMap, TutorialTimeSegment } from '../../contracts/tutorial.js';
export declare const TUTORIAL_RHYTHM: {
    readonly minWaitMs: 1800;
    readonly rampMs: 450;
    readonly minRampMs: 30;
    readonly maxRampShare: 0.8;
    readonly rule: ReadonlyArray<readonly [number, number]>;
    readonly busyPad: {
        readonly before: 400;
        readonly after: 700;
    };
};
export declare function tutorialWaitSpeed(ms: number): number;
export declare function identityTimeMap(takeMs: number): TutorialTimeMap;
export declare function buildTutorialTimeMap(events: readonly TutorialEvent[], takeMs: number): TutorialTimeMap;
export declare function takeToBaseMs(map: TutorialTimeMap, takeMs: number): number;
export declare function eventsToBase(events: readonly TutorialEvent[], map: TutorialTimeMap): TutorialEvent[];
export declare function segmentBlurFrames(seg: TutorialTimeSegment): number;
