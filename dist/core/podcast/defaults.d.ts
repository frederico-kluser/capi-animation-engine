export declare const PODCAST_DEFAULTS: {
    readonly leadInMs: 600;
    readonly tailMs: 900;
    readonly seed: 1;
    readonly pace: {
        readonly gapMs: readonly [number, number];
        readonly overlapShare: 0.45;
        readonly selfGapMs: readonly [number, number];
        readonly selfMinGapMs: 120;
        readonly longGapMs: 1200;
        readonly longOverlapMs: 1500;
    };
    readonly interrupt: {
        readonly overlapMs: readonly [number, number];
        readonly tailMs: 40;
        readonly fadeOutMs: 80;
    };
    readonly background: {
        readonly span: readonly [number, number];
        readonly jitterMs: readonly [number, number];
        readonly minGapMs: 700;
    };
    readonly camera: {
        readonly reactions: true;
        readonly minShotMs: 1200;
        readonly cutDelayMs: 160;
        readonly overlapCutMaxMs: 900;
        readonly reactionTurnMinMs: 9000;
        readonly reactionMs: readonly [number, number];
        readonly reactionSpan: readonly [number, number];
        readonly reactionDelayMs: 120;
    };
    readonly eyes: {
        readonly cameraLook: {
            readonly x: 0;
            readonly y: 0;
        };
        readonly welcomeMs: 9000;
        readonly glanceMinBlockMs: 8000;
        readonly glanceHoldMs: 1100;
        readonly glanceAwayMs: 1800;
    };
    readonly listen: {
        readonly look: {
            readonly x: 0.6;
            readonly y: 0.04;
        };
        readonly nodProminence: 0.7;
        readonly nodGapMs: 3200;
        readonly nodDeg: readonly [number, number];
        readonly nodDelayMs: 180;
        readonly nodEdgeMs: 600;
        readonly blinkDelayMs: readonly [number, number];
        readonly blinkMinWindowMs: 1400;
        readonly reactionHoldMs: readonly [number, number];
        readonly reactionDelayMs: 120;
        readonly busyMarginMs: 300;
        readonly pose: {
            readonly startDelayMs: 140;
            readonly minHoldMs: 2000;
            readonly gapMs: 500;
            readonly headGapMs: 760;
            readonly endMarginMs: 700;
        };
        readonly auto: {
            readonly minWindowMs: 7000;
            readonly gapMs: 14000;
            readonly jitterMs: 3000;
            readonly startSpan: readonly [number, number];
            readonly firstSpanMs: 20000;
            readonly againSpanMs: 6000;
            readonly endSpan: readonly [number, number];
            readonly maxHoldMs: 8000;
            readonly poses: readonly string[];
            readonly faces: Readonly<Record<string, string>>;
        };
        readonly laughPose: 'laughLean';
        readonly laughHoldMs: 2400;
    };
    readonly seat: {
        readonly restPose: 'idle';
        readonly blockJoinMs: 1800;
        readonly backchannelNodDeg: 4;
        readonly attemptNodDeg: 3;
        readonly maxRepairs: 12;
    };
};
export type PodcastDefaults = typeof PODCAST_DEFAULTS;
