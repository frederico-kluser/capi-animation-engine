import type { Phone, WordPhones } from '../../contracts/talk.js';
export declare const SR = 24000;
export interface TruthPhone {
    word: number;
    phone: number;
    ph: string;
    cls: Phone['cls'];
    startMs: number;
    endMs: number;
}
export interface Synth {
    samples: Float32Array;
    sampleRate: number;
    truth: TruthPhone[];
    words: {
        startMs: number;
        endMs: number;
    }[];
    durationMs: number;
}
export declare function phoneDurationMs(phone: Phone): number;
export interface SynthOptions {
    pauseMs: (wordIndex: number) => number;
    leadMs?: number;
    tailMs?: number;
    rate?: number;
    gain?: number;
    wordGain?: (wordIndex: number) => number;
    wordRate?: (wordIndex: number) => number;
    wordPitch?: (wordIndex: number) => number;
    f0?: number;
    seed?: number;
}
export declare function synthesizeSpeech(phones: readonly WordPhones[], options: SynthOptions): Synth;
