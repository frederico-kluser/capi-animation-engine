import type { CompositionReport } from '../../../contracts/aspects.js';
import type { Point } from '../../../contracts/pose.js';
import type { CameraIntent, CameraStyle } from '../../../contracts/camera.js';
import type { AlignmentResult, ScriptWord, WordProsody } from '../../../contracts/talk.js';
import type { CameraTiming } from '../../camera/compile.js';
import type { TalkPlan } from '../../talk/plan.js';
import type { Tone } from '../../talk/tones.js';
import { type TalkCameraValue } from './camera.js';
import { type TalkFaceValue } from './face.js';
import type { TalkGesturesValue } from './gestures.js';
export declare const emptyReport: () => CompositionReport;
export declare function mergeReports(...reports: CompositionReport[]): CompositionReport;
export interface ComposeTalkPlanInput {
    words: readonly ScriptWord[];
    tone: Tone;
    gestures: TalkGesturesValue;
    face: TalkFaceValue;
    timing?: {
        alignment: AlignmentResult;
    };
    tvLook?: Point;
}
export declare function composeTalkPlan(input: ComposeTalkPlanInput): {
    plan: TalkPlan;
    report: CompositionReport;
};
export declare const TV_GLANCE_MAX_MS = 2600;
export interface ComposeTalkCameraInput {
    words: readonly ScriptWord[];
    camera: TalkCameraValue;
    plan: TalkPlan;
    style: CameraStyle;
    zooms: boolean;
    timing: {
        alignment: AlignmentResult;
        silences?: ReadonlyArray<{
            startMs: number;
            endMs: number;
        }>;
    };
}
export declare function composeTalkCamera(input: ComposeTalkCameraInput): {
    intents: CameraIntent[];
    report: CompositionReport;
};
export declare function talkCameraTiming(input: {
    words: readonly ScriptWord[];
    alignment: AlignmentResult;
    leadInMs: number;
    durationMs: number;
    prosody?: readonly WordProsody[];
}): CameraTiming;
