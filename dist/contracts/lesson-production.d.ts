import type { TutorialLesson } from './tutorial.js';
export declare const LESSON_PHASES: readonly ['intro', 'pre-computer', 'interview', 'practice', 'conclusion', 'cta'];
export type LessonPhase = (typeof LESSON_PHASES)[number];
export declare const LESSON_SEATS: readonly ['host', 'guest'];
export type Seat = (typeof LESSON_SEATS)[number];
export declare const LESSON_EVIDENCE_STATES: readonly ['pass', 'fail', 'unverified', 'notApplicable'];
export type LessonEvidenceState = (typeof LESSON_EVIDENCE_STATES)[number];
export declare const CTA_PLACEMENTS: readonly ['after-recap', 'after-first-win'];
export type CtaPlacement = (typeof CTA_PLACEMENTS)[number];
export declare const EXACT_CHECK_KINDS: readonly ['shell', 'python', 'conceptual'];
export type ExactCheckKind = (typeof EXACT_CHECK_KINDS)[number];
export interface LessonRoles {
    teacherCharacterId: string;
    learnerCharacterId: string;
    teacherSeat: Seat;
    learnerSeat: Seat;
}
export interface RequiredInterviewGuest {
    mode: 'interview';
    personaId: string;
    characterId: string;
    mustSpeak: true;
    minSubstantiveTurns: number;
    factIds: readonly string[];
    cautionIds: readonly string[];
}
export interface RequiredCardGuest {
    mode: 'card';
    personaId: string;
    characterId?: string;
    mustSpeak: false;
    minSubstantiveTurns: 0;
    factIds: readonly string[];
    cautionIds: readonly string[];
}
export type RequiredGuest = RequiredInterviewGuest | RequiredCardGuest;
export interface LessonRequirements {
    needsLearnerComputer: boolean;
    needsTerminalEvidence: boolean;
    guests: readonly RequiredGuest[];
    phases: readonly LessonPhase[];
    contextualCta: boolean;
    ctaPlacement: CtaPlacement;
}
export interface ScopeFence {
    mustTeachConceptIds: readonly string[];
    mayRecallConceptIds: readonly string[];
    mayDisplayOperationalTokens: readonly string[];
    mustNotTeachConceptIds: readonly string[];
    mustNotExecuteTokens: readonly string[];
    resolutionVersion: string;
}
export interface ExactLessonCheck {
    kind: ExactCheckKind;
    prompt: string;
    expected: string;
    misconceptionAnswer: string;
    requiredPredictionCount: number;
}
export interface LessonProductionContract {
    version: 1;
    kind: 'capi-lesson-production';
    lessonId: string;
    roadmapHash: string;
    roles: LessonRoles;
    requirements: LessonRequirements;
    fence: ScopeFence;
    check: ExactLessonCheck;
}
export interface ReconciledLessonBundle {
    version: 1;
    lesson: TutorialLesson;
    textHash: string;
    actionHash: string | null;
    captureHash: string | null;
    captureStatus: 'observed' | 'notApplicable';
    notApplicableReason: string | null;
    validationVersion: string;
}
export declare const PAID_MODALITIES: readonly ['text', 'tts', 'stt', 'image', 'decision'];
export type PaidModality = (typeof PAID_MODALITIES)[number];
export declare const PAID_RECEIPT_STATUSES: readonly ['reserved', 'sent', 'acknowledged', 'complete', 'unknown', 'held', 'reconciled'];
export type PaidReceiptStatus = (typeof PAID_RECEIPT_STATUSES)[number];
export interface PaidCallInput {
    operationId: string;
    attemptId: string;
    budgetId: string;
    nodeId: string;
    lessonHash: string;
    inputHash: string;
    modality: PaidModality;
    estimatedMaxCostUsd: number;
    priceSnapshotHash: string;
}
export interface PaidDispatchControl {
    signal: AbortSignal;
    acknowledge: (generationId: string | null) => Promise<void>;
}
export interface PaidProviderResult {
    value: unknown;
    generationId: string | null;
    chargedCostUsd: number | null;
    processing: 'completed' | 'rejectedBeforeProcessing' | 'unknown';
}
export type PaidCallExecutor = (control: PaidDispatchControl) => Promise<PaidProviderResult>;
export interface PaidReceiptState {
    receiptId: string;
    operationId: string;
    attemptId: string;
    budgetId: string;
    inputHash: string;
    status: PaidReceiptStatus;
    newSpendUsd: number | null;
    historicalCostUsd: number | null;
    reservedUsd: number;
}
export interface PaidReceiptSettlement {
    receiptId: string;
    operationId: string;
    attemptId: string;
    budgetId: string;
    inputHash: string;
    providerResult: PaidProviderResult | null;
    replayed: boolean;
}
export interface PaidCallResult {
    status: 'complete' | 'unknown' | 'held';
    providerResult: PaidProviderResult | null;
    receipt: PaidReceiptState;
}
export interface ContractIssue {
    path: string;
    message: string;
}
export type ContractValidation = {
    ok: true;
    contract: LessonProductionContract;
} | {
    ok: false;
    issues: ContractIssue[];
};
export declare function isSha256(value: unknown): value is string;
export declare function isPlainObject(value: unknown): value is Record<string, unknown>;
export declare function unknownKeys(value: Record<string, unknown>, allowed: readonly string[]): string[];
export declare function validateLessonProductionContract(value: unknown): ContractValidation;
export declare function validateReconciledLessonBundle(value: unknown): {
    ok: boolean;
    issues: ContractIssue[];
};
