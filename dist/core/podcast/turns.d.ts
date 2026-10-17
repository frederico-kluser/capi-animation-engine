import { type PodcastSeat, type PodcastSpec, type PodcastTurnKind, type PodcastTurnSpec } from '../../contracts/podcast.js';
import type { ScriptWord } from '../../contracts/talk.js';
import type { VisemeCue } from '../../contracts/timeline.js';
export interface EffectiveWord {
    index: number;
    text: string;
    startMs: number;
    endMs: number;
    stressStartMs: number;
    stressEndMs: number;
    confidence: number;
    peakDb: number;
    f0: number;
    f0RangeSt: number;
    stretch: number;
    prominence: number;
}
export interface EffectiveTurn {
    id: string;
    index: number;
    speaker: PodcastSeat;
    kind: PodcastTurnKind;
    main: boolean;
    spec: PodcastTurnSpec;
    atMs: number;
    playMs: number;
    cut: boolean;
    words: ScriptWord[];
    times: EffectiveWord[];
    speechStartMs: number;
    speechEndMs: number;
    visemes: VisemeCue[];
}
export declare function effectiveTurns(spec: PodcastSpec, warnings?: string[]): EffectiveTurn[];
export declare const otherSeat: (seat: PodcastSeat) => PodcastSeat;
