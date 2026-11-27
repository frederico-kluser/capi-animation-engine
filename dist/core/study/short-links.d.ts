import type { StudyShortLinksJson } from '../../contracts/study.js';
export declare const emptyStudyShortLinks: () => StudyShortLinksJson;
export declare const STUDY_COURSE_ALIAS: RegExp;
export declare function readStudyShortLinks(json: unknown): StudyShortLinksJson;
export declare function studyCourseAlias(course: string, taken?: ReadonlySet<string>): string;
export declare function studyShortCode(links: Pick<StudyShortLinksJson, 'links'>, path: string): string | null;
export declare function resolveStudyShortCode(links: Pick<StudyShortLinksJson, 'links'>, code: string): string | null;
export declare function allocateStudyShortCode(table: StudyShortLinksJson, path: string): {
    table: StudyShortLinksJson;
    code: string;
    added: boolean;
};
export declare function moveStudyShortCodes(table: StudyShortLinksJson, from: string, to: string): {
    table: StudyShortLinksJson;
    moved: string[];
};
export declare function studyShortLinksFindings(json: unknown): string[];
