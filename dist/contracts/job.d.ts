export declare const JOB_TYPES: readonly ['aula-auto', 'aula-render', 'aula-editar', 'aula-refinar', 'aula-publicar', 'curso', 'criar', 'fala', 'podcast', 'review', 'youtube', 'dobragem', 'simulacao', 'noticia'];
export type JobType = (typeof JOB_TYPES)[number];
export type JobStatus = 'queued' | 'starting' | 'running' | 'done' | 'failed' | 'stopped' | 'interrupted';
export declare const JOB_QUEUE_LANES: readonly ['geracao', 'render'];
export type JobQueueLane = (typeof JOB_QUEUE_LANES)[number];
export interface JobQueueInfo {
    lane: JobQueueLane;
    position?: number;
}
export type JobStageStatus = 'todo' | 'running' | 'done' | 'skipped' | 'failed';
export declare const JOB_UNITS: readonly ['quadros', 'bytes', 'passos', 'falas', 'imagens', 'partes', 'problemas'];
export type JobUnit = (typeof JOB_UNITS)[number];
export interface JobMeasure {
    done: number;
    total: number;
    unit: JobUnit;
    ratePerSec?: number;
}
export interface JobModelCall {
    model: string;
    effort?: string;
    startedAt: string;
    reasoningChars: number;
    contentChars: number;
    attempt?: number;
    round?: {
        n: number;
        max: number;
    };
    lastChunkAt?: string;
    excerpt?: string;
    excerptKind?: 'content' | 'reasoning';
    lastTextAt?: string;
}
export interface JobStage {
    id: string;
    label: string;
    status: JobStageStatus;
    startedAt?: string;
    endedAt?: string;
    durationMs?: number;
    step?: string;
    measure?: JobMeasure;
    model?: JobModelCall;
    typicalMs?: number;
    costUsd?: number;
    log?: string;
    error?: string;
}
export interface JobRecord {
    version: 1;
    kind: 'capi-job';
    id: string;
    runId: string;
    type: JobType;
    title: string;
    subject: {
        lesson?: string;
        course?: string;
        run?: string;
        href?: string;
    };
    status: JobStatus;
    pid?: number;
    launchedAt: string;
    updatedAt: string;
    heartbeatAt: string;
    lastActivityAt?: string;
    endedAt?: string;
    stages: JobStage[];
    costUsd: number;
    log: {
        path: string;
        from: number;
    };
    error?: {
        stage?: string;
        message: string;
        tail: string[];
    };
    resume?: {
        command: string;
        api?: {
            path: string;
            body: Record<string, unknown>;
        };
    };
    queue?: JobQueueInfo;
}
export interface JobHistoryEntry {
    at: string;
    type: JobType;
    stage: string;
    model?: string;
    effort?: string;
    route?: string;
    durationMs: number;
    ok: boolean;
    measure?: {
        total: number;
        unit: JobUnit;
    };
}
export declare const JOB_HEARTBEAT_MS = 10000;
export declare const JOB_QUIET_MS = 45000;
export declare const JOB_STALE_MS: number;
export declare const JOB_START_WINDOW_MS = 90000;
export declare const JOB_FINISHED_TTL_MS: number;
export declare const JOB_PROGRESS_PREFIX = "@@progresso ";
export declare function isRunningJob(job: {
    status: JobStatus;
}): boolean;
export declare function isActiveJob(job: {
    status: JobStatus;
}): boolean;
export declare function isQueuedJob(job: {
    status: JobStatus;
}): boolean;
export declare function isEndedJob(job: {
    status: JobStatus;
}): boolean;
