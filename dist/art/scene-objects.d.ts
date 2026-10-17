import type { ReactElement } from 'react';
import { type SceneLayer, type SeatSceneObject } from '../contracts/scene.js';
import { type Palette } from './palette.js';
import { type ItemSeat } from './set-items.js';
type Ids = (local: string) => string;
export declare const IMAGE_FALLBACK_SIZE: {
    readonly width: 240;
    readonly height: 240;
};
export declare function sceneObjectSize(object: Pick<SeatSceneObject, 'type' | 'kind' | 'natural'>): {
    width: number;
    height: number;
} | null;
export interface SceneObjectArtProps {
    object: SeatSceneObject;
    ids: Ids;
    assetUrl?: ((src: string) => string) | undefined;
    seat?: ItemSeat;
    palette?: Palette;
}
export declare function SceneObjectArt({ object, ids, assetUrl, seat, palette }: SceneObjectArtProps): ReactElement | null;
export interface SceneLayerArtProps {
    objects: readonly SeatSceneObject[];
    layer: SceneLayer;
    ids: Ids;
    assetUrl?: ((src: string) => string) | undefined;
    seat?: ItemSeat;
    palette?: Palette;
    skipTableItems?: boolean;
}
export declare function SceneLayerArt({ objects, layer, ids, assetUrl, seat, palette, skipTableItems }: SceneLayerArtProps): ReactElement | null;
export {};
