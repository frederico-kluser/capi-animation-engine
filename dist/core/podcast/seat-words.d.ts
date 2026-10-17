import type { PodcastSeat, PodcastSpec, PodcastTurnKind } from '../../contracts/podcast.js';
import type { AlignmentResult, ScriptWord, WordProsody } from '../../contracts/talk.js';
import { type EffectiveTurn } from './turns.js';
export interface PodcastSeatWords {
    seat: PodcastSeat;
    words: ScriptWord[];
    alignment: AlignmentResult;
    prosody: WordProsody[];
    refs: Array<{
        turn: string;
        word: number;
    }>;
    turns: Array<{
        id: string;
        kind: PodcastTurnKind;
        main: boolean;
        first: number;
        last: number;
    }>;
}
export declare function joinTurnWords(turns: readonly EffectiveTurn[], origin?: number): {
    words: ScriptWord[];
    alignment: AlignmentResult;
    prosody: WordProsody[];
    refs: Array<{
        turn: string;
        word: number;
    }>;
    spans: Array<{
        id: string;
        first: number;
        last: number;
    }>;
};
export declare function seatWords(spec: PodcastSpec, seat: PodcastSeat, turns?: readonly EffectiveTurn[]): PodcastSeatWords;
