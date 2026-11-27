import type { CharacterId } from './character.js';
import type { OutfitInput } from './outfit.js';
import type { PodcastSeat } from './podcast.js';
import type { VideoProfileId } from './profile.js';
import type { ReviewAnchor, ReviewAspect, ReviewRect } from './review.js';
export declare const TUTORIAL_PLAN_VERSION = 1;
export interface TutorialScreen {
    width: number;
    height: number;
    scale: number;
    fps: number;
}
export type TutorialTarget = {
    x: number;
    y: number;
} | {
    terminal: string;
    row: number;
    col?: number;
    toCol?: number;
} | {
    terminal: string;
    text: string;
    occurrence?: number;
} | {
    window: string;
    at?: 'center' | 'title';
};
export type TutorialPlacement = 'center' | 'right' | 'left' | 'top-right' | 'full' | ReviewRect;
export type TutorialAction = {
    do: 'terminal.open';
    id: string;
    title?: string;
    cols?: number;
    rows?: number;
    at?: TutorialPlacement;
    cwd?: string;
    fontSize?: number;
} | {
    do: 'terminal.focus';
    id: string;
} | {
    do: 'type';
    text: string;
    cps?: number;
} | {
    do: 'key';
    keys: string;
} | {
    do: 'run';
    text: string;
    cps?: number;
    wait?: {
        text?: string;
        timeoutMs?: number;
        quietMs?: number;
    };
} | {
    do: 'wait';
    terminal?: string;
    text?: string;
    timeoutMs?: number;
    quietMs?: number;
} | {
    do: 'pause';
    ms: number;
    reason?: 'read' | 'beat' | 'think';
} | {
    do: 'point';
    target: TutorialTarget;
    ms?: number;
} | {
    do: 'click';
    target?: TutorialTarget;
    button?: 1 | 2 | 3;
    double?: boolean;
} | {
    do: 'read';
    id: string;
    terminal?: string;
    lines?: number;
} | {
    do: 'mark';
    id: string;
    note?: string;
} | {
    do: 'focus';
    target: TutorialTarget | ReviewRect;
    why?: string;
} | {
    do: 'clear';
    terminal?: string;
} | {
    do: 'file.write';
    path: string;
    content: string;
};
export type TutorialActionKind = TutorialAction['do'];
export interface TutorialPlanStep {
    id: string;
    actions: TutorialAction[];
}
export interface TutorialActionPlan {
    version: typeof TUTORIAL_PLAN_VERSION;
    take: string;
    course: string;
    lesson: string;
    screen: TutorialScreen;
    workspace?: string;
    resetDesktop?: boolean;
    leadMs?: number;
    tailMs?: number;
    typingCps?: number;
    steps: TutorialPlanStep[];
}
export interface TutorialPoint {
    x: number;
    y: number;
}
export interface TutorialTerminalGeometry {
    origin: TutorialPoint;
    cellWidth: number;
    cellHeight: number;
    cols: number;
    rows: number;
}
export type TutorialEvent = {
    t: number;
    type: 'take';
    width: number;
    height: number;
    scale: number;
    fps: number;
} | {
    t: number;
    type: 'step';
    id: string;
    phase: 'start' | 'end';
} | {
    t: number;
    type: 'window';
    id: string;
    title?: string;
    rect: ReviewRect;
    terminal?: TutorialTerminalGeometry;
    closed?: boolean;
} | {
    t: number;
    type: 'move';
    t1: number;
    from: TutorialPoint;
    to: TutorialPoint;
} | {
    t: number;
    type: 'click';
    x: number;
    y: number;
    button: number;
    double?: boolean;
} | {
    t: number;
    type: 'type';
    t1: number;
    text: string;
    times: number[];
    window?: string;
} | {
    t: number;
    type: 'key';
    keys: string;
    window?: string;
} | {
    t: number;
    type: 'caret';
    x: number;
    y: number;
    h: number;
    window?: string;
} | {
    t: number;
    type: 'wait';
    t1: number;
    for?: string;
    ok: boolean;
} | {
    t: number;
    type: 'pause';
    t1: number;
    reason: 'read' | 'beat' | 'think';
} | {
    t: number;
    type: 'result';
    id: string;
    text: string;
    rect: ReviewRect;
    window?: string;
} | {
    t: number;
    type: 'mark';
    id: string;
    note?: string;
} | {
    t: number;
    type: 'focus';
    rect: ReviewRect;
    why?: string;
} | {
    t: number;
    type: 'end';
};
export type TutorialEventType = TutorialEvent['type'];
export interface TutorialTakeManifest {
    version: 1;
    take: string;
    course: string;
    lesson: string;
    vm: {
        instance: string;
        snapshotBefore?: string;
    };
    screen: TutorialScreen;
    durationMs: number;
    t0Epoch: number;
    files: {
        video: string;
        events: string;
        plan: string;
        workspace?: string;
        log?: string;
    };
    steps: Array<{
        id: string;
        fromMs: number;
        toMs: number;
    }>;
    results: Record<string, string>;
    capture: {
        encoder: string;
        args: string[];
        droppedFrames?: number;
        duplicatedFrames?: number;
    };
    warnings: string[];
    createdAt: string;
}
export interface TutorialTimeSegment {
    fromMs: number;
    toMs: number;
    speed: number;
    speedTo?: number;
    baseFromMs: number;
    baseMs: number;
    kind: 'normal' | 'ramp' | 'fast';
}
export interface TutorialTimeMap {
    version: 1;
    takeMs: number;
    baseMs: number;
    segments: TutorialTimeSegment[];
}
export declare const TUTORIAL_CARD_KINDS: readonly ['concept', 'analogy', 'question'];
export type TutorialCardKind = (typeof TUTORIAL_CARD_KINDS)[number];
export interface TutorialCard {
    id: string;
    kind?: TutorialCardKind;
    overScreen?: boolean;
    mapping?: Array<{
        from: string;
        to: string;
    }>;
    limit?: string;
    term: string;
    definition: string;
    details?: string[];
    example?: string;
    note?: string;
    concept?: string;
}
export declare const TUTORIAL_SCREEN_STYLES: readonly ['monitor', 'window'];
export type TutorialScreenStyle = (typeof TUTORIAL_SCREEN_STYLES)[number];
export interface TutorialOverlay {
    version: 1;
    course: string;
    lesson: string;
    take: string;
    screen: TutorialScreen;
    events: TutorialEvent[];
    cards: Array<TutorialCard & {
        block: string;
    }>;
    blocks?: Record<string, {
        segment: string;
        role: TutorialBlockRole;
        label?: string;
    }>;
    blockFocus?: Record<string, {
        result?: string;
        rect?: ReviewRect;
        wide?: boolean;
    }>;
    driver?: PodcastSeat;
    laptop?: TutorialLaptopModel;
    screenStyle?: TutorialScreenStyle;
    zoom?: {
        enabled?: boolean;
        max?: number;
    };
    cursor?: {
        enabled?: boolean;
        scale?: number;
    };
    visits?: TutorialOverlayVisit[];
    study?: {
        url: string;
        blocks: string[];
    };
}
export declare const TUTORIAL_LAPTOP_MODELS: readonly ['orange', 'alien', 'thinkpad'];
export type TutorialLaptopModel = (typeof TUTORIAL_LAPTOP_MODELS)[number];
export declare const TUTORIAL_BLOCK_ROLES: readonly ['intro', 'scene', 'visit', 'announce', 'predict', 'explain', 'card', 'analogy', 'think', 'recap', 'outro'];
export type TutorialBlockRole = (typeof TUTORIAL_BLOCK_ROLES)[number];
export interface TutorialZoomKey {
    atMs: number;
    cx: number;
    cy: number;
    zoom: number;
    transitionMs: number;
    path?: 'edges';
    why?: string;
}
export interface TutorialClickMark {
    atMs: number;
    x: number;
    y: number;
}
export interface TutorialCardWindow extends TutorialCard {
    block: string;
    fromMs: number;
    toMs: number;
}
export interface CompiledTutorial {
    zoom: TutorialZoomKey[];
    pointer: Array<{
        fromMs: number;
        toMs: number;
        from: TutorialPoint;
        to: TutorialPoint;
    }>;
    clicks: Array<TutorialClickMark & {
        videoMs: number;
    }>;
    typing: Array<{
        fromMs: number;
        toMs: number;
    }>;
    cards: TutorialCardWindow[];
    steps?: Array<{
        label: string;
        fromMs: number;
        toMs: number;
    }>;
    study?: Array<{
        url: string;
        fromMs: number;
        toMs: number;
    }>;
    screenStyle: TutorialScreenStyle;
    cursor: {
        enabled: boolean;
        scale: number;
    };
    screenAspect: number;
    uiScale: number;
    captureWidth: number;
    warnings: string[];
}
export interface TutorialFrame {
    view: ReviewRect;
    cursor?: {
        x: number;
        y: number;
        opacity: number;
        press: number;
        scale: number;
    };
    ripples: Array<{
        x: number;
        y: number;
        p: number;
    }>;
    card?: {
        card: TutorialCardWindow;
        enter: number;
        exit: number;
        ageMs: number;
    };
    dim: number;
    step?: {
        label: string;
        opacity: number;
    };
    study?: {
        url: string;
        opacity: number;
    };
}
export declare const TUTORIAL_COURSE_VERSION = 1;
export interface TutorialConcept {
    id: string;
    title: string;
    summary: string;
    atoms?: string[];
    terms?: string[];
    requires?: string[];
    from?: string;
}
export declare const TUTORIAL_CAST_ROLES: readonly ['teacher', 'learner'];
export type TutorialCastRole = (typeof TUTORIAL_CAST_ROLES)[number];
export interface TutorialCastMember {
    character: CharacterId;
    name: string;
    voice?: string;
    tone?: string;
    outfit?: OutfitInput;
    personality?: string;
    role?: TutorialCastRole;
}
export interface TutorialVmConfig {
    instance?: string;
    image?: string;
    cpus?: number;
    memoryGiB?: number;
    diskGiB?: number;
    screen?: Partial<TutorialScreen>;
    packages?: string[];
}
export declare const TUTORIAL_LESSON_STATES: readonly ['planned', 'scripted', 'checked', 'recorded', 'produced', 'exported'];
export type TutorialLessonState = (typeof TUTORIAL_LESSON_STATES)[number];
export interface TutorialCourseLesson {
    id: string;
    number: number;
    title: string;
    teaches: string[];
    receptive?: string[];
    presumes?: string[];
    state: TutorialLessonState;
    take?: string;
    export?: string;
    role?: TutorialLessonRole;
    module?: string;
    outline?: TutorialLessonOutline;
    historicalParticipation?: TutorialHistoricalParticipation;
    check?: TutorialPlanCheck;
    previousPublic?: boolean;
}
export interface TutorialPlanCheck {
    kind?: string;
    prompt: string;
    expected?: string;
    misconceptionAnswer?: string;
}
export interface TutorialHistoricalPersona {
    id: string;
    name: string;
    living: false;
    kind?: 'pessoa';
    bio?: string;
    cautions?: string[];
}
export interface TutorialHistoricalParticipation {
    mode: 'abre' | 'cartao' | 'ensina' | 'debate';
    fact?: string;
    bridge: string;
    learnerQuestion: string;
    central: string;
}
export interface TutorialCourse {
    version: typeof TUTORIAL_COURSE_VERSION;
    kind: 'capi-tutorial-course';
    id: string;
    title: string;
    subject: string;
    audience: string;
    language: string;
    entry: {
        competence: string;
        concepts: string[];
    };
    exit: {
        competence: string;
    };
    concepts: TutorialConcept[];
    lessons: TutorialCourseLesson[];
    historicalPersona?: TutorialHistoricalPersona;
    cast: {
        host: TutorialCastMember;
        guest?: TutorialCastMember | null;
    };
    video?: {
        profile?: VideoProfileId;
        aspect?: ReviewAspect;
        cameraStyle?: string;
        laptop?: TutorialLaptopModel;
        typingCps?: number;
    };
    vm?: TutorialVmConfig;
    source?: {
        createdAt?: string;
        model?: string;
        prompt?: string;
    };
    modules?: TutorialCourseModule[];
    research?: TutorialCourseResearch;
}
export declare const TUTORIAL_SEGMENT_KINDS: readonly ['intro', 'scene', 'visit', 'step', 'card', 'analogy', 'think', 'recap', 'outro'];
export type TutorialSegmentKind = (typeof TUTORIAL_SEGMENT_KINDS)[number];
export interface TutorialTurn {
    speaker: PodcastSeat;
    text: string;
    tone?: string;
    thinkMs?: number;
}
export type TutorialVisitSpeaker = PodcastSeat | 'visitor';
export interface TutorialVisitTurn extends Omit<TutorialTurn, 'speaker'> {
    speaker: TutorialVisitSpeaker;
}
export interface TutorialVisitor {
    id: string;
    name: string;
    role?: string;
    introduce?: boolean;
}
export interface TutorialVisitorCast extends TutorialVisitor {
    character: CharacterId;
    voice?: string;
    tone?: string;
    outfit?: OutfitInput;
    personality?: string;
}
export interface TutorialVisitLine {
    id: string;
    text: string;
    tone?: string;
    thinkMs?: number;
    at: ReviewAnchor;
    after?: string;
}
export interface TutorialOverlayVisit {
    segment: string;
    visitor: TutorialVisitorCast;
    blocks: string[];
    lines: TutorialVisitLine[];
}
export interface TutorialAnalogy {
    title: string;
    mapping: Array<{
        from: string;
        to: string;
    }>;
    limit: string;
    concept?: string;
    boundaryQuestion?: string;
}
export interface TutorialQuestion {
    text: string;
    hint?: string;
    thinkMs: number;
}
export interface TutorialSegment {
    id: string;
    kind: TutorialSegmentKind;
    say?: string;
    turns?: TutorialTurn[];
    actions?: TutorialAction[];
    after?: string;
    afterTurns?: TutorialTurn[];
    card?: Omit<TutorialCard, 'id'>;
    focusResult?: string;
    visit?: {
        visitor: string;
        turns: TutorialVisitTurn[];
    };
    label?: string;
    analogy?: TutorialAnalogy;
    question?: TutorialQuestion;
    predictTurns?: TutorialTurn[];
    expect?: string;
}
export declare const TUTORIAL_LESSON_VERSION = 1;
export interface TutorialLesson {
    version: typeof TUTORIAL_LESSON_VERSION;
    kind: 'capi-tutorial-lesson';
    id: string;
    course: string;
    number: number;
    title: string;
    objective: string;
    teaches: string[];
    receptive?: string[];
    practices?: string[];
    segments: TutorialSegment[];
    challenge?: {
        statement: string;
        solution?: string;
    };
    visitors?: TutorialVisitor[];
    source?: {
        createdAt?: string;
        model?: string;
        note?: string;
        request?: string;
        parts?: Record<string, {
            model?: string;
            cached?: boolean;
        }>;
    };
}
export declare const TUTORIAL_FIX_KINDS: readonly ['reorder', 'split', 'add-card', 'demonstrate', 'practice', 'declare', 'fix'];
export type TutorialFixKind = (typeof TUTORIAL_FIX_KINDS)[number];
export declare const TUTORIAL_GATE_IDS: readonly ['T0-forma', 'T1-ordem', 'T2-termos', 'T3-micro', 'T4-demonstra', 'T5-revisao', 'T6-cartao', 'D1-dupla', 'D2-analogia', 'D3-prever', 'D4-pensar', 'D5-ritmo', 'D6-cena', 'D7-recuperar', 'D8-passos', 'D9-conceito', 'D10-erro', 'D11-direcao', 'E0-entrada', 'O1-esboco', 'O2-pratica', 'O3-roadmap', 'A1-abertura', 'A2-apresentacao', 'A3-visita', 'A4-exercicios', 'A5-compasso', 'A6-numeros'];
export type TutorialGateId = (typeof TUTORIAL_GATE_IDS)[number];
export interface TutorialFinding {
    gate: TutorialGateId;
    severity: 'error' | 'warning';
    lesson?: string;
    segment?: string;
    subject?: string;
    message: string;
    fix: TutorialFixKind;
}
export interface TutorialGateReport {
    ok: boolean;
    findings: TutorialFinding[];
    lessons: Array<{
        id: string;
        budgetIn: string[];
        teaches: string[];
        usedAtoms: string[];
        usedTerms: string[];
        cards: string[];
        practiced: string[];
    }>;
}
export declare const TUTORIAL_LESSON_ROLES: readonly ['regular', 'integration', 'consolidation'];
export type TutorialLessonRole = (typeof TUTORIAL_LESSON_ROLES)[number];
export interface TutorialCourseModule {
    id: string;
    title: string;
    summary?: string;
    gateway?: boolean;
}
export declare const TUTORIAL_OUTLINE_PLACES: readonly ['python', 'shell'];
export type TutorialOutlinePlace = (typeof TUTORIAL_OUTLINE_PLACES)[number];
export interface TutorialOutlineStep {
    label: string;
    command: string;
    expect?: string;
    predict?: string;
    guess?: string;
    guessWhy?: string;
    contrast?: string;
}
export interface TutorialLessonOutline {
    objective: string;
    where: TutorialOutlinePlace;
    hook: {
        situation: string;
        question: string;
    };
    retrieval?: string;
    analogy: {
        title: string;
        mapping: Array<{
            from: string;
            to: string;
        }>;
        limit: string;
        boundaryQuestion?: string;
    };
    card?: {
        term: string;
        definition: string;
    };
    steps: TutorialOutlineStep[];
    misconception?: string;
    predictionMisconception?: string;
    learnerArc?: TutorialLearnerArc;
    think: string;
    resolution: string;
    practices?: string[];
    outOfScope?: string[];
    challenge?: string;
    sources?: string[];
}
export interface TutorialCourseResearch {
    prompt: string;
    document: string;
    sha1: string;
    outlinedAt: string;
    model?: string;
    rounds?: number;
}
export declare const TUTORIAL_COURSE_BRIEF_VERSION = 1;
export interface TutorialCourseBrief {
    version: typeof TUTORIAL_COURSE_BRIEF_VERSION;
    kind: 'capi-tutorial-course-brief';
    id: string;
    topic: string;
    audience: string;
    entry?: string;
    goal?: string;
    lessons?: number;
    tech: TutorialOutlinePlace;
    notes?: string;
    historicalPersona?: TutorialHistoricalPersona;
    language: string;
    cast: {
        host: TutorialCastMember;
        guest: TutorialCastMember;
    };
    video?: TutorialCourse['video'];
    createdAt: string;
}
export declare const TUTORIAL_METHOD_VERSION = 2;
export declare const TUTORIAL_MOMENTS: readonly ['cena', 'analogia', 'conceito', 'passos', 'previsao', 'pergunta', 'erro', 'resumo', 'desfecho'];
export type TutorialMoment = (typeof TUTORIAL_MOMENTS)[number];
export declare const TUTORIAL_LEARNER_LEVELS: readonly ['intuicao', 'hipotese', 'conflito', 'mestria'];
export type TutorialLearnerLevel = (typeof TUTORIAL_LEARNER_LEVELS)[number];
export interface TutorialLearnerArc {
    intuition: string;
    hypothesis: string;
    conflict: string;
    mastery: string;
}
export type TutorialVoice = 'teacher' | 'learner';
export declare const TUTORIAL_REVIEW_SCOPES: readonly ['outline', 'lesson'];
export type TutorialReviewScope = (typeof TUTORIAL_REVIEW_SCOPES)[number];
export interface TutorialReviewFinding {
    check: string;
    severity: 'blocker' | 'suggestion';
    lesson?: string;
    segment?: string;
    message: string;
    fix: string;
}
export interface TutorialDoubt {
    id: string;
    source: 'rule' | 'outline-review' | 'lesson-review';
    kind: string;
    lesson: string;
    question: string;
    why: string;
}
export interface TutorialReviewCheck {
    check: string;
    ok: boolean;
    evidence: string;
}
export interface TutorialReviewReport {
    version: 1;
    scope: TutorialReviewScope;
    checkedAt: string;
    verdict: 'pass' | 'revise';
    rounds: number;
    findings: TutorialReviewFinding[];
    checks?: TutorialReviewCheck[];
    doubts: TutorialDoubt[];
    model?: string;
    cost?: number;
}
export interface TutorialChecklistItem {
    n: number;
    id: string;
    moment: number;
    question: string;
    ok: boolean | null;
    gates: TutorialGateId[];
    notes: string[];
}
export interface TutorialChecklist {
    version: 1;
    lesson: string;
    checkedAt: string;
    items: TutorialChecklistItem[];
    generalErrors?: string[];
    ok: boolean;
}
