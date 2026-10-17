import type { PodcastBrief } from '../../contracts/aspects.js';
import { type NormalizedBrief } from '../aspects/podcast/writer.js';
import type { CreateTask } from './material.js';
export interface SoloSection {
    id: string;
    title: string;
    goal: string;
    beats: string[];
    targetWords: number;
}
export interface SoloOutline {
    title: string;
    hook: string;
    sections: SoloSection[];
    closing: string;
}
export type SoloBrief = NormalizedBrief;
export declare function soloSectionCount(minutes: number): number;
export declare function normalizeSoloBrief(raw: PodcastBrief): {
    brief: SoloBrief | null;
    problems: string[];
};
export declare function soloEdgeWords(brief: Pick<SoloBrief, 'profile' | 'words'>): {
    open: number;
    close: number;
};
export declare const SHORT_SIZE_ASK: readonly [number, number];
export declare const saysFarewell: (value: string) => boolean;
export declare const wordCount: (value: string) => number;
export declare function buildSoloOutlineMessages(brief: SoloBrief): {
    system: string;
    user: string;
};
export declare function parseSoloOutline(content: string, brief: SoloBrief): {
    value: SoloOutline | null;
    problems: string[];
    fatal: boolean;
};
export declare function soloOutlineTask(brief: SoloBrief): CreateTask<SoloOutline>;
export declare function buildSoloSectionMessages(brief: SoloBrief, outline: SoloOutline, sectionId: string): {
    system: string;
    user: string;
};
export declare function cleanSpoken(value: string): string;
export declare function parseSoloSection(content: string, brief: SoloBrief, outline: SoloOutline, sectionId: string): {
    value: string | null;
    problems: string[];
    fatal: boolean;
};
export declare function soloSectionTask(brief: SoloBrief, outline: SoloOutline, sectionId: string, options?: {
    samples?: number;
}): CreateTask<string> & {
    needsRepair(parsed: {
        value: string | null;
        problems: string[];
        fatal: boolean;
    }): boolean;
};
export interface SoloScript {
    title: string;
    paragraphs: Array<{
        id: string;
        text: string;
    }>;
    words: number;
    text: string;
}
export declare function stitchSolo(outline: SoloOutline, texts: Readonly<Record<string, string>>): SoloScript;
export declare function buildSoloPolishMessages(brief: SoloBrief, outline: SoloOutline, script: SoloScript, issues?: readonly string[]): {
    system: string;
    user: string;
};
export declare function parseSoloPolish(content: string, script: SoloScript): {
    value: Array<{
        id: string;
        text: string;
    }> | null;
    problems: string[];
    fatal: boolean;
};
export declare function applySoloPolish(script: SoloScript, edits: ReadonlyArray<{
    id: string;
    text: string;
}>, options?: {
    profile?: SoloBrief['profile'];
}): SoloScript;
export declare function soloPolishTask(brief: SoloBrief, outline: SoloOutline, script: SoloScript, issues?: readonly string[]): CreateTask<Array<{
    id: string;
    text: string;
}>>;
