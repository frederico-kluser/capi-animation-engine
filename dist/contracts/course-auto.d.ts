import type { AutoLessonMode } from './auto-lesson.js';
export declare const COURSE_AUTO_CONTRACT_VERSION: 1;
export declare const COURSE_AUTO_KIND: 'capi-course-auto';
export type CourseAutoId = string;
export type CourseRevision = string;
export type CourseProjectPath = string;
export declare const COURSE_SOURCE_KINDS: readonly ['roadmap', 'builder', 'prompt'];
export type CourseSourceKind = (typeof COURSE_SOURCE_KINDS)[number];
export interface CourseRoadmapSource {
    readonly kind: 'roadmap';
    readonly courseId: CourseAutoId;
    readonly planRef?: CourseProjectPath;
}
export interface CourseBuilderSource {
    readonly kind: 'builder';
    readonly courseId: CourseAutoId;
}
export interface CoursePromptSource {
    readonly kind: 'prompt';
    readonly courseId: CourseAutoId;
    readonly topic: string;
    readonly audience: string;
    readonly entry?: string;
    readonly tech?: 'python' | 'shell';
    readonly materialRef?: CourseProjectPath;
    readonly goal?: string;
    readonly lessons?: number;
}
export type CourseSource = CourseRoadmapSource | CourseBuilderSource | CoursePromptSource;
export declare const COURSE_SELECTIONS: readonly ['missing-outputs', 'all', 'lessons'];
export type CourseSelection = (typeof COURSE_SELECTIONS)[number];
export declare const COURSE_DELIVERABLES: readonly ['long', 'study', 'exercises', 'exam', 'short', 'thumbnails', 'youtube-kit'];
export type CourseDeliverable = (typeof COURSE_DELIVERABLES)[number];
export declare const COURSE_RENDER_MODES: readonly ['now', 'pipeline', 'defer'];
export type CourseRenderMode = (typeof COURSE_RENDER_MODES)[number];
export interface CourseRenderPolicy {
    readonly mode: CourseRenderMode;
    readonly maxConcurrent: number;
}
export declare const COURSE_VIDEO_ROUTES: readonly ['tutorial', 'create', 'none'];
export type CourseVideoRoute = (typeof COURSE_VIDEO_ROUTES)[number];
export declare const COURSE_RENDER_TARGETS: readonly ['long', 'short'];
export type CourseRenderTarget = (typeof COURSE_RENDER_TARGETS)[number];
export interface CourseGenerationPolicy {
    readonly initial: number;
    readonly max: number;
    readonly adaptive: boolean;
}
export interface CourseHttpPolicy {
    readonly aggregate: number;
    readonly text: number;
    readonly tts: number;
    readonly stt: number;
    readonly jev: number;
    readonly image: number;
}
export interface CourseLessonReservation {
    readonly ramBytes: number;
    readonly commitBytes: number;
    readonly httpSlots: number;
}
export interface CourseResourcePolicy {
    readonly ramMarginBytes: number;
    readonly commitMarginBytes: number;
    readonly commitPausePercent: number;
    readonly commitResumePercent: number;
    readonly resumeSamples: number;
    readonly sampleMaxAgeMs: number;
    readonly graphicsLane: number;
    readonly cpuWorkers: number;
    readonly wipLessonsWithMedia: number;
    readonly lookaheadCaptures: number;
    readonly reservation: CourseLessonReservation;
}
export interface CourseBudgetPolicy {
    readonly capUsd: number;
}
export interface CourseFailurePolicy {
    readonly continueIndependentLessons: boolean;
    readonly unknownPaid: 'hold' | 'cancel';
}
export type CoursePublicationPolicy = 'manual' | 'kit-only';
export interface CourseAutoPolicy {
    readonly generation: CourseGenerationPolicy;
    readonly render: CourseRenderPolicy;
    readonly http: CourseHttpPolicy;
    readonly resources: CourseResourcePolicy;
    readonly budget: CourseBudgetPolicy;
    readonly failure: CourseFailurePolicy;
    readonly publication: CoursePublicationPolicy;
}
export interface CourseAutoInput {
    readonly version: 1;
    readonly commandId: string;
    readonly courseId: CourseAutoId;
    readonly source: CourseSource;
    readonly expectedInputRevision?: CourseRevision;
    readonly selection: CourseSelection;
    readonly lessons?: readonly CourseAutoId[];
    readonly deliverables: readonly CourseDeliverable[];
    readonly video?: CourseVideoRoute;
    readonly short?: boolean;
    readonly render: CourseRenderPolicy;
    readonly generation: CourseGenerationPolicy;
    readonly budget: CourseBudgetPolicy;
    readonly failure: CourseFailurePolicy;
    readonly publication: CoursePublicationPolicy;
    readonly maxLessons?: number;
    readonly mode?: AutoLessonMode;
}
export type CourseInputValidation = {
    readonly ok: true;
    readonly input: CourseAutoInput;
    readonly warnings: readonly string[];
} | {
    readonly ok: false;
    readonly errors: readonly string[];
    readonly warnings: readonly string[];
};
export interface CourseSourceFile {
    readonly path: CourseProjectPath;
    readonly digest: CourseRevision;
    readonly bytes: number;
}
export interface CourseContextDependency {
    readonly lessonId: CourseAutoId;
    readonly revision?: CourseRevision;
    readonly needs: readonly ('script' | 'state')[];
}
export interface CourseStudyLink {
    readonly lessonId: CourseAutoId;
    readonly path: string;
    readonly url: string;
    readonly revision?: CourseRevision;
}
export interface CourseBundleLesson {
    readonly id: CourseAutoId;
    readonly number: number;
    readonly title: string;
    readonly module: string;
    readonly role: string;
    readonly teaches: readonly string[];
    readonly practices: readonly string[];
    readonly introduces: readonly {
        readonly id: string;
        readonly forms: readonly string[];
        readonly code: readonly string[];
    }[];
    readonly requires: readonly CourseAutoId[];
    readonly reviews: readonly string[];
    readonly visitors: readonly string[];
    readonly guests: readonly string[];
    readonly practiceTech: string;
    readonly builderState: 'script' | 'outline' | 'none';
    readonly scriptDigest?: CourseRevision;
    readonly outlineDigest?: CourseRevision;
    readonly doubts?: number;
    readonly contextDependencies: readonly CourseContextDependency[];
    readonly stateDependencies: readonly CourseContextDependency[];
    readonly capability: CourseLessonCapability;
}
export interface CourseLessonCapability {
    readonly tech: string;
    readonly supported: boolean;
    readonly practice: 'observed' | 'narrated';
    readonly reason?: string;
}
export interface CourseBundle {
    readonly version: 1;
    readonly kind: 'capi-course-bundle';
    readonly courseId: CourseAutoId;
    readonly sourceKind: CourseSourceKind;
    readonly sourceRevision: CourseRevision;
    readonly curriculumRevision?: CourseRevision;
    readonly planRevision: CourseRevision;
    readonly sourceFiles: readonly CourseSourceFile[];
    readonly course: {
        readonly title: string;
        readonly subject?: string;
        readonly tech: string;
        readonly audience?: string;
        readonly entry?: string;
        readonly exit?: string;
        readonly lessons: readonly CourseBundleLesson[];
    };
    readonly cast: {
        readonly teacher: {
            readonly name: string;
            readonly characterId: string;
        };
        readonly learner: {
            readonly name: string;
            readonly characterId: string;
        };
        readonly guests: readonly {
            readonly persona: string;
            readonly name: string;
            readonly living: boolean;
        }[];
    };
    readonly configDigest: CourseRevision;
    readonly generatorVersions: Readonly<Record<string, string>>;
    readonly gates: readonly string[];
    readonly studyLinks: readonly CourseStudyLink[];
    readonly sealedAt: string;
}
export declare const COURSE_NODE_STATES: readonly ['pending', 'ready', 'waiting_admission', 'leased', 'dispatched', 'received', 'validated', 'committed', 'blocked', 'suspended', 'interrupted', 'failed', 'cancelled', 'skipped', 'superseded', 'pending_external'];
export type CourseNodeState = (typeof COURSE_NODE_STATES)[number];
export declare const COURSE_NODE_SETTLED_STATES: readonly ['committed', 'skipped', 'failed', 'cancelled', 'blocked', 'superseded', 'pending_external'];
export type CourseNodeSettledState = (typeof COURSE_NODE_SETTLED_STATES)[number];
export interface CourseAutoNode {
    readonly key: string;
    readonly logicalId: string;
    readonly scope: 'course' | 'lesson';
    readonly lessonId?: CourseAutoId;
    readonly name: string;
    readonly phase: string;
    readonly dependsOn: readonly string[];
    readonly resources: readonly string[];
    readonly condition?: string;
    readonly required: boolean;
    readonly optionalReason?: string;
    readonly state: CourseNodeState;
    readonly revision: number;
    readonly attempt: number;
    readonly inputDigest?: CourseRevision;
    readonly outputDigest?: CourseRevision;
    readonly detail?: string;
    readonly gates?: readonly string[];
}
export interface CourseDag {
    readonly version: 1;
    readonly courseId: CourseAutoId;
    readonly planRevision: CourseRevision;
    readonly selection: CourseSelection;
    readonly renderMode: CourseRenderMode;
    readonly withShort: boolean;
    readonly nodes: readonly CourseAutoNode[];
    readonly templateOrder: readonly string[];
}
export interface CourseDagEdge {
    readonly from: string;
    readonly to: string;
}
export declare const COURSE_RUN_STATES: readonly ['planned', 'blocked_input', 'waiting_material', 'queued', 'running', 'waiting_resources', 'waiting_credits', 'waiting_budget', 'paused', 'waiting_reconciliation', 'orphaned_busy', 'interrupted', 'generated_waiting_render', 'ready_to_publish', 'partial', 'failed', 'cancelled', 'published'];
export type CourseRunState = (typeof COURSE_RUN_STATES)[number];
export declare const COURSE_RUN_TERMINAL_STATES: readonly ['ready_to_publish', 'generated_waiting_render', 'partial', 'failed', 'cancelled', 'published', 'blocked_input', 'waiting_material'];
export type CourseRunTerminalState = (typeof COURSE_RUN_TERMINAL_STATES)[number];
export declare const COURSE_RUN_EXECUTOR_STATES: readonly ['queued', 'running', 'waiting_resources', 'interrupted'];
export declare const COURSE_RUN_OWNER_HOLD_STATES: readonly ['waiting_reconciliation', 'waiting_budget', 'waiting_credits', 'orphaned_busy', 'paused'];
export declare const COURSE_LESSON_STATES: readonly ['pending', 'waiting_context', 'queued', 'running', 'rendering', 'generated', 'generated_waiting_render', 'ready', 'partial', 'failed', 'blocked', 'skipped', 'cancelled'];
export type CourseLessonState = (typeof COURSE_LESSON_STATES)[number];
export interface CourseLessonRun {
    readonly lessonId: CourseAutoId;
    readonly ordinal: number;
    readonly title: string;
    readonly state: CourseLessonState;
    readonly contextDependencies?: readonly CourseAutoId[];
    readonly stateDependencies?: readonly CourseAutoId[];
    readonly revision?: CourseRevision;
    readonly outputs?: Readonly<Record<string, string>>;
    readonly gates?: Readonly<Record<string, 'pass' | 'fail' | 'unverified'>>;
    readonly blockers?: readonly string[];
    readonly resources?: {
        readonly peakRamBytes?: number;
        readonly peakCommitBytes?: number;
    };
    readonly admittedAt?: string;
    readonly updatedAt: string;
}
export interface CourseCostSummary {
    readonly newUsd: number;
    readonly historicalUsd: number;
    readonly reservedUsd: number;
    readonly unknownUsd: number;
}
export interface CourseRenderState {
    readonly long?: CourseRenderTicket;
    readonly short?: CourseRenderTicket;
}
export interface CourseAutoRun {
    readonly version: 1;
    readonly kind: 'capi-course-auto';
    readonly runId: string;
    readonly jobId?: string;
    readonly commandId: string;
    readonly courseId: CourseAutoId;
    readonly sourceKind: CourseSourceKind;
    readonly inputRevision: CourseRevision;
    readonly curriculumRevision?: CourseRevision;
    readonly planRevision: CourseRevision;
    readonly stateRevision: number;
    readonly state: CourseRunState;
    readonly selection: CourseSelection;
    readonly deliverables: readonly CourseDeliverable[];
    readonly policy: CourseAutoPolicy;
    readonly lessons: readonly CourseLessonRun[];
    readonly dag: CourseDag;
    readonly cursor: number;
    readonly costs: CourseCostSummary;
    readonly errors: readonly CourseAutoError[];
    readonly render: CourseRenderState;
    readonly publication: CoursePublicationPolicy;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly startedAt?: string;
    readonly endedAt?: string;
    readonly draining?: boolean;
    readonly deferredRecovery?: CourseDeferredRecovery;
}
export interface CourseDeferredRecovery {
    readonly nextState: CourseRunState;
    readonly code: CourseErrorCode;
    readonly reason: string;
    readonly heldBy: CourseRunState;
    readonly lessonId?: CourseAutoId;
    readonly at: string;
}
export declare const COURSE_EVENT_KINDS: readonly ['run', 'plan', 'lesson', 'node', 'attempt', 'admission', 'resources', 'command', 'receipt', 'repair', 'render', 'delivery', 'error'];
export type CourseEventKind = (typeof COURSE_EVENT_KINDS)[number];
export interface CourseAutoEvent {
    readonly version: 1;
    readonly cursor: number;
    readonly runId: string;
    readonly kind: CourseEventKind;
    readonly message: string;
    readonly lessonId?: CourseAutoId;
    readonly nodeId?: string;
    readonly operationId?: string;
    readonly attemptId?: string;
    readonly revision?: CourseRevision;
    readonly data?: unknown;
    readonly at: string;
}
export declare const COURSE_ERROR_CLASSES: readonly ['input', 'curriculum', 'capability', 'quality', 'network', 'financial', 'resource', 'integrity', 'control', 'unknown'];
export type CourseErrorClass = (typeof COURSE_ERROR_CLASSES)[number];
export declare const COURSE_ERROR_CODES: readonly ['INVALID_REQUEST', 'INVALID_PATH', 'COMMAND_CONFLICT', 'INPUT_CONFLICT', 'INPUT_REVISION_CONFLICT', 'MATERIAL_REQUIRED', 'UNVERIFIED_REQUIRED_FACT', 'CAST_REQUIRED', 'UNSUPPORTED_ADAPTER', 'DEPENDENCY_NOT_READY', 'SCHEMA_INVALID', 'QUALITY_GATE_FAILED', 'REVIEW_FAILED', 'AUTH_401', 'PERMISSION_403', 'MODEL_404', 'CREDITS_402', 'BUDGET_EXHAUSTED', 'RATE_429', 'NETWORK_PRE_DISPATCH', 'TIMEOUT_408', 'SERVER_5XX', 'STREAM_INTERRUPTED', 'PAID_UNKNOWN', 'OUTPUT_TRUNCATED', 'USAGE_UNKNOWN', 'RAM_PRESSURE', 'COMMIT_PRESSURE', 'CPU_PRESSURE', 'DISK_LOW', 'ENOSPC', 'EPERM', 'EBUSY', 'EACCES', 'OOM', 'PROCESS_CRASH', 'DEVICE_LOST', 'ORPHANED_BUSY', 'DEPENDENCY_MISSING', 'BACKEND_UNAVAILABLE', 'RESOURCE_SAMPLE_STALE', 'LEASE_LOST', 'FENCE_OLD', 'CAS_CONFLICT', 'ARTIFACT_CORRUPT', 'HASH_MISMATCH', 'CHECKPOINT_MISSING', 'JOURNAL_SCOPE_CONFLICT', 'BUDGET_SCOPE_CONFLICT', 'PERSISTENCE_CRITICAL_FAILED', 'REPLAY_METADATA_MISSING', 'DAG_INVALID', 'PAUSE_REQUESTED', 'CANCEL_REQUESTED', 'OBSERVER_DISCONNECTED', 'HOST_RESTART', 'DEADLINE_ACTIVE_EXCEEDED', 'CHILD_FAILED', 'COURSE_PARTIAL', 'UNEXPECTED_EXCEPTION'];
export type CourseErrorCode = (typeof COURSE_ERROR_CODES)[number];
export declare const COURSE_ERROR_CLASS_OF: Readonly<Record<CourseErrorCode, CourseErrorClass>>;
export interface CourseErrorScope {
    readonly runId?: string;
    readonly lessonId?: CourseAutoId;
    readonly nodeId?: string;
    readonly operationId?: string;
    readonly attemptId?: string;
    readonly revision?: CourseRevision;
}
export interface CourseAutoError {
    readonly version: 1;
    readonly code: CourseErrorCode;
    readonly class: CourseErrorClass;
    readonly message: string;
    readonly retryable: boolean;
    readonly scope: CourseErrorScope;
    readonly phase: string;
    readonly sentUnknown?: boolean;
    readonly cost?: {
        readonly knownUsd?: number;
        readonly unknownUsd?: number;
    };
    readonly checkpoint?: string;
    readonly resource?: string;
    readonly action: string;
    readonly at: string;
}
export interface CourseResourceSample {
    readonly version: 1;
    readonly hostId: string;
    readonly bootId: string;
    readonly sampledAt: string;
    readonly freshness: 'fresh' | 'stale' | 'unknown';
    readonly physicalAvailableBytes: number | null;
    readonly physicalTotalBytes: number | null;
    readonly committedBytes: number | null;
    readonly commitLimitBytes: number | null;
    readonly cpu?: {
        readonly cores: number;
        readonly load1: number | null;
        readonly busyPercent: number | null;
    };
    readonly volumes: readonly {
        readonly path: string;
        readonly freeBytes: number;
        readonly totalBytes: number;
    }[];
    readonly ownProcesses: readonly {
        readonly pid: number;
        readonly role: string;
    }[];
    readonly reservedBytes: number;
    readonly unknown: readonly string[];
    readonly profile: 'unknown' | 'calibrated';
}
export interface CourseResourceLease {
    readonly leaseId: string;
    readonly kind: 'generation' | 'graphics' | 'http' | 'cpu' | 'ram' | 'commit' | 'render';
    readonly runId: string;
    readonly lessonId?: CourseAutoId;
    readonly attemptId?: string;
    readonly quantity: number;
    readonly epoch: number;
    readonly expiresAt: string;
    readonly releasedAt?: string;
    readonly orphaned?: boolean;
}
export interface CourseResourceSnapshot {
    readonly sample: CourseResourceSample;
    readonly leases: readonly CourseResourceLease[];
}
export declare const COURSE_MODALITIES: readonly ['text', 'tts', 'stt', 'jev', 'image'];
export type CourseModality = (typeof COURSE_MODALITIES)[number];
export declare const COURSE_OPERATION_STATUSES: readonly ['pending', 'sent', 'received', 'validated', 'committed', 'rejected', 'sent_unknown', 'failed', 'superseded'];
export type CourseOperationStatus = (typeof COURSE_OPERATION_STATUSES)[number];
export interface CourseCitation {
    readonly url: string;
    readonly title?: string;
    readonly snippet?: string;
}
export interface CourseUsage {
    readonly promptTokens?: number;
    readonly completionTokens?: number;
    readonly reasoningTokens?: number;
    readonly webSearches?: number;
    readonly characters?: number;
    readonly images?: number;
    readonly costUsd?: number | null;
}
export interface CourseOperationInput {
    readonly runId: string;
    readonly lessonId?: CourseAutoId;
    readonly nodeId: string;
    readonly operationId: string;
    readonly attemptId: string;
    readonly budgetId: string;
    readonly modality: CourseModality;
    readonly inputHash: CourseRevision;
    readonly estimatedMaxCostUsd: number;
    readonly provider: string;
    readonly model?: string;
    readonly request: unknown;
    readonly signal?: AbortSignal;
}
export interface CourseProviderResult {
    readonly content?: string;
    readonly reasoning?: string;
    readonly citations?: readonly CourseCitation[];
    readonly toolOutputs?: readonly unknown[];
    readonly generationId?: string;
    readonly model?: string;
    readonly provider?: string;
    readonly usage?: CourseUsage;
    readonly processing?: 'completed' | 'rejectedBeforeProcessing' | 'unknown';
}
export interface CourseProviderAdapter {
    readonly name: string;
    dispatch(input: CourseOperationInput): Promise<CourseProviderResult>;
}
export interface CourseOperationReceipt {
    readonly version: 1;
    readonly runId: string;
    readonly lessonId?: CourseAutoId;
    readonly nodeId: string;
    readonly operationId: string;
    readonly attemptId: string;
    readonly budgetId: string;
    readonly modality: CourseModality;
    readonly inputHash: CourseRevision;
    readonly status: CourseOperationStatus;
    readonly provider: string;
    readonly model?: string;
    readonly request?: unknown;
    readonly generationId?: string;
    readonly content?: string;
    readonly citations?: readonly CourseCitation[];
    readonly toolOutputs?: readonly unknown[];
    readonly usage?: CourseUsage;
    readonly costUsd: {
        readonly newUsd: number;
        readonly historicalUsd: number;
        readonly unknownUsd: number;
        readonly reservedUsd: number;
    };
    readonly artifactDigest?: CourseRevision;
    readonly sentAt?: string;
    readonly receivedAt?: string;
    readonly settledAt?: string;
    readonly error?: CourseAutoError;
}
export interface CoursePromotionStep {
    readonly kind: 'write-file' | 'git-commit' | 'update-course' | 'publish-pointer';
    readonly path: CourseProjectPath;
    readonly digest?: CourseRevision;
    readonly state: 'pending' | 'done' | 'failed';
    readonly detail?: string;
}
export interface CoursePromotionIntent {
    readonly version: 1;
    readonly intentId: string;
    readonly runId: string;
    readonly lessonId?: CourseAutoId;
    readonly kind: 'course-state' | 'artifact' | 'manifest' | 'study-link' | 'git';
    readonly baseRevision?: CourseRevision;
    readonly expectedCourseDigest?: CourseRevision;
    readonly artifacts: readonly {
        readonly path: CourseProjectPath;
        readonly digest: CourseRevision;
        readonly bytes?: number;
    }[];
    readonly lessonState?: string;
    readonly commit?: {
        readonly paths: readonly CourseProjectPath[];
        readonly subject: string;
        readonly body?: string;
    };
    readonly steps: readonly CoursePromotionStep[];
    readonly state: 'pending' | 'applied' | 'failed' | 'conflict';
    readonly createdAt: string;
}
export interface CoursePromotionInput {
    readonly runId: string;
    readonly lessonId?: CourseAutoId;
    readonly kind: CoursePromotionIntent['kind'];
    readonly baseRevision?: CourseRevision;
    readonly expectedCourseDigest?: CourseRevision;
    readonly artifacts?: readonly {
        readonly path: CourseProjectPath;
        readonly digest: CourseRevision;
        readonly bytes?: number;
        readonly stagedContent?: string;
    }[];
    readonly lessonState?: string;
    readonly commit?: {
        readonly paths: readonly CourseProjectPath[];
        readonly subject: string;
        readonly body?: string;
    };
    readonly allowGit: boolean;
}
export interface CoursePromotionResult {
    readonly promoted: boolean;
    readonly revision?: CourseRevision;
    readonly conflicts: readonly string[];
    readonly steps: readonly CoursePromotionStep[];
    readonly skipped?: string;
    readonly git?: {
        readonly committed: boolean;
        readonly hash?: string;
        readonly subject: string;
    };
}
export declare const COURSE_RENDER_TICKET_STATES: readonly ['pending', 'queued', 'claimed', 'running', 'done', 'failed', 'pending_external', 'cancelled'];
export type CourseRenderTicketState = (typeof COURSE_RENDER_TICKET_STATES)[number];
export interface CourseRenderTicket {
    readonly version: 1;
    readonly ticketId: string;
    readonly runId: string;
    readonly lessonId: CourseAutoId;
    readonly target: CourseRenderTarget;
    readonly inputDigest: CourseRevision;
    readonly state: CourseRenderTicketState;
    readonly position?: number;
    readonly mp4?: string;
    readonly run?: string;
    readonly lane: 'graphics:host';
    readonly requestedAt: string;
    readonly startedAt?: string;
    readonly endedAt?: string;
    readonly error?: string;
    readonly attempts: number;
}
export interface CourseRenderReadyInput {
    readonly runId: string;
    readonly lessonId: CourseAutoId;
    readonly target: CourseRenderTarget;
    readonly inputDigest: CourseRevision;
    readonly mp4?: string;
    readonly run?: string;
    readonly defer?: boolean;
}
export interface CourseSourceInput {
    readonly source: CourseSource;
    readonly expectedInputRevision?: CourseRevision;
    readonly env?: NodeJS.ProcessEnv;
}
export interface CoursePlanningResult {
    readonly status: 'planned' | 'waiting_material' | 'blocked' | 'unsupported';
    readonly bundle: CourseBundle;
    readonly costUsd: number;
    readonly historicalUsd: number;
    readonly evidence: readonly string[];
    readonly errors: readonly CourseAutoError[];
}
export interface CourseRepairFinding {
    readonly id: string;
    readonly owner: 'spine' | 'part' | 'study' | 'practice' | 'voice' | 'direction' | 'editorial' | 'course';
    readonly lessonId?: CourseAutoId;
    readonly nodeId?: string;
    readonly message: string;
    readonly severity: 'blocker' | 'suggestion';
    readonly parts?: readonly string[];
}
export interface CourseRepairPlan {
    readonly runId: string;
    readonly lessonId?: CourseAutoId;
    readonly baseRevision: number;
    readonly nextRevision: number;
    readonly owners: readonly CourseRepairFinding['owner'][];
    readonly findings: readonly CourseRepairFinding[];
    readonly invalidates: readonly string[];
    readonly attemptsUsed: number;
    readonly attemptsLimit: number;
    readonly exhausted: boolean;
    readonly reason: string;
}
export interface CourseRepairInput {
    readonly runId: string;
    readonly lessonId?: CourseAutoId;
    readonly baseRevision: number;
    readonly attemptsUsed: number;
    readonly attemptsLimit: number;
    readonly findings: readonly CourseRepairFinding[];
    readonly dag?: CourseDag;
}
export interface CourseRecoveryDecision {
    readonly action: 'retry' | 'repair' | 'wait' | 'pause' | 'cancel' | 'reconcile' | 'fail' | 'release';
    readonly retryable: boolean;
    readonly delayMs?: number;
    readonly releasePhysical: boolean;
    readonly releaseFinancial: boolean;
    readonly nextState?: CourseRunState;
    readonly reason: string;
    readonly error: CourseAutoError;
}
export interface CourseRecoveryInput {
    readonly runId: string;
    readonly error: CourseAutoError;
    readonly receipt?: CourseOperationReceipt;
    readonly processAlive?: boolean | null;
    readonly expectedRevision?: CourseRevision;
    readonly nowMs: number;
}
export interface CoursePipelineView {
    readonly runId: string;
    readonly courseId: string;
    readonly state: CourseRunState;
    readonly stateRevision: number;
    readonly selection: CourseSelection;
    readonly lessons: readonly {
        readonly lessonId: CourseAutoId;
        readonly ordinal: number;
        readonly title: string;
        readonly state: CourseLessonState;
        readonly revision?: CourseRevision;
        readonly doneNodes: number;
        readonly activeNodes: number;
        readonly pendingNodes: number;
        readonly failedNodes: number;
        readonly blockers: readonly string[];
    }[];
    readonly counts: {
        readonly lessonsTotal: number;
        readonly lessonsReady: number;
        readonly lessonsActive: number;
        readonly lessonsWaiting: number;
        readonly lessonsPending: number;
        readonly lessonsFailed: number;
        readonly nodesDone: number;
        readonly nodesRunning: number;
        readonly nodesReady: number;
        readonly nodesFailed: number;
        readonly nodesSkipped: number;
        readonly nodesPendingExternal: number;
    };
    readonly resources: {
        readonly freshness: 'fresh' | 'stale' | 'unknown';
        readonly sampledAt: string | null;
        readonly ramAvailableBytes: number | null;
        readonly ramHeadroomBytes: number | null;
        readonly commitKnown: boolean;
        readonly commitPercent: number | null;
        readonly graphicsLane: 'free' | 'busy' | 'orphaned' | 'unknown';
        readonly generationActive: number;
        readonly generationTarget: number;
        readonly draining: boolean;
        readonly cpuBusyPercent: number | null;
        readonly diskFreeBytes: number | null;
    };
    readonly costs: CourseCostSummary;
    readonly queue: {
        readonly renderActive: boolean;
        readonly renderQueued: number;
    };
    readonly errors: readonly CourseAutoError[];
    readonly eventsCursor: number;
    readonly etaMs: number | null;
    readonly unknown: readonly string[];
}
export interface CourseDeliveryLesson {
    readonly lessonId: CourseAutoId;
    readonly revision: CourseRevision;
    readonly script?: {
        readonly path: string;
        readonly digest: CourseRevision;
    };
    readonly study?: {
        readonly path: string;
        readonly url: string;
        readonly digest: CourseRevision;
    };
    readonly practice?: {
        readonly exercises: number;
        readonly exam: number;
        readonly digest: CourseRevision;
    };
    readonly short?: {
        readonly run?: string;
        readonly mp4?: string;
        readonly binding: 'included' | 'absent';
        readonly digest: CourseRevision;
    };
    readonly thumbnails?: readonly string[];
    readonly packaging?: {
        readonly path: string;
        readonly digest: CourseRevision;
    };
    readonly gates: Readonly<Record<string, 'pass' | 'fail' | 'unverified'>>;
    readonly render: {
        readonly long: 'done' | 'pending_external' | 'not_requested' | 'failed';
        readonly short: 'done' | 'pending_external' | 'not_requested' | 'failed';
    };
    readonly blockers: readonly string[];
}
export interface CourseDeliveryResult {
    readonly status: 'ready_to_publish' | 'generated_waiting_render' | 'partial' | 'failed';
    readonly blockers: readonly string[];
    readonly lessons: readonly CourseDeliveryLesson[];
    readonly kit?: {
        readonly path: string;
        readonly digest: CourseRevision;
    };
    readonly manifest: {
        readonly version: 1;
        readonly kind: 'capi-course-delivery';
        readonly runId: string;
        readonly courseId: string;
        readonly planRevision: CourseRevision;
        readonly generatedAt: string;
        readonly summary: {
            readonly lessons: number;
            readonly ready: number;
            readonly partial: number;
            readonly failed: number;
        };
    };
}
