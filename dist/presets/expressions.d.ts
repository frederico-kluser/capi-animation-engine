import type { Expression, ExpressionId } from '../contracts/face.js';
export declare const EXPRESSIONS: Record<ExpressionId, Expression>;
export declare const EXPRESSION_LABELS: Record<ExpressionId, string>;
export declare function isExpressionId(value: unknown): value is ExpressionId;
