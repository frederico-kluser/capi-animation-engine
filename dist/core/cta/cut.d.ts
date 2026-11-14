export interface TimedWord {
    startMs: number;
    endMs: number;
}
export interface CtaWindow {
    fromMs: number;
    toMs: number;
}
export declare const CTA_ONSET_LEAD_MS = 300;
export declare function ctaWindowOfWords(words: readonly TimedWord[], range: {
    from: number;
    to: number;
}, durationMs: number): CtaWindow | null;
export interface TurnTimes {
    id?: string;
    atMs: number;
    words: readonly TimedWord[];
}
export declare function ctaWindowOfTurns(turns: readonly TurnTimes[], ids: readonly string[], durationMs: number): CtaWindow | null;
export interface CtaSkip {
    fromFrame: number;
    toFrame: number;
    atMs: number;
    spanMs: number;
}
export declare function skipOf(window: CtaWindow, fps: number, frames: number): CtaSkip | null;
export declare function cutSamples(samples: Float32Array, sampleRate: number, fps: number, skip: Pick<CtaSkip, 'fromFrame' | 'toFrame'>, fadeMs?: number): Float32Array;
export interface CaptionWordLike {
    fromMs: number;
    toMs: number;
}
export declare function cutCaptionWords<T extends CaptionWordLike>(words: readonly T[], skip: Pick<CtaSkip, 'atMs' | 'spanMs'>): T[];
