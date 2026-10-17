export declare const REVIEW_DEFAULTS: {
    readonly timeline: {
        leadInMs: number;
        padBeforeMs: number;
        padAfterMs: number;
        tailMs: number;
        minPlayMs: number;
    };
    readonly watch: {
        readonly enterMs: 260;
        readonly leaveMs: 320;
        readonly lookMs: 380;
        readonly headMs: 520;
        readonly busyBeforeMs: 400;
        readonly busyAfterMs: 500;
        readonly minMs: 1400;
    };
    readonly reactions: {
        readonly holdMs: 1600;
        readonly cameraMs: 1500;
        readonly holdRangeMs: readonly [number, number];
        readonly cameraMinMs: 800;
    };
    readonly audio: {
        readonly duckDb: -14;
        readonly duckRampMs: 180;
        readonly autoBelowVoiceDb: 4;
        readonly maxVideoGainDb: 6;
        readonly minVideoGainDb: -18;
        readonly edgeFadeMs: 12;
    };
    readonly camera: {
        readonly tvAfterMs: 2400;
        readonly tvMinPlayMs: 7000;
        readonly stageBeforeCommentMs: 1400;
        readonly minShotMs: 500;
        readonly carryMaxMs: 1200;
        readonly favorZoom: 1.25;
        readonly transitionOverVideoMs: 200;
        readonly transitionMinMs: 80;
    };
    readonly subtitles: {
        readonly maxChars: 42;
        readonly maxLines: 2;
        readonly maxCueMs: 6000;
        readonly minCueMs: 900;
        readonly gapSplitMs: 600;
        readonly minGapMs: 80;
        readonly minPieceMs: 250;
    };
    readonly compile: {
        readonly maxTailExtraMs: 4000;
    };
    readonly script: {
        readonly snapMs: 1500;
        readonly minBlockGapMs: 2500;
        readonly maxOverWords: 22;
        readonly maxMergeDriftMs: 5000;
    };
    readonly stage: {
        readonly lookReach: {
            readonly x: 3;
            readonly y: 1.5;
        };
        readonly headPerLook: {
            readonly turn: 11;
            readonly nod: 12;
        };
        readonly maxHead: {
            readonly turn: 18;
            readonly nod: 9;
        };
        readonly tvMargin: 0.02;
        readonly seatWidth: {
            readonly loose: 0.72;
            readonly medium: 0.62;
            readonly mediumClose: 0.53;
            readonly close: 0.45;
            readonly extreme: 0.3;
        };
        readonly seatHeadShare: {
            readonly loose: 0.26;
            readonly medium: 0.3;
            readonly mediumClose: 0.37;
            readonly close: 0.45;
            readonly extreme: 0.75;
        };
        readonly seatRow: {
            readonly close: 0.42;
            readonly extreme: 0.45;
        };
        readonly short: {
            readonly homeHeadShare: 0.47;
            readonly ladder: {
                readonly loose: 0;
                readonly medium: 0;
                readonly mediumClose: 0.34;
                readonly close: 0.67;
                readonly extreme: 1;
            };
            readonly headSpan: 1.16;
            readonly headPad: 8;
            readonly captionGap: 0.02;
        };
        readonly subtitleFont: 0.36;
        readonly captionFont: 0.34;
        readonly subtitleHeadClearance: 12;
        readonly subtitleHeadSide: 90;
    };
};
