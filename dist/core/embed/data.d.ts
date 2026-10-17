import { type EmbedBackground, type EmbedData, type EmbedKind } from '../../contracts/embed.js';
import { ENCRYPTED_MOVEMENT_ALG, ENCRYPTED_MOVEMENT_FORMAT, ENCRYPTED_MOVEMENT_VERSION, decryptMovementData, encryptMovementData, isEncryptedMovement, unwrapMovementData, type DecryptMovementResult, type EncryptedMovementEnvelope } from './crypto.js';
export { ENCRYPTED_MOVEMENT_ALG, ENCRYPTED_MOVEMENT_FORMAT, ENCRYPTED_MOVEMENT_VERSION, decryptMovementData, encryptMovementData, isEncryptedMovement, unwrapMovementData, type DecryptMovementResult, type EncryptedMovementEnvelope, };
export declare const EMBED_PLAYER_DEFAULTS: {
    readonly fps: 60;
    readonly seekStepMs: 5000;
    readonly seekShortStepMs: 1000;
    readonly volumeStep: 0.1;
    readonly restartWindowMs: 10;
};
export type EmbedDataCheck = {
    ok: true;
    data: EmbedData;
} | {
    ok: false;
    problems: string[];
};
export declare const isEmbedKind: (value: unknown) => value is EmbedKind;
export declare function readEmbedData(rawValue: unknown): EmbedDataCheck;
export declare function isKnownEmbedBackground(background: unknown): background is EmbedBackground;
export declare function embedUrl(src: string, baseUrl?: string): string;
export declare function embedBaseOf(dataUrl: string): string;
export declare function embedFrameCount(durationMs: number, fps: number): number;
export declare function embedFrameAt(timeMs: number, durationMs: number, fps: number): number;
export declare const embedFrameMs: (frame: number, fps: number) => number;
export declare function stageFit(box: {
    width: number;
    height: number;
}, format: {
    width: number;
    height: number;
}): {
    scale: number;
    x: number;
    y: number;
} | null;
export declare function embedClockText(ms: number): string;
export declare function embedSeekTarget(nowMs: number, stepMs: number, durationMs: number): number;
export declare function reviewSubtitlesShown(saved: {
    video?: boolean;
    commentary?: boolean;
} | undefined, on: boolean): {
    video: boolean;
    commentary: boolean;
};
