import type { CompiledTutorial, TutorialCourse, TutorialLesson } from '../../contracts/tutorial.js';
import { type TutorialReadResult } from './lesson.js';
export declare const TUTORIAL_MEASURE: {
    readonly responseBox: {
        readonly maxChars: 140;
        readonly lines: 1;
    };
    readonly uxValence: readonly [-2, 2];
    readonly uxNoteMaxChars: 280;
    readonly penseSilenceMs: readonly [4000, 6000];
    readonly confidence: {
        readonly scale: readonly [1, 5];
        readonly high: 4;
    };
    readonly alpha: 0.05;
    readonly minPairs: 2;
    readonly fewPairs: 10;
    readonly defaultLessons: 4;
    readonly subgroupMinPairs: 5;
    readonly subgroupMarginSd: 0.1;
};
export declare const CROSSOVER_CONDITIONS: readonly ['dialogue', 'monologue'];
export type CrossoverCondition = (typeof CROSSOVER_CONDITIONS)[number];
export declare const CROSSOVER_BLOCKS: readonly ['A', 'B'];
export type CrossoverBlock = (typeof CROSSOVER_BLOCKS)[number];
export interface CrossoverPeriod {
    block: CrossoverBlock;
    condition: CrossoverCondition;
}
export type CrossoverSequenceId = 'AD-BM' | 'AM-BD' | 'BD-AM' | 'BM-AD';
export interface CrossoverSequence {
    id: CrossoverSequenceId;
    period1: CrossoverPeriod;
    period2: CrossoverPeriod;
}
export declare const CROSSOVER_SEQUENCES: readonly CrossoverSequence[];
export declare const CROSSOVER_ALL_SEQUENCES: readonly CrossoverSequenceId[];
export declare const CROSSOVER_NATURAL_ORDER: readonly CrossoverSequenceId[];
export interface CrossoverParticipant {
    id: string;
    stratum?: string;
}
export interface CrossoverAssignment {
    id: string;
    stratum: string;
    sequence: CrossoverSequenceId;
    period1: CrossoverPeriod;
    period2: CrossoverPeriod;
}
export interface CrossoverOptions {
    seed: number;
    sequences?: readonly CrossoverSequenceId[];
}
export declare function crossoverSequencesProblems(sequences: readonly CrossoverSequenceId[]): string[];
export declare function assignCrossover(participants: readonly CrossoverParticipant[], opts: CrossoverOptions): CrossoverAssignment[];
export declare const PARALLEL_GROUPS: readonly ['dialogue', 'monologue'];
export interface ParallelAssignment {
    id: string;
    stratum: string;
    group: string;
}
export interface ParallelOptions {
    seed: number;
    groups?: readonly string[];
}
export declare function assignParallel(participants: readonly CrossoverParticipant[], opts: ParallelOptions): ParallelAssignment[];
export type CrossoverBlocks = Record<CrossoverBlock, string[]>;
export declare function defaultMeasuredLessons(course: Pick<TutorialCourse, 'lessons'>, count?: number): string[];
export declare function splitCrossoverBlocks(lessonIds: readonly string[]): CrossoverBlocks;
export declare function blockDependencies(course: Pick<TutorialCourse, 'lessons' | 'concepts'>, blocks: CrossoverBlocks): string[];
export declare const PRETEST_STRATA: readonly ['novice', 'experienced'];
export type PretestStratum = (typeof PRETEST_STRATA)[number];
export declare const PRETEST_DONT_KNOW = "N\u00E3o sei";
export interface StratumRule {
    maxNoviceCorrect: number;
    maxNoviceExperience: number;
}
export declare const PRETEST_STRATUM_RULE: StratumRule;
export interface PretestScale {
    min: number;
    max: number;
    labels: string[];
}
export declare const PRETEST_EXPERIENCE_SCALE: PretestScale;
export declare const PRETEST_CONFIDENCE_SCALE: PretestScale;
export interface PretestItem {
    id: string;
    kind: 'experience' | 'content' | 'confidence';
    stem: string;
    options?: string[];
    answer?: string;
    scale?: PretestScale;
    source?: {
        lesson: string;
        step: number;
        command: string;
    };
    skill?: string;
    form?: 'template';
}
export interface TutorialPretest {
    version: 1;
    kind: 'capi-tutorial-pretest';
    course: string;
    title: string;
    instructions: string;
    items: PretestItem[];
    scoring: {
        content: string[];
        experience: string[];
        confidence?: string;
        dontKnow: string;
        stratumRule: StratumRule;
        description: string;
    };
    needs: string[];
    warnings: string[];
}
export declare function buildPretest(course: TutorialCourse, opts?: {
    lessonIds?: readonly string[];
}): TutorialPretest;
export declare function stratumOf(correct: number, opts?: {
    experience?: number;
    rule?: Partial<StratumRule>;
}): PretestStratum;
export interface PretestScore {
    correct: number;
    of: number;
    experience?: number;
    confidence?: number;
    stratum: PretestStratum;
}
export declare function scorePretest(pretest: Pick<TutorialPretest, 'items' | 'scoring'>, answers: Readonly<Record<string, string | number | undefined>>, rule?: Partial<StratumRule>): PretestScore;
export interface PenseResponseBox {
    maxChars: number;
    lines: number;
}
export declare const PENSE_RESPONSE_BOX: PenseResponseBox;
export interface PenseMoment {
    id: string;
    text: string;
    hint?: string;
    fromMs: number;
    toMs: number;
    windowMs: number;
    responseBox: PenseResponseBox;
}
export declare function penseMoments(compiled: Pick<CompiledTutorial, 'cards'>): PenseMoment[];
export declare const UX_CURVE_KINDS: readonly ['interest', 'confusion', 'neutral'];
export type UxCurveKind = (typeof UX_CURVE_KINDS)[number];
export interface UxCurvePoint {
    tMs: number;
    valence: number;
    kind: UxCurveKind;
    note?: string;
}
export interface UxCurveRecord {
    version: 1;
    kind: 'capi-ux-curve';
    participant: string;
    lesson: string;
    condition: CrossoverCondition;
    durationMs: number;
    points: UxCurvePoint[];
    recordedAt?: string;
}
export declare const uxCurveSchema: {
    readonly $schema: 'https://json-schema.org/draft/2020-12/schema';
    readonly title: 'Curva UX de um participante numa aula';
    readonly description: 'Os momentos em que o espectador sentiu interesse ou confusão, por instante do vídeo (ms), com a valência de −2 a +2. Os pontos vão ordenados no tempo e dentro da duração do vídeo.';
    readonly type: 'object';
    readonly additionalProperties: false;
    readonly required: readonly ['version', 'kind', 'participant', 'lesson', 'condition', 'durationMs', 'points'];
    readonly properties: {
        readonly version: {
            readonly const: 1;
        };
        readonly kind: {
            readonly const: 'capi-ux-curve';
        };
        readonly participant: {
            readonly type: 'string';
            readonly minLength: 1;
            readonly description: 'O id do participante.';
        };
        readonly lesson: {
            readonly type: 'string';
            readonly pattern: "^\\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*$";
            readonly description: 'O id da aula (NN-slug).';
        };
        readonly condition: {
            readonly enum: readonly ["dialogue", "monologue"];
            readonly description: 'dialogue = Capi + Índice; monologue = só a Capi.';
        };
        readonly durationMs: {
            readonly type: 'number';
            readonly exclusiveMinimum: 0;
            readonly description: 'A duração do vídeo visto, em ms.';
        };
        readonly recordedAt: {
            readonly type: 'string';
            readonly description: 'Quando se registou (ISO 8601).';
        };
        readonly points: {
            readonly type: 'array';
            readonly description: 'Pela ordem do tempo (tMs não decrescente).';
            readonly items: {
                readonly type: 'object';
                readonly additionalProperties: false;
                readonly required: readonly ['tMs', 'valence', 'kind'];
                readonly properties: {
                    readonly tMs: {
                        readonly type: 'number';
                        readonly minimum: 0;
                        readonly description: 'O instante do vídeo, em ms (≤ durationMs).';
                    };
                    readonly valence: {
                        readonly type: 'integer';
                        readonly minimum: -2;
                        readonly maximum: 2;
                        readonly description: '−2 muito negativo … +2 muito positivo.';
                    };
                    readonly kind: {
                        readonly enum: readonly ["interest", "confusion", "neutral"];
                        readonly description: 'O que sentiu: interest, confusion ou neutral.';
                    };
                    readonly note: {
                        readonly type: 'string';
                        readonly maxLength: 280;
                        readonly description: 'Porquê, em poucas palavras (opcional).';
                    };
                };
            };
        };
    };
};
export declare function validateUxCurve(record: unknown, opts?: {
    durationMs?: number;
}): TutorialReadResult<UxCurveRecord>;
export interface TutorialPlayerRules {
    posttestUnlock: 'video-end';
    allowSeekForward: false;
    playbackRate: 1;
    responseBox: PenseResponseBox & {
        opensAt: 'pense-card-start';
        closesAt: 'learner-answer-start';
        skippable: true;
    };
    uxCurve: {
        capture: 'during-and-review';
        valence: readonly [number, number];
        kinds: readonly UxCurveKind[];
    };
    monologueSilences: {
        pauseVideo: true;
        readFrom: readonly string[];
        rule: string;
    };
    log: string[];
    records: Record<string, string>;
    recordNotes: Record<string, string>;
    source: string;
}
export declare function tutorialPlayerRules(): TutorialPlayerRules;
export interface SilenceMoment {
    id: string;
    kind: 'predict' | 'pense';
    text: string;
    fromMs: number;
    toMs: number;
}
export declare function silenceMoments(compiled: Pick<CompiledTutorial, 'cards'>): SilenceMoment[];
export interface PenseResponseRecord {
    version: 1;
    kind: 'capi-pense-response';
    participant: string;
    lesson: string;
    condition: CrossoverCondition;
    moment: string;
    text: string;
    openedAtMs: number;
    submittedAtMs: number;
}
export declare function validatePenseResponse(record: unknown, opts?: {
    answerFromMs?: number;
}): TutorialReadResult<PenseResponseRecord>;
export interface PenseResponseSummary {
    participant: string;
    lesson: string;
    condition: CrossoverCondition;
    expected: number | null;
    answered: number;
    completion: number | null;
    empty: number;
    tooLong: number;
    meanChars: number;
    medianChars: number;
    meanLatencyMs: number;
}
export interface PenseResponsesScore {
    byParticipant: PenseResponseSummary[];
    byCondition: Record<CrossoverCondition, {
        participants: number;
        answered: number;
        expected: number | null;
        completion: number | null;
        meanChars: number;
    }>;
    skipped: Array<{
        index: number;
        errors: string[];
    }>;
}
export declare function scorePenseResponses(responses: readonly unknown[], opts?: {
    expected?: Readonly<Record<string, readonly string[]>>;
}): PenseResponsesScore;
export interface UxWindowSummary {
    fromMs: number;
    toMs: number;
    interest: number;
    confusion: number;
    neutral: number;
    participants: number;
    meanValence: number;
}
export interface UxPeak {
    fromMs: number;
    toMs: number;
    points: number;
    participants: number;
    second: number;
}
export interface UxCurveSummary {
    lesson: string;
    condition: CrossoverCondition;
    participants: number;
    durationMs: number;
    windowMs: number;
    windows: UxWindowSummary[];
    confusionPeaks: UxPeak[];
    interestPeaks: UxPeak[];
}
export declare function uxCurveSummary(records: readonly unknown[], opts?: {
    windowMs?: number;
    top?: number;
}): {
    groups: UxCurveSummary[];
    skipped: Array<{
        index: number;
        errors: string[];
    }>;
};
export declare const POSTTEST_KINDS: readonly ['retention', 'transfer', 'misconception'];
export type PosttestKind = (typeof POSTTEST_KINDS)[number];
export interface PosttestRubricCriterion {
    subgoal: string;
    reference: string;
    from?: string;
    feature?: string;
}
export interface PosttestRubric {
    criteria: PosttestRubricCriterion[];
    maxPoints: number;
    instructions: string;
}
export interface PosttestItem {
    id: string;
    lesson: string;
    kind: PosttestKind;
    format: 'choice' | 'open';
    stem: string;
    options?: string[];
    answer?: string;
    expect?: string;
    rubric?: PosttestRubric;
    principalDistractor?: string;
    confidence?: {
        scale: readonly [1, 5];
        prompt: string;
        labels: readonly [string, string];
    };
    step?: number;
    form?: 'parallel' | 'variant';
    variantOf?: string;
    needs?: string[];
}
export interface TutorialPosttest {
    version: 1;
    kind: 'capi-tutorial-posttest';
    course: string;
    method: number;
    lessons: string[];
    items: PosttestItem[];
    incomplete: Array<{
        item: string;
        lesson: string;
        needs: string[];
    }>;
    warnings: string[];
}
export interface BuildPosttestOptions {
    lessons?: Readonly<Record<string, Pick<TutorialLesson, 'challenge'> | null | undefined>>;
    minMisconceptionsPerBlock?: number;
}
export declare function commandDistractors(command: string, count?: number, where?: 'python' | 'shell'): string[];
export declare function guessStatement(guess: string): string | null;
export declare function pythonOutput(expression: string): string | null;
export declare function buildPosttest(course: TutorialCourse, lessonIdsIn: readonly string[], opts?: BuildPosttestOptions): TutorialPosttest;
export interface PosttestResponse {
    item: string;
    choice?: string;
    confidence?: number;
    points?: number;
}
export interface PosttestScores {
    retention?: number;
    transfer?: number;
    misconception?: number;
    persistentMisconception?: number;
    principalDistractorRate?: number;
}
export declare function scorePosttest(posttest: Pick<TutorialPosttest, 'items'>, responses: readonly PosttestResponse[], lessonIds?: readonly string[]): PosttestScores;
export declare function logGamma(x: number): number;
export declare function regularizedIncompleteBeta(x: number, a: number, b: number): number;
export declare function studentTTwoSidedP(t: number, df: number): number;
export declare function studentTCdf(t: number, df: number): number;
export declare function studentTQuantile(p: number, df: number): number;
export declare function requiredPairs(dz: number): number | null;
export declare function requiredPairsAdjusted(dz: number, sequences: number): number | null;
export declare function requiredPerGroup(d: number, opts?: {
    rho?: number;
}): number | null;
export declare function normalCdf(x: number): number;
export declare function normalQuantile(p: number): number;
export declare function fUpperTailP(f: number, d1: number, d2: number): number;
export declare function signTestP(positive: number, negative: number): number;
export interface WilcoxonResult {
    n: number;
    wPlus: number;
    p: number;
    method: 'exact' | 'normal';
}
export declare function wilcoxonSignedRank(d: readonly number[]): WilcoxonResult | null;
export declare const CROSSOVER_OUTCOMES: readonly ['transfer', 'misconception', 'retention', 'persistent'];
export type CrossoverOutcome = (typeof CROSSOVER_OUTCOMES)[number];
export declare const CROSSOVER_PRIMARY: readonly CrossoverOutcome[];
export interface CrossoverPeriodRow {
    condition: CrossoverCondition;
    block: CrossoverBlock;
    scores: Partial<Record<CrossoverOutcome, number>> & {
        persistentMisconception?: number;
    };
}
export interface CrossoverRow {
    id: string;
    stratum: string;
    sequence: CrossoverSequenceId;
    prior?: number;
    period1: CrossoverPeriodRow;
    period2: CrossoverPeriodRow;
}
export interface AnalyzeCrossoverOptions {
    alpha?: number;
    subgroup?: {
        minN?: number;
        marginSd?: number;
    };
    sequenceAdjusted?: boolean;
    sensitivity?: 'auto' | 'always' | 'never';
}
export interface PairedStats {
    n: number;
    df: number;
    meanDialogue: number;
    meanMonologue: number;
    sdDialogue: number;
    sdMonologue: number;
    tau: number;
    sd: number;
    se: number;
    t: number;
    p: number;
    ciLevel: number;
    ci: [number, number];
    dz: number;
    dav: number;
    sequences: number;
    adjusted: boolean;
    meanD: number;
    sdTotal: number;
    inflation: number | null;
    sequenceTest?: {
        f: number;
        df1: number;
        df2: number;
        p: number;
    };
    degenerate: boolean;
}
export interface DesignBalance {
    cells: Record<string, number>;
    dialogueFirst: number;
    monologueFirst: number;
    dialogueInA: number;
    dialogueInB: number;
    balanced: boolean;
    issues: string[];
}
export interface PairedSensitivity {
    basis: string;
    reason: string;
    signTest: {
        positive: number;
        negative: number;
        ties: number;
        p: number;
    };
    wilcoxon: WilcoxonResult | null;
}
export interface PairedEffect {
    outcome: CrossoverOutcome;
    n: number;
    stats: PairedStats | null;
    excluded: Array<{
        id: string;
        reason: string;
    }>;
    reason?: string;
    balance?: DesignBalance;
    sensitivity?: PairedSensitivity;
}
export interface SubgroupCheck {
    n: number;
    identifiable: boolean;
    enough: boolean;
    tau?: number;
    ciLow?: number;
    margin: number;
    nonNegative: boolean;
    nonInferior: boolean;
}
export interface LowPriorSubgroup {
    definition: 'stratum' | 'median-prior' | 'none';
    description: string;
    n: number;
    ids: string[];
    median?: number;
    minN: number;
    marginSd: number;
    outcomes: Record<CrossoverOutcome, PairedEffect>;
    checks: Record<'transfer' | 'misconception', SubgroupCheck>;
}
export interface CrossoverCriterion {
    transfer: boolean;
    misconception: boolean;
    lowPriorNotWorse: boolean;
    passed: boolean;
}
export interface CrossoverAnalysis {
    alpha: number;
    n: number;
    balance: DesignBalance & {
        bySequence: Record<string, number>;
    };
    outcomes: Record<CrossoverOutcome, PairedEffect>;
    lowPrior: LowPriorSubgroup;
    criterion: CrossoverCriterion;
    status: 'passed' | 'not-passed' | 'inconclusive';
    verdict: string;
    warnings: string[];
}
export declare function pretestStrataWarnings(items: ReadonlyArray<{
    stratum?: string;
}>, minNovices?: number): string[];
export declare function analyzeCrossover(rows: readonly CrossoverRow[], opts?: AnalyzeCrossoverOptions): CrossoverAnalysis;
export interface ParallelRow {
    id: string;
    stratum: string;
    group: string;
    prior?: number;
    scores: Partial<Record<CrossoverOutcome, number>> & {
        persistentMisconception?: number;
    };
}
export interface AnalyzeParallelOptions {
    alpha?: number;
    versus?: string;
    subgroup?: {
        minN?: number;
        marginSd?: number;
    };
}
export interface TwoGroupStats {
    nDialogue: number;
    nControl: number;
    meanDialogue: number;
    meanControl: number;
    sdDialogue: number;
    sdControl: number;
    diff: number;
    se: number;
    df: number;
    t: number;
    p: number;
    ciLevel: number;
    ci: [number, number];
    d: number;
    g: number;
    gCi: [number, number];
}
export interface AncovaStats {
    n: number;
    df: number;
    adjustedDiff: number;
    se: number;
    t: number;
    p: number;
    ciLevel: number;
    ci: [number, number];
    slope: number;
    r2: number;
}
export interface ParallelEffect {
    outcome: CrossoverOutcome;
    nDialogue: number;
    nControl: number;
    welch: TwoGroupStats | null;
    ancova: AncovaStats | null;
    primary: 'ancova' | 'welch' | null;
    excluded: Array<{
        id: string;
        reason: string;
    }>;
    reason?: string;
}
export interface ParallelSubgroupCheck {
    nDialogue: number;
    nControl: number;
    enough: boolean;
    diff?: number;
    ciLow?: number;
    margin: number;
    nonNegative: boolean;
    nonInferior: boolean;
}
export interface ParallelSubgroup {
    definition: LowPriorSubgroup['definition'];
    description: string;
    n: number;
    ids: string[];
    median?: number;
    minN: number;
    marginSd: number;
    outcomes: Record<CrossoverOutcome, ParallelEffect>;
    checks: Record<'transfer' | 'misconception', ParallelSubgroupCheck>;
}
export interface ParallelAnalysis {
    alpha: number;
    n: number;
    versus: string;
    groups: Record<string, number>;
    outcomes: Record<CrossoverOutcome, ParallelEffect>;
    lowPrior: ParallelSubgroup;
    criterion: CrossoverCriterion;
    status: 'passed' | 'not-passed' | 'inconclusive';
    verdict: string;
    warnings: string[];
}
export declare function analyzeParallel(rows: readonly ParallelRow[], opts?: AnalyzeParallelOptions): ParallelAnalysis;
export declare const MONOLOGUE_COURSE_SUFFIX = "-monologo";
export declare function monologueCourse(course: TutorialCourse, newId?: string): TutorialCourse;
export declare function lessonSpokenWords(lesson: Pick<TutorialLesson, 'segments'>): number;
export declare const MONOLOGUE_STYLES: readonly ['exposition', 'refutation'];
export type MonologueStyle = (typeof MONOLOGUE_STYLES)[number];
export interface CheckMonologueOptions {
    style?: MonologueStyle;
    course?: TutorialCourse;
    atoms?: Readonly<Record<string, readonly string[]>>;
    wordTolerance?: number;
}
export declare function checkMonologue(monologue: TutorialLesson, dialogue: TutorialLesson, opts?: CheckMonologueOptions): string[];
