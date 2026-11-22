import type { CameraStyle } from './camera.js';
import type { CharacterId } from './character.js';
import type { OutfitInput } from './outfit.js';
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
export declare const CREATE_STUDY_FORMATS: readonly ["lesson", "practical-lesson"];
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
    outfit?: OutfitInput;
}
export interface CreateVideoInput {
    video: string;
    name?: string;
    caption?: string;
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
    pacing?: 'conversation' | 'explainer' | 'lesson';
    sources?: CreateSourceInput[];
    options?: Record<string, string | boolean>;
    speakers?: Partial<Record<PodcastSeat, CreateSpeakerInput>>;
    cameraStyle?: CameraStyle;
    emotion?: 'on' | 'off';
    varyVoice?: boolean;
    cta?: boolean;
    scenario?: string;
    study?: boolean;
    video?: string;
    subtitles?: string;
    videos?: CreateVideoInput[];
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
export declare const CREATE_LENS_IDS: readonly ['facts', 'story', 'analogies', 'audience', 'tension', 'pro', 'con', 'steps', 'verdict', 'concepts'];
export type CreateLensId = (typeof CREATE_LENS_IDS)[number];
export declare const CREATE_POINT_ROLES: readonly ['hook', 'core', 'example', 'depth', 'objection', 'pro', 'con', 'takeaway', 'concept', 'off'];
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
export declare const CREATE_FACET_IDS: readonly ['subject', 'problem', 'mechanism', 'evidence', 'limits', 'context'];
export type CreateFacetId = (typeof CREATE_FACET_IDS)[number];
export interface CreateMaterialCheck {
    verdict: 'ok' | 'thin' | 'refused';
    specific: boolean;
    facets: Array<{
        id: CreateFacetId;
        label: string;
        vital: boolean;
        covered: boolean;
        by: 'jev' | 'rules';
        p?: number;
    }>;
    counts: {
        textSources: number;
        videoSources: number;
        searchSources: number;
        notes: number;
        points: number;
        concepts: number;
    };
    enoughP?: number;
    capacityMinutes: number;
    signals?: string[];
    gaps: string[];
    advice: string[];
}
export interface CreateDurationPlan {
    requestedMinutes: number;
    minutes: number;
    pacing: 'conversation' | 'explainer' | 'lesson';
    words: number;
    concepts: number;
    points: number;
    neededSeconds: number;
    reason: string;
    dropped?: string[];
}
export interface CreateStudyOutcome {
    wanted: boolean;
    state: 'ready' | 'pending' | 'declined' | 'failed';
    path?: string;
    url?: string;
    localUrl?: string;
    pending?: string;
    error?: string;
    cost?: number;
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
    reached: CreateUntil | 'done' | 'refused';
    material?: CreateMaterialCheck;
    plan?: CreateDurationPlan;
    study?: CreateStudyOutcome;
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
    files: Partial<Record<'request' | 'intake' | 'research' | 'sources' | 'notes' | 'points' | 'brief' | 'script' | 'critique' | 'report' | 'videos' | 'cuts' | 'material', string>>;
    warnings: string[];
}
