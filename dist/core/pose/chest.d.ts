import { type BodyPose, type HeadPose } from '../../contracts/pose.js';
export declare const CHEST_RADIUS = 150;
export declare const BELLY_EXTRA = 18;
export declare function chestFrontX(dx: number, turnDeg: number, low?: boolean): number;
export declare function collarShift(turnDeg: number): number;
export declare const TORSO_ACCOMPANY: {
    readonly turn: 0.6;
    readonly tilt: 0.25;
};
export declare function torsoAccompany(head: Pick<HeadPose, 'tilt' | 'x'>, body: Pick<BodyPose, 'turn'>): number;
