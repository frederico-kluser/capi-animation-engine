export interface Point {
    x: number;
    y: number;
}
export type Side = 'left' | 'right';
export declare const SIDES: readonly ["left", "right"];
export declare const RIG: {
    readonly canvas: {
        readonly width: 1000;
        readonly height: 800;
    };
    readonly centerX: 500;
    readonly head: {
        readonly width: 340;
        readonly height: 290;
        readonly depth: 200;
        readonly radius: 58;
        readonly bevel: 11;
        readonly center: {
            readonly x: 500;
            readonly y: 242;
        };
        readonly pivotDrop: 166;
    };
    readonly neck: {
        readonly base: {
            readonly x: 500;
            readonly y: 426;
        };
        readonly width: 88;
    };
    readonly body: {
        readonly pivot: {
            readonly x: 500;
            readonly y: 1000;
        };
    };
    readonly shoulder: {
        readonly left: {
            readonly x: 366;
            readonly y: 508;
        };
        readonly right: {
            readonly x: 634;
            readonly y: 508;
        };
    };
    readonly arm: {
        readonly upper: 240;
        readonly fore: 205;
        readonly maxStretch: 1.15;
        readonly radius: {
            readonly shoulder: 50;
            readonly elbow: 45;
            readonly wrist: 36;
        };
    };
    readonly handLength: 160;
};
export declare const STANCE: {
    readonly head: {
        readonly turn: 15;
        readonly tilt: -7;
    };
    readonly body: {
        readonly turn: 14;
    };
};
export type HandShape = 'relaxed' | 'open' | 'point' | 'fist' | 'grip' | 'thumbsUp' | 'peace' | 'three' | 'ok' | 'lShape' | 'palmUp' | 'flat' | 'middleFinger' | 'hangLoose' | 'pointFront' | 'pointSide' | 'chinGrip' | 'four' | 'rockOn' | 'fingersCrossed' | 'pinch' | 'quote' | 'cupHand' | 'typing' | 'mouseGrip' | 'mouseClick';
export declare const HAND_SHAPES: readonly ["relaxed", "open", "point", "fist", "grip", "thumbsUp", "peace", "three", "ok", "lShape", "palmUp", "flat", "middleFinger", "hangLoose", "pointFront", "pointSide", "chinGrip", "four", "rockOn", "fingersCrossed", "pinch", "quote", "cupHand", "typing", "mouseGrip", "mouseClick"];
export type HandView = 'palm' | 'back';
export declare const HAND_VIEWS: readonly ["palm", "back"];
export type LaptopPropId = 'laptopOrange' | 'laptopAlien' | 'laptopThinkpad';
export declare const LAPTOP_PROP_IDS: readonly ["laptopOrange", "laptopAlien", "laptopThinkpad"];
export type PropId = 'tablet' | 'glass' | 'mug' | 'bottle' | 'cup' | LaptopPropId;
export declare const PROP_IDS: readonly ["tablet", "glass", "mug", "bottle", "cup", "laptopOrange", "laptopAlien", "laptopThinkpad"];
export interface HeadPose {
    turn: number;
    nod: number;
    tilt: number;
    x: number;
    y: number;
}
export interface BodyPose {
    lean: number;
    turn: number;
    x: number;
    y: number;
}
export interface ArmPose {
    hand: Point;
    elbow?: Point;
    bend?: 'natural' | 'reverse';
    shape?: HandShape;
    angle?: number;
    flip?: boolean;
    view?: HandView;
    behind?: boolean;
}
export interface PropPose {
    id: PropId;
    hand: Side;
    angle?: number;
    item?: string;
}
export type ResolvedPropPose = Omit<Required<PropPose>, 'item'> & {
    item?: string;
};
export interface Pose {
    base?: string;
    head?: Partial<HeadPose>;
    body?: Partial<BodyPose>;
    armLeft?: ArmPose;
    armRight?: ArmPose;
    prop?: PropPose | null;
    front?: Side;
}
export type PoseInput = string | Pose;
export interface Range {
    readonly min: number;
    readonly max: number;
}
export declare const POSE_LIMITS: {
    readonly head: {
        readonly turn: {
            readonly min: -40;
            readonly max: 40;
        };
        readonly nod: {
            readonly min: -25;
            readonly max: 25;
        };
        readonly tilt: {
            readonly min: -25;
            readonly max: 25;
        };
        readonly x: {
            readonly min: -90;
            readonly max: 90;
        };
        readonly y: {
            readonly min: -70;
            readonly max: 70;
        };
    };
    readonly body: {
        readonly lean: {
            readonly min: -12;
            readonly max: 12;
        };
        readonly turn: {
            readonly min: -25;
            readonly max: 25;
        };
        readonly x: {
            readonly min: -80;
            readonly max: 80;
        };
        readonly y: {
            readonly min: -50;
            readonly max: 50;
        };
    };
    readonly handMargin: 140;
    readonly segmentStretch: {
        readonly min: 0.3;
        readonly max: 1.45;
    };
};
export interface ArmChannels {
    upperAngle: number;
    upperLen: number;
    foreAngle: number;
    foreLen: number;
    handAngle: number;
    shape: HandShape;
    flip: boolean;
    view: HandView;
    behind: boolean;
    roll?: number;
}
export interface PoseChannels {
    head: HeadPose;
    body: BodyPose;
    arms: Record<Side, ArmChannels>;
    prop: ResolvedPropPose | null;
    front: Side;
}
export interface SolvedArm {
    shoulder: Point;
    elbow: Point;
    wrist: Point;
    foreAngle: number;
    handAngle: number;
    shape: HandShape;
    flip: boolean;
    view: HandView;
    behind: boolean;
    roll?: number;
}
export interface SolvedPose {
    head: HeadPose & {
        center: Point;
    };
    body: BodyPose;
    neckBase: Point;
    arms: Record<Side, SolvedArm>;
    prop: ResolvedPropPose | null;
    front: Side;
}
