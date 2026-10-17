import { type ApprovalLog, type VariantKind, type VersionId } from '../contracts/variant.js';
export declare function renderApprovedModules(log: ApprovalLog, exists: (kind: VariantKind, element: string, id: VersionId) => boolean): {
    approved: string;
    hands: string;
    problems: string[];
};
