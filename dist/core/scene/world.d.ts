import { type PodcastSeat } from '../../contracts/podcast.js';
import type { Point } from '../../contracts/pose.js';
import { type PodcastScene, type SceneObject, type SeatSceneObject } from '../../contracts/scene.js';
import type { TableItemSpec } from '../../contracts/set.js';
export declare function seatOfWorldX(x: number): PodcastSeat;
export declare function worldToSeat(seat: PodcastSeat, p: Point): Point;
export declare function seatToWorld(seat: PodcastSeat, p: Point): Point;
export declare function seatToAuthored(seat: PodcastSeat, p: Point): Point;
export declare function authoredToSeat(seat: PodcastSeat, p: Point): Point;
export declare function worldToAuthored(seat: PodcastSeat, p: Point): Point;
export declare function authoredToWorld(seat: PodcastSeat, p: Point): Point;
export declare function objectSeat(object: SceneObject): PodcastSeat;
export declare function isTabletopItem(object: SceneObject): boolean;
export declare function orderedObjects(objects: readonly SceneObject[]): SceneObject[];
export interface SeatScene {
    items: TableItemSpec[];
    objects: SeatSceneObject[];
}
export declare function sceneForSeat(scene: PodcastScene | undefined, seat: PodcastSeat): SeatScene;
export declare const SCENE_SEATS: readonly PodcastSeat[];
