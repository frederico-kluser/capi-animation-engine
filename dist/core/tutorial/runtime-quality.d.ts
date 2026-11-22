import type { ExactLessonCheck, LessonPhase, LessonProductionContract, LessonRoles, ReconciledLessonBundle, Seat } from '../../contracts/lesson-production.js';
import type { LessonQualityReport } from '../../contracts/lesson-quality.js';
import type { SegmentProductionPlan } from '../../contracts/lesson-segments.js';
import type { CompiledTutorial, TutorialActionKind, TutorialOverlay, TutorialSegmentKind } from '../../contracts/tutorial.js';
export declare const RUNTIME_PAUSE_INTENTS: readonly ['think', 'read', 'predict', 'beat', 'unknown'];
export type RuntimePauseIntent = (typeof RUNTIME_PAUSE_INTENTS)[number];
export type RuntimeSpeakerRole = 'teacher' | 'learner' | 'visitor';
export type RuntimeSpeaker = 'host' | 'guest' | 'visitor';
export type RuntimeTurnCategory = 'turns' | 'predictTurns' | 'afterTurns' | 'visit';
export interface RuntimeLessonSource {
    readonly version: 1;
    readonly kind: 'capi-lesson-source';
    readonly identity: {
        readonly lessonId: string;
        readonly lessonSlug: string;
        readonly kind: 'capi-tutorial-lesson';
        readonly course: string;
        readonly number: number;
        readonly title: string;
        readonly objective: string;
        readonly teaches: readonly string[];
        readonly contract: {
            readonly version: 1;
            readonly kind: 'capi-lesson-production';
            readonly lessonId: string;
            readonly roadmapHash: string;
        };
        readonly roles: LessonRoles;
        readonly check: ExactLessonCheck;
    };
    readonly roles: {
        readonly contract: LessonRoles;
        readonly seatCharacterIds: Readonly<Record<Seat, string>>;
        readonly seatRoles: Readonly<Record<Seat, 'teacher' | 'learner'>>;
        readonly teacherCharacterId: string;
        readonly learnerCharacterId: string;
        readonly teacherSeat: Seat;
        readonly learnerSeat: Seat;
    };
    readonly pacing: {
        readonly teacherSeat: Seat;
        readonly teacherCharacterId: string;
        readonly learnerSeat: Seat;
        readonly learnerCharacterId: string;
        readonly driverSeat: Seat;
        readonly roleSource: 'contract';
    };
    readonly segments: readonly {
        readonly segmentId: string;
        readonly kind: TutorialSegmentKind;
        readonly turnIds: readonly string[];
        readonly actionIds: readonly string[];
        readonly cardId: string | null;
        readonly questionId: string | null;
        readonly visitId: string | null;
    }[];
    readonly turns: readonly {
        readonly sourceTurnId: string;
        readonly segmentId: string;
        readonly category: RuntimeTurnCategory;
        readonly speaker: RuntimeSpeaker;
        readonly role: RuntimeSpeakerRole;
        readonly characterId: string;
        readonly text: string;
    }[];
    readonly textUnits: readonly {
        readonly sourceTurnId: string;
        readonly segmentId: string;
        readonly category: 'say' | 'after';
        readonly text: string;
    }[];
    readonly actions: readonly {
        readonly sourceActionId: string;
        readonly segmentId: string;
        readonly kind: TutorialActionKind;
        readonly text: string | null;
    }[];
    readonly cards: readonly {
        readonly cardId: string;
        readonly segmentId: string;
        readonly kind: string;
        readonly term: string;
        readonly definition: string;
    }[];
    readonly questions: readonly {
        readonly questionId: string;
        readonly segmentId: string;
        readonly text: string;
        readonly thinkMs: number;
    }[];
    readonly analogies: readonly {
        readonly analogyId: string;
        readonly segmentId: string;
        readonly title: string;
        readonly limit: string;
    }[];
    readonly visits: readonly {
        readonly visitId: string;
        readonly segmentId: string;
        readonly visitorId: string;
        readonly characterId: string;
        readonly personaId: string;
        readonly turnIds: readonly string[];
    }[];
    readonly coverage: {
        readonly segments: number;
        readonly turns: number;
        readonly textUnits: number;
        readonly actions: number;
        readonly cards: number;
        readonly questions: number;
        readonly analogies: number;
        readonly visits: number;
        readonly terminalActions: number;
        readonly check: {
            readonly promptChars: number;
            readonly expectedChars: number;
            readonly promptLines: number;
            readonly expectedLines: number;
        };
    };
    readonly sourceHash: string;
}
export interface RuntimeAuditAsset {
    readonly id: string;
    readonly kind: string;
    readonly hash: string;
    readonly present: boolean;
    readonly required?: boolean;
}
export interface RuntimeAuditVoice {
    readonly turnId: string;
    readonly clipHash: string;
    readonly durationMs: number;
}
export interface RuntimeAuditVisit {
    readonly visitorId: string;
    readonly blockIds: readonly string[];
    readonly turnIds: readonly string[];
    readonly visibleFromMs: number;
    readonly visibleToMs: number;
    readonly voiceClipIds: readonly string[];
}
export interface RuntimeAuditPose {
    readonly fromMs: number;
    readonly toMs: number;
    readonly characterId: string;
    readonly pose: string;
    readonly focused?: boolean;
    readonly phase?: LessonPhase;
}
export interface RuntimeAuditTerminalEvent {
    readonly type: string;
    readonly atMs: number;
    readonly keys?: string;
}
export interface RuntimeAuditTerminal {
    readonly opened: boolean;
    readonly events: readonly RuntimeAuditTerminalEvent[];
    readonly outputs?: readonly string[];
}
export interface RuntimeAuditCardWindow {
    readonly cardId: string;
    readonly fromMs: number;
    readonly toMs: number;
    readonly term?: string;
    readonly personaId?: string;
    readonly factIds?: readonly string[];
}
export interface RuntimeAuditPause {
    readonly fromMs: number;
    readonly toMs: number;
    readonly intent: RuntimePauseIntent;
    readonly phase?: LessonPhase;
    readonly focusVisible: boolean;
    readonly evidence?: string;
}
export interface RuntimeAuditCta {
    readonly blockIds?: readonly string[];
    readonly turnIds?: readonly string[];
    readonly fromMs?: number;
    readonly toMs?: number;
    readonly text?: string;
}
export interface RuntimeAuditLegacyLint {
    readonly ok: boolean;
    readonly issues?: readonly string[];
}
export interface RuntimeAuditCue {
    readonly cueId: string;
    readonly kind: string;
    readonly atMs?: number;
}
export interface RuntimeAuditInput {
    readonly contract: LessonProductionContract;
    readonly reconciled: ReconciledLessonBundle;
    readonly source: RuntimeLessonSource;
    readonly plan: SegmentProductionPlan;
    readonly compiled: CompiledTutorial;
    readonly overlay?: TutorialOverlay;
    readonly assets?: readonly RuntimeAuditAsset[];
    readonly voices?: readonly RuntimeAuditVoice[];
    readonly visits?: readonly RuntimeAuditVisit[];
    readonly poses?: readonly RuntimeAuditPose[];
    readonly terminal?: RuntimeAuditTerminal;
    readonly cards?: readonly RuntimeAuditCardWindow[];
    readonly pauses?: readonly RuntimeAuditPause[];
    readonly cta?: RuntimeAuditCta;
    readonly legacyLint?: RuntimeAuditLegacyLint;
    readonly declaredCues?: readonly RuntimeAuditCue[];
    readonly lessonHash: string;
    readonly validationVersion: string;
}
export declare function auditLessonRuntime(input: RuntimeAuditInput): LessonQualityReport;
