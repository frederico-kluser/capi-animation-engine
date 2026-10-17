import type { ExpressionId } from '../contracts/face.js';
import type { PoseId } from './poses.js';
export interface PoseUsage {
    use: string;
    expressions: string;
    manualOnly?: true;
    tableOnly?: true;
    reviewOnly?: true;
}
export declare const POSE_USAGE: Record<PoseId, PoseUsage>;
export declare const EXPRESSION_USAGE: Record<ExpressionId, {
    face: string;
    use: string;
}>;
export declare const MANUAL_ONLY_POSES: readonly PoseId[];
export declare function isManualOnlyPose(id: PoseId): boolean;
export declare const TABLE_ONLY_POSES: readonly PoseId[];
export declare function isTableOnlyPose(id: PoseId): boolean;
export declare const REVIEW_ONLY_POSES: readonly PoseId[];
export declare function isReviewOnlyPose(id: PoseId): boolean;
