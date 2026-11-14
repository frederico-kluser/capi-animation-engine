import type { TutorialCourse, TutorialGateReport, TutorialLesson, TutorialLessonOutline } from '../../contracts/tutorial.js';
import { printsNothing } from './dupla.js';
import { practiceAtoms } from './gates.js';
export { practiceAtoms };
export declare const TUTORIAL_OUTLINE_LIMITS: {
    readonly maxSteps: 3;
    readonly maxUnpredicted: 1;
    readonly maxLabelChars: 32;
    readonly maxQuestionChars: 90;
    readonly maxDefinitionChars: 140;
    readonly maxCommandChars: 160;
    readonly mapping: readonly [2, 4];
    readonly moduleLessons: readonly [4, 8];
    readonly reviewWithin: 5;
    readonly consolidationPractices: 2;
    readonly integrationRequires: 2;
    readonly closingIntegrationFrom: 3;
    readonly minGuessWhyWords: 8;
    readonly contrastGuessOverlap: 0.3;
};
export declare const OUTLINE_LEARNER_ARC: readonly [{
    readonly key: 'intuition';
    readonly moments: '1–2';
}, {
    readonly key: 'hypothesis';
    readonly moments: '3–5';
}, {
    readonly key: 'conflict';
    readonly moments: '5–7';
}, {
    readonly key: 'mastery';
    readonly moments: '8–9';
}];
export declare const OUTLINE_PLUMBING_SEGMENT = "abrir";
export declare const outlineStepSegment: (n: number) => string;
export declare const isPlumbingCommand: (command: string) => boolean;
export declare function outlineScreen(outline: Pick<TutorialLessonOutline, 'where' | 'steps'>): Pick<TutorialLesson, 'segments'>;
export { printsNothing };
export declare function outlineSpeech(outline: TutorialLessonOutline): string;
export interface CourseOutlineGateInput {
    course: TutorialCourse;
    atoms: Partial<Record<string, Partial<Record<string, string[]>>>>;
    problems?: ReadonlyArray<{
        lesson: string;
        segment: string;
        code: string;
        error: string;
    }>;
}
export declare function checkCourseOutline(input: CourseOutlineGateInput): TutorialGateReport;
export declare function outlineForAuthor(course: TutorialCourse, lessonId: string): string | null;
