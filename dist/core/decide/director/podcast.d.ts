import type { CameraIntentKind } from '../../../contracts/camera.js';
import { type ExpressionId } from '../../../contracts/face.js';
import type { PoseId } from '../../../presets/poses.js';
import { type AspectTurn, type PodcastAspectContext } from '../../aspects/podcast/context.js';
import type { JevAnswer, JevChoiceAnswer, JevNoulAnswer, JevRequest } from '../jev.js';
import { type CameraKeyStyle, type DirectorQuestionSet, type DirectorRubricDetail, type ListenerReactionId } from './questions.js';
import { type TalkDirectorDecision } from './talk.js';
export interface PodcastDirectorSlot {
    order: number;
    turn: AspectTurn;
    inTurn: number;
    first: number;
    last: number;
    key: number;
    text: string;
    kind: 'question' | 'exclaim' | 'statement';
    content: number;
}
export interface PodcastDirectorDecision extends TalkDirectorDecision {
    listener?: JevChoiceAnswer;
    both?: JevNoulAnswer;
}
export interface PodcastDirectorOptions {
    detail?: DirectorRubricDetail;
    cameraKeys?: CameraKeyStyle;
}
export declare function podcastDirectorSlots(ctx: Pick<PodcastAspectContext, 'turns'>): PodcastDirectorSlot[];
export declare function podcastDirectorPoses(): PoseId[];
export declare function podcastDirectorState(slot: PodcastDirectorSlot, slots: readonly PodcastDirectorSlot[], ctx: Pick<PodcastAspectContext, 'seats'>): Record<string, string>;
export declare function podcastDirectorIntents(ctx: Pick<PodcastAspectContext, 'camera' | 'profile' | 'review'>): CameraIntentKind[];
export declare function podcastDirectorQuestions(ctx: Pick<PodcastAspectContext, 'camera' | 'profile' | 'review'>, options?: PodcastDirectorOptions): DirectorQuestionSet;
export declare function podcastDirectorRequests(ctx: PodcastAspectContext, options?: PodcastDirectorOptions): {
    slots: PodcastDirectorSlot[];
    requests: JevRequest[];
};
export declare function readPodcastDirectorDecision(answers: Readonly<Record<string, JevAnswer>> | undefined): PodcastDirectorDecision;
export declare const LISTENER_REACTIONS: Readonly<Record<Exclude<ListenerReactionId, 'none'>, {
    pose?: PoseId;
    expression?: ExpressionId;
    macro?: 'agree' | 'deny' | 'laugh';
}>>;
export interface PodcastDirectorValues {
    'gestures-host': Record<string, unknown>;
    'gestures-guest': Record<string, unknown>;
    expressions: Record<string, unknown>;
    interactions: Record<string, unknown>;
    camera: Record<string, unknown>;
    notes: string[];
}
export declare function podcastDirectorValues(ctx: PodcastAspectContext, slots: readonly PodcastDirectorSlot[], decisions: readonly (PodcastDirectorDecision | undefined)[]): PodcastDirectorValues;
