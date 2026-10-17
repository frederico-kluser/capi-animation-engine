import { type Point, type Side } from '../../contracts/pose.js';
import type { SeatSceneObject } from '../../contracts/scene.js';
import { type DrinkKind, type DrinkSlot, type DrinkSpec, type TableItemKind, type TableItemSpec } from '../../contracts/set.js';
export interface ItemBox {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
}
export declare const ITEM_SIZE: {
    readonly mug: {
        readonly width: 46;
        readonly height: 54;
    };
    readonly papers: {
        readonly width: 74;
        readonly height: 50;
    };
    readonly phone: {
        readonly width: 62;
        readonly height: 32;
    };
    readonly glass: {
        readonly width: 42;
        readonly height: 56;
    };
    readonly bottle: {
        readonly width: 36;
        readonly height: 112;
    };
    readonly cup: {
        readonly width: 46;
        readonly height: 80;
    };
    readonly laptop: {
        readonly width: 156;
        readonly height: 102;
    };
    readonly books: {
        readonly width: 98;
        readonly height: 51;
    };
    readonly plant: {
        readonly width: 50;
        readonly height: 86;
    };
    readonly notebook: {
        readonly width: 110;
        readonly height: 38;
    };
    readonly headphones: {
        readonly width: 100;
        readonly height: 64;
    };
    readonly can: {
        readonly width: 34;
        readonly height: 62;
    };
    readonly lamp: {
        readonly width: 60;
        readonly height: 160;
    };
    readonly nameplate: {
        readonly width: 128;
        readonly height: 39;
    };
};
export declare const ITEM_BOUNDS: {
    readonly mug: {
        readonly x0: -25;
        readonly y0: -56;
        readonly x1: 49;
        readonly y1: 2;
    };
    readonly papers: {
        readonly x0: -45;
        readonly y0: -52;
        readonly x1: 40;
        readonly y1: 5;
    };
    readonly phone: {
        readonly x0: -33;
        readonly y0: -34;
        readonly x1: 33;
        readonly y1: 2;
    };
    readonly glass: {
        readonly x0: -23;
        readonly y0: -58;
        readonly x1: 23;
        readonly y1: 2;
    };
    readonly bottle: {
        readonly x0: -21;
        readonly y0: -115;
        readonly x1: 21;
        readonly y1: 3;
    };
    readonly cup: {
        readonly x0: -28;
        readonly y0: -83;
        readonly x1: 28;
        readonly y1: 3;
    };
    readonly laptop: {
        readonly x0: -81;
        readonly y0: -105;
        readonly x1: 81;
        readonly y1: 4;
    };
    readonly books: {
        readonly x0: -51;
        readonly y0: -54;
        readonly x1: 51;
        readonly y1: 2;
    };
    readonly plant: {
        readonly x0: -36;
        readonly y0: -88;
        readonly x1: 37;
        readonly y1: 3;
    };
    readonly notebook: {
        readonly x0: -58;
        readonly y0: -41;
        readonly x1: 59;
        readonly y1: 3;
    };
    readonly headphones: {
        readonly x0: -53;
        readonly y0: -68;
        readonly x1: 53;
        readonly y1: 3;
    };
    readonly can: {
        readonly x0: -20;
        readonly y0: -65;
        readonly x1: 20;
        readonly y1: 3;
    };
    readonly lamp: {
        readonly x0: -33;
        readonly y0: -164;
        readonly x1: 105;
        readonly y1: 5;
    };
    readonly nameplate: {
        readonly x0: -67;
        readonly y0: -42;
        readonly x1: 67;
        readonly y1: 3;
    };
};
export declare const ITEM_SHADOW: {
    readonly mug: {
        readonly rx: 30;
        readonly ry: 7;
        readonly reachX: 7;
        readonly reachY: 2;
        readonly lift: 1;
    };
    readonly papers: {
        readonly rx: 42;
        readonly ry: 7;
        readonly reachX: 7;
        readonly reachY: 2;
        readonly lift: 1;
    };
    readonly phone: {
        readonly rx: 30;
        readonly ry: 7;
        readonly reachX: 7;
        readonly reachY: 2;
        readonly lift: 1;
    };
    readonly glass: {
        readonly rx: 30;
        readonly ry: 7;
        readonly reachX: 7;
        readonly reachY: 2;
        readonly lift: 1;
    };
    readonly bottle: {
        readonly rx: 22;
        readonly ry: 6;
        readonly reachX: 12;
        readonly reachY: 3;
        readonly lift: 1;
    };
    readonly cup: {
        readonly rx: 26;
        readonly ry: 6.5;
        readonly reachX: 9;
        readonly reachY: 2.5;
        readonly lift: 1;
    };
    readonly laptop: {
        readonly rx: 88;
        readonly ry: 9;
        readonly reachX: 12;
        readonly reachY: 3;
        readonly lift: 1;
    };
    readonly books: {
        readonly rx: 54;
        readonly ry: 8;
        readonly reachX: 8;
        readonly reachY: 2;
        readonly lift: 1;
    };
    readonly plant: {
        readonly rx: 28;
        readonly ry: 7;
        readonly reachX: 10;
        readonly reachY: 2.5;
        readonly lift: 1;
    };
    readonly notebook: {
        readonly rx: 56;
        readonly ry: 7;
        readonly reachX: 5;
        readonly reachY: 2;
        readonly lift: 1;
    };
    readonly headphones: {
        readonly rx: 48;
        readonly ry: 8;
        readonly reachX: 8;
        readonly reachY: 2;
        readonly lift: 1;
    };
    readonly can: {
        readonly rx: 20;
        readonly ry: 6;
        readonly reachX: 9;
        readonly reachY: 2.5;
        readonly lift: 1;
    };
    readonly lamp: {
        readonly rx: 36;
        readonly ry: 8;
        readonly reachX: 14;
        readonly reachY: 3;
        readonly lift: 1;
    };
    readonly nameplate: {
        readonly rx: 64;
        readonly ry: 7;
        readonly reachX: 8;
        readonly reachY: 2;
        readonly lift: 1;
    };
};
export declare const ITEM_GRIP_TIP: {
    readonly mug: {
        readonly x: 22;
        readonly y: -26;
    };
    readonly papers: {
        readonly x: 18;
        readonly y: -26;
    };
    readonly phone: {
        readonly x: 14;
        readonly y: -16;
    };
    readonly glass: {
        readonly x: 6;
        readonly y: -27;
    };
    readonly bottle: {
        readonly x: 6;
        readonly y: -48;
    };
    readonly cup: {
        readonly x: 8;
        readonly y: -34;
    };
    readonly laptop: {
        readonly x: 58;
        readonly y: -60;
    };
    readonly books: {
        readonly x: 30;
        readonly y: -24;
    };
    readonly plant: {
        readonly x: 12;
        readonly y: -24;
    };
    readonly notebook: {
        readonly x: 30;
        readonly y: -18;
    };
    readonly headphones: {
        readonly x: 26;
        readonly y: -30;
    };
    readonly can: {
        readonly x: 5;
        readonly y: -30;
    };
    readonly lamp: {
        readonly x: 4;
        readonly y: -24;
    };
    readonly nameplate: {
        readonly x: 40;
        readonly y: -20;
    };
};
export declare const GRIP_GLOVE_REACH = 110;
export declare const GRIP_SHAPE: 'grip';
export declare const DRINK_SCALE = 1.9;
export declare const ITEM_SCALE_RANGE: {
    readonly min: 0.25;
    readonly max: 4;
};
export declare const ITEM_DEFAULT_SCALE: Readonly<Record<TableItemKind, number>>;
export declare const TABLETOP_BAND: {
    readonly left: number;
    readonly right: number;
    readonly top: number;
    readonly bottom: number;
};
export declare function clampToTabletop(p: Point): Point;
export declare function isDrinkKind(kind: unknown): kind is DrinkKind;
export declare function itemScale(scale: unknown): number;
export declare function itemBounds(kind: TableItemKind, scale?: number, flip?: boolean): ItemBox;
export interface ItemGrip {
    x: number;
    y: number;
    angle: number;
    shape: typeof GRIP_SHAPE;
}
export declare function itemGrip(kind: TableItemKind, hand?: Side, scale?: number): ItemGrip;
export declare const DRINK_ITEM_ID = "drink";
export declare function drinkSlotOf(drink: DrinkSpec): {
    slot: DrinkSlot;
    foot: Point;
    hand: Side;
};
export declare function drinkItem(drink: DrinkSpec): TableItemSpec;
export declare function drinkPickup(drink: DrinkSpec, mirror?: boolean): {
    hand: Side;
    wrist: Point;
    angle: number;
    shape: typeof GRIP_SHAPE;
    foot: Point;
};
export declare function drinkHandAngle(hand: Side, tilt?: number): number;
export interface ItemPlacement {
    kind: TableItemKind;
    id?: string;
    at: Point;
    rotation: number;
    scale: number;
    flip: boolean;
    opacity?: number;
}
export declare function placeTableItem(spec: TableItemSpec, mirror?: boolean, drink?: DrinkSpec): ItemPlacement;
export declare function sceneObjectToTableItem(object: SeatSceneObject, mirror?: boolean): TableItemSpec | null;
export declare function drinkScreenBox(drink: DrinkSpec, mirror?: boolean): ItemBox;
export declare function heldDrinkPlacement(kind: DrinkKind, hand: Side, wrist: Point, tilt?: number, scale?: number): {
    foot: Point;
    flip: boolean;
    scale: number;
    rotation: number;
};
export declare const DRINK_CONTACT_RANGE = 40;
export interface HeldDrinkContact {
    contact: number;
    foot: Point;
    slotFoot: Point;
    scale: number;
}
export declare function drinkContact(drink: DrinkSpec, kind: DrinkKind, hand: Side, wrist: Point, tilt?: number, mirror?: boolean, scale?: number): HeldDrinkContact;
export declare function drinkPropBox(kind: DrinkKind): {
    x: number;
    y: number;
    w: number;
    h: number;
};
