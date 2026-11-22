import type { JobQueueLane, JobType } from '../../contracts/job.js';
export interface PipelineEntry {
    jobId: string;
    type: Extract<JobType, 'aula-auto' | 'aula-render'>;
    lane: JobQueueLane;
    lesson: string;
    title: string;
    args: string[];
    log: string;
    logFile?: string;
    logFrom?: number;
    runId: string;
    queuedAt: string;
    seq: number;
}
export interface PipelineState {
    version: 1;
    entries: PipelineEntry[];
}
export declare const PIPELINE_LANES: readonly ["geracao", "render"];
export declare function emptyPipeline(): PipelineState;
export declare function parsePipelineState(raw: unknown): PipelineState;
export declare function enqueueEntry(state: PipelineState, entry: PipelineEntry): PipelineState;
export declare function removeEntry(state: PipelineState, jobId: string): PipelineState;
export declare function entryOf(state: PipelineState, jobId: string): PipelineEntry | undefined;
export declare function laneWaiting(state: PipelineState, lane: JobQueueLane): PipelineEntry[];
export declare function queueLength(state: PipelineState, lane?: JobQueueLane): number;
export declare function positionInQueue(state: PipelineState, jobId: string): number | undefined;
export declare function laneLimit(lane: JobQueueLane, generationMax: number): number;
export declare function nextToStart(state: PipelineState, lane: JobQueueLane, running: number, max: number): PipelineEntry | null;
