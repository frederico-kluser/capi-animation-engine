import type { StudyLessonBundle } from '../../contracts/study.js';
import type { TutorialCourse, TutorialLesson } from '../../contracts/tutorial.js';
import type { StudyAnchor } from './gates.js';
import type { StudyRunner } from './files.js';
export interface TutorialStudyInput {
    course: Pick<TutorialCourse, 'id' | 'title' | 'cast' | 'concepts' | 'entry' | 'lessons'>;
    lesson: TutorialLesson;
    runner: StudyRunner;
}
export interface TutorialStudyDraft {
    bundle: StudyLessonBundle;
    anchors: StudyAnchor[];
    warnings: string[];
}
export declare const STUDY_FROM_TUTORIAL: {
    readonly optionChars: 80;
    readonly sceneTurns: 4;
    readonly visitTurns: 8;
    readonly recapTurns: 4;
    readonly options: 4;
};
export declare const NOTHING_OPTION = "Nada: a tela fica vazia";
export declare const PRINT_CHALLENGE_SLUG = "mostre-com-print";
export declare function guessValue(text: string): string | null;
export declare function studyAllowedAtoms(course: TutorialStudyInput['course'], lessonNumber: number): Set<string>;
export type PrintChallengeLine = {
    kind: 'show';
    command: string;
    expect: string;
} | {
    kind: 'setup';
    command: string;
};
export declare function printChallengeLines(commands: ReadonlyArray<{
    command: string;
    expect?: string;
}>): PrintChallengeLine[] | null;
export declare function studyBundleFromTutorial(input: TutorialStudyInput): TutorialStudyDraft;
