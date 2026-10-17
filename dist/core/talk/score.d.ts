import type { ResolveResult } from './resolve.js';
export interface PlanScore {
    score: number;
    kept: number;
    dropped: number;
    warnings: number;
    poses: number;
}
export declare function scorePlan(resolved: ResolveResult, target: number): PlanScore;
export declare function targetGestures(seconds: number, energy: number): number;
