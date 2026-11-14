import type { CharacterId } from './character.js';
import type { OutfitInput } from './outfit.js';
import type { ToneId } from '../core/talk/tones.js';
export declare const COMMUNICATION_STYLE_IDS: readonly ['friendly', 'didactic', 'humorous', 'enthusiastic', 'calm', 'curious', 'analytical', 'skeptical', 'provocative', 'formal', 'casual', 'storyteller', 'inspiring', 'empathetic', 'direct', 'ironic'];
export type CommunicationStyleId = (typeof COMMUNICATION_STYLE_IDS)[number];
export type PersonaOrigin = 'stock' | 'custom';
export declare const PERSONA_ORIGINS: readonly ["stock", "custom"];
export interface PersonaSpec {
    id: string;
    name: string;
    base: CharacterId;
    outfit?: OutfitInput;
    styles: CommunicationStyleId[];
    voice?: string;
    tone?: ToneId;
    notes?: string;
    origin: PersonaOrigin;
}
export declare const PERSONA_LIMITS: {
    readonly id: 40;
    readonly name: 40;
    readonly styles: 5;
    readonly notes: 280;
    readonly personality: 600;
};
export declare const PERSONA_ID_PATTERN: RegExp;
