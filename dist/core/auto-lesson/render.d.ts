import type { AutoLessonManifest, AutoLessonRenderState, AutoLessonRenderTarget } from '../../contracts/auto-lesson.js';
export declare const RENDER_TARGETS: readonly AutoLessonRenderTarget[];
export declare const AUTO_LESSON_PREVIEW_FPS = 60;
export declare const renderCommandOf: (lesson: string) => string;
export declare const renderTargetLabel: (target: AutoLessonRenderTarget) => string;
export declare function renderTargetsOf(manifest: AutoLessonManifest): AutoLessonRenderTarget[];
export declare function renderLaterFor(manifest: AutoLessonManifest, target: AutoLessonRenderTarget): boolean;
export declare function publishGate(manifest: AutoLessonManifest): {
    ok: true;
} | {
    ok: false;
    error: string;
};
export declare function withRenderState(manifest: AutoLessonManifest, target: AutoLessonRenderTarget, patch: Partial<AutoLessonRenderState>, now: string): AutoLessonManifest;
export declare function parseRenderProgress(line: string): AutoLessonRenderState['progress'] | null;
export declare function isStaleRender(state: AutoLessonRenderState, nowMs: number, staleMs?: number): boolean;
export declare function renderSizeOf(manifest: AutoLessonManifest, target: AutoLessonRenderTarget): string | null;
export declare function renderSummaryLines(manifest: AutoLessonManifest): string[];
export declare function estimateRenderMs(frames: number, fps: number | null): number | null;
export declare function renderStalled(manifest: AutoLessonManifest, target: AutoLessonRenderTarget, nowMs: number): boolean;
export declare function renderStateText(manifest: AutoLessonManifest, target: AutoLessonRenderTarget): string | null;
export declare function renderCostLine(manifest: AutoLessonManifest): string;
