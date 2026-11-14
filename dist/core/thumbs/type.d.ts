export declare const THUMB_FONT = "'CapiThumb', Anton, Impact, 'Arial Black', 'Segoe UI Black', system-ui, sans-serif";
export declare const THUMB_FONT_METRICS: {
    readonly capHeight: 0.859;
    readonly lineHeight: 1.04;
};
export declare const THUMB_FONT_WIDTHS: ReadonlyMap<string, number>;
export declare function thumbTextEm(text: string, letterSpacingEm?: number): number;
export interface ThumbTextFit {
    size: number;
    lines: string[];
}
export declare function fitThumbText(text: string, width: number, height: number, maxLines: number, maxSize: number, minSize?: number): ThumbTextFit;
