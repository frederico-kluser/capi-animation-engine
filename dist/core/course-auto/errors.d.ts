import { type CourseAutoError, type CourseErrorClass, type CourseErrorCode, type CourseErrorScope } from '../../contracts/course-auto.js';
export declare const COURSE_ERROR_ACTIONS: Readonly<Record<CourseErrorCode, string>>;
export declare const courseErrorClass: (code: CourseErrorCode) => CourseErrorClass;
export declare const courseErrorRetryable: (code: CourseErrorCode) => boolean;
export declare function courseError(input: {
    code: CourseErrorCode;
    message: string;
    scope?: CourseErrorScope;
    phase: string;
    retryable?: boolean;
    sentUnknown?: boolean;
    cost?: {
        knownUsd?: number;
        unknownUsd?: number;
    };
    checkpoint?: string;
    resource?: string;
    action?: string;
    at: string;
}): CourseAutoError;
export declare function redactSecrets(message: string): string;
export declare function classifyCourseFailure(error: unknown): CourseErrorCode;
