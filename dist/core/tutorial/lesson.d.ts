import type { PodcastSeat } from '../../contracts/podcast.js';
import type { ReviewScript } from '../../contracts/review.js';
import type { TutorialAction, TutorialActionPlan, TutorialCourse, TutorialEvent, TutorialLesson, TutorialOverlay, TutorialScreen, TutorialVisitorCast } from '../../contracts/tutorial.js';
import { PREDICT_STEP_SUFFIX } from './enter.js';
export { PREDICT_STEP_SUFFIX };
export declare const TUTORIAL_DEFAULT_SCREEN: TutorialScreen;
export declare const TUTORIAL_STEP_BEAT_MS = 450;
export interface TutorialReadResult<T> {
    value: T | null;
    errors: string[];
    warnings: string[];
}
export declare function readTutorialLesson(raw: unknown): TutorialReadResult<TutorialLesson>;
export declare function readTutorialCourse(raw: unknown): TutorialReadResult<TutorialCourse>;
export declare function tutorialVmInstance(course: Pick<TutorialCourse, 'id' | 'vm'>): string;
export declare function tutorialScreenOf(course: Pick<TutorialCourse, 'vm'>): TutorialScreen;
export declare function predictSplit(actions: readonly TutorialAction[]): {
    before: TutorialAction[];
    after: TutorialAction[];
} | null;
export declare const TUTORIAL_TYPING_CPS = 4.5;
export declare function lessonToPlan(lesson: TutorialLesson, course: Pick<TutorialCourse, 'id' | 'vm' | 'video'>, take: string): TutorialActionPlan;
export interface LessonReviewParts {
    script: ReviewScript;
    overlay: Pick<TutorialOverlay, 'cards' | 'blocks' | 'blockFocus' | 'visits' | 'study'>;
    warnings: string[];
}
export declare function tutorialRoles(cast: TutorialCourse['cast']): {
    teacher: PodcastSeat;
    learner?: PodcastSeat;
};
export declare function tutorialDriverSeat(cast: TutorialCourse['cast']): PodcastSeat;
export declare function spokenText(text: string): string;
export declare function checkExplanations(lesson: Pick<TutorialLesson, 'segments'>, results: Readonly<Record<string, string>>): string[];
export declare function stepTimes(events: readonly TutorialEvent[]): Map<string, {
    fromMs: number;
    toMs: number;
}>;
export declare function lessonToReviewScript(lesson: TutorialLesson, course: Pick<TutorialCourse, 'title' | 'cast' | 'language' | 'video'>, input: {
    events: readonly TutorialEvent[];
    durationMs: number;
    visitors?: Readonly<Record<string, TutorialVisitorCast>>;
    studyUrl?: string;
    videoFps?: number;
    exactBase?: boolean;
}): LessonReviewParts;
export declare const TUTORIAL_STUDY_MENTION: RegExp;
