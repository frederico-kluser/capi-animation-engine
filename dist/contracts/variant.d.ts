export type VariantKind = 'hand' | 'pose' | 'loop' | 'script';
export declare const VARIANT_KINDS: readonly ["hand", "pose", "loop", "script"];
export declare const VARIANT_KIND_LABELS: Record<VariantKind, string>;
export declare const isVariantKind: (value: unknown) => value is VariantKind;
export type VersionId = string;
export declare const VERSION_ID_PATTERN: RegExp;
export declare function versionIdAt(epochMs: number): VersionId;
export declare function versionIdTime(id: string): number | null;
export declare const isVersionId: (value: unknown) => value is VersionId;
export declare function nextVersionId(epochMs: number, taken: (id: VersionId) => boolean): VersionId;
export declare function formatVersionTime(id: VersionId): string;
export interface VariantMeta {
    kind: VariantKind;
    element: string;
    id: VersionId;
    author: string;
    note: string;
    parent: 'base' | VersionId;
}
export type ElementKey = `${VariantKind}:${string}`;
export declare const elementKey: (kind: VariantKind, element: string) => ElementKey;
export declare function parseElementKey(key: string): {
    kind: VariantKind;
    element: string;
} | null;
export declare const ELEMENT_NAME_PATTERN: RegExp;
export declare const isElementName: (value: unknown) => value is string;
export interface LoopVariantData<P = unknown> {
    swing: P;
    periodMs: number;
    cycles: number;
}
export interface ApprovedVariant<T> {
    id: VersionId;
    data: T;
}
export declare function variantDataOf<T>(json: unknown): T;
export declare const VARIANTS_DIR = "src/variants";
export declare const APPROVAL_LOG_FILE = "src/variants/approved.json";
export declare const APPROVED_MODULE_FILE = "src/variants/approved.ts";
export declare const APPROVED_HANDS_MODULE_FILE = "src/variants/approved-hands.ts";
export declare const VARIANT_FILE_EXT: Readonly<Record<VariantKind, 'json' | 'ts'>>;
export declare function variantFilePath(kind: VariantKind, element: string, id: VersionId): string;
export declare function parseVariantFilePath(path: string): {
    kind: VariantKind;
    element: string;
    id: VersionId;
} | null;
export interface ApprovalEvent {
    at: string;
    action: 'approve' | 'reject' | 'reset';
    key: ElementKey;
    id?: VersionId;
    by?: string;
    sha256?: string;
}
export interface ApprovalLog {
    approved: Record<ElementKey, VersionId>;
    rejected: Record<ElementKey, VersionId[]>;
    history?: ApprovalEvent[];
}
export declare const EMPTY_APPROVAL_LOG: ApprovalLog;
export type VariantState = 'proposed' | 'approved' | 'rejected';
export declare const VARIANT_STATE_LABELS: Record<VariantState, string>;
export declare function variantState(log: ApprovalLog, kind: VariantKind, element: string, id: VersionId): VariantState;
export interface DecisionOptions {
    atMs: number;
    by?: string;
    sha256?: string;
}
export declare function approveVersion(log: ApprovalLog, kind: VariantKind, element: string, id: VersionId, opts: DecisionOptions): ApprovalLog;
export declare function rejectVersion(log: ApprovalLog, kind: VariantKind, element: string, id: VersionId, opts: DecisionOptions): ApprovalLog;
export declare function resetElement(log: ApprovalLog, kind: VariantKind, element: string, opts: DecisionOptions): ApprovalLog;
export declare function lastApproval(log: ApprovalLog, key: ElementKey, id: VersionId): ApprovalEvent | undefined;
export declare function readApprovalLog(raw: unknown): {
    log: ApprovalLog;
    problems: string[];
};
export declare function formatApprovalLog(log: ApprovalLog): string;
