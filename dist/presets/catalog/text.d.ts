import type { CameraCard, CameraCardKind, CatalogDetail, CatalogMode } from '../../contracts/catalog.js';
import { type ExpressionId } from '../../contracts/face.js';
import type { ProfileAspect } from '../../contracts/profile.js';
import { type PoseId } from '../poses.js';
import { type CameraVocabularyRequest } from './camera.js';
export interface PoseCatalogTextOptions {
    detail?: CatalogDetail;
    aspects?: readonly ProfileAspect[];
    faces?: boolean;
}
export declare function poseCatalogText(ids?: readonly PoseId[], options?: PoseCatalogTextOptions): string;
export declare function poseCatalogTextFor(mode: CatalogMode, options?: PoseCatalogTextOptions): string;
export declare function poseCatalogLegend(detail?: CatalogDetail): string;
export interface ExpressionCatalogTextOptions {
    detail?: CatalogDetail;
    ids?: readonly ExpressionId[];
    poses?: boolean;
}
export declare function expressionCatalogText(options?: ExpressionCatalogTextOptions): string;
export interface CameraCatalogRequest extends CameraVocabularyRequest {
    detail?: CatalogDetail;
    durationMs?: number;
}
export declare function cameraCatalogLegend(detail?: CatalogDetail): string;
export declare function cameraCatalogText(request: CameraCatalogRequest): string;
export declare function cameraCatalogText(cards: readonly CameraCard[], options?: {
    detail?: CatalogDetail;
}): string;
export declare function cameraCardsOf(kinds?: readonly CameraCardKind[]): CameraCard[];
export declare function catalogTextSize(text: string): {
    chars: number;
    lines: number;
    tokens: number;
};
