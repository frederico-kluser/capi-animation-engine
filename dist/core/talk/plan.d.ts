import type { ExpressionId } from '../../contracts/face.js';
import type { Point } from '../../contracts/pose.js';
import type { BeatAccent } from '../timeline/choreograph.js';
import { type PoseId } from '../../presets/poses.js';
export type GestureMacro = 'wave' | 'agree' | 'deny' | 'laugh';
export declare const GESTURE_MACROS: readonly GestureMacro[];
export interface TalkGesture {
    word: number;
    pose?: PoseId;
    expression?: ExpressionId;
    accent?: BeatAccent;
    nod?: boolean | number;
    take?: boolean;
    look?: 'camera' | 'hold' | Point;
    macro?: GestureMacro;
    priority: number;
    why?: string;
}
export interface TalkPlan {
    summary?: string;
    energy?: number;
    start: {
        pose: PoseId;
        expression: ExpressionId;
    };
    end: {
        pose: PoseId;
        expression: ExpressionId;
    };
    gestures: TalkGesture[];
}
export interface PlanCheck {
    plan: TalkPlan | null;
    problems: string[];
    notes: string[];
    fatal: boolean;
}
export declare function extractJsonObject(text: string): unknown;
export declare function closest(name: string, options: readonly string[]): string | undefined;
export interface CheckPlanOptions {
    wordCount: number;
    poseIds: readonly string[];
    fallbackPose?: PoseId;
    fallbackExpression?: ExpressionId;
}
export declare function checkPlan(raw: unknown, options: CheckPlanOptions): PlanCheck;
