import type { AutoLessonCost, AutoLessonOutputs, AutoLessonStageStatus } from './auto-lesson.js';
export declare const AUTO_LESSON_EDIT_TARGETS: readonly ['video', 'short'];
export type AutoLessonEditTarget = (typeof AUTO_LESSON_EDIT_TARGETS)[number];
export declare const AUTO_LESSON_EDIT_STEP_IDS: {
    readonly video: readonly ['script', 'record', 'study', 'quiz', 'video', 'thumbs', 'youtube', 'kit'];
    readonly short: readonly ['short-script', 'podcast', 'render', 'packaging', 'thumbs', 'draft', 'kit'];
};
export type AutoLessonVideoEditStepId = (typeof AUTO_LESSON_EDIT_STEP_IDS.video)[number];
export type AutoLessonShortEditStepId = (typeof AUTO_LESSON_EDIT_STEP_IDS.short)[number];
export declare const AUTO_LESSON_REFINE_ONLY_STEP_IDS: readonly ['planner', 'short-thumbs', 'diff'];
export type AutoLessonRefineOnlyStepId = (typeof AUTO_LESSON_REFINE_ONLY_STEP_IDS)[number];
export type AutoLessonEditStepId = AutoLessonVideoEditStepId | AutoLessonShortEditStepId | AutoLessonRefineOnlyStepId;
export interface AutoLessonEditStep {
    id: AutoLessonEditStepId;
    label: string;
    status: AutoLessonStageStatus;
    detail?: string;
    startedAt?: string;
    endedAt?: string;
    durationMs?: number;
    cost?: AutoLessonCost;
    model?: string;
    log?: string;
    error?: string;
    warnings?: string[];
}
export interface AutoLessonEditFacts {
    speechChanged?: boolean;
    titleChanged?: boolean;
    scriptChanged?: boolean;
    scriptSha1Before?: string;
    actionsChanged?: boolean;
    actionsBefore?: string;
    take?: string;
    run?: string;
    unchanged?: boolean;
    renderLater?: boolean;
}
export interface AutoLessonVersion {
    id: string;
    request?: string;
    base?: string;
    createdAt: string;
    endedAt?: string;
    status: 'running' | 'done' | 'failed' | 'stopped';
    steps: AutoLessonEditStep[];
    cost: number;
    output: NonNullable<AutoLessonOutputs['short']>;
    draft?: {
        title: string;
        description: string;
    };
    facts?: AutoLessonEditFacts;
    youtube?: string;
    retired?: {
        at: string;
        by: string;
        how: 'private' | 'text';
    };
    heartbeatAt?: string;
    warnings?: string[];
    refinement?: string;
}
export interface AutoLessonEditTrack {
    current: string;
    versions: AutoLessonVersion[];
}
export interface AutoLessonEdits {
    video?: AutoLessonEditTrack;
    short?: AutoLessonEditTrack;
    total: number;
}
export declare const AUTO_LESSON_EDIT_REQUEST: {
    readonly min: 3;
    readonly max: 2000;
};
