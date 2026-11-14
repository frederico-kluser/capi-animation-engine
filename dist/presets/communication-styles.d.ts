import { type CommunicationStyleId } from '../contracts/persona.js';
import type { ToneId } from '../core/talk/tones.js';
export interface CommunicationStyle {
    id: CommunicationStyleId;
    label: string;
    hint: string;
    personality: string;
    tone: ToneId;
    weight: 1 | 2 | 3;
}
export declare const COMMUNICATION_STYLES: Readonly<Record<CommunicationStyleId, CommunicationStyle>>;
export declare const COMMUNICATION_STYLE_LIST: readonly CommunicationStyle[];
export declare function isCommunicationStyleId(value: unknown): value is CommunicationStyleId;
