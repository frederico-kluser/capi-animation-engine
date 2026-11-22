import { type StudyFinding, type StudyQuizJson, type StudyQuizSkill } from '../../contracts/study.js';
export declare const STUDY_QUIZ_LIMITS: {
    readonly prompt: {
        readonly min: 12;
        readonly max: 400;
    };
    readonly option: {
        readonly min: 1;
        readonly max: 160;
    };
    readonly feedback: {
        readonly min: 20;
        readonly max: 300;
    };
    readonly explanation: {
        readonly min: 20;
        readonly max: 400;
    };
    readonly code: {
        readonly maxChars: 700;
        readonly maxLines: 12;
    };
    readonly minSkills: 4;
    readonly longestCorrectMax: 6;
};
export declare const STUDY_QUIZ_LADDER: Readonly<Record<StudyQuizSkill, number>>;
export declare function readStudyQuiz(value: unknown, base: {
    lesson: string;
    title?: string;
    passScore?: number;
    capi?: StudyQuizJson['capi'];
}): StudyQuizJson;
export interface StudyQuizCheckContext {
    sections?: readonly string[];
    forbidden?: readonly string[];
    questions?: number;
}
export declare function checkStudyQuiz(quiz: StudyQuizJson, context?: StudyQuizCheckContext): StudyFinding[];
export declare function studyQuizFindingsText(findings: readonly StudyFinding[]): string;
export declare function quizScore(right: number, total: number): number;
