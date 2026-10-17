import { type Point } from '../../contracts/pose.js';
import type { PodcastMicAdjust, PodcastMicId, TableItemSpec } from '../../contracts/set.js';
export { chairGeometry, type ChairGeometry } from './chairs.js';
export declare const PODCAST_SET: {
    readonly cameraPitch: 8;
    readonly table: {
        readonly back: 640;
        readonly front: 772;
        readonly edge: 20;
        readonly inset: 7;
        readonly left: -3000;
        readonly right: 4000;
        readonly bottom: 2000;
        readonly sink: {
            readonly from: 752;
            readonly to: 872;
        };
        readonly overhang: 22;
        readonly contactShadow: 9;
    };
    readonly chairs: {
        readonly padded: {
            readonly behind: 170;
            readonly swivel: 1;
            readonly shadowGap: 9;
            readonly parts: readonly [import("./chairs.js").ChairPartSpec];
        };
        readonly director: {
            readonly behind: 175;
            readonly swivel: 1;
            readonly shadowGap: 9;
            readonly parts: readonly [import("./chairs.js").ChairPartSpec, {
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
            readonly parts: readonly [import("./chairs.js").ChairPartSpec];
        };
        readonly gaming: {
            readonly behind: 172;
            readonly swivel: 1;
            readonly shadowGap: 10;
            readonly parts: readonly [import("./chairs.js").ChairPartSpec, {
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
            }, import("./chairs.js").ChairPartSpec, {
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
            readonly parts: readonly [import("./chairs.js").ChairPartSpec, {
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
            }, ...import("./chairs.js").ChairPartSpec[], {
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
            readonly parts: readonly [import("./chairs.js").ChairPartSpec];
        };
        readonly sofa: {
            readonly behind: 178;
            readonly swivel: 0;
            readonly shadowGap: 12;
            readonly parts: readonly [import("./chairs.js").ChairPartSpec, ...import("./chairs.js").ChairPartSpec[]];
        };
    };
    readonly mics: {
        dynamic: {
            aim: {
                x: number;
                y: number;
            };
            pivot: {
                x: number;
                y: number;
            };
            front: number;
            back: number;
            radius: number;
            grille: number;
            base: {
                x: number;
                y: number;
                rx: number;
                ry: number;
                height: number;
            };
            rod: {
                radius: number;
                top: number;
            };
            yoke: {
                width: number;
                knob: number;
            };
        };
        boom: {
            aim: {
                x: number;
                y: number;
            };
            pivot: {
                x: number;
                y: number;
            };
            front: number;
            back: number;
            radius: number;
            grille: number;
            base: {
                x: number;
                y: number;
                rx: number;
                ry: number;
                height: number;
            };
            arm: {
                elbow: {
                    x: number;
                    y: number;
                };
                tip: {
                    x: number;
                    y: number;
                };
                radius: number;
            };
            post: {
                top: number;
            };
            knob: number;
        };
        lavalier: {
            clip: {
                x: number;
                y: number;
            };
            radius: number;
        };
    };
    readonly micAdjustLimits: {
        readonly x: readonly [-60, 60];
        readonly y: readonly [-70, 70];
        readonly angle: readonly [-40, 40];
    };
    readonly elbowPins: {
        readonly left: {
            readonly x: 298;
            readonly y: 692;
        };
        readonly right: {
            readonly x: 702;
            readonly y: 692;
        };
    };
    readonly elbowRest: {
        readonly from: 600;
        readonly to: 650;
    };
    readonly drinkSlots: {
        inner: {
            x: number;
            y: number;
            hand: "right";
        };
        outer: {
            x: number;
            y: number;
            hand: "left";
        };
    };
};
export declare function tableClipY(wristY: number): number;
export declare function clampMicAdjust(adjust?: PodcastMicAdjust): {
    x: number;
    y: number;
    angle: number;
};
export interface DynamicMicGeometry {
    model: 'dynamic';
    axis: Point;
    normal: Point;
    pivot: Point;
    tip: Point;
    tail: Point;
    ring: Point;
    radius: number;
    base: {
        x: number;
        y: number;
        rx: number;
        ry: number;
        height: number;
    };
    rod: {
        from: Point;
        to: Point;
        radius: number;
    };
    yoke: {
        from: Point;
        to: Point;
        width: number;
        knob: number;
    };
    mirror: boolean;
}
export interface BoomMicGeometry {
    model: 'boom';
    axis: Point;
    normal: Point;
    pivot: Point;
    tip: Point;
    tail: Point;
    ring: Point;
    radius: number;
    base: {
        x: number;
        y: number;
        rx: number;
        ry: number;
        height: number;
    };
    post: {
        from: Point;
        to: Point;
        radius: number;
    };
    armA: {
        from: Point;
        to: Point;
        radius: number;
    };
    armB: {
        from: Point;
        to: Point;
        radius: number;
    };
    knob: number;
    mirror: boolean;
}
export interface LavalierMicGeometry {
    model: 'lavalier';
    clip: Point;
    radius: number;
    mirror: boolean;
}
export type MicGeometry = DynamicMicGeometry | BoomMicGeometry | LavalierMicGeometry;
export declare function micGeometry(mirror: boolean | undefined, model: 'dynamic', adjust?: PodcastMicAdjust): DynamicMicGeometry;
export declare function micGeometry(mirror: boolean | undefined, model: 'boom', adjust?: PodcastMicAdjust): BoomMicGeometry;
export declare function micGeometry(mirror: boolean | undefined, model: 'lavalier', adjust?: PodcastMicAdjust): LavalierMicGeometry;
export declare function micGeometry(mirror?: boolean, model?: PodcastMicId, adjust?: PodcastMicAdjust): MicGeometry;
export declare function micTableBase(mirror?: boolean, model?: PodcastMicId, adjust?: PodcastMicAdjust): {
    x: number;
    y: number;
    rx: number;
    ry: number;
} | null;
export declare function capsuleOutline(a: Point, b: Point, r: number, steps?: number): Point[];
export declare function ellipseOutline(c: Point, rx: number, ry: number, steps?: number): Point[];
export declare function micFootprint(mirror?: boolean, model?: PodcastMicId, adjust?: PodcastMicAdjust): Point[][];
export interface TableItemGeometry {
    kind: TableItemSpec['kind'];
    at: Point;
    rotation: number;
}
export declare function tableItemGeometry(item: TableItemSpec): TableItemGeometry;
