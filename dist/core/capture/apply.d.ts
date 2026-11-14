import type { CaptureGroupId, CaptureSample } from '../../contracts/capture.js';
import type { Expression, MouthShape } from '../../contracts/face.js';
import type { ArmChannels, HandView, Point, PoseChannels, Side } from '../../contracts/pose.js';
export declare function captureWeight(sample: CaptureSample | null | undefined, group: CaptureGroupId): number;
export declare function captureFlip(side: Side, view: HandView): boolean;
export declare function capturePose(channels: PoseChannels, sample: CaptureSample): PoseChannels;
export declare const CAPTURE_CLAP: {
    readonly gap: 40;
    readonly converge: {
        readonly left: 16;
        readonly right: 14;
    };
    readonly view: {
        readonly left: 'palm';
        readonly right: 'back';
    };
    readonly front: 'right';
    readonly switchAt: 0.5;
};
export declare function captureContact(sample: CaptureSample | null | undefined): number;
export declare function captureClap(channels: PoseChannels, sample: CaptureSample): PoseChannels;
export declare function captureArm(base: ArmChannels, sample: CaptureSample, side: Side): ArmChannels;
export declare function captureMouthShape(sample: CaptureSample): MouthShape;
export declare function captureMouth(mouth: MouthShape, sample: CaptureSample | null | undefined): MouthShape;
export declare function captureExpression(expression: Expression, sample: CaptureSample | null | undefined): Expression;
export declare function captureLook(look: Point, sample: CaptureSample | null | undefined): Point;
export declare function captureClosure(sample: CaptureSample | null | undefined): {
    left: number;
    right: number;
};
export declare function activeSamples(samples: ReadonlyArray<CaptureSample | null | undefined>): CaptureSample[];
