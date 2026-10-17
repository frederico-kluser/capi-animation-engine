import type { TalkAspectId } from '../../../contracts/aspects.js';
import type { ExpressionId } from '../../../contracts/face.js';
import type { LaptopPropId } from '../../../contracts/pose.js';
import type { ReviewTimeline } from '../../../contracts/review.js';
import type { ScriptWord } from '../../../contracts/talk.js';
import { type PoseId } from '../../../presets/poses.js';
import type { TalkGesture } from '../../talk/plan.js';
import type { ResolveResult } from '../../talk/resolve.js';
import type { TalkAspectContext, TalkSpeechTiming } from './context.js';
export interface WordRange {
    firstWord: number;
    lastWord: number;
}
export declare function reviewBlockWords(words: readonly Pick<ScriptWord, 'index' | 'paragraph'>[]): WordRange[];
export declare function reviewSilences(timeline: Pick<ReviewTimeline, 'segments' | 'duck'>): Array<{
    startMs: number;
    endMs: number;
}>;
export declare function spreadSpeechTiming(timing: TalkSpeechTiming, blocks: readonly WordRange[], starts: readonly number[], options: {
    durationMs: number;
    silences?: ReadonlyArray<{
        startMs: number;
        endMs: number;
    }>;
}): TalkSpeechTiming;
export declare const REVIEW_TABLET_POSES: readonly PoseId[];
export declare const LAPTOP_POSE_FAMILIES: Readonly<Record<LaptopPropId, {
    type: PoseId;
    mouse: PoseId;
    click: PoseId;
    look: PoseId;
    talk: PoseId;
    explain: PoseId;
    point: PoseId;
    think: PoseId;
    thumbsUp: PoseId;
}>>;
export declare function laptopModelFromText(text: string | undefined): LaptopPropId | undefined;
export declare function laptopPoseForModel(pose: PoseId, model: LaptopPropId): PoseId;
export declare function reviewScreenPoses(screenSide: 'left' | 'right'): {
    point: PoseId;
    present: PoseId;
};
export declare function reviewPoseFor(pose: PoseId, screenSide: 'left' | 'right', role?: 'gesture' | 'home'): PoseId;
export declare const REVIEW_LAPTOP_POSES: readonly PoseId[];
export declare const REVIEW_PLANNER_POSES: Readonly<Record<'left' | 'right', readonly PoseId[]>>;
export declare const REVIEW_ACCEPTED_POSES: readonly PoseId[];
interface BodyPlanShape {
    start: {
        pose: PoseId;
    };
    end: {
        pose: PoseId;
    };
    gestures: readonly TalkGesture[];
}
export declare function reviewBodyPoses<T extends BodyPlanShape>(value: T, screenSide: 'left' | 'right', words?: readonly {
    text: string;
}[]): {
    value: T;
    swaps: string[];
};
export declare function reviewPromptBlock(ctx: Pick<TalkAspectContext, 'review'>, aspect: TalkAspectId): string;
export declare const WATCH_POSES: ReadonlySet<PoseId>;
export declare const WATCH_REST: {
    readonly afterMs: 500;
    readonly minWindowMs: 3000;
    readonly beforeNextMs: 1800;
    readonly lintReachMs: 1500;
};
export declare function restWhileWatching(resolved: ResolveResult, input: {
    windows: ReadonlyArray<{
        startMs: number;
        endMs: number;
    }>;
    restExpression: ExpressionId;
    restPose?: PoseId;
}): {
    resolved: ResolveResult;
    decisions: string[];
};
export {};
