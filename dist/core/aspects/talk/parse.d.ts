export { closest, extractJsonObject } from '../../talk/plan.js';
export interface AspectParseResult<T> {
    value: T | null;
    problems: string[];
    notes: string[];
    fatal: boolean;
}
export declare const isObject: (v: unknown) => v is Record<string, unknown>;
export declare const toNumber: (v: unknown) => number | undefined;
export declare function wordIndex(v: unknown, count: number): number | undefined;
export declare function priorityOf(v: unknown): number;
export declare function shortText(v: unknown, max?: number): string | undefined;
