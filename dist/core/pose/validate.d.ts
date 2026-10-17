import { type PoseInput, type SolvedPose } from '../../contracts/pose.js';
export interface PoseReport {
    ok: boolean;
    warnings: string[];
    solved: SolvedPose;
}
export declare function validatePose(input: PoseInput | undefined): PoseReport;
