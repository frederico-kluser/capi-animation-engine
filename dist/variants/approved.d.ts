import type { Pose } from '../contracts/pose.js';
import { type ApprovedVariant, type LoopVariantData, type VersionId } from '../contracts/variant.js';
import type { AnchorScript } from '../core/timeline/choreograph.js';
export declare const APPROVED_POSES: Readonly<Partial<Record<string, ApprovedVariant<Pose>>>>;
export declare const APPROVED_LOOPS: Readonly<Partial<Record<string, ApprovedVariant<LoopVariantData<Pose>>>>>;
export declare const APPROVED_SCRIPTS: Readonly<Partial<Record<string, ApprovedVariant<AnchorScript>>>>;
export declare const APPROVED_IDS: Readonly<Record<string, VersionId>>;
