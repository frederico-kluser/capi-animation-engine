import { type AutoLessonCost, type AutoLessonManifest, type AutoLessonMode, type AutoLessonStage, type AutoLessonStageId, type AutoLessonVideoRoute } from '../../contracts/auto-lesson.js';
export declare const AUTO_LESSON_STAGE_LABELS: Readonly<Record<AutoLessonStageId, string>>;
export declare const AUTO_LESSON_STAGE_HINTS: Readonly<Record<AutoLessonStageId, string>>;
export declare const AUTO_LESSON_WRITING_STAGES: readonly AutoLessonStageId[];
export declare const AUTO_LESSON_STAGE_HINTS_LATER: Readonly<Partial<Record<AutoLessonStageId, string>>>;
export interface NewAutoLessonInput {
    lesson: string;
    builderLesson: string;
    title: string;
    video: AutoLessonVideoRoute;
    videoAsked?: boolean;
    short: boolean;
    render?: 'later';
    model?: string;
    effort?: string;
    mode?: AutoLessonMode;
    now: string;
}
export interface AutoLessonWriter {
    readonly mode: AutoLessonMode;
    readonly model: string;
    readonly effort: string;
    readonly maxTokens: number;
    readonly notice?: string;
}
export declare function autoLessonWriter(input?: {
    mode?: unknown;
    recorded?: unknown;
    model?: string;
    effort?: string;
}): AutoLessonWriter;
export declare function plannedStages(video: AutoLessonVideoRoute, short: boolean, _render?: 'later'): AutoLessonStageId[];
export declare function newAutoLessonManifest(input: NewAutoLessonInput): AutoLessonManifest;
export declare function autoLessonVideoRoute(input: {
    asked?: AutoLessonVideoRoute;
    previous?: Pick<AutoLessonManifest, 'video' | 'videoAsked'>;
    fallback: AutoLessonVideoRoute;
}): AutoLessonVideoRoute;
export declare function autoLessonCosts(stages: readonly AutoLessonStage[]): AutoLessonManifest['costs'];
export declare function withAutoStage(manifest: AutoLessonManifest, id: AutoLessonStageId, patch: Partial<Omit<AutoLessonStage, 'id' | 'label'>>, now: string): AutoLessonManifest;
export declare function withAutoContract(manifest: AutoLessonManifest, contract: NonNullable<AutoLessonManifest['contract']>, now: string): AutoLessonManifest;
export declare function withAutoQuality(manifest: AutoLessonManifest, quality: Partial<NonNullable<AutoLessonManifest['quality']>>, now: string): AutoLessonManifest;
export declare function autoLessonPublishReady(manifest: AutoLessonManifest): boolean;
export declare function autoLessonQualityLines(manifest: AutoLessonManifest): string[];
export declare const AUTO_LESSON_DEPENDENCIES: Readonly<Record<AutoLessonStageId, readonly AutoLessonStageId[]>>;
export declare function readyAutoStages(manifest: AutoLessonManifest, running?: ReadonlySet<AutoLessonStageId>): AutoLessonStage[];
export declare function upgradeAutoLessonManifest(manifest: AutoLessonManifest): AutoLessonManifest;
export declare function isStaleAutoLesson(manifest: AutoLessonManifest, nowMs: number, staleMs?: number): boolean;
export declare function nextAutoStage(manifest: AutoLessonManifest): AutoLessonStage | null;
export declare function autoStageCost(recorded: number | undefined, key: number | undefined, parts?: AutoLessonCost['parts']): AutoLessonCost;
export declare function formatUsd(value: number): string;
export declare function formatDuration(ms: number): string;
export declare const formatFrames: (n: number) => string;
export declare function autoLessonRenderSummary(manifest: AutoLessonManifest): string | null;
export declare function autoLessonSummary(manifest: AutoLessonManifest): string[];
