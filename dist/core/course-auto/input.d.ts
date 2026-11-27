import { type CourseAutoInput, type CourseAutoPolicy, type CourseDeliverable, type CourseInputValidation } from '../../contracts/course-auto.js';
export declare const DEFAULT_COURSE_GENERATION: {
    readonly initial: 2;
    readonly max: 3;
    readonly adaptive: true;
};
export declare const DEFAULT_COURSE_HTTP: {
    readonly aggregate: 12;
    readonly text: 4;
    readonly tts: 6;
    readonly stt: 4;
    readonly jev: 8;
    readonly image: 2;
};
export declare const DEFAULT_COURSE_RESERVATION: {
    readonly ramBytes: number;
    readonly commitBytes: number;
    readonly httpSlots: 6;
};
export declare const DEFAULT_COURSE_RESOURCES: {
    readonly ramMarginBytes: number;
    readonly commitMarginBytes: number;
    readonly commitPausePercent: 85;
    readonly commitResumePercent: 78;
    readonly resumeSamples: 5;
    readonly sampleMaxAgeMs: 5000;
    readonly graphicsLane: 1;
    readonly cpuWorkers: 1;
    readonly wipLessonsWithMedia: 4;
    readonly lookaheadCaptures: 2;
    readonly reservation: {
        readonly ramBytes: number;
        readonly commitBytes: number;
        readonly httpSlots: 6;
    };
};
export declare function defaultCoursePolicy(capUsd: number): CourseAutoPolicy;
export declare function isCourseProjectPath(value: unknown): value is string;
export declare function courseInputFingerprint(input: CourseAutoInput): Record<string, unknown>;
export declare function requiresPaidBudget(input: Pick<CourseAutoInput, 'budget'>): boolean;
export declare function validateCourseAutoInput(value: unknown): CourseInputValidation;
export declare function coursePolicyOf(input: CourseAutoInput): CourseAutoPolicy;
export declare function requiresVideo(deliverables: readonly CourseDeliverable[]): boolean;
