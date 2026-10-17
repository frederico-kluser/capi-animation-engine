import type { PodcastPlannedGesture, PodcastSeat, PodcastSpec } from '../../contracts/podcast.js';
import { type PlanCheck, type TalkPlan } from '../talk/plan.js';
import { type Tone } from '../talk/tones.js';
import { restExpressionFor } from './compile.js';
import { type PodcastSeatWords } from './seat-words.js';
export declare function scriptedTurns(spec: PodcastSpec): Set<string>;
export interface PodcastPlannerInput {
    spec: PodcastSpec;
    seat: PodcastSeat;
    words?: PodcastSeatWords;
    direction?: string;
    prosody?: boolean;
    languageLabel?: string;
    repair?: {
        previous: string;
        problems: readonly string[];
    };
    review?: {
        text?: string;
    };
}
export declare function buildPodcastPlannerMessages(input: PodcastPlannerInput): {
    system: string;
    user: string;
};
export declare function checkPodcastPlan(raw: unknown, words: PodcastSeatWords): PlanCheck;
export declare function seatGesturesFromPlan(plan: TalkPlan, words: PodcastSeatWords, options?: {
    scripted?: ReadonlySet<string>;
    why?: string;
}): {
    gestures: PodcastPlannedGesture[];
    notes: string[];
};
export declare function seatTalkPlan(spec: PodcastSpec, seat: PodcastSeat, words?: PodcastSeatWords): TalkPlan;
export declare function podcastFallbackPlan(spec: PodcastSpec, seat: PodcastSeat, options?: {
    words?: PodcastSeatWords;
    tone?: Tone;
    scripted?: ReadonlySet<string>;
}): PodcastPlannedGesture[];
export declare function podcastTargetGestures(spec: PodcastSpec, seat: PodcastSeat): number;
export declare const PODCAST_PLAN_SCHEMA: string;
export declare function podcastRest(tone: string | undefined): {
    pose: 'idle';
    expression: ReturnType<typeof restExpressionFor>;
};
