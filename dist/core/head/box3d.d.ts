import type { Point } from '../../contracts/pose.js';
export interface BoxDims {
    width: number;
    height: number;
    depth: number;
    radius: number;
    radiusBottom?: number | undefined;
    squircle?: number | undefined;
}
export type Matrix2D = readonly [number, number, number, number, number, number];
export interface BoxProjection {
    front: Matrix2D;
    silhouette: Point[];
    top: Point[] | null;
    bottom: Point[] | null;
    capFade?: number;
    frontCenter: Point;
    neckAttach: Point;
}
export declare function projectPoint(x: number, y: number, z: number, turnDeg: number, nodDeg: number): Point;
export declare function roundedRectOutline(width: number, height: number, radius: number): Point[];
export declare function boxOutline(dims: BoxDims): Point[];
export declare function convexHull(points: readonly Point[]): Point[];
export declare function polygonArea(points: readonly Point[]): number;
export declare function clipConvex(subject: readonly Point[], clip: readonly Point[]): Point[];
export declare function projectBox(dims: BoxDims, turnDeg: number, nodDeg: number): BoxProjection;
export declare function applyMatrix(m: Matrix2D, p: Point): Point;
