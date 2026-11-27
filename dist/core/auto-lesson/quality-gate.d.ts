import type { LessonQualityReport, QualityStatus } from '../../contracts/lesson-quality.js';
export interface ReleaseMediaReport {
    version: 1;
    lessonHash: string;
    status: QualityStatus;
    media: {
        assetHash: string | null;
    };
    metrics: {
        deadAir: {
            intervals: readonly {
                fromMs: number;
                toMs: number;
            }[];
        };
    };
}
export interface ReleaseArtifact {
    id: string;
    kind: string;
    lessonHash: string | null;
    required: boolean;
    status: 'fresh' | 'stale' | 'missing';
    report?: LessonQualityReport | null;
}
export interface ReleaseShortBinding {
    shortLessonHash: string;
    longLessonHash: string;
    sourceTurnIds: readonly string[];
    compiledTurnIds: readonly string[];
    promisedGuestId?: string | null;
    visibleGuestIds?: readonly string[];
    revealsPredictionAnswer?: boolean;
    invitedLessonId?: string | null;
}
export interface LessonReleaseInput {
    lessonHash: string;
    contractRequired: boolean;
    runtime: LessonQualityReport | null;
    media: ReleaseMediaReport | null;
    artifacts: readonly ReleaseArtifact[];
    short?: ReleaseShortBinding | null;
    mode: 'preview' | 'publish';
    ownerApproved: boolean;
    invitedLessonId?: string | null;
}
export interface ReleaseFinding {
    id: string;
    status: Exclude<QualityStatus, 'pass'> | 'pass';
    blocking: boolean;
    message: string;
    owner: string;
}
export interface LessonReleaseDecision {
    previewReady: boolean;
    publishable: boolean;
    status: QualityStatus;
    findings: readonly ReleaseFinding[];
    blockers: readonly string[];
}
export declare function lessonReleaseGate(input: LessonReleaseInput): LessonReleaseDecision;
