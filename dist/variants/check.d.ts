import { type VariantKind, type VersionId } from '../contracts/variant.js';
export interface VariantProblem {
    level: 'error' | 'warn';
    message: string;
}
export declare function checkVariantMeta(meta: unknown, expected: {
    kind: VariantKind;
    element: string;
    id: VersionId;
}): VariantProblem[];
export declare function checkPoseData(element: string, data: unknown): VariantProblem[];
export declare function checkLoopData(element: string, data: unknown): VariantProblem[];
export declare function checkScriptData(data: unknown): VariantProblem[];
export declare const REACH_TOLERANCE = 6;
export declare function checkHandData(element: string, mod: unknown): VariantProblem[];
export declare function checkVariantData(kind: VariantKind, element: string, data: unknown, examples?: readonly string[]): VariantProblem[];
