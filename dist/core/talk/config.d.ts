import { type PodcastAspectId, type TalkAspectId } from '../../contracts/aspects.js';
import { type CatalogDetail } from '../../contracts/catalog.js';
import { type CameraStyle } from '../../contracts/camera.js';
import { type CaptionStyleId } from '../../contracts/captions.js';
import { type CharacterId } from '../../contracts/character.js';
import { type Outfit, type OutfitPresetId, type OutfitSlot } from '../../contracts/outfit.js';
import { type VideoProfileId } from '../../contracts/profile.js';
import { type ReviewVideoFraming } from '../../contracts/review.js';
import type { SpeechLanguage } from '../speech/g2p.js';
import { type VoiceEmotion } from './emotion.js';
import { type ReasoningEffort } from './tts-models.js';
export type PlannerEffort = 'max' | 'xhigh' | 'high' | 'medium' | 'low' | 'none';
export declare const CAPTION_STYLE_CHOICES: readonly ["auto", "off", "lines", "karaoke"];
export type CaptionStyleChoice = (typeof CAPTION_STYLE_CHOICES)[number];
export type TalkAspectChoice = '16:9' | '9:16' | '1:1' | '4:5' | 'native';
export type ProviderSort = 'throughput' | 'price' | 'latency';
export type Quantization = 'int4' | 'int8' | 'fp4' | 'mxfp4' | 'nvfp4' | 'fp6' | 'fp8' | 'mxfp8' | 'fp16' | 'bf16' | 'fp32' | 'unknown';
export interface TalkConfig {
    tts: {
        models: string[];
        voice?: string;
        voices?: Partial<Record<CharacterId, string>>;
        emotion?: VoiceEmotion;
        vary?: boolean;
        speed?: number;
        reasoningEffort: ReasoningEffort;
        hedge: number;
        rounds: number;
        verify: {
            enabled: boolean;
            models: string[];
            maxWer: number;
        };
    };
    planner: {
        model: string;
        effort: PlannerEffort;
        mode: 'parallel' | 'after-audio';
        samples?: number;
        repairRounds: number;
        maxTokens: number;
        temperature?: number;
        provider: {
            order: string[];
            only: string[];
            ignore: string[];
            quantizations: Quantization[];
            sort?: ProviderSort;
            allowFallbacks: boolean;
            requireParameters: boolean;
        };
    };
    aspects: {
        samples: number;
        repairRounds: number;
        concurrency: number;
        talk: TalkAspectId[];
        podcast: PodcastAspectId[];
        catalog: CatalogDetail;
    };
    camera: {
        style: CameraStyle;
        zooms: boolean;
    };
    defaults: {
        tone: string;
        language: 'auto' | SpeechLanguage;
        aspect?: TalkAspectChoice;
        fps?: number;
        seed?: number;
    };
    outfit: Outfit;
    character: CharacterId;
    profile: VideoProfileId;
    captions: {
        style: CaptionStyleChoice;
    };
    transcribe: {
        models: string[];
        wordTimes: boolean;
        prompt?: string;
        verifyGiven: boolean;
    };
    review: ReviewConfig;
}
export declare const REVIEW_DENSITIES: readonly ['light', 'normal', 'heavy'];
export type ReviewDensity = (typeof REVIEW_DENSITIES)[number];
export declare const REVIEW_ATTACH_VIDEO: readonly ['auto', 'always', 'never'];
export type ReviewAttachVideo = (typeof REVIEW_ATTACH_VIDEO)[number];
export declare const REVIEW_DURING_VIDEO: readonly ["stage", "tv", "auto"];
export declare const REVIEW_STT_PROVIDERS: readonly ['openrouter', 'openai'];
export type ReviewSttProvider = (typeof REVIEW_STT_PROVIDERS)[number];
export interface ReviewConfig {
    model?: string;
    providers: {
        order: string[];
        ignore: string[];
    };
    analysis: {
        effort: PlannerEffort;
        chunkMinutes: number;
        proxyHeight: number;
        proxyFps: number;
        maxProxyMb: number;
        samples: number;
    };
    writer: {
        effort: PlannerEffort;
        samples: number;
        density: ReviewDensity;
        attachVideo: ReviewAttachVideo;
    };
    stt: {
        provider: ReviewSttProvider;
        model: string;
        language: string;
    };
    audio: {
        videoGainDb: number | 'auto';
        duckDb: number;
        targetLufs: number | 'off';
    };
    camera: {
        duringVideo: ReviewVideoFraming;
    };
    subtitles: {
        video: boolean;
        commentary: boolean;
    };
    maxVideoMinutes: number;
}
export type PartialTalkConfig = {
    [K in keyof TalkConfig]?: TalkConfig[K] extends object ? {
        [P in keyof TalkConfig[K]]?: TalkConfig[K][P] extends object ? Partial<TalkConfig[K][P]> : TalkConfig[K][P];
    } : TalkConfig[K];
};
export declare const DEFAULT_CONFIG: TalkConfig;
export declare function describeReviewConfig(c: Pick<TalkConfig, 'planner' | 'review'>): string;
export declare function mergeConfig(base: TalkConfig, ...layers: readonly PartialTalkConfig[]): TalkConfig;
export interface ConfigCheck {
    config: PartialTalkConfig;
    errors: string[];
    warnings: string[];
}
export declare const CONFIG_ENUMS: {
    readonly effort: readonly ['max', 'xhigh', 'high', 'medium', 'low', 'none'];
    readonly reasoning: readonly ['minimal', 'low', 'medium', 'high', 'xhigh'];
    readonly mode: readonly ['parallel', 'after-audio'];
    readonly sort: readonly ['throughput', 'price', 'latency'];
    readonly language: readonly ['auto', 'pt-BR', 'pt-PT', 'generic'];
    readonly aspect: readonly ['16:9', '9:16', '1:1', '4:5', 'native'];
    readonly quantization: readonly ['int4', 'int8', 'fp4', 'mxfp4', 'nvfp4', 'fp6', 'fp8', 'mxfp8', 'fp16', 'bf16', 'fp32', 'unknown'];
    readonly cameraStyle: readonly ["calm", "interview", "dynamic", "live", "cinematic"];
    readonly catalogDetail: readonly ["brief", "full"];
    readonly profile: readonly ["video", "short"];
    readonly captionStyle: readonly ["auto", "off", "lines", "karaoke"];
    readonly voiceEmotion: readonly ["on", "off"];
    readonly talkAspect: readonly ["gestures", "face", "camera"];
    readonly podcastAspect: readonly ["gestures-host", "gestures-guest", "expressions", "interactions", "actions", "camera"];
    readonly reviewDensity: readonly ["light", "normal", "heavy"];
    readonly reviewAttachVideo: readonly ["auto", "always", "never"];
    readonly reviewDuringVideo: readonly ["stage", "tv", "auto"];
    readonly reviewSttProvider: readonly ["openrouter", "openai"];
};
export declare const REVIEW_CONFIG_KEYS: {
    readonly analysis: readonly ['effort', 'chunkMinutes', 'proxyHeight', 'proxyFps', 'maxProxyMb', 'samples'];
    readonly writer: readonly ['effort', 'samples', 'density', 'attachVideo'];
    readonly stt: readonly ['provider', 'model', 'language'];
    readonly audio: readonly ['videoGainDb', 'duckDb', 'targetLufs'];
    readonly camera: readonly ['duringVideo'];
    readonly providers: readonly ['order', 'ignore'];
    readonly subtitles: readonly ['video', 'commentary'];
};
export declare const REVIEW_CONFIG_LIMITS: {
    readonly chunkMinutes: {
        readonly min: 1;
        readonly max: 20;
    };
    readonly proxyHeight: {
        readonly min: 144;
        readonly max: 720;
    };
    readonly proxyFps: {
        readonly min: 1;
        readonly max: 30;
    };
    readonly maxProxyMb: {
        readonly min: 5;
        readonly max: 100;
    };
    readonly analysisSamples: {
        readonly min: 1;
        readonly max: 4;
    };
    readonly writerSamples: {
        readonly min: 1;
        readonly max: 8;
    };
    readonly videoGainDb: {
        readonly min: -30;
        readonly max: 12;
    };
    readonly duckDb: {
        readonly min: -40;
        readonly max: 0;
    };
    readonly targetLufs: {
        readonly min: -30;
        readonly max: -8;
    };
    readonly maxVideoMinutes: {
        readonly min: 1;
        readonly max: 60;
    };
};
export declare const REVIEW_STT_LANGUAGE: RegExp;
export declare const REVIEW_PROVIDER_SLUG: RegExp;
export declare const REVIEW_STT_MODEL: RegExp;
export declare function validateConfig(raw: unknown, origin?: string): ConfigCheck;
export declare const MAX_TRANSCRIBE_PROMPT = 600;
export { isOutfitValue, outfitChoices, outfitPresetChoices, outfitPresetProblem, outfitProblem } from '../outfit.js';
export declare function presetShadowed(preset: OutfitPresetId, raw: Readonly<Record<string, unknown>>): OutfitSlot[];
export declare function describeOutfit(input: Partial<Outfit> | undefined): string;
export declare function characterChoices(): string;
export declare function characterProblem(value: unknown, field?: string): string | undefined;
export declare function describeCharacter(input: unknown): string;
export declare const VIDEO_PROFILE_LABELS: Readonly<Record<VideoProfileId, string>>;
export declare const CAPTION_STYLE_LABELS: Readonly<Record<CaptionStyleChoice, string>>;
export declare function profileChoices(): string;
export declare function profileProblem(value: unknown, field?: string): string | undefined;
export declare function isCaptionStyleChoice(value: unknown): value is CaptionStyleChoice;
export declare function captionStyleProblem(value: unknown, field?: string): string | undefined;
export declare function captionStyleFor(profile: VideoProfileId, asked?: CaptionStyleChoice): CaptionStyleId;
export declare function profileAspect(profile: VideoProfileId, fallback?: TalkAspectChoice): TalkAspectChoice;
export declare function cameraStyleFor(profile: VideoProfileId, configured: CameraStyle, pinned?: CameraStyle): CameraStyle;
export declare function describeProfile(input: unknown, captions?: CaptionStyleChoice): string;
export declare const TALK_ASPECT_LABELS: Readonly<Record<TalkAspectId, string>>;
export declare const CAMERA_STYLE_LABELS: Readonly<Record<CameraStyle, string>>;
export declare function describeAspects(c: Partial<Pick<TalkConfig, 'aspects' | 'camera'>> & {
    planner?: {
        samples?: number | undefined;
    };
}): string;
export declare function describeProfileSuffix(c: Partial<Pick<TalkConfig, 'profile' | 'captions'>>): string;
export declare function describeVoiceChoices(tts: Pick<TalkConfig['tts'], 'emotion' | 'vary'>): string;
export declare function describeSavedVoices(voices: Partial<Record<CharacterId, string>> | undefined): string;
export declare function describeConfig(c: TalkConfig): string;
