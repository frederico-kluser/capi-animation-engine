import type { ExpressionId } from '../../contracts/face.js';
import type { PodcastListenCue, PodcastSeat } from '../../contracts/podcast.js';
import type { Point } from '../../contracts/pose.js';
import type { BlinkEvent, TimelineTrack } from '../../contracts/timeline.js';
import { type PoseId } from '../../presets/poses.js';
import type { GestureMacro } from '../talk/plan.js';
import { type Beat } from '../timeline/choreograph.js';
import type { EffectiveTurn } from './turns.js';
export interface ListenEvent {
    kind: 'nod' | 'blink' | 'reaction' | 'pose';
    atMs: number;
    turn: string;
    word?: number;
    deg?: number;
    expression?: ExpressionId;
    macro?: GestureMacro;
    pose?: PoseId;
    untilMs?: number;
    source?: 'plan' | 'auto' | 'script';
}
export type ListenBeat = Beat & {
    priority: number;
    listen: true;
    group?: string;
};
export interface ListenLayer {
    beats: ListenBeat[];
    tracks: Array<{
        track: TimelineTrack;
        atMs: number;
        priority: number;
    }>;
    blinks: BlinkEvent[];
    events: ListenEvent[];
    decisions: string[];
}
export interface ListenInput {
    seat: PodcastSeat;
    others: readonly EffectiveTurn[];
    busy: ReadonlyArray<readonly [number, number]>;
    restExpression: ExpressionId;
    restPose?: PoseId;
    energy: number;
    seed: number;
    onCamera?: ReadonlyArray<readonly [number, number]>;
    cues?: readonly PodcastListenCue[];
    occupied?: ReadonlyArray<readonly [number, number]>;
    endMs?: number;
    tvLook?: Point;
}
export declare function listenLayer(input: ListenInput): ListenLayer;
