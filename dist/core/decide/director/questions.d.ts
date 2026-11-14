import type { CameraIntentKind } from '../../../contracts/camera.js';
import { type ExpressionId } from '../../../contracts/face.js';
import type { PoseId } from '../../../presets/poses.js';
import type { JevChoiceQuestion, JevNoulQuestion, JevQuestion, JevRubric, JevScoreQuestion } from '../jev.js';
export type DirectorRubricDetail = 'brief' | 'full';
export declare const DIRECTOR_RUBRIC_DETAILS: readonly ["brief", "full"];
export declare const DIRECTOR_RUBRIC_DEFAULT: DirectorRubricDetail;
export declare const DIRECTOR_NONE = "none";
export interface DirectorRubricTuning {
    not_for?: string;
    examples?: readonly string[];
}
export declare const DIRECTOR_POSE_TUNING: Readonly<Partial<Record<PoseId, DirectorRubricTuning>>>;
export declare const DIRECTOR_EXPRESSION_TUNING: Readonly<Partial<Record<ExpressionId, DirectorRubricTuning>>>;
export declare const DIRECTOR_CAMERA_TUNING: Readonly<Partial<Record<CameraIntentKind, DirectorRubricTuning>>>;
export declare function poseRubric(id: PoseId, detail?: DirectorRubricDetail): JevRubric;
export declare function expressionRubric(id: ExpressionId, detail?: DirectorRubricDetail): JevRubric;
export declare function cameraIntentRubric(id: CameraIntentKind, detail?: DirectorRubricDetail): JevRubric;
export type DirectorStage = 'talk' | 'podcast' | 'review';
export declare function poseQuestion(poses: readonly PoseId[], stage: DirectorStage, detail?: DirectorRubricDetail): JevChoiceQuestion;
export declare function expressionQuestion(ids?: readonly ExpressionId[], stage?: DirectorStage, detail?: DirectorRubricDetail): JevChoiceQuestion;
export declare const CAMERA_WIRE_KEYS: Readonly<Record<CameraIntentKind, string>>;
export declare function cameraIntentOfKey(key: string): CameraIntentKind | typeof DIRECTOR_NONE | undefined;
export type CameraKeyStyle = 'wire' | 'ids';
export declare function cameraQuestion(intents: readonly CameraIntentKind[], stage: DirectorStage, detail?: DirectorRubricDetail, keys?: CameraKeyStyle): JevChoiceQuestion;
export declare const SALIENCE_LEVELS: readonly ['A filler, connective or transitional line (so, well, as I said, let us see): nothing to show with the body.', 'An ordinary informative line that simply continues the explanation.', 'An important claim, a striking fact, a strong opinion or a clear emotion.', 'The line that stands out most in its passage: the key point, the climax, a punchline, a big reveal or a shocking number.'];
export declare function salienceQuestion(): JevScoreQuestion;
export declare function enumerationQuestion(): JevNoulQuestion;
export declare function jokeQuestion(): JevNoulQuestion;
export declare function stanceQuestion(): JevChoiceQuestion;
export declare const LISTENER_REACTION_IDS: readonly ['nod', 'laugh', 'doubt', 'surprise', 'ponder', 'engaged', "none"];
export type ListenerReactionId = (typeof LISTENER_REACTION_IDS)[number];
export declare function listenerQuestion(): JevChoiceQuestion;
export declare function bothOnScreenQuestion(): JevNoulQuestion;
export interface DirectorQuestionSet {
    pose?: JevChoiceQuestion;
    expression?: JevChoiceQuestion;
    camera?: JevChoiceQuestion;
    salience?: JevScoreQuestion;
    enumeration?: JevNoulQuestion;
    joke?: JevNoulQuestion;
    stance?: JevChoiceQuestion;
    listener?: JevChoiceQuestion;
    both?: JevNoulQuestion;
}
export declare function questionMap(set: DirectorQuestionSet): Record<string, JevQuestion>;
