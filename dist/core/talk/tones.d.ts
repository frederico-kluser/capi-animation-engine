import type { ExpressionId } from '../../contracts/face.js';
export type ToneId = 'friendly' | 'excited' | 'calm' | 'serious' | 'authoritative' | 'dramatic' | 'playful' | 'curious' | 'news' | 'sad' | 'whisper' | 'angry' | 'storyteller' | 'motivational';
export interface Tone {
    id: ToneId | 'custom';
    label: string;
    voice: {
        personality: string;
        tone: string;
        pacing: string;
        emphasis: string;
        pauses: string;
    };
    energy: number;
    mouthGain: number;
    home: ExpressionId;
    palette: ExpressionId[];
    voiceName: 'marin' | 'cedar';
    voicePreference: readonly string[];
    pace: number;
    aliases: string[];
}
export declare const TONES: Record<ToneId, Tone>;
export declare const TONE_IDS: ToneId[];
export declare function resolveTone(input: string | undefined): Tone;
export interface VoiceInstructionsOptions {
    language?: 'pt-BR' | 'pt-PT' | 'generic';
    extra?: string;
}
export declare function buildVoiceInstructions(tone: Tone, options?: VoiceInstructionsOptions): string;
