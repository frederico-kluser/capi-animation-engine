import type { ThumbCrop } from '../../contracts/thumbs.js';
import type { ThumbShot } from './layout.js';
export declare const THUMB_HEAD_HALF: {
    readonly x: 185;
    readonly top: 200;
    readonly bottom: 175;
};
export declare const THUMB_WAIST = 800;
export declare const THUMB_CROP_MARGIN = 36;
export declare function poseContentBox(pose: string, shot: ThumbShot): ThumbCrop;
export declare function mirrorCrop(box: ThumbCrop): ThumbCrop;
export declare function thumbCrop(pose: string, shot: ThumbShot, aspect: number, mirror?: boolean): ThumbCrop;
export declare function poseHeadCenter(pose: string, mirror?: boolean): {
    x: number;
    y: number;
};
export declare function keepHeadInside(slot: {
    x: number;
    y: number;
    w: number;
    h: number;
}, crop: ThumbCrop, head: {
    x: number;
    y: number;
}, margin?: number): {
    x: number;
    y: number;
    w: number;
    h: number;
};
export declare function cropViewBox(crop: ThumbCrop): string;
