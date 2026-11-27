import { type StudyPage, type StudyRecord, type StudySource, type StudyState } from '../../contracts/study.js';
export declare function studyDecision(wanted: boolean, source: StudySource, now: string, page?: StudyPage): StudyRecord;
export declare function readStudyRecord(value: unknown): StudyRecord | null;
export declare function studyState(record: StudyRecord | null, sourceSha1: string | null): StudyState;
export declare function studyStateLabel(state: StudyState): string;
