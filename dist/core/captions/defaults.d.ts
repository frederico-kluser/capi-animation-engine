export declare const CAPTION_DEFAULTS: {
    readonly tallRatio: 0.62;
    readonly popMs: 120;
    readonly strongProminence: 0.8;
    readonly karaoke: {
        readonly minWords: 2;
        readonly maxWords: 4;
        readonly targetWords: 3;
        readonly maxChars: 16;
        readonly maxLines: 2;
        readonly longWordChars: 10;
        readonly pauseSplitMs: 400;
        readonly pauseHardMs: 900;
        readonly minShowMs: 300;
        readonly softPauseMs: 180;
        readonly maxCueMs: 2800;
        readonly holdMs: 350;
        readonly minBlankMs: 150;
        readonly sentenceHard: true;
        readonly sizeCost: 0.3;
        readonly single: {
            readonly long: 0.4;
            readonly afterPause: 0.9;
            readonly orphan: 2.6;
        };
        readonly cut: {
            readonly clause: 0;
            readonly softPause: 0.3;
            readonly mid: 0.9;
            readonly dangling: 2;
            readonly leaning: 0.8;
            readonly clauseInside: 2;
            readonly pauseInside: 4;
            readonly flash: 5;
        };
        readonly sentenceInside: {
            readonly oneLine: 0;
            readonly twoLines: 0;
        };
        readonly size: 0.078;
        readonly weight: 800;
        readonly lineHeight: 1.16;
        readonly wordGap: 0.3;
        readonly nowScale: 1.1;
        readonly strongScale: 1.18;
        readonly growOuter: 0.32;
        readonly popFrom: 0.82;
        readonly popOpacity: 0.35;
        readonly outline: 0.085;
        readonly shadow: {
            readonly y: 0.065;
            readonly blur: 0;
            readonly opacity: 1;
        };
    };
    readonly lines: {
        readonly minWords: 1;
        readonly maxWords: 40;
        readonly targetWords: 0;
        readonly maxChars: {
            readonly video: 42;
            readonly short: 30;
        };
        readonly maxLines: 2;
        readonly longWordChars: 0;
        readonly pauseSplitMs: 700;
        readonly pauseHardMs: 700;
        readonly minShowMs: 300;
        readonly softPauseMs: 250;
        readonly maxCueMs: 6000;
        readonly minCueMs: 900;
        readonly holdMs: 900;
        readonly minBlankMs: 200;
        readonly sentenceHard: false;
        readonly sizeCost: 0;
        readonly single: {
            readonly long: 0;
            readonly afterPause: 0;
            readonly orphan: 0;
        };
        readonly cut: {
            readonly clause: 0.4;
            readonly softPause: 0.9;
            readonly mid: 2.2;
            readonly dangling: 1.2;
            readonly leaning: 0.4;
            readonly clauseInside: 0;
            readonly pauseInside: 6;
            readonly flash: 5;
        };
        readonly sentenceInside: {
            readonly oneLine: 0.3;
            readonly twoLines: 1.1;
        };
        readonly shortChars: 14;
        readonly maxLineEm: 23;
        readonly size: 0.044;
        readonly weight: 600;
        readonly lineHeight: 1.26;
        readonly wordGap: 0.28;
        readonly nowScale: 1;
        readonly strongScale: 1;
        readonly growOuter: 0;
        readonly popFrom: 1;
        readonly popOpacity: 1;
        readonly outline: 0.07;
        readonly shadow: {
            readonly y: 0.045;
            readonly blur: 0;
            readonly opacity: 1;
        };
    };
    readonly place: {
        readonly shortRow: 0.83;
        readonly bottomGap: 0.02;
        readonly panelPad: 0.02;
        readonly panelMinWidth: 0.1;
        readonly seamTolerance: 0.02;
        readonly seamLift: 0.25;
        readonly insetGap: 0.02;
        readonly insetMinShare: 0.6;
    };
    readonly head: {
        readonly side: 60;
        readonly up: 12;
        readonly down: 14;
        readonly outfitUp: 92;
        readonly gap: 0.012;
        readonly sampleMs: 100;
        readonly maxSamples: 24;
        readonly trim: 0.2;
    };
    readonly fit: {
        readonly pad: 0.04;
        readonly minScale: 0.6;
    };
    readonly wrap: {
        readonly sentence: -5;
        readonly clause: -3.3;
        readonly dangling: 4.4;
        readonly topHeavy: 0.4;
        readonly charEm: 0.55;
    };
    readonly draw: {
        readonly ringSteps: 16;
        readonly growInner: 0.7;
        readonly originY: 58;
    };
    readonly srt: {
        readonly maxChars: 42;
        readonly maxLines: 2;
    };
};
export type CaptionDefaults = typeof CAPTION_DEFAULTS;
