import type { CaptureChannelId, CaptureGroupId, CaptureStepId } from '../../contracts/capture.js';
export interface CaptureChannelSpec {
    group: CaptureGroupId;
    label: string;
    unit: '°' | 'px' | '' | '×';
    min: number;
    max: number;
    rest: number;
    decimals: number;
    cutoffHz: number;
    still: number;
    speed: number;
    maxSpeed: number;
    tolerance: number;
    angle?: boolean;
    pulse?: boolean;
}
export declare const CAPTURE_CHANNELS: Record<CaptureChannelId, CaptureChannelSpec>;
export declare const CAPTURE_STEPS: Record<CaptureStepId, {
    group: CaptureGroupId;
    label: string;
}>;
export declare const CAPTURE_GROUP_LABELS: Record<CaptureGroupId, string>;
export declare function channelsOf(group: CaptureGroupId): CaptureChannelId[];
export declare function stepsOf(group: CaptureGroupId): CaptureStepId[];
export declare function isCaptureGroupId(value: unknown): value is CaptureGroupId;
export declare function isCaptureChannelId(value: unknown): value is CaptureChannelId;
export declare function isCaptureStepId(value: unknown): value is CaptureStepId;
export declare function quantize(id: CaptureChannelId, value: number): number;
export declare function clampChannel(id: CaptureChannelId, value: number): number;
