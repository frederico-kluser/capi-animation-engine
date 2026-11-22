import type { StudyFinding, StudyLessonBundle } from '../../contracts/study.js';
export declare const STUDY_LIMITS: {
    readonly optionsMin: 2;
    readonly optionsMax: 4;
    readonly optionsSoft: 3;
    readonly sectionsMax: 14;
    readonly sectionChars: 2400;
    readonly errorTitleMax: 60;
    readonly errorConditionMax: 220;
    readonly errorFeedbackMin: 20;
    readonly errorCheckMin: 10;
    readonly challengeErrorsMin: 2;
};
export declare const STUDY_BANNED_FEEDBACK: readonly RegExp[];
export declare const sameOption: (a: string, b: string) => boolean;
export declare function pythonTestCount(testsCode: string): number;
export interface StudyAnchor {
    assertionId: string;
    expect: string;
}
export interface StudyGateOptions {
    runner: 'python' | 'shell' | 'nenhuma';
    anchors?: readonly StudyAnchor[];
}
export declare function checkStudyBundle(bundle: StudyLessonBundle, options: StudyGateOptions): StudyFinding[];
export declare const studyErrors: (findings: readonly StudyFinding[]) => StudyFinding[];
export declare const studyFindingsText: (findings: readonly StudyFinding[]) => string;
