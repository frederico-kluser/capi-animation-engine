import type { PodcastSeat } from '../../contracts/podcast.js';
import type { TutorialCourse, TutorialFinding, TutorialLesson, TutorialSegment, TutorialVisitor } from '../../contracts/tutorial.js';
export declare const LESSON_STRUCTURE_LIMITS: {
    readonly introMinTurns: 6;
    readonly introHardMinTurns: 4;
    readonly visitMinVisitorLines: 4;
    readonly visitLineMinWords: 8;
    readonly maxTurnWords: 34;
    readonly wordsPerMinute: 122;
    readonly minutes: readonly [6, 10];
    readonly minutesHard: readonly [4.5, 13];
    readonly maxWords: 1500;
    readonly minWords: 600;
    readonly avgTurnWords: 18;
    readonly avgTurnWordsHard: 22;
    readonly teacherRunWords: 50;
    readonly teacherRunWordsHard: 70;
    readonly checkIns: 3;
    readonly checkInsHard: 2;
    readonly stretchWords: 200;
    readonly viewerSilenceMs: 3000;
    readonly stepOverheadMs: 6000;
    readonly typingCps: 4.5;
};
export interface LessonStructureOptions {
    course?: {
        title?: unknown;
        cast?: unknown;
        historicalPersona?: unknown;
    } | null;
    courseShortTitle?: string;
    visitors?: ReadonlyArray<TutorialVisitor | string>;
    numeric?: boolean;
    typingCps?: number;
}
export interface LessonSpokenTurn {
    segment: string;
    kind: string;
    speaker: PodcastSeat | 'visitor';
    text: string;
    words: number;
    thinkMs: number;
}
export interface LessonPace {
    words: number;
    turns: number;
    avgTurnWords: number;
    teacherTurns: number;
    learnerTurns: number;
    visitorTurns: number;
    maxTeacherRun: {
        words: number;
        segment?: string;
    };
    checkIns: number;
    maxStretch: {
        words: number;
        segment?: string;
    };
    thinkMs: number;
    typingMs: number;
    steps: number;
    minutes: number;
}
export declare function structureRoles(cast: unknown): {
    teacher: PodcastSeat;
    learner: PodcastSeat;
    teacherName: string;
    learnerName: string;
};
export declare function courseShortTitle(title: unknown): string;
export declare function lessonSpokenTurns(lesson: unknown): LessonSpokenTurn[];
export declare function lessonPace(lesson: unknown, opts?: Pick<LessonStructureOptions, 'course' | 'typingCps'>): LessonPace;
export declare function checkLessonStructure(lesson: TutorialLesson | unknown, opts?: LessonStructureOptions): TutorialFinding[];
export declare function isPartsLesson(lesson: TutorialLesson | unknown): boolean;
export declare function authoredLessonPipeline(lesson: TutorialLesson | unknown): 'parts' | 'single';
export declare const segmentKinds: (lesson: unknown) => Array<Pick<TutorialSegment, 'id' | 'kind'>>;
export type LessonStructureCourse = Pick<TutorialCourse, 'title' | 'cast' | 'historicalPersona'>;
