import type { PoseChannels } from '../../contracts/pose.js';
import type { Expression } from '../../contracts/face.js';
import type { CompiledCue, CompiledExpressionCue, CompiledPoseCue, CompiledTimeline, TimelineBase, TimelineSample } from '../../contracts/timeline.js';
export declare function sampleCues<T, C extends CompiledCue<T> = CompiledCue<T>>(cues: readonly C[], t: number, base: T, mix: (a: T, b: T, k: number) => T, valueAt?: (cue: C, t: number) => T, mixLinear?: (a: T, b: T, cue: C, u: number) => T): T | undefined;
export declare function poseCueAt(cue: CompiledPoseCue, t: number): PoseChannels;
export declare function expressionCueAt(cue: CompiledExpressionCue, t: number): Expression;
export declare function sampleTimeline(compiled: CompiledTimeline, timeMs: number, base?: Partial<TimelineBase>): TimelineSample;
