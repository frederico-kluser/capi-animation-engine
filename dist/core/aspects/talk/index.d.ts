import type { TalkAspectId } from '../../../contracts/aspects.js';
import { type TalkCameraValue } from './camera.js';
import type { TalkAspectContext, TalkAspectPeers } from './context.js';
import { type TalkFaceValue } from './face.js';
import { type TalkGesturesValue } from './gestures.js';
import type { AspectParseResult } from './parse.js';
export * from './camera.js';
export * from './compose.js';
export * from './context.js';
export * from './face.js';
export * from './gestures.js';
export * from './parse.js';
export * from './review.js';
export * from './timing.js';
export interface TalkAspectValues {
    gestures: TalkGesturesValue;
    face: TalkFaceValue;
    camera: TalkCameraValue;
}
export interface TalkAspectTaskSpec<T> {
    id: TalkAspectId;
    mode: 'talk';
    system: string;
    user: string;
    parse(content: string): AspectParseResult<T>;
    score(value: T, problems: readonly string[]): number;
    needsRepair?(parsed: {
        value: T | null;
        problems: readonly string[];
        fatal: boolean;
    }): boolean;
    fallback(): T;
    note?: string;
}
export declare function talkAspectTask<K extends TalkAspectId>(id: K, ctx: TalkAspectContext, peers?: TalkAspectPeers): TalkAspectTaskSpec<TalkAspectValues[K]>;
export declare function talkAspectFallback<K extends TalkAspectId>(id: K, ctx: TalkAspectContext): TalkAspectValues[K];
export declare function talkAspectPeers(values: Partial<TalkAspectValues>, words: readonly {
    text: string;
}[]): TalkAspectPeers;
export declare function readTalkAspectValue<K extends TalkAspectId>(id: K, value: unknown, ctx: TalkAspectContext): TalkAspectValues[K] | null;
