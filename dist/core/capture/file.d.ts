import type { CaptureClipFile, CaptureCollectionFile, CaptureGroupId, CaptureTake, SolvedCaptureFrame } from '../../contracts/capture.js';
export declare function captureSlug(name: string, fallback?: string): string;
export declare function captureIdProblem(id: unknown, what?: string): string | null;
export declare function normalizeLabels(raw: unknown): string[];
export declare function takeFromFrames(frames: readonly SolvedCaptureFrame[], options?: {
    fps?: number;
    mirror?: boolean;
    source?: CaptureTake['source'];
}): CaptureTake;
export declare function parseTake(raw: unknown, where?: string): {
    take?: CaptureTake;
    errors: string[];
};
export interface ClipFileCheck {
    file?: CaptureClipFile;
    errors: string[];
    warnings: string[];
}
export declare function parseClipFile(raw: unknown, where?: string): ClipFileCheck;
export declare function parseCollectionFile(raw: unknown, where?: string): {
    collection?: CaptureCollectionFile;
    errors: string[];
};
export interface CaptureClipSummary {
    ref: string;
    collection: string;
    id: string;
    name: string;
    description: string;
    labels: string[];
    durationMs: number;
    groups: CaptureGroupId[];
    keys: number;
    createdAt: string;
    updatedAt: string;
}
export declare function clipSummary(collection: string, file: CaptureClipFile): CaptureClipSummary;
export declare function parseCaptureRef(ref: unknown): {
    collection: string;
    id: string;
} | null;
export declare function searchClips<T extends Pick<CaptureClipSummary, 'name' | 'description' | 'labels' | 'collection' | 'id'>>(clips: readonly T[], query: {
    text?: string;
    labels?: readonly string[];
}): T[];
