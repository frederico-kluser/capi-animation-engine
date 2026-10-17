import { type CharacterId } from '../../contracts/character.js';
import type { VoiceEmotion } from './emotion.js';
export declare const VOICE_TIERS: readonly ['top', 'good', 'avoid'];
export type VoiceTier = (typeof VOICE_TIERS)[number];
export type VoiceSource = 'builtin' | 'library';
export type VoiceGender = 'm' | 'f' | 'n';
export type VoiceAge = 'young' | 'middle' | 'old';
export interface VoiceScores {
    quality: number;
    emotion: number;
    wer: number;
    f0Hz: number;
    rangeSt: number;
    shiftSt: number;
    note?: string;
}
export interface CatalogVoice {
    id: string;
    voiceId: string;
    name: string;
    source: VoiceSource;
    gender: VoiceGender;
    age: VoiceAge;
    accent: 'pt-BR' | 'en-US' | 'en-GB' | 'en-AU';
    verifiedPt: boolean;
    timbre: string;
    use: string;
    fallback?: string;
    usageM?: number;
}
export declare const VOICE_CATALOG: readonly CatalogVoice[];
export declare const ELEVEN_BUILTIN_VOICE_IDS: readonly string[];
export declare const ELEVEN_LIBRARY_VOICE_IDS: readonly string[];
export declare const CATALOG_VOICE_IDS: readonly string[];
export declare function catalogVoice(id: string | undefined): CatalogVoice | undefined;
export declare const ELEVEN_VOICE_ID: RegExp;
export declare const isElevenVoiceId: (value: unknown) => value is string;
export declare function elevenApiVoice(id: string): string;
export declare function voiceDisplayName(id: string): string;
export declare const VOICE_SCORES: Readonly<Record<string, VoiceScores>>;
export declare const VOICE_SCORES_MEASURED: {
    readonly date: '2026-10-13';
    readonly model: 'openrouter/eleven-v4';
    readonly language: 'pt-BR';
};
export declare const VOICE_TIER_RULES: {
    readonly topQuality: 75;
    readonly avoidBelow: 50;
    readonly maxWer: 0.14;
    readonly emotiveFrom: 55;
};
export declare function voiceTier(id: string): VoiceTier;
export declare function voiceIsEmotive(id: string): boolean;
export declare const VOICE_TIER_LABELS: Readonly<Record<VoiceTier, string>>;
export declare const VOICE_GENDER_LABELS: Readonly<Record<VoiceGender, string>>;
export declare const VOICE_AGE_LABELS: Readonly<Record<VoiceAge, string>>;
export declare const VOICE_ACCENT_LABELS: Readonly<Record<CatalogVoice['accent'], string>>;
export declare const CHARACTER_VOICE_GENDER: Readonly<Record<CharacterId, VoiceGender>>;
export declare function voiceFitsCharacter(voice: Pick<CatalogVoice, 'gender'>, character: CharacterId): boolean;
export interface RatedVoice extends CatalogVoice {
    tier: VoiceTier;
    emotive: boolean;
    scores?: VoiceScores;
    characters: CharacterId[];
}
export declare function ratedVoices(): RatedVoice[];
export interface RecommendOptions {
    emotion?: VoiceEmotion;
    available?: readonly string[];
}
export declare function recommendedVoices(character: CharacterId, options?: RecommendOptions): RatedVoice[];
export declare const CHARACTER_DEFAULT_VOICE: Readonly<Record<CharacterId, string>>;
export declare function voiceHash(key: string): number;
export interface VaryOptions extends RecommendOptions {
    exclude?: readonly string[];
}
export declare function variedVoice(character: CharacterId, key: string | number, options?: VaryOptions): string | undefined;
export interface CharacterVoiceInput {
    character: CharacterId;
    explicit?: string | undefined;
    saved?: Partial<Record<CharacterId, string>> | undefined;
    vary?: {
        key: string | number;
        emotion?: VoiceEmotion;
        exclude?: readonly string[];
    } | undefined;
    available?: readonly string[] | undefined;
}
export interface CharacterVoice {
    voice?: string;
    from: 'explicit' | 'varied' | 'saved' | 'none';
}
export declare function characterVoice(input: CharacterVoiceInput): CharacterVoice;
export declare const ELEVEN_USD_PER_MILLION: Readonly<Record<string, number>>;
export declare function voiceCostUsd(model: string, chars: number): number | undefined;
export declare function emotionVoiceWarning(voice: string | undefined, emotion: VoiceEmotion | undefined): string | undefined;
