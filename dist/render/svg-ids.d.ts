export interface AnchorIdFactory {
    (local: string): string;
    readonly prefix: string;
}
export declare function sanitizeIdPrefix(raw: string): string;
export declare function createIdFactory(prefix: string): AnchorIdFactory;
