export interface FrameBox {
    x: number;
    y: number;
    width: number;
    height: number;
}
export type FrameAspect = number | string | {
    width: number;
    height: number;
};
export declare function aspectRatio(aspect: FrameAspect): number;
export declare function frameBox(aspect: FrameAspect): FrameBox;
export declare function frameViewBox(aspect: FrameAspect): string;
