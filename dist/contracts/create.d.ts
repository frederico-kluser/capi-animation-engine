import type { CameraStyle } from './camera.js';
import type { CharacterId } from './character.js';
import type { CreateModelChoices } from './models.js';
import type { PodcastSeat } from './podcast.js';
import type { VideoProfileId } from './profile.js';
export declare const CREATE_FORMAT_IDS: readonly ['deep-dive', 'lesson', 'practical-lesson', 'debate', 'interview', 'critique', 'brief', 'review'];
export type CreateFormatId = (typeof CREATE_FORMAT_IDS)[number];
export declare const CREATE_ENGINES: readonly ['talk', 'podcast', 'review'];
export type CreateEngine = (typeof CREATE_ENGINES)[number];
export declare const CREATE_RESEARCH_MODES: readonly ['auto', 'off', 'quick', 'deep'];
export type CreateResearchMode = (typeof CREATE_RESEARCH_MODES)[number];
export declare const CREATE_AUDIENCES: readonly ['beginner', 'general', 'expert'];
export type CreateAudience = (typeof CREATE_AUDIENCES)[number];
export declare const CREATE_UNTIL_STEPS: readonly ['brief', 'script', 'points'];
export type CreateUntil = (typeof CREATE_UNTIL_STEPS)[number];
export interface CreateSourceInput {
    kind: 'text' | 'url';
    value: string;
    title?: string;
    file?: string;
}
export interface CreateSpeakerInput {
    character?: CharacterId;
    name?: string;
    personality?: string;
    voice?: string;
    tone?: string;
}
export interface CreateRequest {
    version: 1;
    format: CreateFormatId;
    prompt: string;
    title?: string;
    profile?: VideoProfileId;
    minutes?: number;
    seconds?: number;
    language?: string;
    audience?: CreateAudience;
    presenters?: 1 | 2;
    research?: CreateResearchMode;
    sources?: CreateSourceInput[];
    options?: Record<string, string | boolean>;
    speakers?: Partial<Record<PodcastSeat, CreateSpeakerInput>>;
    cameraStyle?: CameraStyle;
    emotion?: 'on' | 'off';
    varyVoice?: boolean;
    scenario?: string;
    video?: string;
    subtitles?: string;
    until?: CreateUntil;
    models?: CreateModelChoices;
}
export interface CreateOptionChoice {
    value: string;
    label: string;
    hint?: string;
}
export interface CreateFormatOption {
    id: string;
    label: string;
    hint?: string;
    kind: 'choice' | 'toggle' | 'text';
    choices?: readonly CreateOptionChoice[];
    default: string | boolean;
    maxLength?: number;
    placeholder?: string;
    presenters?: 1 | 2;
}
export declare const CREATE_LAYER_IDS: readonly ['intake', 'queries', 'search', 'triage', 'extract', 'notes', 'lenses', 'select', 'brief', 'write', 'critique', 'produce'];
export type CreateLayerId = (typeof CREATE_LAYER_IDS)[number];
export type CreateLayerWorker = 'jev' | 'llm' | 'tavily' | 'code' | 'engine';
export type CreateLayerStatus = 'ok' | 'skipped' | 'fallback' | 'failed';
export interface CreateLayerRecord {
    id: CreateLayerId;
    worker: CreateLayerWorker;
    status: CreateLayerStatus;
    ms: number;
    cost?: number;
    parallel?: number;
    note?: string;
    problems?: string[];
}
export interface CreateEvent {
    layer: CreateLayerId | 'setup' | 'done';
    status: 'start' | 'info' | 'done' | 'warn' | 'error';
    message: string;
    elapsedMs: number;
}
export interface CreateSource {
    id: string;
    origin: 'author' | 'search';
    title: string;
    url?: string;
    domain?: string;
    text: string;
    query?: string;
    searchScore?: number;
    relevance?: number;
    reliable?: boolean;
    flagged?: boolean;
}
export declare const CREATE_NOTE_KINDS: readonly ['fact', 'number', 'quote', 'example', 'claim', 'definition'];
export type CreateNoteKind = (typeof CREATE_NOTE_KINDS)[number];
export interface CreateNote {
    source: string;
    kind: CreateNoteKind;
    text: string;
}
export declare const CREATE_LENS_IDS: readonly ['facts', 'story', 'analogies', 'audience', 'tension', 'pro', 'con', 'steps', 'verdict'];
export type CreateLensId = (typeof CREATE_LENS_IDS)[number];
export declare const CREATE_POINT_ROLES: readonly ['hook', 'core', 'example', 'depth', 'objection', 'pro', 'con', 'takeaway', 'off'];
export type CreatePointRole = (typeof CREATE_POINT_ROLES)[number];
export interface CreatePoint {
    id: string;
    lens: CreateLensId;
    text: string;
    why?: string;
    sources: string[];
    priority: number;
    interest?: number;
    onTopic?: boolean;
    grounded?: boolean;
    role?: CreatePointRole;
    score: number;
    selected: boolean;
}
export interface CreateManifest {
    version: 1;
    name: string;
    createdAt: string;
    request: CreateRequest;
    profile?: VideoProfileId;
    engine: CreateEngine;
    run?: {
        dir: string;
        name: string;
    };
    reached: CreateUntil | 'done';
    layers: CreateLayerRecord[];
    counts: {
        sources: number;
        notes: number;
        points: number;
        selected: number;
        facts: number;
    };
    cost: number;
    elapsedMs: number;
    files: Partial<Record<'request' | 'intake' | 'research' | 'sources' | 'notes' | 'points' | 'brief' | 'script' | 'critique' | 'report', string>>;
    warnings: string[];
}
