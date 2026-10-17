import type { CameraPanel } from '../../contracts/camera.js';
import type { CaptionCue, CaptionFrame, CaptionTrack } from '../../contracts/captions.js';
import type { PodcastSeat } from '../../contracts/podcast.js';
import { type SafeArea, type VideoProfileId } from '../../contracts/profile.js';
import { type FrameAspect } from '../set/frame.js';
export interface CaptionFrameOptions {
    aspect: FrameAspect;
    profile?: VideoProfileId;
    safe?: SafeArea;
    panels?: readonly CameraPanel[];
    panelsAt?: ((timeMs: number) => readonly CameraPanel[] | null | undefined) | undefined;
    shot?: {
        fromMs: number;
        toMs: number;
    } | undefined;
    headTop?: number | null | undefined;
    headTops?: Partial<Record<PodcastSeat, number | null>> | undefined;
}
export declare function captionCueAt(track: CaptionTrack | undefined, timeMs: number): CaptionCue | undefined;
export interface LineLayout {
    lines: number[][];
    widest: number;
    scale: number;
}
export declare function layoutCaptionLines(texts: readonly string[], options: {
    weight: number;
    gapEm: number;
    maxEm: number;
    maxLines: number;
    minScale: number;
    measure?: (text: string) => number;
    unit?: number;
}): LineLayout;
export declare function captionFrameAt(track: CaptionTrack | undefined, timeMs: number, options: CaptionFrameOptions): CaptionFrame | null;
