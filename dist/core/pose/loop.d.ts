import type { PoseChannels, PoseInput } from '../../contracts/pose.js';
import type { CompiledPoseLoop } from '../../contracts/timeline.js';
import { type LoopGroup, type LoopMode } from '../../presets/loops.js';
export declare function compilePoseLoop(input: PoseInput | undefined): CompiledPoseLoop | undefined;
export declare function mixPoseParts(clean: PoseChannels, swing: PoseChannels, w: Readonly<Record<LoopGroup, number>>): PoseChannels;
export declare function applyPoseLoop(clean: PoseChannels, loop: CompiledPoseLoop, sinceMs: number, mode: LoopMode): PoseChannels;
