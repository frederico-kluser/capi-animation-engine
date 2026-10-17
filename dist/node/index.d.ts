export interface ContactSheetCell {
    id: string;
    label: string;
    svg: string;
}
export interface ContactSheetOptions {
    title?: string;
    columns?: number;
}
export declare function buildContactSheetHtml(cells: readonly ContactSheetCell[], options?: ContactSheetOptions): string;
export interface WriteContactSheetResult {
    htmlPath: string;
    svgPaths: readonly string[];
}
export declare function writeContactSheet(outDir: string, cells: readonly ContactSheetCell[], options?: ContactSheetOptions): WriteContactSheetResult;
export declare function writeSvgFile(filePath: string, svg: string): void;
