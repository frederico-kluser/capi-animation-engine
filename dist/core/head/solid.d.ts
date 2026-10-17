import type { Point } from '../../contracts/pose.js';
import { type BoxDims, type Matrix2D } from './box3d.js';
export interface Point3 {
    x: number;
    y: number;
    z: number;
}
export interface HalfSpace {
    n: Point3;
    d: number;
}
export declare const dot3: (a: Point3, b: Point3) => number;
export declare function normalize3(v: Point3): Point3;
export declare function rotateView(p: Point3, turnDeg: number, nodDeg: number): Point3;
export declare function planeMatrix(origin: Point3, u: Point3, v: Point3, turnDeg: number, nodDeg: number): Matrix2D;
export declare function facing(normal: Point3, turnDeg: number, nodDeg: number): number;
export declare function boxNearest(dims: BoxDims, p: Point3): {
    point: Point3;
    normal: Point3;
};
export declare function boxCut(dims: BoxDims, half: HalfSpace): Point3[];
export interface TubePoint extends Point3 {
    r: number;
}
export declare function sampleTube(controls: readonly TubePoint[], perSegment?: number): TubePoint[];
export interface Plane {
    n: Point3;
    d: number;
}
export declare function sphereCapOutline(c: Point3, r: number, plane: Plane, turnDeg: number, nodDeg: number, samples?: number): {
    full: boolean;
    points: Point[];
};
export declare function supportOf(points: readonly Point3[], n: Point3): number;
export declare function project3(p: Point3, turnDeg: number, nodDeg: number): Point;
