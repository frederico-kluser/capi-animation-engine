import type { CharacterId } from '../../contracts/character.js';
import type { EarShape } from './ears.js';
import type { Point3, TubePoint } from './solid.js';
export interface ManeTuft {
    center: Point3;
    radii: Point3;
    roll: number;
    pitch?: number;
    tip: number;
    single?: boolean;
    keepWithHat?: boolean;
}
export interface ManeLock {
    spine: readonly [Point3, Point3, Point3];
    radius: number;
    belly?: number;
    root?: number;
    seat?: 'top' | 'front';
    single?: boolean;
    keepWithHat?: boolean;
}
export declare const LOCK_SAMPLES = 12;
export declare const LOCK_TIP = 0.7;
export declare function lockRadius(lock: ManeLock, t: number): number;
export declare function lockTube(lock: ManeLock, side?: 1 | -1, samples?: number): TubePoint[];
export interface ManeShape {
    tufts: readonly ManeTuft[];
    locks?: readonly ManeLock[];
    fringe?: readonly ManeLock[];
    fluff?: readonly ManeLock[];
    hiddenByHat?: boolean;
    layerFade?: number;
    shade?: number;
    edge?: number;
}
export interface ManeRing {
    corner: number;
    z: number;
    out: number;
    from: number;
    to: number;
    count: number;
    radii: Point3;
    small: number;
    tip: number;
    pitch?: number;
}
export declare function sectionPoint(s: number, corner: number): {
    x: number;
    y: number;
    nx: number;
    ny: number;
};
export declare function sectionHalfPerimeter(corner: number): number;
export declare function ringTufts(ring: ManeRing): ManeTuft[];
export declare const MANES: Partial<Record<CharacterId, ManeShape>>;
export declare function maneShapeOf(id: CharacterId): ManeShape;
export declare function tuftEar(tuft: ManeTuft): EarShape;
