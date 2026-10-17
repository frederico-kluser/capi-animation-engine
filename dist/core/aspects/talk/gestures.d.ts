import type { CatalogDetail } from '../../../contracts/catalog.js';
import type { ProfileAspect } from '../../../contracts/profile.js';
import type { PoseId } from '../../../presets/poses.js';
import { type TalkGesture, type TalkPlan } from '../../talk/plan.js';
import type { AspectParseResult } from './parse.js';
import { type TalkAspectContext, type TalkAspectPeers, type TalkSpeechTiming } from './context.js';
export interface TalkGesturesValue {
    summary?: string;
    energy?: number;
    start: {
        pose: PoseId;
    };
    end: {
        pose: PoseId;
    };
    gestures: TalkGesture[];
}
export declare function describePoses(poses?: readonly PoseId[], options?: {
    detail?: CatalogDetail;
    aspects?: readonly ProfileAspect[];
}): string;
export declare const GESTURES_SCHEMA_TEXT = "{\n  \"summary\": \"one sentence: the body performance idea\",\n  \"energy\": 0.0-1.0,\n  \"start\": { \"pose\": \"<pose id>\" },\n  \"gestures\": [\n    {\n      \"word\": <int, index of the word whose stressed syllable the gesture lands on>,\n      \"pose\": \"<pose id>\",\n      \"accent\": \"soft\" | \"normal\" | \"strong\"   (optional, default normal),\n      \"take\": true                    (optional: a surprise reaction, at most once),\n      \"macro\": \"wave\"                 (optional: the FAREWELL wave only),\n      \"priority\": 1-5                 (5 = never drop, 1 = first to drop if the rhythm has no room),\n      \"why\": \"<= 12 words\"\n    }\n  ],\n  \"end\": { \"pose\": \"<pose id>\" }\n}";
export declare const GESTURES_CLOSING = "Decide by meaning, concisely: choose the gestures that say what the words say, land each on its key word, keep the spacing of rule 2, answer. The engine already enforces the timing and the wave rules, drops a gesture that does not fit and opens the camera for a wide one \u2014 so do NOT re-check your plan rule by rule or compute milliseconds.";
export declare function buildGesturesMessages(ctx: TalkAspectContext, peers?: TalkAspectPeers): {
    system: string;
    user: string;
};
export declare function parseGestures(content: string, ctx: Pick<TalkAspectContext, 'words'> & Pick<Partial<TalkAspectContext>, 'review'>): AspectParseResult<TalkGesturesValue>;
export declare function gesturesNeedRepair(parsed: {
    value: TalkGesturesValue | null;
    problems: readonly string[];
}): boolean;
export declare function gesturesAsPlan(value: TalkGesturesValue, ctx: Pick<TalkAspectContext, 'tone'>): TalkPlan;
export declare function scoreGestures(value: TalkGesturesValue, problems: readonly string[], ctx: Pick<TalkAspectContext, 'words' | 'tone' | 'measuredMs'> & Pick<Partial<TalkAspectContext>, 'review'> & {
    speech: TalkSpeechTiming;
}): number;
export declare function gesturesFallback(ctx: Pick<TalkAspectContext, 'words' | 'tone' | 'speech'> & Pick<Partial<TalkAspectContext>, 'review'>): TalkGesturesValue;
export declare function describeGestures(value: TalkGesturesValue, words: readonly {
    text: string;
}[]): string;
