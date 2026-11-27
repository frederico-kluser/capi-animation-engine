import type { CourseAutoPolicy, CourseResourceLease, CourseResourceSample, CourseResourceSnapshot } from '../../contracts/course-auto.js';
export interface CourseResourceHeadroom {
    readonly fresh: boolean;
    readonly ramAvailableBytes: number | null;
    readonly ramHeadroomBytes: number | null;
    readonly commitKnown: boolean;
    readonly commitHeadroomBytes: number | null;
    readonly commitPercent: number | null;
    readonly cpuBusyPercent: number | null;
    readonly diskFreeBytes: number | null;
    readonly unknown: readonly string[];
}
export declare function sampleIsFresh(sample: CourseResourceSample, nowMs: number, policy: CourseAutoPolicy): boolean;
export declare function courseResourceHeadroom(sample: CourseResourceSample, policy: CourseAutoPolicy, leases?: readonly CourseResourceLease[], nowMs?: number): CourseResourceHeadroom;
export declare function targetCourseGenerations(input: {
    readonly policy: CourseAutoPolicy;
    readonly headroom: CourseResourceHeadroom;
    readonly profile: CourseResourceSample['profile'];
    readonly healthySamples: number;
    readonly active: number;
    readonly current: number;
}): {
    readonly target: number;
    readonly pressure: boolean;
    readonly reason: string;
};
export declare function activeHttpSlots(leases: readonly CourseResourceLease[], kind?: 'generation' | 'http'): number;
export interface CourseLessonAdmission {
    readonly lessonId: string;
    readonly admitted: boolean;
    readonly reason: string;
    readonly reservation: {
        readonly httpSlots: number;
        readonly ramBytes: number;
        readonly commitBytes: number;
    };
}
export interface CourseAdmissionDecisionInput {
    readonly policy: CourseAutoPolicy;
    readonly sample: CourseResourceSample;
    readonly leases: readonly CourseResourceLease[];
    readonly nowMs: number;
    readonly currentTarget: number;
    readonly healthySamples: number;
    readonly candidates: readonly {
        readonly lessonId: string;
        readonly ordinal: number;
        readonly capabilitySupported: boolean;
        readonly capabilityReason?: string;
        readonly dependenciesReady: boolean;
        readonly wipAllowed: boolean;
    }[];
    readonly activeLessons: readonly string[];
}
export interface CourseAdmissionDecision {
    readonly target: number;
    readonly pressure: boolean;
    readonly reason: string;
    readonly headroom: CourseResourceHeadroom;
    readonly lessons: readonly CourseLessonAdmission[];
    readonly unknown: readonly string[];
}
export declare function decideCourseAdmission(input: CourseAdmissionDecisionInput): CourseAdmissionDecision;
export declare const resourceSnapshot: (sample: CourseResourceSample, leases?: readonly CourseResourceLease[]) => CourseResourceSnapshot;
