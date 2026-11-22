import type { AutoLessonEditStep } from './auto-lesson-edit.js';
import type { AutoLessonVideoOutput } from './auto-lesson.js';
export declare const AUTO_LESSON_REFINE_PARTS: readonly ['roteiro', 'video', 'estudo', 'exercicios', 'prova', 'short', 'youtube'];
export type AutoLessonRefinePart = (typeof AUTO_LESSON_REFINE_PARTS)[number];
export declare const AUTO_LESSON_REFINE_PART_LABELS: Readonly<Record<AutoLessonRefinePart, string>>;
export declare const AUTO_LESSON_REFINE_STATUSES: readonly ['gerando', 'pronta', 'aprovada', 'publicando', 'publicada', 'descartada', 'falhou', 'parada'];
export type AutoLessonRefineStatus = (typeof AUTO_LESSON_REFINE_STATUSES)[number];
export interface AutoLessonDiffLine {
    op: 'equal' | 'remove' | 'add';
    text: string;
}
export interface AutoLessonDiffItem {
    id: string;
    status: 'added' | 'removed' | 'changed' | 'same';
    title: string;
    before?: string;
    after?: string;
    lines?: AutoLessonDiffLine[];
}
export interface AutoLessonRefineDiff {
    part: AutoLessonRefinePart;
    title: string;
    kind: 'text' | 'items' | 'media';
    summary: string;
    changed: boolean;
    lines?: AutoLessonDiffLine[];
    items?: AutoLessonDiffItem[];
    media?: {
        kind: 'video' | 'image' | 'preview';
        before?: string;
        after?: string;
        beforeLabel?: string;
        afterLabel?: string;
    };
}
export interface AutoLessonRefinement {
    id: string;
    request: string;
    parts: AutoLessonRefinePart[];
    partsBy: 'dono' | 'planeador';
    automatic: boolean;
    status: AutoLessonRefineStatus;
    createdAt: string;
    endedAt?: string;
    base: {
        video?: string;
        short?: string;
        studyCommit?: string;
    };
    candidate: {
        video?: string;
        short?: string;
        studyDir?: string;
        scriptPath?: string;
    };
    steps: AutoLessonEditStep[];
    diffs: AutoLessonRefineDiff[];
    cost: number;
    decision?: {
        at: string;
        by: 'dono' | 'automatico';
        verdict: 'aprovada' | 'descartada';
        note?: string;
    };
    published?: {
        at: string;
        video?: string;
        short?: string;
        site?: string;
    };
    heartbeatAt?: string;
    warnings?: string[];
    error?: string;
    derived?: AutoLessonRefinePart[];
    plannerNote?: string;
    facts?: AutoLessonRefineFacts;
    publish?: {
        privacy?: 'private' | 'unlisted' | 'public';
        noSite?: boolean;
    };
    redone?: AutoLessonRefineRedo[];
}
export declare const AUTO_LESSON_REFINE_REDO_TARGETS: readonly ['video', 'gravacao', 'estudo', 'exercicios', 'prova', 'short', 'youtube'];
export type AutoLessonRefineRedoTarget = (typeof AUTO_LESSON_REFINE_REDO_TARGETS)[number];
export interface AutoLessonRefineRedo {
    at: string;
    targets: AutoLessonRefineRedoTarget[];
    steps: AutoLessonEditStep[];
    facts: Partial<AutoLessonRefineFacts>;
    archive?: string;
}
export interface AutoLessonRefineFacts {
    scriptChanged?: boolean;
    scriptSha1Before?: string;
    actionsChanged?: boolean;
    actionsBefore?: string;
    take?: string;
    videoRun?: string;
    videoProduceFrom?: string;
    videoOutput?: AutoLessonVideoOutput;
    shortRun?: string;
    shortOutput?: AutoLessonVideoOutput;
    speechChanged?: boolean;
    shortStale?: boolean;
    redoneAt?: Partial<Record<AutoLessonRefinePart, string>>;
    recordAgain?: boolean;
    takeActions?: string;
}
export interface AutoLessonRefinements {
    items: AutoLessonRefinement[];
    total: number;
}
