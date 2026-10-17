import type { SpeechLanguage } from '../speech/g2p.js';
import { type VoiceEmotion } from './emotion.js';
import { type Tone, type ToneId } from './tones.js';
export type TtsEngine = 'speech' | 'chat-audio' | 'realtime';
export type ModelStatus = 'current' | 'deprecated';
export type Steerability = 'high' | 'medium' | 'low' | 'none';
export type PaceStrategy = 'instructions' | 'hybrid' | 'speed';
export type ReasoningEffort = 'minimal' | 'low' | 'medium' | 'high' | 'xhigh';
export interface TtsModelInfo {
    id: string;
    label: string;
    engine: TtsEngine;
    status: ModelStatus;
    removalDate?: string;
    migrateTo?: string;
    aliasOf?: string;
    provider?: 'openrouter';
    apiModel?: string;
    audioTags?: boolean;
    languageCode?: boolean;
    voiceIds?: boolean;
    voices: readonly string[];
    defaultVoice: string;
    instructions: boolean;
    speedRange?: readonly [number, number];
    reasoning: boolean;
    steerability: Steerability;
    pace: PaceStrategy;
    truncation: 'low' | 'medium' | 'high';
    maxChars: number;
    price: string;
    notes: readonly string[];
    toneLimits?: Partial<Record<ToneId, string>>;
    rates?: Partial<Record<ToneId, number>>;
    inferred?: boolean;
}
export interface VoiceInfo {
    id: string;
    f0Hz: number;
    pitchRangeSt: number;
    pitch: 'grave' | 'media' | 'aguda';
    expressiveness: 'contida' | 'media' | 'expressiva';
    recommended: boolean;
    description?: string;
    gender?: 'm' | 'f' | 'n';
}
export declare const ELEVEN_VOICE_IDS: readonly string[];
export declare const VOICES: Readonly<Record<string, VoiceInfo>>;
export declare const ALL_VOICE_IDS: readonly string[];
export declare const MAI_VOICE_IDS: readonly string[];
export declare const ELEVEN_TONE_TAGS: Readonly<Record<ToneId, string>>;
export declare const TTS_MODELS: readonly TtsModelInfo[];
export declare const KNOWN_VOICE_IDS: readonly string[];
export interface TranscribeModelInfo {
    id: string;
    note: string;
    wordTimes?: boolean;
}
export declare const TRANSCRIBE_MODELS: readonly TranscribeModelInfo[];
export declare const DEFAULT_AUDIO_TRANSCRIBE_MODELS: readonly string[];
export declare const WORD_TIMES_MODEL = "openrouter/whisper-1";
export declare const transcribeModel: (id: string) => TranscribeModelInfo | undefined;
export declare function ttsModel(id: string): TtsModelInfo | undefined;
export declare function effectiveModel(info: TtsModelInfo): TtsModelInfo;
export declare function nearestVoice(model: TtsModelInfo, wanted: string): string;
export declare function checkVoice(model: TtsModelInfo, voice: string): {
    ok: true;
} | {
    ok: false;
    suggestion: string;
    message: string;
};
export declare function toneVoice(model: TtsModelInfo, tone: Tone): string;
export type ToneLevel = 'full' | 'partial' | 'pace' | 'none';
export interface ToneSupport {
    level: ToneLevel;
    via: readonly ('instructions' | 'tags' | 'speed' | 'voice')[];
    note: string;
}
export declare function toneSupport(modelInfo: TtsModelInfo, tone: Tone, emotion?: VoiceEmotion): ToneSupport;
export interface DeliveryInput {
    model: string;
    tone: Tone;
    voice?: string;
    extraInstructions?: string;
    language?: SpeechLanguage;
    speed?: number;
    reasoningEffort?: ReasoningEffort;
    emotion?: VoiceEmotion;
}
export interface DeliveryPlan {
    model: TtsModelInfo;
    voice: string;
    instructions?: string;
    speed?: number;
    tag?: string;
    languageCode?: string;
    reasoningEffort?: ReasoningEffort;
    emotion?: VoiceEmotion;
    support: ToneSupport;
    warnings: string[];
}
export declare function planDelivery(input: DeliveryInput): DeliveryPlan;
export declare const DEFAULT_TTS_MODELS: readonly string[];
export declare const DEFAULT_TRANSCRIBE_MODELS: readonly string[];
export interface VoiceForModel extends VoiceInfo {
    firstChoiceOf: string[];
}
export declare function voicesForModel(modelInfo: TtsModelInfo): VoiceForModel[];
export interface ToneForModel {
    id: string;
    label: string;
    energy: number;
    pace: number;
    voice: string;
    speed?: number;
    support: ToneSupport;
}
export declare function tonesForModel(modelInfo: TtsModelInfo): ToneForModel[];
