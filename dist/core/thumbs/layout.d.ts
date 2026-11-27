import type { ThumbAspect, ThumbLayout } from '../../contracts/thumbs.js';
export interface ThumbBox {
    x: number;
    y: number;
    w: number;
    h: number;
}
export type ThumbShot = 'close' | 'bust';
export interface ThumbSlot extends ThumbBox {
    shot: ThumbShot;
}
export interface ThumbGeometry {
    text: ThumbBox & {
        align: 'left' | 'center' | 'right';
        maxLines: number;
        maxSize: number;
    };
    cast: ThumbSlot[];
    panel?: ThumbBox;
    sides?: [ThumbBox, ThumbBox];
    solo?: ThumbSlot;
    accent?: {
        x: number;
        y: number;
        size: number;
    };
    scrim: 'left' | 'right' | 'top' | 'bottom' | 'none';
    textRight: boolean;
}
export declare const THUMB_TIMESTAMP_ZONE: ThumbBox;
export declare const THUMB_SHORT_CORE: ThumbBox;
export declare const THUMB_SERIES_BADGE: Record<ThumbAspect, {
    x: number;
    y: number;
    size: number;
}>;
export declare function thumbGeometry(layout: ThumbLayout, aspect: ThumbAspect, flip?: boolean, options?: {
    series?: boolean;
    cast?: number;
}): ThumbGeometry;
export declare function castSlotOf(geo: ThumbGeometry, index: number, count: number): ThumbSlot;
export declare function isLateral(layout: ThumbLayout, aspect: ThumbAspect): boolean;
