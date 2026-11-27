import type { ReviewRect, ReviewStageLayout } from '../../contracts/review.js';
import type { TutorialCard } from '../../contracts/tutorial.js';
export declare const TUTORIAL_CARD_TYPE: {
    readonly padY: 0.034;
    readonly padX: 0.04;
    readonly gap: 0.016;
    readonly label: {
        readonly size: 0.021;
        readonly line: 1.25;
        readonly weight: 700;
    };
    readonly term: {
        readonly size: 0.078;
        readonly line: 1.02;
        readonly weight: 800;
    };
    readonly rule: 0.005;
    readonly definition: {
        readonly size: 0.039;
        readonly line: 1.26;
        readonly weight: 600;
    };
    readonly detail: {
        readonly size: 0.031;
        readonly line: 1.3;
        readonly weight: 400;
        readonly gap: 0.011;
        readonly indentEm: 1.05;
    };
    readonly example: {
        readonly size: 0.03;
        readonly line: 1.35;
        readonly padY: 0.012;
        readonly padX: 0.018;
        readonly border: 0.0018;
        readonly charEm: 0.6;
    };
    readonly note: {
        readonly size: 0.024;
        readonly line: 1.3;
        readonly weight: 400;
    };
    readonly question: {
        readonly size: 0.054;
        readonly line: 1.16;
        readonly weight: 800;
    };
    readonly hint: {
        readonly size: 0.03;
        readonly line: 1.3;
        readonly weight: 400;
    };
    readonly mapping: {
        readonly size: 0.034;
        readonly line: 1.25;
        readonly weight: 600;
        readonly gap: 0.012;
        readonly arrowEm: 2.2;
    };
    readonly limit: {
        readonly size: 0.027;
        readonly line: 1.3;
        readonly weight: 400;
    };
    readonly maxMapping: 4;
    readonly maxDetails: 4;
    readonly minScale: 0.38;
    readonly fill: 0.97;
    readonly step: 0.02;
};
export declare function tutorialCardDetails(card: Pick<TutorialCard, 'details'>): string[];
export declare function tutorialCardLines(text: string | undefined, size: number, width: number, weight: number): number;
export declare const ANALOGY_LIMIT_PREFIX = "Onde n\u00E3o serve: ";
export declare function tutorialCardMapping(card: Pick<TutorialCard, 'mapping'>): Array<{
    from: string;
    to: string;
}>;
type CardShape = Pick<TutorialCard, 'term' | 'definition' | 'details' | 'example' | 'note' | 'kind' | 'mapping' | 'limit'>;
export declare function tutorialCardHeight(card: CardShape, boxWidth: number, scale: number): number;
export declare function tutorialCardScale(card: CardShape, box: {
    width: number;
    height: number;
}): number;
export declare function tutorialCardRect(layout: Pick<ReviewStageLayout, 'width' | 'height' | 'seats'>, card?: {
    overScreen?: boolean;
}): ReviewRect;
export declare const TUTORIAL_STEP_LABEL_TYPE: {
    readonly size: 0.026;
    readonly line: 1.2;
    readonly padY: 0.011;
    readonly padX: 0.02;
    readonly border: 0.0022;
    readonly radius: 0.014;
    readonly gapEm: 0.6;
    readonly headEm: 0.82;
    readonly tracking: 0.08;
    readonly headWeight: 800;
    readonly tailWeight: 700;
    readonly slack: 1;
};
export declare function tutorialStepLabelBox(layout: Pick<ReviewStageLayout, 'width' | 'height'>): ReviewRect;
export declare function tutorialStepLabelRect(label: string, layout: Pick<ReviewStageLayout, 'width' | 'height'>): ReviewRect;
export {};
