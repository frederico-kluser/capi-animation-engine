import type { PersonaSpec } from '../../contracts/persona.js';
import type { TutorialCourse, TutorialHistoricalPersona } from '../../contracts/tutorial.js';
import type { LessonGuestBrief } from './parts.js';
export interface HistoricalCourseOptions {
    catalogue: readonly TutorialHistoricalPersona[];
    fixed?: TutorialHistoricalPersona;
    openingModes?: Readonly<Record<string, 'abre' | 'cartao'>>;
}
export declare const HISTORICAL_COURSE_POLICY = "ONE HISTORICAL PERSON FOR THE WHOLE COURSE: choose exactly ONE real deceased person (living:false, never an archetype) from the supplied EXISTING catalogue, famous and directly relevant to the subject. Keep that same historicalPersona in EVERY lesson, including integrations and consolidations; never choose a new guest per lesson. A fixed persona from the owner, the existing course or the roadmap MUST NOT change. The historical person is separate from the TEACHER and LEARNER.\nEach lesson has one historicalParticipation: bridge, learnerQuestion and central connect the person to THIS lesson, within its vocabulary and scope; fact is optional on returns and may only come from supplied sources. Only the first lesson may use mode:abre, and only when the supplied opening mode authorizes this person's ONE global introduction (R6). Later lessons are returns: cartao/ensina/debate, no new introduction, name-and-dates biography or repeated origin story. Existing character = a relevant speaking visit even in cartao mode; no character = a narrated historical card, NEVER invented portrait/voice/character. Keep historical facts separate from modern teaching analogies: do not attribute Python, Linux or later inventions to an earlier person. If no eligible person fits well, choose the closest existing one and state the gap, never invent a persona.";
export declare function readHistoricalPersona(raw: unknown): {
    value: TutorialHistoricalPersona | null;
    errors: string[];
};
export declare function historicalCourseErrors(raw: unknown, options?: {
    required?: boolean;
}): string[];
export declare function bindCourseHistory(raw: Record<string, unknown>, options?: HistoricalCourseOptions): Record<string, unknown>;
export declare function historicalLessonGuests(course: TutorialCourse, lessonId: string, given?: readonly LessonGuestBrief[], cast?: readonly PersonaSpec[]): LessonGuestBrief[];
export declare function isHistoricalCard(course: Pick<TutorialCourse, 'historicalPersona'>, card: unknown): boolean;
export declare function historicalLessonContext(course: TutorialCourse, lessonId: string, guests: readonly LessonGuestBrief[]): string;
