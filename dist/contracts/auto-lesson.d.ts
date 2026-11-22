import type { AutoLessonEdits } from './auto-lesson-edit.js';
import type { AutoLessonRefinements } from './auto-lesson-refine.js';
export declare const AUTO_LESSON_MODEL = "openai/gpt-6.2-sol";
export declare const AUTO_LESSON_EFFORT = "max";
export declare const AUTO_LESSON_FIX_EFFORT = "max";
export declare const AUTO_LESSON_MODES: readonly ['economico', 'potencia'];
export type AutoLessonMode = (typeof AUTO_LESSON_MODES)[number];
export declare const AUTO_LESSON_MODE_LABELS: Readonly<Record<AutoLessonMode, string>>;
export interface AutoLessonModePreset {
    readonly label: string;
    readonly modelLabel: string;
    readonly model: string;
    readonly effort: 'max';
    readonly maxTokens: number;
    readonly description: string;
    readonly pricePerMillion: {
        readonly input: number;
        readonly output: number;
    };
}
export declare const AUTO_LESSON_MODE_PRESETS: Readonly<Record<AutoLessonMode, AutoLessonModePreset>>;
export declare const isAutoLessonMode: (value: unknown) => value is AutoLessonMode;
export declare const AUTO_LESSON_DIR = "automatico";
export declare const AUTO_LESSON_STAGE_IDS: readonly ['prepare', 'outline', 'doubts', 'script', 'record', 'study', 'quiz', 'video', 'thumbs-video', 'short', 'thumbs-short', 'youtube', 'publish-kit'];
export type AutoLessonStageId = (typeof AUTO_LESSON_STAGE_IDS)[number];
export declare const AUTO_LESSON_VIDEO_ROUTES: readonly ['tutorial', 'create', 'none'];
export type AutoLessonVideoRoute = (typeof AUTO_LESSON_VIDEO_ROUTES)[number];
export declare const AUTO_LESSON_RENDER_TARGETS: readonly ['video', 'short'];
export type AutoLessonRenderTarget = (typeof AUTO_LESSON_RENDER_TARGETS)[number];
export type AutoLessonRenderMode = 'now' | 'later';
export interface AutoLessonPreview {
    player: 'review' | 'podcast' | 'talk';
    libraryId: string;
    durationMs: number;
    profile: 'video' | 'short';
    frames: number;
    proxy?: string;
}
export interface AutoLessonRenderState {
    status: 'running' | 'done' | 'failed' | 'stopped';
    run: string;
    where: 'aqui' | 'macmini';
    startedAt: string;
    endedAt?: string;
    durationMs?: number;
    attempts: number;
    progress?: {
        stage: 'bundle' | 'frames' | 'encode';
        percent: number;
    };
    mp4?: string;
    error?: string;
    warnings?: string[];
    log?: string;
    heartbeatAt?: string;
}
export type AutoLessonStageStatus = 'todo' | 'running' | 'done' | 'skipped' | 'failed';
export interface AutoLessonCost {
    usd: number;
    source: 'registado' | 'chave' | 'nenhum';
    recorded?: number;
    key?: number;
    parts?: Partial<Record<'texto' | 'voz' | 'imagens' | 'outro', number>>;
}
export interface AutoLessonStage {
    id: AutoLessonStageId;
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
    outputs?: Record<string, unknown>;
}
export interface AutoLessonManifest {
    version: 1;
    kind: 'capi-auto-lesson';
    lesson: string;
    course: string;
    builderLesson: string;
    title: string;
    model: string;
    effort: string;
    mode?: AutoLessonMode;
    video: AutoLessonVideoRoute;
    videoAsked?: boolean;
    short: boolean;
    status: 'running' | 'done' | 'failed' | 'stopped';
    startedAt: string;
    updatedAt: string;
    endedAt?: string;
    stages: AutoLessonStage[];
    costs: {
        total: number;
        byStage: Partial<Record<AutoLessonStageId, number>>;
    };
    runner?: {
        pid: number;
        heartbeatAt: string;
    };
    outputs: AutoLessonOutputs;
    edits?: AutoLessonEdits;
    refinements?: AutoLessonRefinements;
    render?: 'later';
    renders?: Partial<Record<AutoLessonRenderTarget, AutoLessonRenderState>>;
    contract?: {
        mode: 'strict';
        lessonId: string;
        roadmapHash: string;
        route: AutoLessonVideoRoute;
    };
    quality?: {
        runtime?: {
            lessonHash: string;
            status: 'pass' | 'fail' | 'unverified';
            report: string;
        };
        media?: {
            lessonHash: string;
            status: 'pass' | 'fail' | 'unverified';
            report: string;
            assetHash: string | null;
        };
        release?: {
            previewReady: boolean;
            publishable: boolean;
            status: 'pass' | 'fail' | 'unverified';
            blockers: string[];
        };
    };
}
export interface AutoLessonVideoOutput {
    run?: string;
    mp4?: string;
    libraryId?: string;
    thumbs?: string[];
    approved?: string;
    youtube?: string;
    durationSec?: number;
    preview?: AutoLessonPreview;
    script?: string;
}
export interface AutoLessonOutputs {
    study?: {
        url: string;
        localUrl: string;
        sections?: number;
        questions?: number;
        quiz?: number;
        exercises?: number;
        exam?: number;
    };
    video?: AutoLessonVideoOutput;
    short?: AutoLessonVideoOutput;
    publish?: {
        plan: string;
        command: string;
        render?: string;
    };
    published?: {
        site?: string;
        at?: string;
    };
}
