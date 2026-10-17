import type { PodcastSeat } from './podcast.js';
import type { TableItemKind } from './set.js';
export declare const PODCAST_WORLD: {
    readonly width: 2000;
    readonly height: 800;
    readonly seatOrigin: Readonly<Record<PodcastSeat, number>>;
    readonly seam: 1000;
};
export declare const SCENE_LAYERS: readonly ['background', 'behind', 'tabletop', 'front'];
export type SceneLayer = (typeof SCENE_LAYERS)[number];
export declare const DECOR_KINDS: readonly ['shelf', 'frame', 'neon', 'clock', 'acoustic', 'floorPlant', 'floorLamp', 'window', 'curtain', 'logoWall'];
export type DecorKind = (typeof DECOR_KINDS)[number];
export declare const SCENE_OBJECT_TYPES: readonly ['item', 'decor', 'image'];
export type SceneObjectType = (typeof SCENE_OBJECT_TYPES)[number];
export interface SceneObject {
    id: string;
    type: SceneObjectType;
    kind?: TableItemKind | DecorKind;
    src?: string;
    name?: string;
    layer: SceneLayer;
    x: number;
    y: number;
    rotation?: number;
    scale?: number;
    scaleX?: number;
    scaleY?: number;
    opacity?: number;
    flipX?: boolean;
    locked?: boolean;
    hidden?: boolean;
    order?: number;
    natural?: {
        width: number;
        height: number;
    };
    seat?: PodcastSeat;
}
export interface SceneAsset {
    src: string;
    sha1: string;
    mime: 'image/png' | 'image/jpeg' | 'image/webp' | 'image/svg+xml';
    width: number;
    height: number;
    bytes: number;
    name?: string;
}
export interface PodcastScene {
    version: 1;
    objects: SceneObject[];
    assets?: SceneAsset[];
}
export interface SeatSceneObject extends Omit<SceneObject, 'x' | 'y' | 'seat'> {
    x: number;
    y: number;
}
