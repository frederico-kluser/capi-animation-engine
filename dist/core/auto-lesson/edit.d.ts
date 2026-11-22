import type { AutoLessonManifest, AutoLessonVideoRoute } from '../../contracts/auto-lesson.js';
import { type AutoLessonEditFacts, type AutoLessonEditStep, type AutoLessonEditStepId, type AutoLessonEditTarget, type AutoLessonEditTrack, type AutoLessonEdits, type AutoLessonVersion } from '../../contracts/auto-lesson-edit.js';
export declare const AUTO_LESSON_EDIT_STEP_LABELS: Readonly<{
    video: Readonly<Record<string, string>>;
    short: Readonly<Record<string, string>>;
}>;
export declare const AUTO_LESSON_EDIT_STEP_HINTS: Readonly<{
    video: Readonly<Record<string, string>>;
    short: Readonly<Record<string, string>>;
}>;
export declare const editStepIds: (target: AutoLessonEditTarget) => readonly AutoLessonEditStepId[];
export declare const editStepLabel: (target: AutoLessonEditTarget, id: AutoLessonEditStepId) => string;
export declare function editRequestOf(value: unknown): {
    text: string;
} | {
    problem: string;
};
export declare function planEditSteps(target: AutoLessonEditTarget, route: AutoLessonVideoRoute, facts?: AutoLessonEditFacts): AutoLessonEditStep[];
export declare function replanEditSteps(steps: readonly AutoLessonEditStep[], target: AutoLessonEditTarget, route: AutoLessonVideoRoute, facts: AutoLessonEditFacts): AutoLessonEditStep[];
export declare function reusesTake(route: AutoLessonVideoRoute, facts: AutoLessonEditFacts, takeHere: boolean): boolean;
export declare function seedEditTrack(manifest: AutoLessonManifest, target: AutoLessonEditTarget): AutoLessonEditTrack;
export declare function editTrackOf(manifest: AutoLessonManifest, target: AutoLessonEditTarget): AutoLessonEditTrack;
export declare function nextVersionId(track: AutoLessonEditTrack): string;
export declare const versionOf: (track: AutoLessonEditTrack | undefined, id: string | undefined) => AutoLessonVersion | undefined;
export declare function editsTotal(edits: Pick<AutoLessonEdits, 'video' | 'short'>): number;
export declare function withEditTrack(manifest: AutoLessonManifest, target: AutoLessonEditTarget, track: AutoLessonEditTrack, now: string): AutoLessonManifest;
export declare function addEditVersion(manifest: AutoLessonManifest, input: {
    target: AutoLessonEditTarget;
    request: string;
    route: AutoLessonVideoRoute;
    now: string;
    facts?: AutoLessonEditFacts;
}): {
    manifest: AutoLessonManifest;
    version: AutoLessonVersion;
};
export declare function withEditVersion(manifest: AutoLessonManifest, target: AutoLessonEditTarget, id: string, patch: Partial<Omit<AutoLessonVersion, 'id'>>, now: string): AutoLessonManifest;
export declare function withEditStep(manifest: AutoLessonManifest, target: AutoLessonEditTarget, id: string, stepId: AutoLessonEditStepId, patch: Partial<Omit<AutoLessonEditStep, 'id' | 'label'>>, now: string): AutoLessonManifest;
export declare function setCurrentVersion(manifest: AutoLessonManifest, target: AutoLessonEditTarget, id: string, now: string): AutoLessonManifest;
export declare function liveVersion(track: AutoLessonEditTrack | undefined): AutoLessonVersion | undefined;
export declare function pendingReplacement(track: AutoLessonEditTrack | undefined): {
    current: AutoLessonVersion;
    live: AutoLessonVersion;
} | null;
export declare function resumableVersion(track: AutoLessonEditTrack | undefined): AutoLessonVersion | undefined;
export declare function editCostReference(manifest: AutoLessonManifest, target: AutoLessonEditTarget): number;
export declare function speechChanged(before: ReadonlyArray<{
    speaker: string;
    text: string;
}>, after: ReadonlyArray<{
    speaker: string;
    text: string;
}>): boolean;
export declare function stableJson(value: unknown): string;
export declare function lessonActionsFingerprint(lesson: {
    segments: ReadonlyArray<{
        id: string;
        actions?: readonly unknown[];
    }>;
}): string;
export declare function editSummaryLines(manifest: AutoLessonManifest): string[];
