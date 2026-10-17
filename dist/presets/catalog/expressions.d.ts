import type { ExpressionCard, ExpressionCatalogCard, ExpressionFacts } from '../../contracts/catalog.js';
import { type ExpressionId } from '../../contracts/face.js';
import { type PoseId } from '../poses.js';
export declare const EXPRESSION_CARDS: Record<ExpressionId, ExpressionCard>;
export declare function expressionFacts(id: ExpressionId): ExpressionFacts;
export declare function poseFaces(id: PoseId): ExpressionId[];
export declare function expressionPoses(id: ExpressionId): PoseId[];
export declare function expressionCard(id: ExpressionId): ExpressionCatalogCard<ExpressionId, PoseId>;
