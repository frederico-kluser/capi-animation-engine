import { type HeadShapeId } from '../contracts/character.js';
export interface HeadShapeSpec {
    radius: number;
    radiusBottom?: number;
    squircle?: number;
    bevel?: number;
    bevelBottom?: number;
    curvature?: number;
}
export declare const HEAD_SHAPES: Record<HeadShapeId, HeadShapeSpec>;
export declare const HEAD_SHAPE_LABELS: Record<HeadShapeId, string>;
export declare const HEAD_SHAPE_NOTES: Record<HeadShapeId, string>;
export declare function isHeadShapeId(value: unknown): value is HeadShapeId;
