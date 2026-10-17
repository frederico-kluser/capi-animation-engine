import { type CameraBox, type ShotSize } from '../../contracts/camera.js';
import { type CatalogMode, type FaceContact, type PoseFacts, type PoseFrameFit, type PoseMinSize } from '../../contracts/catalog.js';
import { type HandShape, type HandView, type Point, type Side, type SolvedArm, type SolvedPose } from '../../contracts/pose.js';
import type { VideoProfileId } from '../../contracts/profile.js';
import { type FrameAspect } from '../../core/set/frame.js';
import { type PoseId } from '../poses.js';
export declare const GLOVE_SLICES = 8;
export interface GloveProfile {
    from: number;
    to: number;
    rows: readonly (readonly [number, number])[];
}
export declare const GLOVE_PROFILE: Readonly<Record<HandShape, GloveProfile>>;
export declare const GLOVE_PROFILE_BACK: Readonly<Partial<Record<HandShape, GloveProfile>>>;
export declare function gloveProfile(shape: HandShape, view?: HandView): GloveProfile;
export declare function insideGlove(arm: SolvedArm, p: Point): boolean;
export declare function gloveSamples(arm: SolvedArm): Point[];
export declare const FEATURE_PARALLAX: {
    readonly x: 18;
    readonly y: 12;
};
export declare function faceToCanvas(head: SolvedPose['head'], face: Point): Point;
export declare const MOUTH_ZONE: {
    readonly x: 30;
    readonly y: 13;
};
export declare function faceFeatures(pose: SolvedPose): {
    eyes: Point[][];
    mouth: Point[];
};
export declare const COVER_FRACTION = 0.5;
export declare const TOUCH_FRACTION = 0.15;
export declare function gloveOnFace(pose: SolvedPose, side: Side): {
    face: FaceContact;
    coversEyes: boolean;
    coversMouth: boolean;
    eyes: number;
    mouth: number;
    touch: number;
};
export declare const REST_RADIUS = 50;
export declare const WAIST_LINE = 660;
export declare const HEAD_ZONE_SLACK = 15;
export declare const SCREEN_THIRDS: readonly [400, 600];
export declare const POSE_FRAME_ASPECTS: readonly ["16:9", "9:16"];
export declare const FIT_IN = 0.9;
export declare const FIT_OUT = 0.35;
export interface PoseFrameOptions {
    seated?: boolean;
    zoom?: number;
    profile?: VideoProfileId;
    insideSafe?: boolean;
}
export declare function poseFrameBox(size: ShotSize, aspect?: FrameAspect, options?: PoseFrameOptions): CameraBox;
export declare function poseInFrame(id: PoseId, size: ShotSize, aspect?: FrameAspect, options?: PoseFrameOptions): PoseFrameFit;
export declare function poseMinSize(id: PoseId, aspect?: FrameAspect, options?: PoseFrameOptions): PoseMinSize;
export declare function poseInBox(id: PoseId, box: CameraBox): PoseFrameFit;
export interface PoseGestureSpan {
    hands: Side[];
    box: CameraBox | null;
    heads: Array<{
        x: number;
        y: number;
        turn: number;
        tilt: number;
    }>;
}
export declare function poseGestureSpan(id: PoseId): PoseGestureSpan;
export declare function poseFitsSize(id: PoseId, size: ShotSize, aspect?: FrameAspect, options?: PoseFrameOptions): boolean;
export declare function poseModeIds(mode: CatalogMode): PoseId[];
export declare function poseFacts(id: PoseId): PoseFacts<PoseId>;
export declare function poseLooksText(id: PoseId, facts?: PoseFacts<PoseId>): string;
