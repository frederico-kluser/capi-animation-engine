import type { TutorialConcept, TutorialCourse, TutorialFinding, TutorialGateReport, TutorialLesson, TutorialSegment, TutorialTurn } from '../../contracts/tutorial.js';
export declare const TUTORIAL_STRUCTURAL_ATOMS: ReadonlySet<string>;
export declare function practiceAtoms(concept: Pick<TutorialConcept, 'atoms'>): string[];
export declare const TUTORIAL_GATE_LIMITS: {
    readonly newPerLesson: 1;
    readonly newFirstLesson: 1;
    readonly newWithReceptive: 2;
};
export declare const TUTORIAL_DIDACTIC_LIMITS: {
    readonly learnerTurnShare: 0.35;
    readonly learnerTurnShareMax: 0.5;
    readonly learnerWordShare: readonly [0.25, 0.55];
    readonly learnerQuestions: 2;
    readonly minThinkMs: 3000;
    readonly minThinkMoments: 2;
    readonly maxUnpredictedRuns: 1;
    readonly maxLabelChars: 32;
    readonly maxRuns: 3;
    readonly maxWords: 560;
    readonly minWords: 180;
    readonly maxTurnWords: 34;
    readonly predictThinkMs: readonly [3000, 5000];
    readonly viewerThinkMs: readonly [4000, 6000];
    readonly maxParaphraseOverlap: 0.5;
    readonly minParaphraseWords: 6;
    readonly coConstructFromContentStep: 2;
    readonly maxCopyShare: 0.7;
    readonly maxCopyRun: 6;
};
export type TutorialDidacticCourse = Pick<TutorialCourse, 'cast'> & Partial<Pick<TutorialCourse, 'concepts' | 'lessons' | 'entry'>>;
export declare function checkTutorialDidactics(lesson: TutorialLesson, course: TutorialDidacticCourse): TutorialFinding[];
export declare function segmentTurns(s: TutorialSegment): TutorialTurn[];
export declare function segmentSpeech(s: TutorialSegment): string;
export declare function foldText(text: string): string;
export declare function mentions(folded: string, term: string): boolean;
export declare function screenCodeOf(lesson: Pick<TutorialLesson, 'segments'>): Array<{
    segment: string;
    lang: 'python' | 'shell';
    code: string;
}>;
export declare function shellAtoms(code: string): string[];
export interface TutorialGateInput {
    course: TutorialCourse;
    lessons: Partial<Record<string, TutorialLesson>>;
    atoms: Partial<Record<string, Partial<Record<string, string[]>>>>;
    only?: string;
}
export declare function checkTutorialCourse(input: TutorialGateInput): TutorialGateReport;
