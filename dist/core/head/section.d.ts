export interface SectionDims {
    width: number;
    height: number;
    radius: number;
    radiusBottom?: number | undefined;
    squircle?: number | undefined;
}
export interface SectionPoint {
    x: number;
    y: number;
    nx: number;
    ny: number;
}
export declare function isPlainSection(dims: SectionDims): boolean;
export declare function sectionRadii(dims: SectionDims): {
    top: number;
    bottom: number;
};
export declare const SECTION_CORNER_SEGMENTS = 32;
export declare function sectionOutline(dims: SectionDims, segments?: number): SectionPoint[];
export declare function sectionPoints(dims: SectionDims, segments?: number): Array<{
    x: number;
    y: number;
}>;
export declare function sectionNearest(dims: SectionDims, x: number, y: number): {
    x: number;
    y: number;
    nx: number;
    ny: number;
    distance: number;
    inside: boolean;
};
export declare function sectionSupport(dims: SectionDims, nx: number, ny: number): number;
