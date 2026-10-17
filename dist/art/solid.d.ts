import type { ReactElement, ReactNode } from 'react';
import { type Point } from '../contracts/pose.js';
import { type BoxDims, type Matrix2D } from '../core/head/box3d.js';
import { type Plane, type Point3, type TubePoint } from '../core/head/solid.js';
import { type Vec3 } from './light.js';
export interface OutfitView {
    turn: number;
    nod: number;
    light: Vec3;
    light2: Point;
    featureShift: Point;
    face: Matrix2D;
    ids: (local: string) => string;
    eyeOffset: Point;
    box: BoxDims;
}
export declare function makeOutfitView(head: {
    turn: number;
    nod: number;
    tilt: number;
}, featureShift: Point, ids: (local: string) => string, eyeOffset?: Point, box?: BoxDims): OutfitView;
export declare const at: (view: OutfitView, p: Point3) => Point;
export declare const depthOf: (view: OutfitView, p: Point3) => number;
export declare const facingOf: (view: OutfitView, n: Point3) => number;
export declare function litBy(view: OutfitView, n: Point3): number;
export declare function inFrontOfBox(view: OutfitView, p: Point3): number;
export interface BoundCircle {
    x: number;
    y: number;
    r: number;
}
export declare function sphereBound(view: OutfitView, c: Point3, r: number): BoundCircle;
export declare const pointsBounds: (view: OutfitView, points: readonly Point3[], r: number) => BoundCircle[];
export declare const tubeBounds: (view: OutfitView, points: readonly TubePoint[], pad?: number) => BoundCircle[];
export declare const sphereShape: (view: OutfitView, c: Point3, r: number) => string;
export declare function tubeShapes(view: OutfitView, points: readonly TubePoint[]): string[];
export declare const hullShape: (view: OutfitView, points: readonly Point3[], round: number) => string;
export interface Tone {
    base: string;
    shade: string;
    edge: string;
}
export interface Piece {
    key: string;
    shapes: readonly string[];
    tone: Tone;
    shift: number;
    edge?: number;
    glint?: {
        color: string;
        size: number;
    } | undefined;
    cutAway?: string | readonly string[] | undefined;
    cutBlend?: number | undefined;
    keep?: readonly string[] | undefined;
    details?: ReactNode;
}
export declare const DEFAULT_EDGE = 2.5;
export declare function PieceArt({ piece, view }: {
    piece: Piece;
    view: OutfitView;
}): ReactElement;
export declare const FACE_SHADOW_OPACITY = 0.17;
export declare function FaceShadow(props: {
    view: OutfitView;
    shapes: readonly string[];
    distance: number;
    keyId: string;
    cutAway?: string | undefined;
    cutBlend?: number | undefined;
    transform?: string | undefined;
    fillRule?: 'evenodd' | 'nonzero';
}): ReactElement;
export interface ShellSpec {
    front: number;
    back: number;
    lift: number;
    liftInset?: {
        x: number;
        z: number;
    };
    round: number;
    dome?: number;
    extra?: readonly Point3[];
}
export declare function domePoints(base: number, a: number, b: number, h: number): Point3[];
export interface Shell {
    shape: string;
    cutAway: string | undefined;
    cutBlend: number;
    below: string | undefined;
    top: number;
    inner: readonly Point3[];
    round: number;
}
export declare function planeOnShell(shell: Shell, anchor: Point3): Plane;
export declare function planeOnBox(anchor: Point3): Plane;
export declare function sphereBeyond(view: OutfitView, c: Point3, r: number, plane: Plane): string | null;
export declare function ellipsoidPoints(c: Point3, radii: Point3, meridians?: number, parallels?: number): Point3[][];
export declare function ellipsoidBeyond(view: OutfitView, c: Point3, radii: Point3, plane: Plane): string | null;
export declare function tubeBeyond(view: OutfitView, points: readonly TubePoint[], plane: Plane): string[];
export declare function shellOf(view: OutfitView, spec: ShellSpec): Shell;
export declare function shellInner(spec: ShellSpec): Point3[];
export declare function tubeAcrossBox(view: OutfitView, points: readonly TubePoint[], piece: Omit<Piece, 'key' | 'shapes' | 'keep'> & {
    key: string;
}, order: number, backDepth?: number): OutfitItem[];
export declare function boxSilhouette(view: OutfitView): Point[];
export declare function shellFrontHalf(view: OutfitView, spec: ShellSpec): string;
export declare function polyline3(view: OutfitView, points: readonly Point3[]): string;
export declare const OUTFIT_ORDER: {
    readonly ears: -1;
    readonly hair: 0;
    readonly glasses: 1;
    readonly hat: 2;
    readonly crown: 3;
    readonly fringe: 4;
    readonly mic: 5;
};
export declare const BAND_PLANE: {
    readonly z: 2;
    readonly r: 8.5;
};
export declare const BAND_FRONT_Z: number;
export declare function crownKey(z: number, tie?: number): number;
export interface OutfitItem {
    key: string;
    layer: 'back' | 'front';
    order: number;
    depth: number;
    node: ReactNode;
    bounds?: readonly BoundCircle[];
    occluders?: readonly string[];
}
export declare function sortItems(items: readonly OutfitItem[], layer: 'back' | 'front'): OutfitItem[];
