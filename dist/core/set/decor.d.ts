import type { Point } from '../../contracts/pose.js';
import type { DecorKind } from '../../contracts/scene.js';
export declare const DECOR_SIZE: Readonly<Record<DecorKind, {
    width: number;
    height: number;
}>>;
export declare const DECOR_WALL_GAP: Readonly<Record<DecorKind, number>>;
export declare const DECOR_PLACEMENT: Readonly<Record<DecorKind, 'wall' | 'floor'>>;
export declare const DECOR_FLOOR_Y = 860;
export declare const DECOR_WALL_Y = 200;
export declare function decorDefaultCenter(kind: DecorKind, x: number): Point;
export declare function decorBounds(kind: DecorKind): {
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare function decorShadowDirection(screen: Point, rotation?: number, flipX?: boolean): Point;
