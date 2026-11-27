import type { FrameScene, SceneFeature } from './render-scene.js';
export type ExecutionHostId = string;
export type RenderBackendId = 'remotion' | 'native';
export declare const RENDER_JOB_KINDS: readonly ['talk', 'podcast', 'review', 'course', 'lesson', 'create', 'render', 'export'];
export type RenderJobKind = (typeof RENDER_JOB_KINDS)[number];
export declare const DURABLE_JOB_STATES: readonly ['queued', 'running', 'waiting_confirmation', 'interrupted', 'reconciling', 'done', 'failed', 'cancelled'];
export type DurableJobState = (typeof DURABLE_JOB_STATES)[number];
export declare const STAGE_STATES: readonly ['pending', 'running', 'done', 'failed', 'skipped', 'waiting'];
export type StageState = (typeof STAGE_STATES)[number];
export declare const WORKER_ERROR_CODES: readonly ['invalid_input', 'invalid_path', 'snapshot_mismatch', 'object_missing', 'object_corrupt', 'lease_lost', 'lease_busy', 'not_authorized', 'host_unavailable', 'no_capacity', 'paid_uncertain', 'unsupported_feature', 'renderer_unavailable', 'render_failed', 'encode_failed', 'verify_failed', 'import_conflict', 'cancelled', 'internal'];
export type WorkerErrorCode = (typeof WORKER_ERROR_CODES)[number];
export interface WorkerError {
    code: WorkerErrorCode;
    message: string;
    retriable: boolean;
    detail?: readonly string[];
}
export declare function fenceOf(jobId: string, attemptId: string, epoch: number): string;
export declare function canTransition(from: DurableJobState, to: DurableJobState): boolean;
export declare function isTerminalJobState(state: DurableJobState): boolean;
export declare function isActiveJobState(state: DurableJobState): boolean;
export interface SnapshotRequest {
    sources: readonly string[];
    allowPrefixes: readonly string[];
    maxBytes?: number;
}
export interface RenderSubmitSpec {
    kind: RenderJobKind;
    subject: string;
    title: string;
    requestedHost: ExecutionHostId;
    backend: RenderBackendId;
    inputRevision: string;
    snapshot: SnapshotRequest;
    jobType?: string;
    params?: Readonly<Record<string, unknown>>;
    href?: string;
    budgets?: JobBudgets;
}
export interface JobBudgets {
    paidCalls?: number;
    timeMs?: number;
    outputBytes?: number;
    nativeMemoryMiB?: number;
}
export interface DurableJobRecord {
    jobId: string;
    version: 1;
    commandId: string;
    idempotencyKey: string;
    spec: RenderSubmitSpec;
    state: DurableJobState;
    stateRevision: number;
    stage: string | null;
    attemptId: string | null;
    epoch: number;
    snapshotHash: string | null;
    createdAt: string;
    updatedAt: string;
    endedAt: string | null;
    error: WorkerError | null;
    paid: PaidState;
    candidate: CandidateState | null;
    artifacts: readonly ArtifactManifest[];
}
export interface PaidState {
    completed: number;
    uncertain: number;
    costUsd: number;
    costUnknown: boolean;
    uncertainKeys?: readonly string[];
}
export interface CandidateState {
    reason: 'target_revision_changed' | 'cancelled' | 'attempt_superseded';
    targetRevision: string;
    expectedRevision: string;
    artifactIds: readonly string[];
    at: string;
}
export interface WorkerIdentity {
    workerId: string;
    hostId: ExecutionHostId;
    bootId: string;
    pid?: number;
}
export interface JobLease {
    jobId: string;
    attemptId: string;
    epoch: number;
    workerId: string;
    hostId: ExecutionHostId;
    bootId: string;
    leaseExpiresAt: string;
    fence: string;
}
export interface AttemptRequest {
    leaseMs: number;
    followOnly?: boolean;
}
export interface JobChange {
    state?: DurableJobState;
    stage?: string | null;
    error?: WorkerError | null;
    paid?: PaidState;
    candidate?: CandidateState | null;
    artifact?: ArtifactManifest;
}
export declare const JOB_EVENT_KINDS: readonly ['submitted', 'attempt_started', 'attempt_lost', 'stage_changed', 'progress', 'artifact_published', 'imported', 'candidate_preserved', 'waiting_confirmation', 'cancelled', 'failed', 'done', 'note'];
export type JobEventKind = (typeof JOB_EVENT_KINDS)[number];
export interface JobEvent {
    eventId: string;
    cursor: number;
    jobId: string;
    stateRevision: number;
    kind: JobEventKind;
    at: string;
    message: string;
    data?: Readonly<Record<string, unknown>>;
}
export interface JobEventPage {
    events: readonly JobEvent[];
    nextCursor: number;
    hasMore: boolean;
}
export interface SnapshotEntry {
    path: string;
    hash: string;
    size: number;
    kind?: string;
}
export interface SealedSnapshot {
    version: 1;
    snapshotHash: string;
    inputRevision: string;
    createdAt: string;
    entries: readonly SnapshotEntry[];
    totalBytes: number;
    directory: string;
}
export interface SnapshotManifest {
    version: 1;
    inputRevision: string;
    entries: readonly SnapshotEntry[];
    totalBytes: number;
}
export interface ClosedObject {
    hash: string;
    size: number;
    path: string;
}
export interface ObjectReceipt {
    hash: string;
    size: number;
    existed: boolean;
    at: string;
}
export interface AttemptObjectScope {
    jobId: string;
    attemptId: string;
    epoch: number;
    snapshotHash: string;
    root: string;
    stagingDir: string;
    journalsDir: string;
    fence: string;
}
export interface ResponseJournalItem {
    requestKey: string;
    seq: number;
    kind: 'request' | 'delta' | 'complete' | 'usage' | 'validation' | 'telemetry';
    text?: string;
    data?: unknown;
    generationId?: string;
    costUsd?: number;
    at: string;
}
export interface ResponseRecovery {
    requestKey: string;
    state: 'absent' | 'partial' | 'complete' | 'invalid';
    text: string;
    deltas: number;
    generationIds: readonly string[];
    cost: {
        known: true;
        usd: number;
    } | {
        known: false;
    };
    at: string | null;
    attempts: readonly string[];
    validation?: unknown;
    data?: unknown;
}
export interface JournalReceipt {
    requestKey: string;
    seq: number;
    bytes: number;
    duplicate: boolean;
    path: string;
    at: string;
}
export interface HostAdmissionRequest {
    hostId: ExecutionHostId;
    backend: RenderBackendId;
    outputBytes: number;
    memoryMiB?: number;
    rendererPath?: string;
    workDir?: string;
    allowCanary?: boolean;
}
export interface AdmissionCheck {
    id: string;
    ok: boolean;
    fatal: boolean;
    detail: string;
}
export interface HostAdmission {
    ok: boolean;
    hostId: ExecutionHostId;
    backend: RenderBackendId;
    checks: readonly AdmissionCheck[];
    freeBytes: number;
    requiredFreeBytes: number;
    capabilities: HostCapabilities;
    warnings: readonly string[];
    at: string;
}
export interface HostCapabilities {
    node: string;
    platform: NodeJS.Platform | string;
    arch: string;
    ffmpeg: string | null;
    ffprobe: string | null;
    native: NativeCapability | null;
    sceneFeatures: readonly SceneFeature[];
    homologatedProfiles: readonly string[];
}
export interface NativeCapability {
    path: string;
    version: string;
    profileId: string;
    sceneFeatures: readonly SceneFeature[];
    state: BackendState;
}
export declare const BACKEND_STATES: readonly ['registered', 'installed', 'testable', 'homologated', 'enabled', 'disabled'];
export type BackendState = (typeof BACKEND_STATES)[number];
export interface BackendRegistry {
    version: 1;
    defaultBackend: RenderBackendId;
    backends: {
        remotion: BackendEntry;
        native: BackendEntry;
    };
}
export interface BackendEntry {
    state: BackendState;
    binary?: string;
    rendererVersion?: string;
    profileId?: string;
    sceneFeatures?: readonly SceneFeature[];
    changedAt?: string;
    note?: string;
    missing?: readonly string[];
}
export interface SealedStageRequest {
    jobId: string;
    attemptId: string;
    epoch: number;
    fence: string;
    hostId: ExecutionHostId;
    backend: RenderBackendId;
    snapshotHash: string;
    stage: string;
    snapshotDir: string;
    params: Readonly<Record<string, unknown>>;
    commandId: string;
}
export interface DispatchReceipt {
    jobId: string;
    attemptId: string;
    fence: string;
    hostId: ExecutionHostId;
    acceptedAt: string;
    pid?: number;
}
export interface StopRequest {
    jobId: string;
    attemptId: string;
    epoch: number;
    fence: string;
    reason: string;
}
export interface StopReceipt {
    jobId: string;
    attemptId: string;
    fence: string;
    acceptedAt: string;
    signalled: boolean;
}
export declare const ARTIFACT_KINDS: readonly ['video', 'audio', 'image', 'png-sequence', 'json'];
export type ArtifactKind = (typeof ARTIFACT_KINDS)[number];
export interface ArtifactManifest {
    artifactId: string;
    jobId: string;
    attemptId: string;
    epoch: number;
    fence: string;
    kind: ArtifactKind;
    format: string;
    path: string;
    hash: string;
    size: number;
    width?: number;
    height?: number;
    durationMs?: number;
    fps?: number;
    hasAlpha?: boolean;
    audio?: {
        hash: string;
        offsetMs: number;
        sampleRate: number;
    };
    inputs: {
        snapshotHash: string;
        identity: string;
    };
    createdAt: string;
}
export interface ArtifactExpectation {
    formats?: readonly string[];
    width?: number;
    height?: number;
    durationMs?: number;
    durationToleranceMs?: number;
    fps?: number;
    hasAlpha?: boolean;
    videoCodecs?: readonly string[];
    audioCodecs?: readonly string[];
    requireAudio?: boolean;
    minBytes?: number;
}
export interface VerifiedArtifact {
    manifest: ArtifactManifest;
    verifiedAt: string;
    probe: MediaProbe | null;
}
export interface MediaProbe {
    format: string;
    durationMs: number | null;
    sizeBytes: number;
    video: {
        codec: string | null;
        width: number | null;
        height: number | null;
        fps: number | null;
        pixFmt: string | null;
        frames: number | null;
    } | null;
    audio: {
        codec: string | null;
        sampleRate: number | null;
        channels: number | null;
        durationMs: number | null;
    } | null;
}
export interface ImportReceipt {
    receiptId: string;
    jobId: string;
    artifactId: string;
    at: string;
    outcome: 'incorporated' | 'stale' | 'duplicate';
    targetRevision: string;
    expectedRevision: string;
    targetPath?: string;
    reason?: string;
}
export interface ImportTarget {
    id: string;
    readRevision(): Promise<string>;
    apply(artifact: VerifiedArtifact): Promise<{
        targetPath: string;
    }>;
}
export interface PinOwner {
    kind: 'job' | 'reader' | 'encoder' | 'import' | 'manual';
    id: string;
}
export interface PinReceipt {
    owner: PinOwner;
    hashes: readonly string[];
    at: string;
    existing: number;
}
export interface GcRequest {
    olderThanMs?: number;
    maxObjects?: number;
    dryRun?: boolean;
}
export interface GcReport {
    at: string;
    scanned: number;
    referenced: number;
    removed: readonly {
        hash: string;
        size: number;
    }[];
    bytesFreed: number;
    kept: number;
    warnings: readonly string[];
}
export interface RecoveryPlan {
    jobId: string;
    state: DurableJobState;
    attemptId: string | null;
    epoch: number;
    snapshotHash: string | null;
    validStages: readonly string[];
    pendingStages: readonly string[];
    frames: {
        committed: number;
        missing: number;
        invalid: readonly number[];
    };
    reusableResponses: readonly string[];
    uncertainResponses: readonly string[];
    actions: readonly string[];
    needsDecision: boolean;
}
export interface JobOutcome {
    jobId: string;
    state: DurableJobState;
    stage: string | null;
    error: WorkerError | null;
    artifacts: readonly ArtifactManifest[];
    framesRendered: number;
    framesReused: number;
    paidCallsAvoided: number;
}
export interface ResponseJournalPort {
    checkpoint(scope: AttemptObjectScope, item: ResponseJournalItem): JournalReceipt;
    reconcile(requestKey: string, jobId?: string): ResponseRecovery;
    flush(requestKey?: string): void;
    requestKeys(jobId: string): string[];
}
export interface ObjectStorePort {
    publishBytes(bytes: Uint8Array): ObjectReceipt;
    publishFile(path: string): Promise<ObjectReceipt>;
    read(hash: string): Uint8Array;
    verify(hash: string, expectedSize?: number): {
        ok: true;
        size: number;
    } | {
        ok: false;
        reason: 'missing' | 'size' | 'digest';
    };
    pathOf(hash: string): string;
}
export interface StageStorePort {
    readFrameIndex(jobId: string, identity?: string): Array<{
        frameIndex: number;
        objectHash: string;
        byteSize: number;
        width: number;
        height: number;
        snapshotHash: string;
        identity: string;
    }>;
    commitFrame(lease: JobLease, frame: {
        frameIndex: number;
        objectHash: string;
        byteSize: number;
        width: number;
        height: number;
        identity: string;
        snapshotHash?: string;
    }): {
        status: 'committed' | 'already' | 'conflict';
        frameIndex: number;
    };
    readStages(jobId: string): Array<{
        stage: string;
        state: StageState;
        output: unknown;
    }>;
    event(lease: JobLease, kind: JobEventKind, message: string, data?: Readonly<Record<string, unknown>>): JobEvent;
}
export interface StageServices {
    journal: ResponseJournalPort;
    objects: ObjectStorePort;
    store: StageStorePort;
}
export interface StageContext {
    job: DurableJobRecord;
    lease: JobLease;
    scope: AttemptObjectScope;
    stage: string;
    params: Readonly<Record<string, unknown>>;
    snapshot: SealedSnapshot;
    progress(message: string, data?: Readonly<Record<string, unknown>>): Promise<void>;
    live?: {
        stage(id: string, patch?: Readonly<Record<string, unknown>>): void;
        line?(text: string): void;
    };
    signal: AbortSignal;
    services: StageServices;
}
export interface StageResult {
    output?: Readonly<Record<string, unknown>>;
    completes?: readonly string[];
    artifact?: ArtifactManifest;
    artifacts?: readonly ArtifactManifest[];
    failure?: WorkerError;
    paidUncertainKeys?: readonly string[];
    metrics?: {
        framesRendered?: number;
        framesReused?: number;
        paidCallsAvoided?: number;
    };
}
export type StageHandler = (context: StageContext) => Promise<StageResult>;
export interface StageHandlers {
    plan: readonly string[];
    handlers: Readonly<Record<string, StageHandler>>;
    rasterStage?: string;
}
export interface RunnerHooks {
    now?: () => number;
    onEvent?: (event: JobEvent) => void;
    onStage?: (stage: string, state: StageState) => void;
    maxLocalRetries?: number;
    retryDelayMs?: number;
    signal?: AbortSignal;
}
export interface JobView {
    jobId: string;
    title: string;
    kind: RenderJobKind;
    subject: string;
    hostId: ExecutionHostId;
    backend: RenderBackendId;
    state: DurableJobState;
    stage: string | null;
    delivery: 'none' | 'ready' | 'received' | 'imported' | 'stale';
    progress: number | null;
    step: string | null;
    framesCommitted: number;
    framesTotal: number | null;
    paid: PaidState;
    error: WorkerError | null;
    createdAt: string;
    updatedAt: string;
    disconnected?: boolean;
}
export interface SubmitJobPayload {
    commandId: string;
    spec: RenderSubmitSpec;
}
export interface SubmitJobResponse {
    job: DurableJobRecord;
    existing: boolean;
}
export interface CancelJobPayload {
    commandId: string;
    reason?: string;
}
export interface CancelReceipt {
    jobId: string;
    cancelled: boolean;
    state: DurableJobState;
    at: string;
}
export interface IncorporatePayload {
    commandId: string;
    artifactId?: string;
    expectedRevision: string;
}
export declare function jobViewOf(record: DurableJobRecord, extra?: {
    progress?: number | null;
    step?: string | null;
    framesCommitted?: number;
    framesTotal?: number | null;
    delivery?: JobView['delivery'];
    disconnected?: boolean;
}): JobView;
export declare function framesProgress(committed: number, total: number | null): number | null;
export declare function jobStateLabel(view: Pick<JobView, 'state' | 'delivery' | 'framesCommitted' | 'error'>): string;
export declare function isRetriableLocalError(error: WorkerError): boolean;
export declare function unsupportedFeatures(scene: Pick<FrameScene, 'features'>, supported: readonly SceneFeature[]): SceneFeature[];
