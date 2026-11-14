import type { CaptureCleanReport, CaptureCleanSettings, CaptureCurves, CaptureEdit, CaptureGroupId, CaptureTake } from '../../contracts/capture.js';
export declare const CAPTURE_CLEAN_DEFAULTS: CaptureCleanSettings;
export declare const CLEAN_GRID_HZ = 60;
export declare const GAP_FILL_MS = 400;
export declare const PRESENT = 0.5;
export interface CleanSegment {
    startMs: number;
    endMs: number;
    kind: 'hold' | 'move' | 'gap';
}
export interface CleanResult {
    clip: CaptureCurves;
    report: CaptureCleanReport;
    segments: Partial<Record<CaptureGroupId, CleanSegment[]>>;
    edit: CaptureEdit;
}
export declare function takeGroups(take: CaptureTake): CaptureGroupId[];
export declare function normalizeEdit(take: CaptureTake, edit?: Partial<CaptureEdit>): CaptureEdit;
export declare function cleanTake(take: CaptureTake, editInput?: Partial<CaptureEdit>): CleanResult;
export declare function rawCurves(take: CaptureTake, editInput?: Partial<CaptureEdit>): CaptureCurves;
