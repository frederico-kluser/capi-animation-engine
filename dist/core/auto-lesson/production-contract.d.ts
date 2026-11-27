import type { AutoLessonVideoRoute } from '../../contracts/auto-lesson.js';
import type { TutorialLesson } from '../../contracts/tutorial.js';
import type { TutorialProductionContract } from '../talk/config.js';
import { type ContractIssue, type CtaPlacement, type LessonProductionContract, type Seat } from '../../contracts/lesson-production.js';
export interface ContractRoadmapLesson {
    id: string;
    number: number;
    title: string;
    role?: string;
    newIdea?: string;
    objective?: string;
    summary?: string;
    introduces?: readonly {
        id: string;
        forms?: readonly string[];
        code?: readonly string[];
    }[];
    check?: {
        kind?: string;
        prompt: string;
        expected: string;
        misconceptionAnswer: string;
    };
    guests?: readonly {
        persona: string;
        mode: string;
        name?: string;
    }[];
    practice?: {
        tech?: string;
        where?: string;
        plan?: string;
        modality?: string;
    };
    knownIssues?: readonly string[] | null;
}
export interface ContractRoadmapCourse {
    id: string;
    code?: string;
    title: string;
    tech?: string;
}
export interface ContractCastSeat {
    name: string;
    characterId: string | null;
    role?: string;
    seat?: Seat;
}
export interface ContractGuestSeat {
    persona: string;
    name?: string;
    mode?: string;
    characterId: string | null;
    inCast?: boolean;
    living?: boolean;
    factIds?: readonly string[];
    cautionIds?: readonly string[];
}
export interface ContractCast {
    teacher: ContractCastSeat;
    learner: ContractCastSeat;
    guests: readonly ContractGuestSeat[];
}
export interface ContractBuilderLesson {
    id: string;
    number: number;
    title?: string;
    teaches?: readonly string[];
    practices?: readonly string[];
    visitors?: readonly string[];
    hasScript?: boolean;
    state?: string;
}
export interface ContractBuilderCourse {
    outlineLessons: number;
}
export interface RouteCapabilities {
    learnerComputer: boolean;
    terminalEvidence: boolean;
    interviewGuest: boolean;
    cardGuest: boolean;
    contextualCta: boolean;
}
export declare const ROUTE_CAPABILITIES: Readonly<Record<AutoLessonVideoRoute, RouteCapabilities>>;
export declare const GUEST_POLICIES: readonly ['roadmap', 'promote-cast'];
export type GuestPolicy = (typeof GUEST_POLICIES)[number];
export declare const INTERVIEW_GUEST_MODES: readonly ['ensina', 'debate'];
export declare const CARD_GUEST_MODES: readonly ['abre', 'cartao'];
export interface ContractPolicy {
    guests: GuestPolicy;
    cta: CtaPlacement | 'none';
    approvedScaffoldTokens?: readonly string[];
    requiredPredictionCount?: number;
}
export interface ContractRouteChoice {
    requested: AutoLessonVideoRoute;
    asked: boolean;
}
export interface LessonContractInput {
    lesson: ContractRoadmapLesson;
    course: ContractRoadmapCourse;
    courseLessons: readonly ContractRoadmapLesson[];
    cast: ContractCast;
    builder?: {
        course?: ContractBuilderCourse | null;
        lesson?: ContractBuilderLesson | null;
    } | null;
    route: ContractRouteChoice;
    capabilities?: Partial<Record<AutoLessonVideoRoute, RouteCapabilities>>;
    policy: ContractPolicy;
    roadmapHash: string;
}
export declare const CONTRACT_CODES: readonly ['OK', 'INPUT_CONFLICT', 'ROUTE_UNSUPPORTED', 'INVALID_INPUT'];
export type ContractCode = (typeof CONTRACT_CODES)[number];
export interface ContractResult {
    code: ContractCode;
    contract: LessonProductionContract | null;
    route: AutoLessonVideoRoute | null;
    issues: ContractIssue[];
    notes: string[];
}
export declare function exactCheckLines(check: {
    kind?: string;
    prompt: string;
}): string[];
export declare function exactCheckCommands(check: {
    kind?: string;
    prompt: string;
}): string[];
export declare function compileLessonContract(input: LessonContractInput): ContractResult;
export declare function productionContractMode(value: TutorialProductionContract | undefined): 'legacy' | 'strict';
export interface ScriptRevalidation {
    ok: boolean;
    issues: ContractIssue[];
    notes: string[];
}
export declare function revalidateLessonScript(contract: LessonProductionContract, script: TutorialLesson | null): ScriptRevalidation;
