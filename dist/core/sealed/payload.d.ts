export declare const SEALED_PAYLOAD: {
    readonly magic: readonly [73, 65, 83];
    readonly version: 1;
};
export declare const SEALED_SECTION: {
    readonly scene: 1;
    readonly frames: 2;
    readonly audio: 3;
    readonly asset: 4;
};
export interface PayloadSection {
    type: number;
    bytes: Uint8Array;
}
export declare function fnv1a(bytes: Uint8Array): number;
export declare function buildPayload(sections: readonly PayloadSection[]): Uint8Array;
export declare function readPayload(payload: Uint8Array): PayloadSection[];
export declare function toBase64(bytes: Uint8Array): string;
export declare function fromBase64(text: string): Uint8Array;
