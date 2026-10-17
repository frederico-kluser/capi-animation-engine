import type { PoseChannels, PoseInput } from '../../contracts/pose.js';
import type { CompiledPoseLoop } from '../../contracts/timeline.js';
import { type LoopMode } from '../../presets/loops.js';
export declare function compilePoseLoop(input: PoseInput | undefined): CompiledPoseLoop | undefined;
export declare function applyPoseLoop(clean: PoseChannels, loop: CompiledPoseLoop, sinceMs: number, mode: LoopMode): PoseChannels;
