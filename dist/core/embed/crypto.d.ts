export declare const ENCRYPTED_MOVEMENT_FORMAT: 'capi-encrypted-movement';
export declare const ENCRYPTED_MOVEMENT_VERSION: 1;
export declare const ENCRYPTED_MOVEMENT_ALG: 'CAPI-CHA20-ARX1';
export interface EncryptedMovementEnvelope {
    format: typeof ENCRYPTED_MOVEMENT_FORMAT;
    version: typeof ENCRYPTED_MOVEMENT_VERSION;
    alg: typeof ENCRYPTED_MOVEMENT_ALG;
    iv: string;
    tag: string;
    payload: string;
}
export type DecryptMovementResult = {
    ok: true;
    data: unknown;
    encrypted: boolean;
} | {
    ok: false;
    problems: string[];
};
export declare function isEncryptedMovement(value: unknown): value is EncryptedMovementEnvelope;
export declare function encryptMovementData(data: unknown, seedHint?: string): EncryptedMovementEnvelope;
export declare function decryptMovementData(value: unknown): DecryptMovementResult;
export declare function unwrapMovementData<T = Record<string, unknown>>(value: unknown): T | null;
