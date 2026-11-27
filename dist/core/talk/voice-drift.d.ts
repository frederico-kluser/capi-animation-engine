import { type SpeechLanguage } from '../speech/g2p.js';
export interface VoiceClipMeasure {
    durationMs: number;
    speechMs: number;
    voicedMs: number;
    f0Hz: number;
    rangeSt: number;
    syllablesPerSecond?: number;
    mfcc: number[];
}
export interface VoiceProfile {
    voice: string;
    clips: number;
    f0Hz: number;
    syllablesPerSecond: number;
    mfcc: number[];
    mfccSd: number[];
}
export declare const DRIFT_RULES: {
    readonly minVoicedMs: 600;
    readonly minProfileClips: 6;
    readonly mfccSdFloor: 0.6;
    readonly defaultMfccSd: readonly number[];
    readonly strongLowSt: -3;
    readonly strongLowMfccZ: 1.5;
    readonly strongMfccZ: 1.9;
    readonly strongMfccLowSt: -1.5;
    readonly suspectLowSt: -3;
    readonly suspectHighSt: 5;
    readonly suspectMfccZ: 2.2;
    readonly suspectRateLow: 0.6;
    readonly suspectRateHigh: 1.6;
    readonly shortLineWords: 8;
    readonly judgeBackingMfccZ: 1.3;
    readonly judgeBackingSt: 2;
};
export declare function measureVoiceClip(samples: Float32Array, sampleRate: number, text?: string, language?: SpeechLanguage): VoiceClipMeasure;
export declare function voiceProfile(voice: string, measures: readonly VoiceClipMeasure[]): VoiceProfile | undefined;
export interface LocalDrift {
    f0St: number;
    rateRatio?: number;
    mfccZ?: number;
    strong: boolean;
    suspect: boolean;
    reasons: string[];
}
export declare function localDrift(m: VoiceClipMeasure, profile: VoiceProfile): LocalDrift;
export declare function riskyLine(text: string): {
    risky: boolean;
    why: string[];
};
export interface JudgeVerdict {
    sameVoice: number;
    accent: 'pt-BR' | 'pt-PT' | 'estrangeiro' | 'outra-lingua' | string;
    accentConfidence: number;
    english: boolean;
    sameAccent?: boolean;
    transcript?: string;
    problems?: string;
}
export interface DriftEvidence {
    generationSwitch?: {
        from: string;
        to: string;
    };
    local?: LocalDrift;
    language?: string;
    judge?: JudgeVerdict;
}
export interface DriftVerdict {
    drift: boolean;
    reasons: string[];
}
export declare const isPortugueseLanguage: (language: string | undefined) => boolean;
export declare function driftVerdict(evidence: DriftEvidence): DriftVerdict;
