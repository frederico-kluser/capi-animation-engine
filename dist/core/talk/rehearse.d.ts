import type { ExpressionId } from '../../contracts/face.js';
import type { PoseId } from '../../presets/poses.js';
import { type EstimatedSpeech, type EstimateSpeechOptions, type SpeechRate } from './estimate.js';
import type { GestureMacro, TalkPlan } from './plan.js';
import { type GestureStatus, type ResolveResult } from './resolve.js';
import type { Tone } from './tones.js';
export type RehearsalMarkKind = 'greeting' | 'farewell' | 'gesture' | 'nod';
export interface RehearsalMark {
    atMs: number;
    word: number;
    text: string;
    kind: RehearsalMarkKind;
    pose?: PoseId;
    plannedPose?: PoseId;
    macro?: GestureMacro;
    expression?: ExpressionId;
    status?: GestureStatus;
    note?: string;
}
export interface RehearsalWord {
    index: number;
    text: string;
    sentence: number;
    startMs: number;
    endMs: number;
}
export interface Rehearsal {
    text: string;
    tone: Tone;
    rate: SpeechRate;
    speech: EstimatedSpeech;
    plan: TalkPlan;
    resolved: ResolveResult;
    seed: number;
    words: RehearsalWord[];
    marks: RehearsalMark[];
    greeting?: {
        word: number;
        text: string;
    };
    farewell?: {
        word: number;
        text: string;
    };
}
export interface RehearseInput {
    text: string;
    tone: Tone;
    seed?: number;
    model?: string;
    speech?: Omit<EstimateSpeechOptions, 'tone'>;
}
export declare function rehearseTalk(input: RehearseInput): Rehearsal;
