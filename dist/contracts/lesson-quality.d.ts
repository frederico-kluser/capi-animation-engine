import type { LessonPhase } from './lesson-production.js';
import { type ContractIssue } from './lesson-production.js';
export declare const QUALITY_STATUSES: readonly ['pass', 'fail', 'unverified'];
export type QualityStatus = (typeof QUALITY_STATUSES)[number];
export declare const QUALITY_FINDING_STATUSES: readonly ['pass', 'fail', 'unverified', 'notApplicable'];
export type QualityFindingStatus = (typeof QUALITY_FINDING_STATUSES)[number];
export declare const QUALITY_EVIDENCE_SOURCES: readonly ['declared', 'compiled', 'measured'];
export type QualityEvidenceSource = (typeof QUALITY_EVIDENCE_SOURCES)[number];
export declare const QUALITY_CLOCKS: readonly ['script', 'take', 'base', 'audio', 'timeline', 'render'];
export type QualityClock = (typeof QUALITY_CLOCKS)[number];
export declare const QUALITY_OWNERS: readonly ['contract', 'author', 'capture', 'reconcile', 'direction', 'face', 'camera', 'voice', 'composer', 'orchestrator', 'editor', 'curation'];
export type QualityOwner = (typeof QUALITY_OWNERS)[number];
export interface QualityInterval {
    clock: QualityClock;
    startMs: number;
    endMs: number;
}
export interface QualityEvidence {
    id: string;
    requirementId: string;
    source: QualityEvidenceSource;
    phase?: LessonPhase;
    segmentId?: string;
    sourceTurnId?: string;
    assetHash: string;
    interval?: QualityInterval;
    method: string;
    detail: string;
}
export interface QualityFinding {
    id: string;
    requirementId: string;
    status: QualityFindingStatus;
    phase?: LessonPhase;
    segmentId?: string;
    sourceTurnId?: string;
    owner: QualityOwner;
    message: string;
    evidenceIds: readonly string[];
    blocking: boolean;
    notApplicableReason?: string;
}
export interface LessonQualityCosts {
    newSpendUsd: number;
    historicalCostUsd: number | null;
    unknownSpendUsd: number | null;
    reservedUsd: number;
}
export interface LessonQualityReport {
    version: 1;
    lessonHash: string;
    status: QualityStatus;
    findings: readonly QualityFinding[];
    evidence: readonly QualityEvidence[];
    costs?: LessonQualityCosts;
}
export declare function qualityStatusOf(findings: readonly Pick<QualityFinding, 'status'>[]): QualityStatus;
export type QualityValidation = {
    ok: true;
    report: LessonQualityReport;
} | {
    ok: false;
    issues: ContractIssue[];
};
export declare function validateLessonQualityReport(value: unknown): QualityValidation;
