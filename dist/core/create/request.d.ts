import { type BriefPacingId } from '../../contracts/aspects.js';
import { type CameraStyle } from '../../contracts/camera.js';
import { type CreateAudience, type CreateEngine, type CreateRequest, type CreateResearchMode, type CreateSourceInput, type CreateSpeakerInput, type CreateUntil, type CreateVideoInput } from '../../contracts/create.js';
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
    readonly videosMax: 8;
    readonly videoCaptionMax: 60000;
    readonly nameMax: 40;
    readonly personalityMax: 600;
};
export declare const DUO_WORDS_PER_MINUTE = 172;
export declare function wordsPerMinuteFor(format: CreateFormatSpec, presenters: 1 | 2, audience: CreateAudience | undefined, profile: VideoProfileId, chosen?: BriefPacingId): number;
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
    pacing?: BriefPacingId;
    sources: CreateSourceInput[];
    options: Record<string, string | boolean>;
    speakers: Partial<Record<PodcastSeat, CreateSpeakerInput>>;
    cameraStyle: CameraStyle;
    emotion?: VoiceEmotion;
    varyVoice?: boolean;
    cta?: boolean;
    scenario?: string;
    video?: string;
    subtitles?: string;
    videos?: CreateVideoInput[];
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
export declare function ctaSkipReason(n: {
    engine: CreateEngine;
    language: string;
    until?: CreateUntil | undefined;
    videos?: readonly unknown[] | undefined;
}): string | undefined;
export declare function ctaChoiceLabel(request: {
    cta?: boolean | undefined;
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
