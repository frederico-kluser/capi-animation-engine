import type { Expression, ExpressionInput, MouthId, MouthShape } from '../../contracts/face.js';
import type { SpeechSample } from '../../contracts/timeline.js';
export declare function mixMouth(a: MouthShape, b: MouthShape, t: number): MouthShape;
export declare function mixExpression(a: Expression, b: Expression, t: number): Expression;
export declare function resolveMouth(input: MouthId | Partial<MouthShape>, base: MouthShape, warnings?: string[]): MouthShape;
export declare function resolveExpression(input: ExpressionInput | undefined, warnings?: string[]): Expression;
export declare function speechMouth(sample: SpeechSample, expressionMouth: MouthShape): MouthShape;
