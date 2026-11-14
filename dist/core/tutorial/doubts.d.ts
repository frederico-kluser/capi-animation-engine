import type { TutorialCourse, TutorialCourseBrief, TutorialDoubt } from '../../contracts/tutorial.js';
export declare const TUTORIAL_DOUBTS_PROMPT_VERSION = 1;
export declare const TUTORIAL_DOUBTS_LIMITS: {
    readonly max: 6;
    readonly documentFlags: 3;
    readonly quoteChars: 200;
};
export interface FindDoubtsInput {
    course: TutorialCourse;
    lessonId: string;
    document?: string;
    outlineReview?: {
        doubts: readonly TutorialDoubt[];
    } | null;
    lessonReview?: {
        doubts: readonly TutorialDoubt[];
    } | null;
}
export declare function findLessonDoubts(input: FindDoubtsInput): TutorialDoubt[];
export declare function lessonDoubtsPrompt(course: TutorialCourse, lessonId: string, doubts: readonly TutorialDoubt[], opts?: {
    brief?: TutorialCourseBrief;
}): string;
export declare function fnv1a32(text: string): string;
export declare function doubtsFingerprint(doubts: readonly TutorialDoubt[]): string;
export interface DoubtsAnswerCheck {
    chars: number;
    words: number;
    answered: string[];
    missing: string[];
    unverified: string[];
    sources: number;
    appendix: {
        found: boolean;
        ok: boolean;
        error?: string;
    };
    warnings: string[];
}
export declare function checkDoubtsAnswer(text: string, doubts: readonly TutorialDoubt[]): DoubtsAnswerCheck;
