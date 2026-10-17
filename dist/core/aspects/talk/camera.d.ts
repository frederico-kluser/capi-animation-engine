import type { CameraAspectValue } from '../../../contracts/aspects.js';
import { type CameraIntent, type CameraMoveKind, type CameraStyle, type ShotSize } from '../../../contracts/camera.js';
import type { ScriptWord } from '../../../contracts/talk.js';
import { cameraBudgetPerMinute, type CameraShape, type CameraVocabulary } from '../../../presets/catalog/camera.js';
import { type TalkAspectContext, type TalkAspectPeers, type TalkSpeechTiming } from './context.js';
import { type AspectParseResult } from './parse.js';
export declare const TALK_CAMERA_INTENTS: readonly ["emphasis", "punchline", "reveal", "question", "speaker", "topicShift", "closing", "hook", "aside", "list", "impact", "cta"];
export type TalkCameraIntentKind = (typeof TALK_CAMERA_INTENTS)[number];
export interface TalkCameraValue extends CameraAspectValue {
    summary?: string;
}
export interface TalkCameraBudget {
    punchIns: number;
    snaps: number;
    pushes: number;
    transitions: number;
}
export type CameraBudgetKind = 'punchIn' | 'snap' | 'push' | 'return' | 'free';
type IntentLook = Pick<CameraIntent, 'intent' | 'size' | 'move' | 'angle' | 'transition'>;
export declare function intentShape(intent: Pick<CameraIntent, 'intent' | 'size' | 'move'>): {
    size: ShotSize;
    move: CameraMoveKind;
};
export declare function talkIntentLook(intent: IntentLook): CameraShape;
export declare function budgetKind(intent: IntentLook): CameraBudgetKind;
export declare function talkCameraBudget(style: CameraStyle, seconds: number): TalkCameraBudget;
export declare function talkCameraVocabulary(ctx: Pick<TalkAspectContext, 'cameraStyle'> & Pick<Partial<TalkAspectContext>, 'profile' | 'review'>): CameraVocabulary;
export declare function cameraSchemaText(vocabulary: CameraVocabulary): string;
export declare const CAMERA_SCHEMA_TEXT: string;
export declare function buildCameraMessages(ctx: TalkAspectContext, peers?: TalkAspectPeers): {
    system: string;
    user: string;
};
type TalkCameraParseContext = Pick<TalkAspectContext, 'words' | 'cameraStyle'> & Pick<Partial<TalkAspectContext>, 'profile' | 'review'>;
export declare function parseCamera(content: string, ctx: TalkCameraParseContext): AspectParseResult<TalkCameraValue>;
export declare function scoreCamera(value: TalkCameraValue, problems: readonly string[], ctx: Pick<TalkAspectContext, 'cameraStyle'> & Pick<Partial<TalkAspectContext>, 'words'> & {
    speech: Pick<TalkSpeechTiming, 'alignment'> & Pick<Partial<TalkSpeechTiming>, 'prosody' | 'silences'>;
}): number;
export declare function cameraFallback(ctx: Pick<TalkAspectContext, 'words' | 'cameraStyle' | 'speech'> & Pick<Partial<TalkAspectContext>, 'profile' | 'review'>): TalkCameraValue;
export declare function describeCamera(value: TalkCameraValue, words: readonly Pick<ScriptWord, 'text'>[]): string;
export declare function intentTimes(value: TalkCameraValue, timing: Pick<TalkSpeechTiming, 'alignment'>): Array<{
    intent: CameraIntent;
    atMs: number;
    untilMs?: number;
}>;
export { cameraBudgetPerMinute };
