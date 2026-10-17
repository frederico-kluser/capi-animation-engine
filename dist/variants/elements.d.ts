import { type ElementKey, type VariantKind } from '../contracts/variant.js';
export declare const DEMO_SCRIPT_ELEMENT = "demo";
export declare const SKILL_EXAMPLES_DIR = ".agents/anchor-animation-agent-skill/examples";
export interface VariantElementInfo {
    kind: VariantKind;
    element: string;
    key: ElementKey;
    label: string;
    derivedFrom?: {
        element: string;
        how: string;
    };
    official: {
        file: string;
        symbol: string;
    };
    edit: string;
}
export declare const VARIANT_EDIT_HINTS: Readonly<Record<VariantKind, string>>;
export declare function variantElementIds(kind: VariantKind, examples?: readonly string[]): string[];
export declare function variantElementInfo(kind: VariantKind, element: string, examples?: readonly string[]): VariantElementInfo | null;
export declare function variantSourceOf(kind: VariantKind, element: string): string;
export declare const variantFilePattern: (kind: VariantKind, element: string) => string;
export declare const kindLabel: (kind: VariantKind) => string;
