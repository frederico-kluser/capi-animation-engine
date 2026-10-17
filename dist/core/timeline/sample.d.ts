import type { PoseChannels } from '../../contracts/pose.js';
import type { CompiledCue, CompiledPoseCue, CompiledTimeline, TimelineBase, TimelineSample } from '../../contracts/timeline.js';
export declare function sampleCues<T, C extends CompiledCue<T> = CompiledCue<T>>(cues: readonly C[], t: number, base: T, mix: (a: T, b: T, k: number) => T, valueAt?: (cue: C, t: number) => T): T | undefined;
export declare function poseCueAt(cue: CompiledPoseCue, t: number): PoseChannels;
export declare function sampleTimeline(compiled: CompiledTimeline, timeMs: number, base?: Partial<TimelineBase>): TimelineSample;
