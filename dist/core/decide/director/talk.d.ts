import type { ScriptWord } from '../../../contracts/talk.js';
import type { PoseId } from '../../../presets/poses.js';
import { type SentenceKind, type TalkAspectContext } from '../../aspects/talk/context.js';
import type { JevAnswer, JevChoiceAnswer, JevNoulAnswer, JevRequest, JevScoreAnswer } from '../jev.js';
import { type CameraKeyStyle, type DirectorQuestionSet, type DirectorRubricDetail } from './questions.js';
export interface TalkDirectorSlot {
    order: number;
    first: number;
    last: number;
    key: number;
    kind: SentenceKind;
    position: 'opening' | 'middle' | 'closing';
    text: string;
    content: number;
}
export interface TalkDirectorDecision {
    pose?: JevChoiceAnswer;
    expression?: JevChoiceAnswer;
    camera?: JevChoiceAnswer;
    salience?: JevScoreAnswer;
    enumeration?: JevNoulAnswer;
    joke?: JevNoulAnswer;
    stance?: JevChoiceAnswer;
}
export interface TalkDirectorOptions {
    detail?: DirectorRubricDetail;
    cameraKeys?: CameraKeyStyle;
    aspects?: ReadonlyArray<'gestures' | 'face' | 'camera'>;
}
export declare function talkDirectorPoses(ctx: Pick<Partial<TalkAspectContext>, 'review'>): PoseId[];
export declare function talkDirectorSlots(ctx: Pick<TalkAspectContext, 'words' | 'speech'>): TalkDirectorSlot[];
export declare function talkDirectorState(slot: TalkDirectorSlot, slots: readonly TalkDirectorSlot[], ctx: Pick<TalkAspectContext, 'words' | 'tone'>): Record<string, string>;
export declare function talkDirectorQuestions(ctx: Pick<TalkAspectContext, 'cameraStyle'> & Pick<Partial<TalkAspectContext>, 'review' | 'profile'>, options?: TalkDirectorOptions): DirectorQuestionSet;
export declare function talkDirectorRequests(ctx: TalkAspectContext, options?: TalkDirectorOptions): {
    slots: TalkDirectorSlot[];
    requests: JevRequest[];
};
export declare function cameraAnswerToIntents(answer: JevChoiceAnswer): JevChoiceAnswer | undefined;
export declare function readTalkDirectorDecision(answers: Readonly<Record<string, JevAnswer>> | undefined): TalkDirectorDecision;
export declare function rankedOptions(answer: JevChoiceAnswer | undefined): Array<{
    id: string;
    p: number;
}>;
export declare function slotSalience(decision: TalkDirectorDecision | undefined): number;
export declare function ordinalOf(words: readonly ScriptWord[], slot: Pick<TalkDirectorSlot, 'first' | 'last'>): number | undefined;
export interface TalkDirectorValues {
    gestures: Record<string, unknown>;
    face: Record<string, unknown>;
    camera: Record<string, unknown>;
    notes: string[];
}
export declare function talkDirectorValues(ctx: TalkAspectContext, slots: readonly TalkDirectorSlot[], decisions: readonly (TalkDirectorDecision | undefined)[]): TalkDirectorValues;
