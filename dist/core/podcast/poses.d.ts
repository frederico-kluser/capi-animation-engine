import { type PoseId } from '../../presets/poses.js';
export interface PodcastPoseRule {
    ok: boolean;
    why: string;
    instead?: PoseId;
    table?: true;
    staged?: PoseId;
}
export declare const PODCAST_POSE_RULES: Record<PoseId, PodcastPoseRule>;
export declare const PODCAST_POSES: readonly PoseId[];
export declare const PODCAST_LISTEN_POSES: readonly PoseId[];
export declare function isPodcastListenPose(id: unknown): id is PoseId;
export declare function isPodcastPose(id: unknown): boolean;
export declare function podcastPoseProblem(id: PoseId): string | undefined;
export declare function podcastPoseFor(id: PoseId): PoseId;
export declare function podcastTablePose(id: unknown): PoseId | undefined;
export declare function podcastStagedPose(id: PoseId): PoseId;
export declare const PODCAST_STAGED_POSES: readonly PoseId[];
