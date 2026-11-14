import type { CaptureCalibration, CaptureChannelId, CaptureSolveOptions, SolvedCaptureFrame, TrackerFrame, TrackerHand } from '../../contracts/capture.js';
import type { HandShape, HandView, Side } from '../../contracts/pose.js';
export declare const MP_POSE: {
    readonly nose: 0;
    readonly leftEye: 2;
    readonly rightEye: 5;
    readonly leftEar: 7;
    readonly rightEar: 8;
    readonly leftShoulder: 11;
    readonly rightShoulder: 12;
    readonly leftElbow: 13;
    readonly rightElbow: 14;
    readonly leftWrist: 15;
    readonly rightWrist: 16;
    readonly leftPinky: 17;
    readonly rightPinky: 18;
    readonly leftIndex: 19;
    readonly rightIndex: 20;
    readonly leftHip: 23;
    readonly rightHip: 24;
};
export declare const MP_HAND: {
    readonly wrist: 0;
    readonly thumb: readonly [1, 2, 3, 4];
    readonly index: readonly [5, 6, 7, 8];
    readonly middle: readonly [9, 10, 11, 12];
    readonly ring: readonly [13, 14, 15, 16];
    readonly pinky: readonly [17, 18, 19, 20];
};
type Vec = {
    x: number;
    y: number;
    z: number;
};
type Finger = 'index' | 'middle' | 'ring' | 'pinky';
export declare function screenSide(subject: Side, mirror: boolean): Side;
export declare const capturePoint: (list: readonly number[], i: number, stride: number, aspect: number, mirror: boolean) => {
    x: number;
    y: number;
    z: number;
} | null;
export declare const posePointConfidence: (list: readonly number[], i: number) => number;
export interface HandMeasure {
    dir: number;
    bend?: number;
    shape: HandShape;
    view?: HandView;
    score: number;
    wrist: Vec;
    fingers: Record<Finger | 'thumb', number>;
}
export interface ArmMeasure {
    upper: number;
    fore: number;
    upperLen: number;
    foreLen: number;
    score: number;
}
export interface CaptureMeasures {
    t: number;
    aspect?: number;
    head?: {
        turn: number;
        nod: number;
        tilt: number;
        score: number;
    };
    torso?: {
        turn: number;
        lean: number;
        x: number;
        width: number;
        score: number;
    };
    face?: Record<string, number>;
    arms: Partial<Record<Side, ArmMeasure>>;
    hands: Partial<Record<Side, HandMeasure>>;
    contact?: {
        distance: number;
        score: number;
    };
}
export declare const CAPTURE_CONTACT: {
    readonly touch: 0.2;
    readonly apart: 0.36;
    readonly minScore: 0.3;
};
export declare function contactOf(distance: number): number;
export declare function headFromMatrix(data: readonly number[], mirror: boolean): {
    turn: number;
    nod: number;
    tilt: number;
} | null;
export declare function classifyHand(ext: Record<Finger | 'thumb', number>, extra: {
    touch: boolean;
    spread: boolean;
    front: boolean;
}): HandShape;
export declare function measureHand(hand: TrackerHand, aspect: number, mirror: boolean, side: Side, fore?: number): HandMeasure | null;
export declare function handsBySide(frame: TrackerFrame, mirror: boolean): Array<[Side, TrackerHand]>;
export declare function measureFrame(frame: TrackerFrame, options?: CaptureSolveOptions): CaptureMeasures;
export declare const MP_FACE: {
    readonly eyeRight: {
        readonly outer: 33;
        readonly inner: 133;
        readonly lids: readonly [readonly [159, 145], readonly [160, 144], readonly [158, 153]];
        readonly iris: 468;
        readonly brow: readonly [70, 63, 105, 66, 107];
        readonly top: 159;
    };
    readonly eyeLeft: {
        readonly outer: 263;
        readonly inner: 362;
        readonly lids: readonly [readonly [386, 374], readonly [385, 380], readonly [387, 373]];
        readonly iris: 473;
        readonly brow: readonly [300, 293, 334, 296, 336];
        readonly top: 386;
    };
    readonly lipTop: 13;
    readonly lipBottom: 14;
    readonly mouthRight: 61;
    readonly mouthLeft: 291;
};
export declare const FACE_GEOMETRY_KEYS: readonly ['geo.earLeft', 'geo.earRight', 'geo.irisX', 'geo.irisY', 'geo.mouthOpen', 'geo.mouthWide', 'geo.browLeft', 'geo.browRight'];
export declare function faceGeometry(mesh: readonly number[] | undefined, aspect: number): Record<(typeof FACE_GEOMETRY_KEYS)[number], number> | null;
export declare const FACE_GEOMETRY_REST: Readonly<Record<(typeof FACE_GEOMETRY_KEYS)[number], number>>;
export declare const DEFAULT_CALIBRATION: CaptureCalibration;
export declare function faceChannels(face: Record<string, number>, rest: Record<string, number>, mirror: boolean): Partial<Record<CaptureChannelId, number>>;
export declare function solveMeasures(m: CaptureMeasures, calibration?: CaptureCalibration, options?: CaptureSolveOptions): SolvedCaptureFrame;
export declare function solveFrame(frame: TrackerFrame, calibration?: CaptureCalibration, options?: CaptureSolveOptions): SolvedCaptureFrame;
export declare function growArms(calibration: CaptureCalibration, m: CaptureMeasures): CaptureCalibration;
export declare function calibrate(frames: readonly CaptureMeasures[], base?: CaptureCalibration): CaptureCalibration;
export {};
