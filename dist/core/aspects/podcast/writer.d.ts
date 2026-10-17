import { type DialogueAspectValue, type EpisodeOutline, type OutlineMomentKind, type OutlineSegment, type PodcastBrief, type PodcastBriefFormat, type PodcastBriefStyle } from '../../../contracts/aspects.js';
import type { CameraStyle } from '../../../contracts/camera.js';
import { type CharacterId } from '../../../contracts/character.js';
import { type PodcastScript, type PodcastSeat, type PodcastTurnInput } from '../../../contracts/podcast.js';
import type { VideoProfileId } from '../../../contracts/profile.js';
import { type DrinkSpec } from '../../../contracts/set.js';
import { type PodcastScriptCheck } from '../../podcast/script.js';
import { foldWord } from '../../podcast/words.js';
import { type AspectParseResult, type PodcastAspectTask } from './shared.js';
export declare const WRITER_WORDS_PER_MINUTE = 172;
export declare const BRIEF_MINUTES: {
    readonly default: 3;
    readonly min: 0.5;
    readonly max: 30;
};
export declare const DEFAULT_WRITER_SPEAKERS: Readonly<Record<PodcastSeat, {
    character: CharacterId;
    name: string;
    personality: string;
    drink: DrinkSpec;
}>>;
export declare const STYLE_CAMERA: Record<PodcastBriefStyle, CameraStyle>;
export interface WriterSpeaker {
    character: CharacterId;
    name: string;
    personality: string;
    tone: string;
    voice?: string;
    drink?: DrinkSpec;
}
export interface NormalizedBrief {
    topic: string;
    title?: string;
    minutes: number;
    language: string;
    style: PodcastBriefStyle;
    notes?: string;
    facts: string[];
    speakers: Record<PodcastSeat, WriterSpeaker>;
    format?: PodcastBriefFormat;
    profile?: VideoProfileId;
    words: number;
    segments: number;
}
export declare function outlineSegmentCount(minutes: number): number;
export declare function normalizeBrief(raw: unknown): {
    brief: NormalizedBrief | null;
    problems: string[];
};
export declare const SHORT_BRIEF_MINUTES: {
    readonly default: number;
    readonly min: number;
    readonly max: number;
};
export declare const SHORT_WRITING: {
    readonly parts: 3;
    readonly sentenceWords: 12;
    readonly sentenceMaxWords: 18;
    readonly turnWords: {
        readonly min: 6;
        readonly max: 20;
    };
    readonly twoSegmentsUntil: 60;
    readonly openingMinWords: 15;
    readonly closingMinWords: 12;
    readonly farewellWords: 3;
};
export declare function shortSegmentCount(minutes: number): number;
export declare function shortTurns(words: number): {
    min: number;
    max: number;
};
export declare const isShortBrief: (brief: Pick<NormalizedBrief, 'profile'>) => boolean;
export declare const briefSeconds: (brief: Pick<NormalizedBrief, 'minutes'>) => number;
export declare function durationText(brief: Pick<NormalizedBrief, 'profile' | 'minutes' | 'words'>, tail: string): string;
export declare function profileText(brief: Pick<NormalizedBrief, 'profile' | 'minutes' | 'words' | 'language'>): string[];
export declare function sentenceWordCounts(text: string): number[];
export declare const longestSentence: (text: string) => number;
export declare function opensWithGreeting(text: string): boolean;
export declare const opensWithAnnouncement: (text: string) => boolean;
export declare const BRIEF_FORMAT_LIMITS: {
    readonly direction: 700;
    readonly role: 200;
    readonly audience: 300;
    readonly items: 12;
    readonly item: 320;
    readonly material: 40;
    readonly materialItem: 420;
};
export declare function readBriefFormat(raw: unknown): PodcastBriefFormat | undefined;
export declare function briefRecord(brief: NormalizedBrief): PodcastBrief;
export declare function formatText(brief: NormalizedBrief): string[];
export declare const OPENING_MIN_WORDS = 45;
export declare const CLOSING_MIN_WORDS = 30;
export declare function edgeWords(brief: Pick<NormalizedBrief, 'profile' | 'words'> & {
    segments?: number;
}): {
    open: number;
    close: number;
    minOpen: number;
    minClose: number;
};
export declare function buildOutlineMessages(brief: NormalizedBrief): {
    system: string;
    user: string;
};
export declare function parseOutline(content: string, brief: NormalizedBrief): AspectParseResult<EpisodeOutline>;
export declare function scoreOutline(value: EpisodeOutline, brief: NormalizedBrief, problems?: readonly string[]): number;
export declare function outlineTask(brief: NormalizedBrief, options?: {
    samples?: number;
}): PodcastAspectTask<EpisodeOutline>;
export type DialogueTurnDraft = DialogueAspectValue['turns'][number] & {
    moment?: OutlineMomentKind;
};
export interface DialogueValue extends DialogueAspectValue {
    turns: DialogueTurnDraft[];
}
export type WriterOutlineSegment = OutlineSegment & {
    handoffBy?: PodcastSeat;
};
export declare const handoffSeat: (s: OutlineSegment) => PodcastSeat;
export declare function segmentEnds(outline: EpisodeOutline, index: number): {
    opener?: PodcastSeat;
    closer?: PodcastSeat;
};
export declare const askedWords: (target: number) => number;
export declare function dialogueShape(words: number, short?: boolean): {
    main: number;
    back: number;
};
export declare function buildDialogueMessages(brief: NormalizedBrief, outline: EpisodeOutline, segmentId: string): {
    system: string;
    user: string;
};
export declare function dropOwnVocative(text: string, ownName: string): string;
export declare function parseDialogue(content: string, brief: NormalizedBrief, outline: EpisodeOutline, segmentId: string): AspectParseResult<DialogueValue>;
export declare const KEY_MOMENTS: ReadonlySet<OutlineMomentKind>;
export declare function wordRefAt(words: readonly {
    core: string;
}[], index: number): string;
export declare function scoreDialogue(value: DialogueValue, outline: EpisodeOutline, problems?: readonly string[]): number;
export declare function dialogueTask(brief: NormalizedBrief, outline: EpisodeOutline, segmentId: string, options?: {
    samples?: number;
    repair?: {
        previous: string;
        errors: readonly string[];
    };
}): PodcastAspectTask<DialogueValue>;
export interface StitchInput {
    brief: NormalizedBrief;
    outline: EpisodeOutline;
    dialogues: Readonly<Record<string, DialogueValue>>;
    seed?: number;
    camera?: {
        style?: CameraStyle;
    };
}
export interface StitchedMoment {
    kind: OutlineMomentKind;
    note: string;
    seat?: PodcastSeat;
    segment: string;
    turn?: string;
}
export interface StitchedScript {
    script: PodcastScript & {
        $segments: Array<{
            id: string;
            title: string;
            turns: string[];
        }>;
        $moments: StitchedMoment[];
        $outline?: string;
    };
    segments: Array<{
        id: string;
        title: string;
        turns: string[];
    }>;
    moments: StitchedMoment[];
    check: PodcastScriptCheck;
    bySegment: Record<string, string[]>;
    global: string[];
    notes: string[];
}
export declare function stitchPodcastScript(input: StitchInput): StitchedScript;
export declare function sameQuestion(a: string, b: string): boolean;
export declare function dropSelfAck(text: string): string;
export declare function degradeDialogue(value: DialogueValue): DialogueValue;
export declare function lengthHints(previous: string, outline: EpisodeOutline, segmentId: string): string[];
export declare function dialogueWords(value: DialogueAspectValue): number;
export declare const foldRef: typeof foldWord;
export interface PolishValue {
    edits: Array<{
        id: string;
        text: string;
    }>;
    remove: string[];
    merges?: Record<string, string>;
}
export declare function anchoredWords(script: PodcastScript): Map<string, string[]>;
export declare function buildPolishMessages(brief: NormalizedBrief, outline: EpisodeOutline, script: PodcastScript): {
    system: string;
    user: string;
};
export declare function questionPairs(script: PodcastScript): Array<{
    ask: PodcastTurnInput;
    reply?: PodcastTurnInput;
}>;
export declare function parsePolish(content: string, brief: NormalizedBrief, script: PodcastScript): AspectParseResult<PolishValue>;
export declare function applyPolish<S extends PodcastScript>(script: S, polish: PolishValue): S;
export declare function scorePolish(value: PolishValue, brief: NormalizedBrief, script: PodcastScript, problems?: readonly string[]): number;
export declare function polishTask(brief: NormalizedBrief, outline: EpisodeOutline, script: PodcastScript, options?: {
    samples?: number;
}): PodcastAspectTask<PolishValue>;
export declare function buildCritiqueMessages(brief: NormalizedBrief, outline: EpisodeOutline, script: PodcastScript, issues: readonly string[]): {
    system: string;
    user: string;
};
export declare function critiqueTask(brief: NormalizedBrief, outline: EpisodeOutline, script: PodcastScript, issues: readonly string[], options?: {
    samples?: number;
}): PodcastAspectTask<PolishValue>;
export declare function matchWord(before: readonly {
    core: string;
}[], index: number, after: readonly {
    core: string;
}[]): number | undefined;
export declare function reanchorPolish<S extends PodcastScript>(original: S, polished: S): {
    script: S;
    broken: string[];
};
export declare function polishStitched(stitched: StitchedScript, polish: PolishValue): StitchedScript | null;
