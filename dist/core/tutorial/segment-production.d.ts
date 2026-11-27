import { type LessonPhase, type LessonProductionContract } from '../../contracts/lesson-production.js';
import { type PauseIntent, type SegmentProductionPlan } from '../../contracts/lesson-segments.js';
import type { TutorialLesson, TutorialSegment } from '../../contracts/tutorial.js';
export type SegmentHash = (value: unknown) => string;
export interface SegmentPlanningInput {
    lesson: TutorialLesson;
    contract: LessonProductionContract;
    lessonHash: string;
    hash: SegmentHash;
    initialKnowledgeIds?: readonly string[];
    terminalSessionId?: string;
    captureObserved?: boolean;
}
export declare const SEGMENT_PHASE_REQUIREMENTS: Readonly<Record<LessonPhase, readonly string[]>>;
export declare function segmentTurnId(segmentId: string, field: 'turns' | 'predictTurns' | 'afterTurns' | 'visit', index: number): string;
export declare function segmentActionId(segmentId: string, index: number): string;
export declare function segmentTurnIds(segment: TutorialSegment): string[];
export declare function segmentPauseIntent(segment: TutorialSegment): PauseIntent;
export declare function planLessonSegments(input: SegmentPlanningInput): SegmentProductionPlan;
