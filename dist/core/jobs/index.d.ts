import { type JobHistoryEntry, type JobMeasure, type JobModelCall, type JobQueueInfo, type JobQueueLane, type JobRecord, type JobStage, type JobStageStatus, type JobStatus, type JobType, type JobUnit } from '../../contracts/job.js';
export * from './queue.js';
export declare function formatCount(n: number): string;
export declare function formatBytes(n: number): string;
export declare function formatSpan(ms: number): string;
export declare function formatPercent(percent: number): string;
export declare function measurePercent(measure: JobMeasure | undefined): number | null;
export declare function measuredRemainingMs(measure: JobMeasure): number | null;
export declare function measureText(measure: JobMeasure): string;
export interface JobStageView {
    id: string;
    label: string;
    status: JobStageStatus;
    percent: number | null;
    elapsedMs: number;
    remainingMs: number | null;
    typicalMs: number | null;
    late: 'no' | 'over' | 'stuck';
    text: string;
    model?: JobModelCall;
}
export declare function stageView(stage: JobStage, nowMs: number, typicalMs: number | null): JobStageView;
export type JobLiveness = 'live' | 'quiet' | 'stale' | 'dead' | 'ended';
export declare function jobQuietMs(job: JobRecord, nowMs: number): number;
export declare function jobLiveness(job: JobRecord, nowMs: number, pidAlive: boolean | null): JobLiveness;
export interface TypicalKey {
    type: JobType;
    stage: string;
    model?: string;
    effort?: string;
    route?: string;
}
export interface TypicalValue {
    ms: number;
    perUnit?: JobUnit;
    samples: number;
}
export interface TypicalTable {
    get(key: TypicalKey): TypicalValue | undefined;
}
export declare function typicalTable(history: readonly JobHistoryEntry[], seed?: readonly JobHistoryEntry[], window?: number): TypicalTable;
export declare function criticalPathMs(remaining: ReadonlyMap<string, number>, deps: Readonly<Record<string, readonly string[]>>): number;
export interface JobView {
    id: string;
    runId: string;
    type: JobType;
    title: string;
    status: JobStatus;
    liveness: JobLiveness;
    quietMs: number;
    percent: number | null;
    doneStages: number;
    totalStages: number;
    elapsedMs: number;
    remainingMs: number | null;
    costUsd: number;
    headline: string;
    stages: JobStageView[];
    subject?: JobRecord['subject'];
    resume?: JobRecord['resume'];
    href?: string;
    error?: JobRecord['error'];
    queue?: JobRecord['queue'];
}
export declare function typicalFor(value: TypicalValue | undefined, stage: JobStage): number | null;
export declare function jobView(job: JobRecord, opts: {
    nowMs: number;
    pidAlive: boolean | null;
    typical: TypicalTable;
    deps?: Readonly<Record<string, readonly string[]>>;
}): JobView;
export declare function currentStage(view: JobView): JobStageView | null;
export declare function shortLabel(label: string): string;
export declare function queueLaneLabel(lane: JobQueueLane): string;
export declare function queueText(queue: JobQueueInfo): string;
export declare function jobHeadline(view: JobView): string;
export declare function jobShortLine(view: JobView): string;
export declare function jobGlyph(status: JobStatus): string;
export declare function clipLine(text: string, columns: number): string;
export declare function jobTerminalLine(view: JobView, columns: number): string;
export declare function barGlyph(percent: number | null, width?: number): string;
export declare function stageGlyph(status: JobStageStatus): string;
export declare function stageTableText(stage: JobStageView): string;
export interface JobTableOptions {
    columns?: number;
    showId?: boolean;
    hint?: boolean;
    costs?: Partial<Record<string, string>>;
}
export declare function jobTable(view: JobView, options?: JobTableOptions): string[];
export declare function jobsTables(views: readonly JobView[], options?: JobTableOptions): string[];
export interface JobNotice {
    key: string;
    id: string;
    kind: 'done' | 'failed' | 'interrupted';
    title: string;
    text: string;
    href?: string;
}
export declare function jobNotices(before: readonly JobView[] | null, after: readonly JobView[]): JobNotice[];
export declare function sortJobRecords<T extends {
    status: JobStatus;
    launchedAt: string;
}>(records: readonly T[]): T[];
