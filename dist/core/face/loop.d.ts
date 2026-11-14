import type { Expression, ExpressionInput, MouthId, MouthShape } from '../../contracts/face.js';
import type { CompiledMouthLoop } from '../../contracts/timeline.js';
import { type LoopMode } from '../../presets/loops.js';
export declare function compileMouthLoop(mouth: MouthId | Partial<MouthShape> | undefined): CompiledMouthLoop | undefined;
export declare function compileExpressionLoop(input: ExpressionInput | undefined): CompiledMouthLoop | undefined;
export declare function mouthLoopCycles(loop: CompiledMouthLoop): number;
export declare function applyMouthLoop(clean: MouthShape, loop: CompiledMouthLoop, sinceMs: number, mode: LoopMode): MouthShape;
export declare function applyExpressionLoop(clean: Expression, loop: CompiledMouthLoop, sinceMs: number, mode: LoopMode): Expression;
