import { type CameraStyle } from '../../contracts/camera.js';
import { type CreateAudience, type CreateEngine, type CreateRequest, type CreateResearchMode, type CreateSourceInput, type CreateSpeakerInput, type CreateUntil } from '../../contracts/create.js';
import { type CreateModelRole } from '../../contracts/models.js';
import { type PodcastSeat } from '../../contracts/podcast.js';
import { type VideoProfileId } from '../../contracts/profile.js';
import { type JevAnswer, type JevRequest } from '../decide/jev.js';
import { type VoiceEmotion } from '../talk/emotion.js';
import { type CreateFormatSpec } from './formats.js';
export declare const CREATE_LIMITS: {
    readonly promptMin: 8;
    readonly promptMax: 8000;
    readonly titleMax: 200;
    readonly sourcesMax: 12;
    readonly sourceTextMax: 60000;
    readonly sourceTitleMax: 200;
    readonly nameMax: 40;
    readonly personalityMax: 600;
};
export declare const DUO_WORDS_PER_MINUTE = 172;
export interface NormalizedCreate {
    format: CreateFormatSpec;
    prompt: string;
    title?: string;
    profile: VideoProfileId;
    minutes: number;
    seconds: number;
    language: string;
    audience?: CreateAudience;
    presenters: 1 | 2;
    engine: CreateEngine;
    research: CreateResearchMode;
    sources: CreateSourceInput[];
    options: Record<string, string | boolean>;
    speakers: Partial<Record<PodcastSeat, CreateSpeakerInput>>;
    cameraStyle: CameraStyle;
    emotion?: VoiceEmotion;
    varyVoice?: boolean;
    scenario?: string;
    video?: string;
    subtitles?: string;
    until?: CreateUntil;
    models: Record<CreateModelRole, string>;
    words: number;
}
export declare function urlsIn(textValue: string): string[];
export declare function domainOf(url: string): string | undefined;
export interface ProfileHints {
    mentions: boolean;
    short: boolean;
    cue?: string;
    cueKind?: 'format' | 'duration';
    seconds?: number;
}
export declare function durationInText(prompt: string): number | undefined;
export declare function readProfileHints(prompt: string): ProfileHints;
export interface NormalizeCreateOptions {
    defaultProfile?: VideoProfileId;
}
export interface CreateRequestRead {
    request: NormalizedCreate | null;
    errors: string[];
    warnings: string[];
    profileBy: 'request' | 'text' | 'default';
    hints: ProfileHints;
}
export declare function normalizeCreateRequest(raw: unknown, readOptions?: NormalizeCreateOptions): CreateRequestRead;
export declare function createRequestRecord(n: NormalizedCreate, options?: NormalizeCreateOptions): CreateRequest;
export declare function voiceChoiceLabel(request: {
    emotion?: VoiceEmotion | undefined;
    varyVoice?: boolean | undefined;
}): string;
export interface CreateIntake {
    research: Exclude<CreateResearchMode, 'auto'>;
    timely: boolean;
    sensitive: boolean;
    audience: CreateAudience;
    formatHint?: string;
    decidedBy: 'jev' | 'rules';
    researchP?: number;
    profile?: VideoProfileId;
    profileBy?: 'rules' | 'jev';
    shortP?: number;
}
export type IntakeProfileHints = Pick<ProfileHints, 'mentions' | 'short'>;
export declare function intakeRequest(n: NormalizedCreate, hints?: IntakeProfileHints): JevRequest;
export declare function fallbackIntake(n: NormalizedCreate, hints?: IntakeProfileHints): CreateIntake;
export declare function readIntake(n: NormalizedCreate, answers: Readonly<Record<string, JevAnswer>> | null, hints?: IntakeProfileHints): CreateIntake;
export declare function applyIntakeProfile(raw: unknown, n: NormalizedCreate, intake: Pick<CreateIntake, 'profile' | 'profileBy' | 'shortP'>, options?: NormalizeCreateOptions): {
    request: NormalizedCreate;
    warnings?: string[];
    note?: string;
};
