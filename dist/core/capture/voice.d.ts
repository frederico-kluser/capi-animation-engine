export interface VoiceFeatures {
    db: number;
    low: number;
    mid: number;
    high: number;
    hiss: number;
    centroid: number;
    zcr: number;
}
export declare function analyzeVoiceFrame(samples: ArrayLike<number>, sampleRate: number): VoiceFeatures;
export interface VoiceMouthOptions {
    sensitivity?: number;
    gateDb?: number;
}
export interface VoiceMouthState {
    open: number;
    round: number;
    wide: number;
    active: boolean;
    level: number;
    floorDb: number;
    peakDb: number;
}
export declare class VoiceMouth {
    private floor;
    private peak;
    private open;
    private round;
    private wide;
    private active;
    private last;
    private readonly sensitivity;
    private readonly gateDb;
    constructor(options?: VoiceMouthOptions);
    push(features: VoiceFeatures, timeMs: number): VoiceMouthState;
    reset(): void;
}
