export type GlovePoint = readonly [number, number];
export type Pt = GlovePoint;
export interface GloveVolumeLayer {
    kind: 'volume';
    parts: readonly string[];
    outline: boolean;
    thumb: 'tucked' | 'out' | null;
}
export interface GloveCreaseLayer {
    kind: 'crease';
    d: string;
    palm: boolean;
}
export type GloveLayer = GloveVolumeLayer | GloveCreaseLayer;
export type Layer = GloveLayer;
export declare const piece: (d: string, outline?: boolean) => Layer;
export declare const blob: (parts: readonly string[], outline?: boolean) => Layer;
export declare const thumb: (d: string) => Layer;
export declare const thumbOut: (d: string) => Layer;
export declare const outlineOf: (d: string) => readonly GlovePoint[] | undefined;
export declare function registerOutline(d: string, points: readonly GlovePoint[]): void;
export declare function smooth(points: readonly Pt[], k?: number): string;
export declare function ring(cx: number, cy: number, r: number, hole: number): string;
export declare function bean(ax: number, ay: number, bx: number, by: number, ra: number, rb: number, bend?: number): string;
export declare function finger(x: number, y: number, deg: number, length: number, r: number, tip?: number, bend?: number): string;
export declare function creaseShape(points: readonly Pt[], w?: number, palm?: boolean): Layer;
export declare const FY: readonly [-27, -9, 9, 27];
export declare const BASE = 56;
export declare const FR = 13;
export declare const TAPER = 2;
export declare const POINT_R = 15.5;
export declare const POINT_TIP = 11.5;
export declare const PALM: string;
export declare const FIST_BODY: string;
export declare function disc(cx: number, cy: number, r: number): string;
export declare const FRONT_TIP: {
    readonly x: 100;
    readonly y: -24;
    readonly r: 36;
};
export declare const CHIN_PALM: string;
export declare const SIDE_FIST: string;
export declare const ext: (i: 0 | 1 | 2 | 3, len: number, deg?: number, bend?: number, r?: number) => string;
export declare const pointer: (i: 0 | 1 | 2 | 3, len: number, deg?: number, bend?: number, r?: number, tip?: number) => string;
export declare const curled: (i: 0 | 1 | 2 | 3, to?: number, r?: number) => string;
export declare const knuckleCreases: (to?: number) => Layer[];
export declare const knuckles: (to?: number, r?: number) => Layer[];
export declare const gaps: (from: number, to?: number) => Layer[];
export declare const tendons: (to?: number) => Layer[];
export declare const FIST_BACK: string[];
export declare const together: (lens: readonly [number, number, number, number], bend?: number) => string[];
export declare const GLOVE_KIT_NAMES: readonly ['BASE', 'bean', 'blob', 'CHIN_PALM', 'creaseShape', 'curled', 'disc', 'ext', 'finger', 'FIST_BACK', 'FIST_BODY', 'FR', 'FRONT_TIP', 'FY', 'gaps', 'knuckleCreases', 'knuckles', 'outlineOf', 'PALM', 'piece', 'POINT_R', 'POINT_TIP', 'pointer', 'ring', 'SIDE_FIST', 'smooth', 'TAPER', 'tendons', 'thumb', 'thumbOut', 'together'];
export interface GloveVersion {
    id: string;
    palm: readonly GloveLayer[];
    back?: readonly GloveLayer[];
}
export declare function gloveVersionOf(id: string, mod: {
    palm: readonly GloveLayer[];
    back?: readonly GloveLayer[] | undefined;
}): GloveVersion;
export declare function layerPoints(layers: readonly GloveLayer[], part?: 'all' | 'thumb'): GlovePoint[];
export type SerializedGloveLayer = {
    kind: 'volume';
    parts: string[];
    outline: boolean;
    thumb: 'tucked' | 'out' | null;
    points: GlovePoint[][];
} | {
    kind: 'crease';
    d: string;
    palm: boolean;
    points: GlovePoint[];
};
export declare function serializeGloveLayers(layers: readonly GloveLayer[]): SerializedGloveLayer[];
export declare function gloveLayersProblems(raw: unknown, label: string): string[];
export declare function deserializeGloveLayers(raw: unknown, label: string): {
    layers: GloveLayer[];
} | {
    problems: string[];
};
