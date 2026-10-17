import type { CreateFormatId } from '../../contracts/create.js';
import type { VideoProfileId } from '../../contracts/profile.js';
import { type JevAnswer, type JevRequest } from '../decide/jev.js';
export interface CritiqueUnit {
    id: string;
    text: string;
    first: boolean;
    last: boolean;
}
export declare const HOOK_LEVELS: readonly ['A generic greeting or topic announcement with no reason to keep watching', 'It names the topic and hints at why it matters, but nothing specific', 'A specific and intriguing statement or question about the topic', 'A surprising, concrete statement or question that makes the viewer need to hear the answer'];
export declare const SHORT_HOOK_LEVELS: readonly ['The first sentence is a greeting, an introduction of the speaker or channel, or an announcement of the topic', 'The first sentence names the topic but gives no reason to stay', 'The first sentence is a specific and intriguing statement or question about the topic', 'The first sentence is a surprising, concrete fact, number or question that makes the viewer need to hear the answer'];
export declare const HOOK_PASS: {
    readonly video: 0.45;
    readonly short: 0.6;
};
export interface CritiqueContext {
    format: CreateFormatId;
    facts: readonly string[];
    duo: boolean;
    profile?: VideoProfileId;
    script?: string;
}
export declare function spokenLines(unit: Pick<CritiqueUnit, 'text'>, duo: boolean): string[];
export declare function longSentences(unit: Pick<CritiqueUnit, 'text'>, duo: boolean, max?: number): number[];
export declare function shortChecks(units: readonly CritiqueUnit[], duo: boolean): CritiqueIssue[];
export declare function critiqueRequest(unit: CritiqueUnit, context: CritiqueContext): JevRequest;
export interface CritiqueIssue {
    unit: string;
    kind: 'spoken' | 'invented' | 'format' | 'hook' | 'captions' | 'focus';
    text: string;
}
export interface CritiqueVerdict {
    unit: string;
    spoken?: number;
    invented?: number;
    format?: number;
    hook?: number;
    captions?: number;
    longestSentence?: number;
    oneIdea?: number;
    issues: CritiqueIssue[];
}
export declare function readCritique(units: readonly CritiqueUnit[], decisions: ReadonlyArray<Readonly<Record<string, JevAnswer>> | null>, format: CreateFormatId, options?: {
    profile?: VideoProfileId;
    duo?: boolean;
}): CritiqueVerdict[];
export declare function dialogueUnits(turns: ReadonlyArray<{
    id?: string;
    speaker: string;
    text: string;
}>, names: Readonly<Record<string, string>>): CritiqueUnit[];
export declare function soloUnits(paragraphs: ReadonlyArray<{
    id: string;
    text: string;
}>): CritiqueUnit[];
