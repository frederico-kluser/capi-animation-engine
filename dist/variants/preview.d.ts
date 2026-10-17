import type { GloveVersion } from '../art/glove-kit.js';
import type { Pose } from '../contracts/pose.js';
import { type ElementKey, type LoopVariantData, type VariantKind, type VersionId } from '../contracts/variant.js';
import type { AnchorScript } from '../core/timeline/choreograph.js';
export type PreviewEntry<T> = {
    id: VersionId;
    data: T;
} | 'base';
export interface VariantPreview {
    pose?: Readonly<Record<string, PreviewEntry<Pose>>>;
    loop?: Readonly<Record<string, PreviewEntry<LoopVariantData<Pose>>>>;
    hand?: Readonly<Record<string, GloveVersion | 'base'>>;
    script?: Readonly<Record<string, PreviewEntry<AnchorScript>>>;
}
export declare function setVariantPreview(preview?: VariantPreview): void;
export declare const clearVariantPreview: () => void;
export declare const currentVariantPreview: () => VariantPreview;
export declare function withVariantPreview<T>(preview: VariantPreview, fn: () => T): T;
export declare function previewScript(name: string): AnchorScript | 'base' | undefined;
export declare function versionInUse(kind: VariantKind, element: string): VersionId | 'base';
export declare function versionsInUse(): Record<ElementKey, VersionId>;
