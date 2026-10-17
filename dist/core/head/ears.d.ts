import type { CharacterId } from '../../contracts/character.js';
import type { BoxDims } from './box3d.js';
import { type Plane, type Point3 } from './solid.js';
export interface EarShape {
    center: Point3;
    radii: Point3;
    yaw: number;
    tip: number;
    inner: {
        x: number;
        y: number;
        dy: number;
        z: number;
    };
}
export declare const EARS: EarShape;
export declare const CHARACTER_EARS: Partial<Record<CharacterId, Partial<EarShape>>>;
export declare function earShapeOf(id: CharacterId): EarShape;
export type EarSide = -1 | 1;
export declare function earCenter(side: EarSide, shape?: EarShape): Point3;
export declare function earAxes(side: EarSide, shape?: EarShape): {
    u: Point3;
    v: Point3;
    n: Point3;
};
export declare function earProfile(t: number, tip: number): {
    u: number;
    v: number;
};
export declare function earPlane(dims: BoxDims, side: EarSide, shape?: EarShape): Plane;
export declare function earSurface(side: EarSide, shape?: EarShape, meridians?: number, parallels?: number): Point3[][];
export declare function earBeyond(dims: BoxDims, side: EarSide, shape?: EarShape): Point3[];
export declare function earInner(side: EarSide, shape?: EarShape): {
    origin: Point3;
    u: Point3;
    v: Point3;
};
