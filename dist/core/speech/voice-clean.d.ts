export declare const VOICE_CLEAN_DEFAULTS: {
    readonly highpassHz: 60;
    readonly targetLufs: -20;
    readonly ceilingDb: -1.5;
    readonly joinGapMs: 400;
    readonly fadeMs: 8;
    readonly utteranceGapMs: 250;
    readonly utteranceMinMs: 600;
    readonly utteranceMaxMs: 12000;
};
export declare const VOICE_CLEAN_STRENGTHS: readonly ['auto', 'strong', 'light'];
export type VoiceCleanStrength = (typeof VOICE_CLEAN_STRENGTHS)[number];
export declare const isVoiceCleanStrength: (value: unknown) => value is VoiceCleanStrength;
export declare function highpass(samples: Float32Array, sr: number, hz?: number): Float32Array;
export declare function notchFrequencies(samples: Float32Array, sr: number, freqs: readonly number[], q?: number): Float32Array;
export declare function frameLevels(samples: Float32Array, sr: number, frameMs?: number, hopMs?: number): Float32Array;
export interface SpeechMap {
    hopMs: number;
    db: Float32Array;
    speech: Uint8Array;
    floorDb: number;
    peakDb: number;
    onDb: number;
    offDb: number;
}
export interface SpeechOptions {
    hopMs?: number;
    hangoverMs?: number;
    leadMs?: number;
    minSpeechMs?: number;
    minPauseMs?: number;
}
export declare function detectSpeech(samples: Float32Array, sr: number, options?: SpeechOptions): SpeechMap;
export interface TimeSpan {
    startMs: number;
    endMs: number;
}
export declare function speechSpans(map: SpeechMap): TimeSpan[];
export interface ClippingInfo {
    peak: number;
    clipped: number;
    pct: number;
    runs: number;
    level?: number;
}
export declare function detectClipping(samples: Float32Array): ClippingInfo;
export declare function clippedPctIn(samples: Float32Array, sr: number, info: Pick<ClippingInfo, 'level'>, startMs: number, endMs: number): number;
export declare function levelDb(samples: Float32Array, sr: number): number;
export declare function peakDb(samples: Float32Array): number;
export declare function pauseAudio(samples: Float32Array, sr: number, map: SpeechMap, maxMs: number, minRunMs?: number): Float32Array;
export interface HumInfo {
    hz: 50 | 60 | null;
    harmonics: number[];
    strengthDb: number;
}
export declare function detectHum(samples: Float32Array, sr: number, map: SpeechMap): HumInfo;
export declare function humOf(signal: Float32Array, sr: number): HumInfo;
export declare function stftSize(sr: number): number;
export declare function estimateBandwidth(samples: Float32Array, sr: number, map: SpeechMap): number;
export declare function integratedLoudness(samples: Float32Array, sr: number): number;
export interface NoiseProfile {
    size: number;
    psd: Float64Array;
    from: 'pauses' | 'minima';
    frames: number;
}
export declare function noiseProfileOf(noise: Float32Array, sr: number): NoiseProfile | null;
export declare function noiseProfileByMinima(samples: Float32Array, sr: number): NoiseProfile;
export declare function denoise(samples: Float32Array, profile: NoiseProfile, reductionDb: number): Float32Array;
export declare function applyGain(samples: Float32Array, db: number): Float32Array;
export declare function limitPeaks(samples: Float32Array, sr: number, ceilingDb?: number, lookaheadMs?: number, releaseMs?: number): Float32Array;
export declare function normalizeLoudness(samples: Float32Array, sr: number, targetLufs?: number, ceilingDb?: number): {
    samples: Float32Array;
    gainDb: number;
    limitedDb: number;
    lufs: number;
};
export interface Utterance extends TimeSpan {
    file: number;
    durationMs: number;
    snrDb: number;
    clippedPct: number;
    score: number;
}
export declare function utteranceScore(snrDb: number, durationMs: number, clippedPct: number): number;
export interface UtteranceOptions {
    gapMs?: number;
    minMs?: number;
    maxMs?: number;
}
export declare function utterancesOf(map: SpeechMap, file: number, noiseDb: number, clippedAt: (startMs: number, endMs: number) => number, options?: UtteranceOptions): Utterance[];
export declare function selectUtterances(all: readonly Utterance[], targetMs: number, maxMs: number): Utterance[];
export declare function joinClips(clips: readonly Float32Array[], sr: number, gapsMs: readonly number[], fadeMs?: number): Float32Array;
export interface VoiceAudioMeasure {
    durationMs: number;
    speechMs: number;
    noiseDb: number;
    speechDb: number;
    snrDb: number;
    peakDb: number;
    lufs: number;
    clippedPct: number;
    clipRuns: number;
    humHz: 50 | 60 | null;
    humHarmonics: number[];
    bandwidthHz: number;
}
export declare function measureVoiceAudio(samples: Float32Array, sr: number, map?: SpeechMap): VoiceAudioMeasure;
export interface PitchInfo {
    f0Hz: number;
    rangeSt: number;
}
export declare function voicePitch(samples: Float32Array, sr: number): PitchInfo | null;
export interface CleanStep {
    id: 'declip' | 'declick' | 'highpass' | 'hum' | 'denoise' | 'select' | 'loudness' | 'limit';
    label: string;
    detail: string;
}
export interface CleanPlan {
    highpassHz: number;
    notchHz: number[];
    reductionDb: number;
    declip: boolean;
    declick: boolean;
    steps: CleanStep[];
}
export declare function reductionFor(snrDb: number, strength: VoiceCleanStrength): number;
export declare function cleaningPlan(measure: VoiceAudioMeasure, strength?: VoiceCleanStrength): CleanPlan;
export declare function cleanRegion(samples: Float32Array, sr: number, plan: Pick<CleanPlan, 'highpassHz' | 'notchHz' | 'reductionDb'>, profile: NoiseProfile | null): Float32Array;
export declare function prefilter(samples: Float32Array, sr: number, plan: Pick<CleanPlan, 'highpassHz' | 'notchHz'>): Float32Array;
export type ReferenceLabel = 'excellent' | 'good' | 'fair' | 'poor';
export declare const REFERENCE_LABELS: Readonly<Record<ReferenceLabel, string>>;
export interface ReferenceQuality {
    score: number;
    label: ReferenceLabel;
    warnings: string[];
    tips: string[];
}
export declare function referenceQuality(measure: Pick<VoiceAudioMeasure, 'snrDb' | 'speechMs' | 'clippedPct' | 'bandwidthHz'>, pitch: PitchInfo | null, targetMs: number, originalClippedPct?: number): ReferenceQuality;
export declare function genderFromPitch(pitch: PitchInfo | null): 'm' | 'f' | undefined;
export declare function mixToMono(channels: readonly Float32Array[]): {
    samples: Float32Array;
    mode: 'mono' | 'average' | 'left' | 'right';
};
