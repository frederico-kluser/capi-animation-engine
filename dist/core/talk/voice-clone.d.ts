export declare const CLONE_VOICE_PREFIX = "clone:";
export declare const CLONE_SLUG_PATTERN: RegExp;
export declare const CLONE_FOLDER = "voice-clones";
export declare function isCloneVoiceId(value: unknown): value is string;
export declare function cloneSlugOf(voice: string | undefined): string | undefined;
export declare function cloneVoiceId(slug: string): string;
export declare function cloneSlugProblem(slug: unknown): string | undefined;
export declare function cloneSlug(name: string, taken?: Iterable<string>): string;
export declare function cloneDisplayName(voice: string, name?: string): string;
export declare const CLONE_MODEL_FAMILIES: Readonly<Record<'fish' | 'heygen' | 'seed', readonly string[]>>;
export declare const DEFAULT_CLONE_TTS_MODEL = "openrouter/fish-s2.1-pro";
export declare const CLONE_MODEL_CHOICES: readonly string[];
export declare function cloneFamilyOf(model: string): keyof typeof CLONE_MODEL_FAMILIES | undefined;
export declare function cloneModelChain(preferred?: string): string[];
export declare const CLONE_TARGETS: readonly ['short', 'medium', 'long'];
export type CloneTarget = (typeof CLONE_TARGETS)[number];
export declare const isCloneTarget: (value: unknown) => value is CloneTarget;
export declare const CLONE_TARGET_MS: Readonly<Record<CloneTarget, number>>;
export declare const CLONE_TARGET_LABELS: Readonly<Record<CloneTarget, string>>;
export declare const CLONE_LIMITS: {
    readonly files: 8;
    readonly fileBytes: number;
    readonly fileSeconds: 600;
    readonly referenceMaxMs: 40000;
    readonly minSpeechMs: 4000;
    readonly transcriptChars: 4000;
    readonly name: 40;
    readonly testChars: 400;
};
export type CloneGender = 'm' | 'f' | 'n';
export interface VoiceCloneReference {
    file: string;
    text: string;
    durationMs: number;
    sampleRate: number;
}
export interface VoiceCloneSource {
    name: string;
    durationMs: number;
    usedMs: number;
    snrDb: number;
}
export interface VoiceCloneQuality {
    score: number;
    label: 'excellent' | 'good' | 'fair' | 'poor';
    snrDb: number;
    speechMs: number;
    f0Hz?: number;
    rangeSt?: number;
}
export interface VoiceCloneSpec {
    id: string;
    name: string;
    model: string;
    language: string;
    gender?: CloneGender;
    reference: VoiceCloneReference;
    quality?: VoiceCloneQuality;
    sources?: VoiceCloneSource[];
    cleaning?: string[];
    persona?: string;
    consent: boolean;
    revision: string;
    createdAt: string;
    updatedAt: string;
}
export interface VoiceCloneCheck {
    clone: VoiceCloneSpec | null;
    errors: string[];
}
export declare function parseVoiceClone(raw: unknown, where?: string): VoiceCloneCheck;
export declare function describeVoiceClone(clone: VoiceCloneSpec, modelLabel?: string): string;
