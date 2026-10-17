import type { SeatSceneObject } from './scene.js';
export declare const SET_IDS: readonly ['none', 'podcast'];
export type SetId = (typeof SET_IDS)[number];
export declare const SET_PIECES: readonly ['chair', 'table', 'mic'];
export type SetPiece = (typeof SET_PIECES)[number];
export type SetPieces = Record<SetPiece, boolean>;
export declare const PODCAST_CHAIR_IDS: readonly ['padded', 'director', 'stool', 'gaming', 'mesh', 'armchair', 'wood', 'egg', 'sofa'];
export type PodcastChairId = (typeof PODCAST_CHAIR_IDS)[number];
export declare const PODCAST_MIC_IDS: readonly ['dynamic', 'boom', 'lavalier'];
export type PodcastMicId = (typeof PODCAST_MIC_IDS)[number];
export interface PodcastMicAdjust {
    x?: number;
    y?: number;
    angle?: number;
}
export declare const TABLE_ITEM_KINDS: readonly ['mug', 'papers', 'phone', 'glass', 'bottle', 'cup', 'laptop', 'books', 'plant', 'notebook', 'headphones', 'can', 'lamp', 'nameplate'];
export type TableItemKind = (typeof TABLE_ITEM_KINDS)[number];
export declare const DRINK_KINDS: readonly ["glass", "mug", "bottle", "cup"];
export type DrinkKind = (typeof DRINK_KINDS)[number];
export declare const DRINK_SLOTS: readonly ['inner', 'outer'];
export type DrinkSlot = (typeof DRINK_SLOTS)[number];
export interface DrinkSpec {
    kind: DrinkKind;
    slot?: DrinkSlot;
}
export interface TableItemSpec {
    kind: TableItemKind;
    x: number;
    y: number;
    rotation?: number;
    scale?: number;
    id?: string;
    flipX?: boolean;
    opacity?: number;
}
export interface PodcastSetOptions {
    chairModel?: PodcastChairId;
    micModel?: PodcastMicId;
    micAdjust?: PodcastMicAdjust;
    items?: TableItemSpec[];
    drink?: DrinkSpec;
    scene?: SeatSceneObject[];
    hiddenItems?: string[];
}
export type SetInput = SetId | ({
    id: SetId;
} & Partial<SetPieces> & PodcastSetOptions);
export interface ResolvedPodcastSet {
    chair: PodcastChairId;
    micModel: PodcastMicId;
    micAdjust: {
        x: number;
        y: number;
        angle: number;
    };
    items: TableItemSpec[];
    drink?: DrinkSpec;
    scene: SeatSceneObject[];
}
export interface ResolvedSet {
    id: SetId;
    pieces: SetPieces;
    podcast: ResolvedPodcastSet;
}
