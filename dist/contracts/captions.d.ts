import type { CameraBox } from './camera.js';
import type { PodcastSeat } from './podcast.js';
export declare const CAPTION_STYLE_IDS: readonly ['off', 'lines', 'karaoke'];
export type CaptionStyleId = (typeof CAPTION_STYLE_IDS)[number];
export interface CaptionWord {
    text: string;
    fromMs: number;
    toMs: number;
    strong?: boolean;
}
export interface CaptionCue {
    fromMs: number;
    toMs: number;
    words: CaptionWord[];
    seat?: PodcastSeat;
}
export interface CaptionTrack {
    style: CaptionStyleId;
    cues: CaptionCue[];
}
export type CaptionWordState = 'past' | 'now' | 'next';
export interface CaptionFrame {
    style: Exclude<CaptionStyleId, 'off'>;
    lines: Array<Array<{
        text: string;
        state: CaptionWordState;
        strong?: boolean;
    }>>;
    seat?: PodcastSeat;
    box: CameraBox;
    fontSize: number;
    pop: number;
}
