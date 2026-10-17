import { type Point } from '../../contracts/pose.js';
import type { PodcastChairId } from '../../contracts/set.js';
import { type BoxDims, type BoxProjection } from '../head/box3d.js';
export declare const CHAIR_CAMERA_PITCH = 8;
export declare const CHAIR_PART_ROLES: readonly ['back', 'headrest', 'pillow', 'wing', 'arm', 'cushion', 'lumbar', 'stem', 'post', 'rail', 'slat'];
export type ChairPartRole = (typeof CHAIR_PART_ROLES)[number];
export declare const CHAIR_MATERIALS: readonly ['plum', 'gaming', 'gamingAccent', 'meshFrame', 'meshNet', 'leather', 'wood', 'eggShell', 'eggInner', 'sofa', 'sofaPillow'];
export type ChairMaterial = (typeof CHAIR_MATERIALS)[number];
export interface ChairPartSpec {
    role: ChairPartRole;
    material: ChairMaterial;
    x: number;
    top: number;
    width: number;
    height: number;
    depth: number;
    radius: number;
    z: number;
    layer?: number;
    outline?: readonly Point[];
    shadowGap?: number;
    main?: boolean;
    detail?: Readonly<Record<string, number>>;
}
export interface ChairModelSpec {
    behind: number;
    swivel: number;
    shadowGap: number;
    parts: readonly ChairPartSpec[];
}
export declare function profileOutline(profile: ReadonlyArray<readonly [number, number]>, height: number, steps?: number): Point[];
export declare function eggOutline(width: number, height: number, squareness?: number, taper?: number, steps?: number): Point[];
export declare function archOutline(width: number, height: number, rise: number, radius: number, steps?: number): Point[];
export declare function insetConvex(points: readonly Point[], d: number): Point[];
export declare function clipSegmentToConvex(a: Point, b: Point, polygon: readonly Point[]): [Point, Point] | null;
export declare function roundedRectPolygon(width: number, height: number, radius: number, steps?: number): Point[];
export declare function domeOutline(width: number, height: number, crown: number, steps?: number): Point[];
export declare function rotatePolygon(points: readonly Point[], deg: number): Point[];
export declare const CHAIR_MODELS: {
    readonly padded: {
        readonly behind: 170;
        readonly swivel: 1;
        readonly shadowGap: 9;
        readonly parts: readonly [ChairPartSpec];
    };
    readonly director: {
        readonly behind: 175;
        readonly swivel: 1;
        readonly shadowGap: 9;
        readonly parts: readonly [ChairPartSpec, {
            readonly role: 'headrest';
            readonly material: 'plum';
            readonly x: 0;
            readonly top: 168;
            readonly width: 280;
            readonly height: 150;
            readonly depth: 60;
            readonly radius: 46;
            readonly z: -6;
            readonly layer: -1;
        }];
    };
    readonly stool: {
        readonly behind: 158;
        readonly swivel: 1;
        readonly shadowGap: 9;
        readonly parts: readonly [ChairPartSpec];
    };
    readonly gaming: {
        readonly behind: 172;
        readonly swivel: 1;
        readonly shadowGap: 10;
        readonly parts: readonly [ChairPartSpec, {
            readonly role: 'wing';
            readonly material: 'gamingAccent';
            readonly x: -196;
            readonly top: 404;
            readonly width: 88;
            readonly height: 290;
            readonly depth: 96;
            readonly radius: 0;
            readonly z: 22;
            readonly outline: Point[];
            readonly shadowGap: 7;
        }, {
            readonly role: 'wing';
            readonly material: 'gamingAccent';
            readonly x: 196;
            readonly top: 404;
            readonly width: 88;
            readonly height: 290;
            readonly depth: 96;
            readonly radius: 0;
            readonly z: 22;
            readonly outline: Point[];
            readonly shadowGap: 7;
        }, {
            readonly role: 'pillow';
            readonly material: 'gaming';
            readonly x: 0;
            readonly top: 268;
            readonly width: 210;
            readonly height: 84;
            readonly depth: 46;
            readonly radius: 36;
            readonly z: 46;
            readonly shadowGap: 6;
        }];
    };
    readonly mesh: {
        readonly behind: 168;
        readonly swivel: 1;
        readonly shadowGap: 8;
        readonly parts: readonly [{
            readonly role: 'stem';
            readonly material: 'meshFrame';
            readonly x: 0;
            readonly top: 236;
            readonly width: 30;
            readonly height: 110;
            readonly depth: 22;
            readonly radius: 8;
            readonly z: -14;
            readonly layer: -2;
        }, {
            readonly role: 'headrest';
            readonly material: 'meshNet';
            readonly x: 0;
            readonly top: 176;
            readonly width: 250;
            readonly height: 96;
            readonly depth: 30;
            readonly radius: 0;
            readonly z: -6;
            readonly layer: -1;
            readonly outline: Point[];
            readonly detail: {
                readonly frame: 13;
            };
        }, ChairPartSpec, {
            readonly role: 'lumbar';
            readonly material: 'meshFrame';
            readonly x: 0;
            readonly top: 560;
            readonly width: 340;
            readonly height: 54;
            readonly depth: 26;
            readonly radius: 24;
            readonly z: 16;
            readonly shadowGap: 6;
        }];
    };
    readonly armchair: {
        readonly behind: 176;
        readonly swivel: 1;
        readonly shadowGap: 10;
        readonly parts: readonly [ChairPartSpec, {
            readonly role: 'arm';
            readonly material: 'leather';
            readonly x: -318;
            readonly top: 528;
            readonly width: 132;
            readonly height: 190;
            readonly depth: 300;
            readonly radius: 58;
            readonly z: 118;
            readonly shadowGap: 8;
        }, {
            readonly role: 'arm';
            readonly material: 'leather';
            readonly x: 318;
            readonly top: 528;
            readonly width: 132;
            readonly height: 190;
            readonly depth: 300;
            readonly radius: 58;
            readonly z: 118;
            readonly shadowGap: 8;
        }];
    };
    readonly wood: {
        readonly behind: 162;
        readonly swivel: 1;
        readonly shadowGap: 8;
        readonly parts: readonly [{
            readonly role: 'post';
            readonly material: 'wood';
            readonly x: -266;
            readonly top: 318;
            readonly width: 38;
            readonly height: 394;
            readonly depth: 40;
            readonly radius: 16;
            readonly z: 0;
        }, {
            readonly role: 'post';
            readonly material: 'wood';
            readonly x: 266;
            readonly top: 318;
            readonly width: 38;
            readonly height: 394;
            readonly depth: 40;
            readonly radius: 16;
            readonly z: 0;
        }, ...ChairPartSpec[], {
            readonly role: 'rail';
            readonly material: 'wood';
            readonly x: 0;
            readonly top: 592;
            readonly width: 532;
            readonly height: 34;
            readonly depth: 28;
            readonly radius: 10;
            readonly z: 2;
        }, {
            readonly role: 'rail';
            readonly material: 'wood';
            readonly x: 0;
            readonly top: 330;
            readonly width: 590;
            readonly height: 70;
            readonly depth: 34;
            readonly radius: 0;
            readonly z: 4;
            readonly outline: Point[];
            readonly main: true;
            readonly shadowGap: 5;
        }];
    };
    readonly egg: {
        readonly behind: 180;
        readonly swivel: 1;
        readonly shadowGap: 14;
        readonly parts: readonly [ChairPartSpec];
    };
    readonly sofa: {
        readonly behind: 178;
        readonly swivel: 0;
        readonly shadowGap: 12;
        readonly parts: readonly [ChairPartSpec, ...ChairPartSpec[]];
    };
};
export declare function projectPrism(outline: readonly Point[], depth: number, turnDeg: number, pitchDeg: number): BoxProjection;
export interface ChairPartGeometry {
    spec: ChairPartSpec;
    index: number;
    dims: BoxDims;
    box: BoxProjection;
    center: Point;
    outline: readonly Point[] | null;
    face: readonly Point[];
    silhouette: Point[];
}
export interface ChairGeometry {
    model: PodcastChairId;
    dims: BoxDims;
    box: BoxProjection;
    center: Point;
    turn: number;
    chestTurn: number;
    headrest?: {
        dims: BoxDims;
        box: BoxProjection;
        center: Point;
    };
    parts: ChairPartGeometry[];
    bounds: {
        minX: number;
        maxX: number;
        minY: number;
        maxY: number;
    };
}
export declare function chairModel(model: PodcastChairId): ChairModelSpec;
export declare function chairGeometry(turnDeg: number, model?: PodcastChairId): ChairGeometry;
export declare function chairFootprint(turnDeg: number, model?: PodcastChairId): Point[][];
