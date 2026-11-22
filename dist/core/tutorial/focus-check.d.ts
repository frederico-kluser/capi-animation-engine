import type { CompiledReview, ReviewStageLayout } from '../../contracts/review.js';
import type { TutorialOverlay } from '../../contracts/tutorial.js';
import { type TutorialFocusMoment } from './focus.js';
export declare const TUTORIAL_FOCUS_GATE: {
    readonly sampleMs: 50;
    readonly hiddenShare: 0.02;
    readonly minMs: 150;
    readonly opacity: 0.25;
    readonly dim: 0.3;
};
export declare const TUTORIAL_FOCUS_CODES: readonly ['focus-covered', 'focus-outside'];
export type FocusFindingCode = (typeof TUTORIAL_FOCUS_CODES)[number];
export interface FocusFinding {
    code: FocusFindingCode;
    severity: 'error' | 'warning';
    fromMs: number;
    toMs: number;
    moment: TutorialFocusMoment;
    block?: string;
    what: string;
    by: string[];
    maxShare: number;
    message: string;
}
export interface FocusStats {
    samples: number;
    terminalMs: number;
    lines: number;
    hiddenSamples: number;
    worst: {
        share: number;
        atMs: number;
        what: string;
        by: string[];
    } | null;
}
export interface FocusVerdict {
    ok: boolean;
    findings: FocusFinding[];
    stats: FocusStats;
}
export interface FocusCheckInput {
    compiled: CompiledReview;
    layout: ReviewStageLayout;
    overlay: Pick<TutorialOverlay, 'events' | 'blocks' | 'blockFocus' | 'screen'>;
    blocks?: ReadonlyArray<{
        id: string;
        fromMs: number;
        toMs: number;
    }>;
    sampleMs?: number;
}
export declare function checkTutorialFocus(input: FocusCheckInput): FocusVerdict;
