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
export declare function unregistered<T>(build: () => T): T;
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
    readonly x: 102;
    readonly y: -24;
    readonly r: 32;
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
export declare const HAND_FINGERS: readonly [{
    readonly x: 64;
    readonly y: -29.6;
    readonly len: 58;
    readonly r: 11.9;
}, {
    readonly x: 68;
    readonly y: -9.9;
    readonly len: 65;
    readonly r: 12.2;
}, {
    readonly x: 66;
    readonly y: 9.9;
    readonly len: 59;
    readonly r: 11.9;
}, {
    readonly x: 60;
    readonly y: 29.4;
    readonly len: 46;
    readonly r: 11;
}];
export declare const HAND_PALM: string;
export declare const HAND_RIG: {
    readonly curl: 0.4;
    readonly stub: 10;
    readonly stubBack: 16;
    readonly knuckle: 5;
    readonly root: 6;
    readonly taper: 1.7;
    readonly plump: 0.7;
    readonly thumbFrom: GlovePoint;
    readonly thumbR: readonly [number, number];
};
export interface FingerSpec {
    ext: number;
    dir?: number;
    bend?: number;
    len?: number;
    fat?: number;
    over?: boolean;
}
export interface ThumbSpec {
    to: GlovePoint;
    from?: GlovePoint;
    r?: readonly [number, number];
    bend?: number;
    out: boolean;
    side?: boolean;
    layer?: 'over' | 'under';
}
export interface HandSpec {
    fingers: readonly [FingerSpec, FingerSpec, FingerSpec, FingerSpec];
    thumb: ThumbSpec;
}
export declare const backDarts: () => Layer[];
export declare const palmCrease: () => Layer;
export declare function glove(spec: HandSpec, view?: 'palm' | 'back'): Layer[];
export declare function mixHandSpec(a: HandSpec, b: HandSpec, t: number): HandSpec;
export declare const HAND_SPECS: {
    readonly relaxed: {
        readonly fingers: readonly [{
            readonly ext: 0.53;
            readonly dir: -1;
            readonly bend: 3;
        }, {
            readonly ext: 0.53;
            readonly bend: 3;
        }, {
            readonly ext: 0.53;
            readonly dir: 1;
            readonly bend: 3;
        }, {
            readonly ext: 0.53;
            readonly dir: 3;
            readonly bend: 3;
        }];
        readonly thumb: {
            readonly from: readonly [12, -26];
            readonly to: readonly [58, -32];
            readonly r: readonly [12.5, 10];
            readonly bend: -1;
            readonly out: false;
            readonly side: true;
        };
    };
    readonly grip: {
        readonly fingers: readonly [FingerSpec, FingerSpec, FingerSpec, FingerSpec];
        readonly thumb: {
            readonly from: readonly [10, -28];
            readonly to: readonly [62, -36];
            readonly r: readonly [14, 12];
            readonly bend: -1;
            readonly out: false;
        };
    };
    readonly open: {
        readonly fingers: readonly [FingerSpec, FingerSpec, FingerSpec, FingerSpec];
        readonly thumb: {
            readonly from: readonly [18, -28];
            readonly to: readonly [44, -76];
            readonly r: readonly [14.5, 12];
            readonly bend: -4;
            readonly out: true;
        };
    };
    readonly fist: {
        readonly fingers: readonly [FingerSpec, FingerSpec, FingerSpec, FingerSpec];
        readonly thumb: ThumbSpec;
    };
    readonly point: {
        readonly fingers: readonly [FingerSpec, FingerSpec, FingerSpec, FingerSpec];
        readonly thumb: ThumbSpec;
    };
    readonly thumbsUp: {
        readonly fingers: readonly [FingerSpec, FingerSpec, FingerSpec, FingerSpec];
        readonly thumb: {
            readonly from: readonly [20, -24];
            readonly to: readonly [26, -84];
            readonly r: readonly [16.5, 13.5];
            readonly bend: -5;
            readonly out: true;
        };
    };
    readonly peace: {
        readonly fingers: readonly [FingerSpec, FingerSpec, FingerSpec, FingerSpec];
        readonly thumb: ThumbSpec;
    };
    readonly three: {
        readonly fingers: readonly [FingerSpec, FingerSpec, FingerSpec, FingerSpec];
        readonly thumb: ThumbSpec;
    };
    readonly ok: {
        readonly fingers: readonly [{
            readonly ext: 1;
            readonly dir: -97;
            readonly bend: 11;
            readonly len: 0.74;
            readonly over: true;
        }, FingerSpec, FingerSpec, FingerSpec];
        readonly thumb: {
            readonly from: readonly [18, -30];
            readonly to: readonly [50, -76];
            readonly r: readonly [15, 12];
            readonly bend: -9;
            readonly out: true;
            readonly layer: 'over';
        };
    };
    readonly lShape: {
        readonly fingers: readonly [FingerSpec, FingerSpec, FingerSpec, FingerSpec];
        readonly thumb: {
            readonly from: readonly [20, -24];
            readonly to: readonly [34, -82];
            readonly r: readonly [15.5, 13];
            readonly bend: -3;
            readonly out: true;
        };
    };
    readonly palmUp: {
        readonly fingers: readonly [FingerSpec, FingerSpec, FingerSpec, FingerSpec];
        readonly thumb: {
            readonly from: readonly [18, -27];
            readonly to: readonly [48, -66];
            readonly r: readonly [14.5, 12];
            readonly bend: -2;
            readonly out: true;
        };
    };
    readonly flat: {
        readonly fingers: readonly [{
            readonly ext: 0.95;
        }, {
            readonly ext: 0.95;
        }, {
            readonly ext: 0.95;
        }, {
            readonly ext: 0.95;
            readonly dir: 1;
        }];
        readonly thumb: {
            readonly from: readonly [12, -26];
            readonly to: readonly [62, -32];
            readonly r: readonly [12.5, 10];
            readonly bend: -1;
            readonly out: false;
            readonly side: true;
        };
    };
    readonly middleFinger: {
        readonly fingers: readonly [FingerSpec, FingerSpec, FingerSpec, FingerSpec];
        readonly thumb: ThumbSpec;
    };
    readonly hangLoose: {
        readonly fingers: readonly [FingerSpec, FingerSpec, FingerSpec, FingerSpec];
        readonly thumb: {
            readonly from: readonly [20, -22];
            readonly to: readonly [4, -78];
            readonly r: readonly [16.5, 13.5];
            readonly bend: -4;
            readonly out: true;
        };
    };
    readonly four: {
        readonly fingers: readonly [FingerSpec, FingerSpec, FingerSpec, FingerSpec];
        readonly thumb: {
            readonly from: readonly [12, -26];
            readonly to: readonly [56, 8];
            readonly r: readonly [14, 12];
            readonly bend: 4;
            readonly out: false;
        };
    };
    readonly rockOn: {
        readonly fingers: readonly [FingerSpec, FingerSpec, FingerSpec, FingerSpec];
        readonly thumb: ThumbSpec;
    };
    readonly fingersCrossed: {
        readonly fingers: readonly [FingerSpec, {
            readonly ext: 1;
            readonly dir: -20;
            readonly bend: -2;
            readonly len: 1.04;
            readonly fat: 1.05;
            readonly over: true;
        }, FingerSpec, FingerSpec];
        readonly thumb: ThumbSpec;
    };
    readonly pinch: {
        readonly fingers: readonly [{
            readonly ext: 1;
            readonly dir: 10;
            readonly bend: 10;
            readonly len: 0.9;
            readonly fat: 1.06;
        }, FingerSpec, FingerSpec, FingerSpec];
        readonly thumb: {
            readonly from: readonly [16, -32];
            readonly to: readonly [102, -50];
            readonly r: readonly [14.5, 11];
            readonly bend: -14;
            readonly out: true;
        };
    };
    readonly quote: {
        readonly fingers: readonly [{
            readonly ext: 0.84;
            readonly dir: -16;
            readonly bend: 11;
            readonly len: 1.06;
        }, {
            readonly ext: 0.82;
            readonly dir: 4;
            readonly bend: 11;
            readonly len: 1;
        }, FingerSpec, FingerSpec];
        readonly thumb: ThumbSpec;
    };
    readonly cupHand: {
        readonly fingers: readonly [{
            readonly ext: 0.87;
            readonly dir: 8;
            readonly bend: 8;
        }, {
            readonly ext: 0.84;
            readonly dir: 5;
            readonly bend: 8;
        }, {
            readonly ext: 0.85;
            readonly dir: 4;
            readonly bend: 8;
        }, {
            readonly ext: 0.88;
            readonly dir: 2;
            readonly bend: 8;
        }];
        readonly thumb: {
            readonly from: readonly [18, -26];
            readonly to: readonly [78, -54];
            readonly r: readonly [15, 12.5];
            readonly bend: -5;
            readonly out: true;
        };
    };
};
export type RiggedHandShape = keyof typeof HAND_SPECS;
export declare const GLOVE_KIT_NAMES: readonly ['backDarts', 'BASE', 'bean', 'blob', 'CHIN_PALM', 'creaseShape', 'curled', 'disc', 'ext', 'finger', 'FIST_BACK', 'FIST_BODY', 'FR', 'FRONT_TIP', 'FY', 'gaps', 'glove', 'HAND_FINGERS', 'HAND_PALM', 'HAND_RIG', 'HAND_SPECS', 'knuckleCreases', 'knuckles', 'outlineOf', 'PALM', 'palmCrease', 'piece', 'POINT_R', 'POINT_TIP', 'pointer', 'ring', 'SIDE_FIST', 'smooth', 'TAPER', 'tendons', 'thumb', 'thumbOut', 'together'];
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
