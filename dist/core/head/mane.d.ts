import type { CharacterId } from '../../contracts/character.js';
import type { EarShape } from './ears.js';
import type { Point3 } from './solid.js';
export interface ManeTuft {
    center: Point3;
    radii: Point3;
    roll: number;
    pitch?: number;
    tip: number;
}
export interface ManeShape {
    tufts: readonly ManeTuft[];
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
