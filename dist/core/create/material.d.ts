import type { AspectRecordId } from '../../contracts/aspects.js';
import { type CreateLensId, type CreateNote, type CreatePoint, type CreateSource } from '../../contracts/create.js';
import { intIn } from '../aspects/common.js';
import type { VideoProfileId } from '../../contracts/profile.js';
import { type JevAnswer, type JevRequest } from '../decide/jev.js';
import { type CreateFormatSpec } from './formats.js';
import { type CreateIntake, type NormalizedCreate } from './request.js';
export interface CreateContext {
    request: NormalizedCreate;
    intake: CreateIntake;
    today: string;
}
export interface CreateTask<T> {
    id: AspectRecordId;
    mode: 'create';
    system: string;
    user: string;
    parse(content: string): {
        value: T | null;
        problems: string[];
        fatal: boolean;
    };
    score?(value: T, problems: readonly string[]): number;
    fallback?(): T | null;
    samples?: number;
}
export declare const RESEARCH_BUDGET: {
    readonly quick: {
        readonly queries: 4;
        readonly results: 5;
        readonly read: 4;
        readonly depth: 'basic';
    };
    readonly deep: {
        readonly queries: 8;
        readonly results: 6;
        readonly read: 8;
        readonly depth: 'advanced';
    };
};
export declare const SHORT_RESEARCH_BUDGET: {
    readonly quick: {
        readonly queries: 2;
        readonly results: 4;
        readonly read: 2;
        readonly depth: 'basic';
    };
    readonly deep: {
        readonly queries: 4;
        readonly results: 5;
        readonly read: 4;
        readonly depth: 'advanced';
    };
};
export declare function researchBudget(mode: 'quick' | 'deep', profile?: VideoProfileId): {
    queries: number;
    results: number;
    read: number;
    depth: 'basic' | 'advanced';
};
export declare const SHORT_MATERIAL: {
    readonly pointsPerLens: 4;
    readonly points: {
        readonly min: 3;
        readonly max: 6;
        readonly everySeconds: 15;
    };
    readonly facts: 2;
    readonly hookBonus: 0.15;
};
export declare const MATERIAL_LIMITS: {
    readonly sourceChars: 14000;
    readonly notesPerSource: 12;
    readonly noteChars: 320;
    readonly pointsPerLens: 8;
    readonly pointChars: 360;
    readonly perDomain: 2;
    readonly notesBlockChars: 16000;
};
export declare function requestText(ctx: CreateContext): string;
export interface CreateQuery {
    q: string;
    angle: string;
}
export declare function buildQueriesMessages(ctx: CreateContext, count: number): {
    system: string;
    user: string;
};
export declare function parseQueries(content: string, count: number): {
    value: CreateQuery[] | null;
    problems: string[];
    fatal: boolean;
};
export declare function fallbackQueries(ctx: CreateContext, count: number): CreateQuery[];
export declare function queriesTask(ctx: CreateContext, count: number): CreateTask<CreateQuery[]>;
export interface SearchHit {
    title: string;
    url: string;
    content: string;
    score: number;
    query: string;
    flagged?: boolean;
}
export declare const RELEVANCE_LEVELS: readonly ['Unrelated to the request, or an ad, a login wall or a list of links with no content', 'Mentions the topic only in passing, or is a generic overview with nothing specific', 'Directly about the topic, with useful explanations or examples', 'Directly about the topic AND contains specific facts, numbers, dates or first-hand statements a video could cite'];
export declare function triageRequest(hit: SearchHit, ctx: CreateContext): JevRequest;
export interface RankedHit extends SearchHit {
    relevance: number;
    reliable?: boolean;
    by: 'jev' | 'search';
    picked: boolean;
    dropped?: string;
}
export declare function rankResults(hits: readonly SearchHit[], decisions: ReadonlyArray<Readonly<Record<string, JevAnswer>> | null>, options: {
    read: number;
    authorUrls?: readonly string[];
}): RankedHit[];
export declare function buildNotesMessages(source: CreateSource, ctx: CreateContext): {
    system: string;
    user: string;
};
export declare function parseNotes(content: string, sourceId: string): {
    value: CreateNote[] | null;
    problems: string[];
    fatal: boolean;
};
export declare function fallbackNotes(source: CreateSource): CreateNote[];
export declare function notesTask(source: CreateSource, ctx: CreateContext): CreateTask<CreateNote[]>;
export declare function notesBlock(notes: readonly CreateNote[], sources: readonly CreateSource[], maxChars?: number): string;
export declare function thesisOf(ctx: CreateContext): string;
export declare function buildLensMessages(lens: CreateLensId, ctx: CreateContext, notes: readonly CreateNote[], sources: readonly CreateSource[]): {
    system: string;
    user: string;
};
export declare const lensPointLimit: (ctx: CreateContext) => number;
export type LensPoint = Pick<CreatePoint, 'lens' | 'text' | 'sources' | 'priority'> & {
    why?: string;
};
export declare function parseLens(content: string, lens: CreateLensId, sourceIds: readonly string[], maxPoints?: number): {
    value: LensPoint[] | null;
    problems: string[];
    fatal: boolean;
};
export declare function lensTask(lens: CreateLensId, ctx: CreateContext, notes: readonly CreateNote[], sources: readonly CreateSource[]): CreateTask<LensPoint[]>;
export declare const looksFactual: (textValue: string) => boolean;
export declare function mergeLensPoints(byLens: ReadonlyArray<readonly LensPoint[]>): CreatePoint[];
export declare const INTEREST_LEVELS: readonly ['Off-topic, or filler that nobody would remember', 'On-topic but generic: something the audience already assumes', 'A concrete and relevant point that moves the video forward', 'A surprising or specific point that changes how the viewer sees the topic; leaving it out would be a loss'];
export declare function numbersIn(textValue: string): string[];
export declare function evidenceFor(point: Pick<CreatePoint, 'text' | 'sources'>, notes: readonly CreateNote[]): string;
export declare function pointRequest(point: CreatePoint, ctx: CreateContext, notes: readonly CreateNote[]): JevRequest;
export declare function pointBudget(minutes: number, profile?: VideoProfileId): {
    points: number;
};
export declare function samePoint(a: Pick<CreatePoint, 'text' | 'sources'>, b: Pick<CreatePoint, 'text' | 'sources'>): boolean;
export declare function selectPoints(points: readonly CreatePoint[], decisions: ReadonlyArray<Readonly<Record<string, JevAnswer>> | null>, ctx: CreateContext): CreatePoint[];
export declare function lensesFor(format: CreateFormatSpec, profile?: VideoProfileId): CreateLensId[];
export declare const countNote: (n: number, one: string, many: string) => string;
export { intIn };
