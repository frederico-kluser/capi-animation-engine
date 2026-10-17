import type { TalkAspectId } from '../../../contracts/aspects.js';
import type { CameraStyle } from '../../../contracts/camera.js';
import type { CatalogDetail } from '../../../contracts/catalog.js';
import type { ProfileAspect, VideoProfileId } from '../../../contracts/profile.js';
import type { ReviewAnchor, ReviewBlockMode } from '../../../contracts/review.js';
import type { AlignmentResult, ScriptWord, WordAlignment, WordProsody } from '../../../contracts/talk.js';
import type { VisemeCue } from '../../../contracts/timeline.js';
import type { Tone } from '../../talk/tones.js';
export interface TalkSpeechTiming {
    alignment: AlignmentResult;
    prosody: readonly WordProsody[];
    speech: readonly VisemeCue[];
    silences?: ReadonlyArray<{
        startMs: number;
        endMs: number;
    }>;
}
export interface TalkReviewBlockInfo {
    id: string;
    firstWord: number;
    lastWord: number;
    mode: ReviewBlockMode;
    at: ReviewAnchor;
    videoAtMs?: number;
}
export interface TalkReviewContext {
    text: string;
    screenSide: 'left' | 'right';
    blocks?: readonly TalkReviewBlockInfo[];
}
export interface TalkAspectContext {
    words: readonly ScriptWord[];
    tone: Tone;
    languageLabel: string;
    direction?: string;
    notes?: Partial<Record<TalkAspectId, string>>;
    speech: TalkSpeechTiming;
    durationMeasured?: boolean;
    measuredMs?: number;
    prosodyMeasured?: boolean;
    cameraStyle: CameraStyle;
    review?: TalkReviewContext;
    profile?: VideoProfileId;
    catalog?: CatalogDetail;
}
export declare function promptLook(ctx: Pick<Partial<TalkAspectContext>, 'profile' | 'catalog'>): {
    profile: VideoProfileId;
    aspect: ProfileAspect;
    detail: CatalogDetail;
};
export declare function profilePromptBlock(ctx: Pick<Partial<TalkAspectContext>, 'profile'>, aspect: TalkAspectId): string;
export interface TalkAspectPeers {
    body?: string;
    face?: string;
    camera?: string;
}
export declare function alignedWordAt(alignment: AlignmentResult, index: number): WordAlignment | undefined;
export declare function wordStartMs(timing: Pick<TalkSpeechTiming, 'alignment'>, index: number): number;
export declare function speechSeconds(timing: Pick<TalkSpeechTiming, 'alignment'> & Pick<Partial<TalkSpeechTiming>, 'silences'>): number;
export declare function sentencesOf(words: readonly ScriptWord[]): ScriptWord[][];
export type SentenceKind = 'question' | 'exclaim' | 'statement';
export declare function sentenceKind(sentence: readonly ScriptWord[]): SentenceKind;
export declare function contentWordFrom(words: readonly ScriptWord[], index: number): number;
export interface TalkRhythm {
    seconds: number;
    wordsPerSecond: number;
    minGap: number;
    targetPoses: number;
    sentences: number;
}
export declare function talkRhythm(ctx: Pick<TalkAspectContext, 'words' | 'tone' | 'speech' | 'measuredMs'>): TalkRhythm;
export declare function scriptLines(ctx: Pick<TalkAspectContext, 'words' | 'speech' | 'durationMeasured' | 'prosodyMeasured' | 'review'>): string;
export declare function videoClock(ms: number): string;
export declare function reviewBlockHeader(b: TalkReviewBlockInfo): string;
export declare function prosodyLines(ctx: Pick<TalkAspectContext, 'words' | 'speech' | 'prosodyMeasured'>): string;
export declare function noteBlock(ctx: Pick<TalkAspectContext, 'notes'>, id: TalkAspectId): string;
export declare function peersBlock(peers: TalkAspectPeers | undefined, own: TalkAspectId): string;
export declare const languageRule: (label: string) => string;
