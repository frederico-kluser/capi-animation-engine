import { type Point, type Side, type SolvedPose } from '../../contracts/pose.js';
export declare const ELBOW_PIN: {
    readonly handRest: {
        readonly from: 620;
        readonly to: 660;
    };
    readonly handLife: 0.25;
};
export declare function elbowPinWeight(elbowY: number): number;
export declare function handRestWeight(wristY: number): number;
export declare const GRIP_SNAP: {
    readonly near: 2;
    readonly far: 30;
};
export declare function gripWeight(wrist: Point, grip: Point | undefined): number;
export interface ArmPin {
    elbow: number;
    hand: number;
    item: number;
    at: Point;
}
export type ItemGrips = Partial<Record<Side, Point>>;
export declare function armPins(authored: SolvedPose, grips?: ItemGrips): Record<Side, ArmPin>;
export declare function pinElbows(live: SolvedPose, authored: SolvedPose, grips?: ItemGrips): SolvedPose;
