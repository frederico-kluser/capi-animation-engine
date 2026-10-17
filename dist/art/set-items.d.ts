import type { ReactElement } from 'react';
import type { Point } from '../contracts/pose.js';
import type { DrinkSpec, TableItemKind, TableItemSpec } from '../contracts/set.js';
import { type HeldDrinkContact } from '../core/set/items.js';
import { type Palette } from './palette.js';
type Ids = (local: string) => string;
export type ItemSeat = 'host' | 'guest';
export interface ItemArtProps {
    palette: Palette;
    ids: Ids;
    flip: boolean;
    seat: ItemSeat;
    ink: number;
    tilt: number;
}
export declare const itemInk: (scale: number) => number;
export declare const ITEM_ART: Record<TableItemKind, (props: ItemArtProps) => ReactElement>;
export interface PlacedItemArtProps {
    kind: TableItemKind;
    at: Point;
    rotation?: number;
    scale?: number;
    flip?: boolean;
    ids: Ids;
    seat?: ItemSeat;
    palette?: Palette;
    pivot?: Point;
    level?: number;
    opacity?: number;
}
export declare function PlacedItemArt({ kind, at, rotation, scale, flip, ids, seat, palette, pivot, level, opacity }: PlacedItemArtProps): ReactElement;
export interface TableItemsArtProps {
    ids: Ids;
    items: readonly TableItemSpec[];
    mirror: boolean;
    drink?: DrinkSpec | undefined;
    palette?: Palette | undefined;
}
export declare function TableItemsArt({ ids, items, mirror, drink, palette }: TableItemsArtProps): ReactElement | null;
export interface DrinkItemArtProps {
    ids: Ids;
    item: TableItemSpec;
    drink: DrinkSpec;
    mirror: boolean;
    palette?: Palette | undefined;
}
export declare function DrinkItemArt({ ids, item, drink, mirror, palette }: DrinkItemArtProps): ReactElement;
export interface DrinkShadowArtProps {
    ids: Ids;
    item: TableItemSpec;
    drink: DrinkSpec;
    mirror: boolean;
    held?: HeldDrinkContact | null | undefined;
}
export declare function DrinkShadowArt({ ids, item, drink, mirror, held }: DrinkShadowArtProps): ReactElement | null;
export declare function itemSilhouettePath(kind: TableItemKind, flip?: boolean): string;
export {};
