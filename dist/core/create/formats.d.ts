import type { PodcastBriefStyle } from '../../contracts/aspects.js';
import type { CameraStyle } from '../../contracts/camera.js';
import type { CreateAudience, CreateEngine, CreateFormatId, CreateFormatOption, CreateLensId, CreatePointRole, CreateResearchMode } from '../../contracts/create.js';
import type { PodcastSeat } from '../../contracts/podcast.js';
import type { VideoProfileId } from '../../contracts/profile.js';
export interface CreateOptionSpec extends CreateFormatOption {
    says?: Readonly<Record<string, string>>;
    on?: string;
    off?: string;
    template?: string;
}
export interface CreateSeatRole {
    role: string;
    personality: string;
    tone: string;
}
export interface CreateShortSpec {
    seconds: {
        default: number;
        min: number;
        max: number;
    };
    note: string;
    direction: string;
    structure: readonly string[];
    rules: readonly string[];
    drops: readonly string[];
    dropOptions: readonly string[];
    lenses: readonly CreateLensId[];
    soloPersonality?: string;
}
export interface CreateFormatSpec {
    id: CreateFormatId;
    label: string;
    tagline: string;
    description: string;
    glyph: string;
    presenters: readonly (1 | 2)[];
    needsVideo?: true;
    minutes: {
        default: number;
        min: number;
        max: number;
    };
    style: PodcastBriefStyle;
    cameraStyle: CameraStyle;
    research: CreateResearchMode;
    direction: string;
    seats: Readonly<Record<PodcastSeat, CreateSeatRole>>;
    solo: CreateSeatRole;
    structure: readonly string[];
    rules: readonly string[];
    lenses: readonly CreateLensId[];
    pointRoles: readonly CreatePointRole[];
    options: readonly CreateOptionSpec[];
    short: CreateShortSpec;
}
export declare const SOLO_WORDS_PER_MINUTE = 150;
export declare const AUDIENCE_TEXT: Readonly<Record<CreateAudience, {
    label: string;
    says: string;
}>>;
export declare const LENS_LABELS: Readonly<Record<CreateLensId, string>>;
export declare const POINT_ROLE_LABELS: Readonly<Record<CreatePointRole, string>>;
export declare const CREATE_FORMATS: Readonly<Record<CreateFormatId, CreateFormatSpec>>;
export declare const createFormat: (id: string) => CreateFormatSpec | undefined;
export declare function formatEngine(format: CreateFormatSpec, presenters: 1 | 2): CreateEngine;
export declare function formatOptions(format: CreateFormatSpec, presenters: 1 | 2, profile?: VideoProfileId): CreateOptionSpec[];
export declare function defaultOptions(format: CreateFormatSpec, presenters: 1 | 2, profile?: VideoProfileId): Record<string, string | boolean>;
export declare function formatSeconds(format: CreateFormatSpec, profile?: VideoProfileId): {
    default: number;
    min: number;
    max: number;
};
export declare function formatStructure(format: CreateFormatSpec, profile?: VideoProfileId): readonly string[];
export declare function formatRules(format: CreateFormatSpec, profile?: VideoProfileId): string[];
export declare function formatSolo(format: CreateFormatSpec, profile?: VideoProfileId): CreateSeatRole;
export declare function formatDirection(format: CreateFormatSpec, profile?: VideoProfileId): string;
export declare function optionLines(format: CreateFormatSpec, presenters: 1 | 2, values: Readonly<Record<string, string | boolean>>, profile?: VideoProfileId): string[];
