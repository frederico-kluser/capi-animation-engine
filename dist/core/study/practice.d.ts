import { type StudyCodeRunner, type StudyCodeTask, type StudyExamJson, type StudyExercisesJson, type StudyFinding } from '../../contracts/study.js';
export declare const STUDY_PRACTICE_LIMITS: {
    readonly title: {
        readonly min: 4;
        readonly max: 70;
    };
    readonly statement: {
        readonly min: 25;
        readonly max: 900;
    };
    readonly hint: {
        readonly min: 12;
        readonly max: 300;
    };
    readonly hints: {
        readonly min: 1;
        readonly max: 3;
    };
    readonly mistakes: {
        readonly min: 1;
        readonly max: 4;
    };
    readonly mistakeTitle: 60;
    readonly feedback: {
        readonly min: 20;
        readonly max: 400;
    };
    readonly code: {
        readonly maxChars: 4000;
        readonly maxLines: 60;
    };
    readonly stdout: {
        readonly maxChars: 2000;
        readonly maxLines: 40;
    };
    readonly fixtures: 5;
};
export declare function readCodeTask(v: unknown, runner: StudyCodeRunner): StudyCodeTask | null;
export declare function readStudyExercises(value: unknown, base: {
    lesson: string;
    runner: StudyCodeRunner;
    capi?: StudyExercisesJson['capi'];
}): StudyExercisesJson;
export declare function readStudyExam(value: unknown, base: {
    lesson: string;
    runner: StudyCodeRunner;
    capi?: StudyExamJson['capi'];
}): StudyExamJson;
export declare function mentionsTerm(haystack: string, term: string): boolean;
export declare function shellCommandNames(code: string): string[];
export interface StudyPracticeCheckContext {
    runner: StudyCodeRunner;
    forbidden?: readonly string[];
    allowedCommands?: readonly string[];
    items?: number;
}
export declare function countDeclaredTests(code: string, runner: StudyCodeRunner): number;
export declare function checkStudyCodeTask(task: StudyCodeTask, context: StudyPracticeCheckContext, where?: string): StudyFinding[];
export declare function checkStudyExercises(json: StudyExercisesJson, context: StudyPracticeCheckContext): StudyFinding[];
export declare function checkStudyExam(json: StudyExamJson, context: StudyPracticeCheckContext & {
    exercises?: readonly StudyCodeTask[];
}): StudyFinding[];
export declare function practiceFindingsText(findings: readonly StudyFinding[]): string;
export interface PracticeRepairMerge {
    tasks: StudyCodeTask[];
    fresh: number[];
    discarded: StudyFinding[];
}
export declare function mergePracticeRepair(tasks: readonly StudyCodeTask[], refused: readonly number[], candidates: readonly StudyCodeTask[], opts: {
    wanted: number;
    kept: readonly number[];
    prefix: string;
}): PracticeRepairMerge;
