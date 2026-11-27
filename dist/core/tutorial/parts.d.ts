import type { LessonProductionContract } from '../../contracts/lesson-production.js';
import type { TutorialFinding, TutorialSegmentKind, TutorialVisitor } from '../../contracts/tutorial.js';
export declare const LESSON_PART_IDS: readonly ['abertura', 'visita', 'corpo', 'fecho'];
export type LessonPartId = (typeof LESSON_PART_IDS)[number];
export interface LessonPartSpec {
    id: LessonPartId;
    prompt: string;
    kinds: readonly TutorialSegmentKind[];
    covers: string;
    words: number;
}
export declare const LESSON_PARTS: Readonly<Record<LessonPartId, LessonPartSpec>>;
export declare const LESSON_SPINE_PROMPT = "aula-espinha.xml";
export declare const LESSON_STITCH_PROMPT = "aula-costura.xml";
export declare const lessonPartsFor: (visitors: number) => LessonPartId[];
export declare function lessonContractBrief(contract: LessonProductionContract, idea?: string): Record<string, unknown>;
export declare const AUTHOR_FORBIDDEN_FIELDS: readonly ['pose', 'poses', 'camera', 'cameras', 'atMs', 'at_ms', 'ms', 'timing', 'timings', 'gesture', 'gestures', 'duration', 'durationMs', 'timeMs'];
export declare function authorDirectionFields(value: unknown, path?: string): string[];
export interface LessonPartSources {
    factIds: string[];
    cautionIds: string[];
}
export declare function readLessonPartSources(value: unknown): {
    value: LessonPartSources | null;
    problems: string[];
};
export interface LessonPartOutputRead {
    value: LessonPartOutput | null;
    problems: string[];
}
export declare function readLessonPartOutput(part: LessonPartId, raw: unknown): LessonPartOutputRead;
export declare function unsourcedNumbers(texts: readonly string[], sources: string): string[];
export interface LessonGuestBrief {
    persona: string;
    name: string;
    mode?: string;
    characterId?: string | null;
    living?: boolean;
    kind?: string;
    introduce?: boolean;
    bio?: string;
    cautions?: readonly string[];
    sheet?: string;
    personality?: string;
    gender?: 'f' | 'm' | 'n';
}
export declare function selectLessonVisitors(guests: readonly LessonGuestBrief[] | null | undefined): {
    visitors: TutorialVisitor[];
    guests: LessonGuestBrief[];
    cited: LessonGuestBrief[];
};
export interface LessonSpineStep {
    label: string;
    command: string;
    expect?: string;
    predict?: string;
    guess?: string;
    guessWhy?: string;
    contrast?: string;
}
export interface LessonSpineVisit {
    visitor: string;
    fact: string;
    bridge: string;
    learnerQuestion: string;
    central: string;
}
export interface LessonSpine {
    title: string;
    objective: string;
    idea: string;
    example: {
        summary: string;
        numeric: boolean;
        resonance?: string;
    };
    warmUp: string;
    todayPlain: string;
    hook: {
        attempt: string;
        question: string;
    };
    visits: LessonSpineVisit[];
    analogy: {
        title: string;
        mapping: Array<{
            from: string;
            to: string;
        }>;
        limit: string;
        boundaryQuestion: string;
    };
    card: {
        term: string;
        definition: string;
    } | null;
    steps: LessonSpineStep[];
    errorStep: (LessonSpineStep & {
        why?: string;
    }) | null;
    think: {
        question: string;
        answer: string;
    };
    resolution: string;
    nextHook: string;
    challenge: {
        statement: string;
        solution?: string;
    };
    touches?: LessonPartId[];
    notes?: string;
}
export declare function readLessonSpine(raw: unknown): {
    value: LessonSpine | null;
    errors: string[];
};
export declare function echoOutput(command: string): string | null;
export interface SpineCommandBudget {
    check: string[];
    kept: string[];
    replaced: string[];
    overflow: number;
}
export declare function spineCommandBudget(input: {
    check: readonly string[];
    outline?: readonly string[];
    maxRuns: number;
    plumbing?: RegExp;
}): SpineCommandBudget;
export interface SpineCheckContext {
    maxRuns: number;
    maxLabelChars: number;
    newTerms: readonly string[];
    forbiddenTerms: readonly string[];
    visitorIds: readonly string[];
    returningVisitorIds?: readonly string[];
    numeric?: 'require' | 'prefer' | false;
    plumbing?: RegExp;
}
export declare function checkLessonSpine(spine: LessonSpine, ctx: SpineCheckContext): string[];
export interface LessonPartOutput {
    segments: unknown[];
    challenge?: unknown;
    practices?: unknown;
    notes?: unknown;
    sources?: LessonPartSources;
}
export interface JoinPlan {
    id: string;
    course: string;
    number: number;
    teaches: readonly string[];
    receptive?: readonly string[];
}
export interface JoinInput {
    plan: JoinPlan;
    spine: LessonSpine;
    parts: Partial<Record<LessonPartId, LessonPartOutput | null>>;
    visitors: readonly TutorialVisitor[];
    source?: Record<string, unknown>;
}
export interface PartProblem {
    part: LessonPartId;
    message: string;
}
export interface JoinedLesson {
    lesson: Record<string, unknown>;
    owner: Record<string, LessonPartId>;
    problems: PartProblem[];
}
export declare function joinLessonParts(input: JoinInput): JoinedLesson;
export declare function attributeFindings(findings: readonly TutorialFinding[], joined: Pick<JoinedLesson, 'lesson' | 'owner'>, opts?: {
    cast?: unknown;
    parts?: readonly LessonPartId[];
}): Map<LessonPartId, TutorialFinding[]>;
export type LessonRepairTarget = LessonPartId | 'espinha';
export declare const SPINE_COMMAND_GATES: readonly ['T1-ordem', 'T4-demonstra'];
export declare const SPINE_COMMAND_DEPENDENTS: readonly LessonPartId[];
export declare function attributeFindingsByAuthority(findings: readonly TutorialFinding[], joined: Pick<JoinedLesson, 'lesson' | 'owner'>, opts?: {
    cast?: unknown;
    parts?: readonly LessonPartId[];
}): Map<LessonRepairTarget, TutorialFinding[]>;
export interface StitchSlot {
    segment: string;
    field: 'turns' | 'predictTurns' | 'afterTurns' | 'visit';
    index: number;
    speaker: string;
    text: string;
    edge: 'fim' | 'inicio';
    between: [LessonPartId, LessonPartId];
}
export interface StitchEdit {
    segment: string;
    field: StitchSlot['field'];
    index: number;
    text: string;
}
export declare function stitchSlots(joined: Pick<JoinedLesson, 'lesson' | 'owner'>, perEdge?: number): StitchSlot[];
export declare function stitchSlotsChanged(before: readonly StitchSlot[], after: readonly StitchSlot[]): StitchSlot[];
export declare function applyStitchEdits(joined: Pick<JoinedLesson, 'lesson' | 'owner'>, edits: unknown, maxWords?: number): {
    lesson: Record<string, unknown>;
    applied: StitchEdit[];
    rejected: string[];
};
export interface PartSegmentAddress {
    part: LessonPartId;
    index: number;
    kind: string;
}
export declare function partSegmentAddresses(joined: Pick<JoinedLesson, 'lesson' | 'owner'>, parts: Partial<Record<LessonPartId, LessonPartOutput | null>>): Map<string, PartSegmentAddress>;
export interface SegmentPatchEntry {
    id: string;
    index: number;
    segment: Record<string, unknown>;
}
export interface SegmentPatchResult {
    parts: Partial<Record<LessonPartId, LessonPartOutput>>;
    applied: SegmentPatchEntry[];
    rejected: Array<{
        id: string;
        reason: string;
    }>;
    missing: string[];
}
export declare function replacePartSegments(parts: Partial<Record<LessonPartId, LessonPartOutput>>, part: LessonPartId, entries: readonly Pick<SegmentPatchEntry, 'index' | 'segment'>[]): Partial<Record<LessonPartId, LessonPartOutput>>;
export declare function applySegmentPatch(joined: Pick<JoinedLesson, 'lesson' | 'owner'>, parts: Partial<Record<LessonPartId, LessonPartOutput>>, part: LessonPartId, ids: readonly string[], patch: unknown): SegmentPatchResult;
export declare const gateAnchorKey: (finding: Pick<TutorialFinding, 'gate' | 'segment'>) => string;
export declare function brokenGateAnchors(before: readonly TutorialFinding[], after: readonly TutorialFinding[]): TutorialFinding[];
export interface SpineStepChange {
    index: number;
    errorStep: boolean;
    before: LessonSpineStep;
    after: LessonSpineStep;
}
export interface SpineRepairDelta {
    body: boolean;
    closing: boolean;
    steps: SpineStepChange[];
    commands: string[];
}
export declare function spineRepairDelta(before: LessonSpine, after: LessonSpine): SpineRepairDelta;
export type SpineDrag = 'whole' | string[];
export declare function spineDependentSegments(joined: Pick<JoinedLesson, 'lesson' | 'owner'>, before: LessonSpine, delta: SpineRepairDelta): Record<'corpo' | 'fecho', SpineDrag>;
export declare function lessonTranscript(lesson: unknown, opts?: {
    owner?: Readonly<Record<string, LessonPartId>>;
    names?: Readonly<Record<string, string>>;
}): string;
export declare function partWordCounts(joined: Pick<JoinedLesson, 'lesson' | 'owner'>): Partial<Record<LessonPartId, number>>;
export declare function numericCue(input: {
    check?: {
        expected?: unknown;
        prompt?: unknown;
    } | null;
    idea?: unknown;
    summary?: unknown;
    visitorBios?: readonly unknown[];
}): {
    numeric: 'require' | 'prefer' | false;
    why: string;
};
export declare function lessonOwners(lesson: unknown): Record<string, LessonPartId>;
export declare function splitLessonIntoParts(lesson: unknown): Partial<Record<LessonPartId, LessonPartOutput>>;
export interface ReviewFindingLike {
    check?: string;
    segment?: string;
    message?: string;
    fix?: string;
}
export declare function attributeReviewFindings<T extends ReviewFindingLike>(findings: readonly T[], lesson: unknown, parts?: readonly LessonPartId[]): Map<LessonPartId, T[]>;
export declare function attributeReviewFindingsByAuthority<T extends ReviewFindingLike>(findings: readonly T[], lesson: unknown, parts?: readonly LessonPartId[]): Map<LessonRepairTarget, T[]>;
