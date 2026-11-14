import type { CameraAngle, CameraIntentKind, CameraMoveKind, CameraTransitionKind, ShotFraming, ShotSize } from '../../contracts/camera.js';
import type { PodcastSeat } from '../../contracts/podcast.js';
import type { ScriptWord } from '../../contracts/talk.js';
import type { PoseId } from '../../presets/poses.js';
import type { TalkPlan } from '../talk/plan.js';
export declare const CTA_SEAM: {
    readonly frameMarginMs: 40;
    readonly sizeSteps: 2;
    readonly minShotMs: 1000;
    readonly quietDb: -45;
    readonly quietWindowMs: 25;
    readonly loudnessStepDb: 1;
    readonly pauseMs: readonly [number, number];
    readonly poseJumpPx: 40;
};
export interface SeamShot {
    fromMs: number;
    toMs: number;
    framing?: ShotFraming;
    seat?: PodcastSeat;
    size?: ShotSize;
    zoom?: number;
    move?: CameraMoveKind;
    moveAmount?: number;
    moveMs?: number;
    shiftX?: number;
    angle?: CameraAngle;
    view?: unknown;
    transition?: CameraTransitionKind;
    transitionMs?: number;
    intent?: CameraIntentKind;
    why?: string;
}
export interface CtaSeam {
    inMs: number;
    outMs: number;
}
export declare function shotsDiffer(a: SeamShot, b: SeamShot): boolean;
export declare function seamCameraShots<S extends SeamShot>(shots: readonly S[], seam: CtaSeam, options: {
    mode: 'talk' | 'podcast';
}): {
    shots: S[];
    changes: string[];
};
export declare const CTA_MOTION_CLEAR_MS = 650;
export interface CtaWordTiming {
    startMs(word: number): number | undefined;
}
export declare function ctaPlanSeam(plan: TalkPlan, words: readonly ScriptWord[], range: {
    from: number;
    to: number;
}, timing?: CtaWordTiming, options?: {
    poseBefore?: PoseId;
}): {
    value: TalkPlan;
    changes: string[];
};
export interface CtaSeamInput {
    pauseMs: number;
    naturalPausesMs?: readonly number[];
    shotBefore?: SeamShot;
    shotAfter?: SeamShot;
    poseJumpPx?: number;
    edgeDb?: readonly [number, number];
    loudnessStepDb?: number;
}
export interface CtaSeamReport {
    ok: boolean;
    pauseMs: number;
    cameraCut?: boolean;
    poseJumpPx?: number;
    edgeDb?: [number, number];
    loudnessStepDb?: number;
    problems: string[];
}
export declare function ctaSeamReport(input: CtaSeamInput): CtaSeamReport;
export declare function levelDbAround(samples: Float32Array, sampleRate: number, atSample: number, windowMs?: number): number;
export declare function loudnessStepDb(samples: Float32Array, sampleRate: number, cutA: number, cutB: number, spanMs?: number): number | undefined;
