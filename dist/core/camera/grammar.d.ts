import type { CameraMoveKind, CameraTransitionKind, ShotFraming, ShotSize } from '../../contracts/camera.js';
export type CameraResource = 'loose' | 'mediumClose' | 'close' | 'side' | 'low' | 'high' | 'reaction' | 'reactionClose' | 'pip' | 'wide' | 'two' | 'favor' | 'push';
export interface CameraVariety {
    closeProminence: number;
    punch: readonly CameraResource[];
    punchMove: 'static' | 'push';
    reaction: readonly CameraResource[];
    both: readonly CameraResource[];
    topic: readonly CameraResource[];
    vary: readonly CameraResource[];
    longMoves: readonly CameraMoveKind[];
    handheld: boolean;
    turnAngleEvery: number;
    questionFavor: boolean;
    topicTransitions: readonly CameraTransitionKind[];
    closingTransition: CameraTransitionKind;
}
export declare const CAMERA_GRAMMAR: {
    readonly sizeZoom: {
        loose: number;
        medium: number;
        mediumClose: number;
        close: number;
        extreme: number;
    };
    readonly focus: {
        readonly loose: {
            readonly x: 500;
            readonly y: 400;
        };
        readonly medium: {
            readonly x: 500;
            readonly y: 400;
        };
        readonly mediumClose: {
            readonly x: 508;
            readonly y: 365;
        };
        readonly close: {
            readonly x: 515;
            readonly y: 330;
        };
        readonly extreme: {
            readonly x: 525;
            readonly y: 300;
        };
    };
    readonly twoWidth: 1500;
    readonly wideWidth: 2100;
    readonly worldCenter: {
        readonly x: 1000;
        readonly bottom: 800;
    };
    readonly insertZoom: 2.4;
    readonly minShotMs: 1600;
    readonly maxShotMs: 22000;
    readonly cutDelayMs: 110;
    readonly intentLeadMs: 40;
    readonly reactionMs: readonly [number, number];
    readonly establishMs: readonly [number, number];
    readonly emphasisMs: readonly [number, number];
    readonly punchlineHoldMs: readonly [number, number];
    readonly snapMs: 120;
    readonly snapFrom: 0.72;
    readonly pushPerSecond: 0.012;
    readonly pushMax: 1.12;
    readonly pullPerSecond: 0.012;
    readonly pullMax: 1.12;
    readonly driftPerSecond: 4;
    readonly driftMax: 28;
    readonly moveSettleMs: 250;
    readonly budgetPerMinute: {
        readonly emphasis: 4;
        readonly punchline: 1;
        readonly establish: 2;
        readonly split: 1;
    };
    readonly styles: {
        calm: {
            budget: number;
            snaps: false;
            reactionEveryMs: number;
        };
        interview: {
            budget: number;
            snaps: true;
            reactionEveryMs: number;
        };
        dynamic: {
            budget: number;
            snaps: true;
            reactionEveryMs: number;
        };
        live: {
            budget: number;
            snaps: false;
            reactionEveryMs: number;
        };
        cinematic: {
            budget: number;
            snaps: false;
            reactionEveryMs: number;
        };
    };
    readonly intent: {
        establish: {
            framing: "wide";
            size: "medium";
            move: "static";
        };
        speaker: {
            framing: "single";
            size: "medium";
            move: "static";
        };
        reaction: {
            framing: "single";
            size: "medium";
            move: "static";
        };
        emphasis: {
            framing: "single";
            size: "close";
            move: "static";
        };
        punchline: {
            framing: "single";
            size: "extreme";
            move: "snap";
        };
        reveal: {
            framing: "single";
            size: "close";
            move: "push";
        };
        question: {
            framing: "single";
            size: "close";
            move: "static";
        };
        topicShift: {
            framing: "wide";
            size: "medium";
            move: "static";
        };
        overlap: {
            framing: "two";
            size: "medium";
            move: "static";
        };
        insert: {
            framing: "insert";
            size: "medium";
            move: "static";
        };
        closing: {
            framing: "wide";
            size: "medium";
            move: "pull";
        };
        hook: {
            framing: "single";
            size: "mediumClose";
            move: "punchOut";
        };
        aside: {
            framing: "single";
            size: "mediumClose";
            move: "static";
            angle: "side";
        };
        list: {
            framing: "single";
            size: "mediumClose";
            move: "step";
        };
        impact: {
            framing: "single";
            size: "close";
            move: "shake";
            transition: "flash";
        };
        cta: {
            framing: "single";
            size: "close";
            move: "static";
        };
    };
    readonly talkFramings: readonly ShotFraming[];
    readonly overlapCutMaxMs: 900;
    readonly reactionDelayMs: 120;
    readonly reactionSpan: readonly [number, number];
    readonly reactionTurnMinMs: 5000;
    readonly reactionCueProminence: 0.45;
    readonly reactionAfterWideMs: 4000;
    readonly emphasisSpacing: 0.6;
    readonly revealMs: readonly [number, number];
    readonly insertMs: readonly [number, number];
    readonly overlapMs: readonly [number, number];
    readonly overlapTwoMinMs: 700;
    readonly overlapHoldMs: 500;
    readonly pingPongTurnMs: 2600;
    readonly pingPongMinTurns: 3;
    readonly rewideGapMs: 500;
    readonly rewideAfterTurnMs: 18000;
    readonly closingMinMs: 3000;
    readonly closingVideoMinMs: 15000;
    readonly styleRhythm: {
        calm: {
            rewideEveryMs: number;
            drift: true;
            driftMinMs: number;
            overlapFraming: "two";
            emphasisTurnMinMs: number;
            emphasisProminence: number;
            punchInsFirst: false;
            sentencePunchIns: false;
        };
        interview: {
            rewideEveryMs: number;
            drift: true;
            driftMinMs: number;
            overlapFraming: "two";
            emphasisTurnMinMs: number;
            emphasisProminence: number;
            punchInsFirst: false;
            sentencePunchIns: false;
        };
        dynamic: {
            rewideEveryMs: number;
            drift: false;
            driftMinMs: number;
            overlapFraming: "split";
            emphasisTurnMinMs: number;
            emphasisProminence: number;
            punchInsFirst: true;
            sentencePunchIns: true;
        };
        live: {
            rewideEveryMs: number;
            drift: false;
            driftMinMs: number;
            overlapFraming: "two";
            emphasisTurnMinMs: number;
            emphasisProminence: number;
            punchInsFirst: false;
            sentencePunchIns: false;
        };
        cinematic: {
            rewideEveryMs: number;
            drift: true;
            driftMinMs: number;
            overlapFraming: "two";
            emphasisTurnMinMs: number;
            emphasisProminence: number;
            punchInsFirst: false;
            sentencePunchIns: false;
        };
    };
    readonly headTop: 97;
    readonly headroom: 72;
    readonly outfitHeadroom: 24;
    readonly insertDrinkFill: 1.5;
    readonly insertDrinkHeight: {
        glass: number;
        mug: number;
        bottle: number;
        cup: number;
    };
    readonly insertMinTop: 420;
    readonly insertSnapMs: 6000;
    readonly insertGrabLeadMs: 700;
    readonly insertGrabTailMs: 500;
    readonly splitBottom: 780;
    readonly verticalRatio: 1.2;
    readonly stackedWideRatio: 0.85;
    readonly stackedWideZoom: 0.85;
    readonly bothHeadsWidth: 1420;
    readonly verticalZoomBoost: 1.3;
    readonly closeFocusRow: 0.42;
    readonly splitDivider: 0.006;
    readonly ease: {
        readonly snap: 'easeOut';
        readonly move: 'easeInOutSine';
    };
    readonly angle: {
        main: {
            turn: number;
            nod: number;
            roll: number;
            zoom: number;
            lead: number;
        };
        side: {
            turn: number;
            nod: number;
            roll: number;
            zoom: number;
            lead: number;
        };
        low: {
            turn: number;
            nod: number;
            roll: number;
            zoom: number;
            lead: number;
        };
        high: {
            turn: number;
            nod: number;
            roll: number;
            zoom: number;
            lead: number;
        };
        dutch: {
            turn: number;
            nod: number;
            roll: number;
            zoom: number;
            lead: number;
        };
    };
    readonly rollMinSize: ShotSize;
    readonly punchOutFrom: 1.28;
    readonly punchOutMs: 160;
    readonly shakeMs: 380;
    readonly shakeAmount: 14;
    readonly shakeHz: 21;
    readonly shakeVertical: 0.6;
    readonly handheldAmount: 6;
    readonly handheldPeriodsMs: readonly [number, number];
    readonly handheldVertical: 0.6;
    readonly panPerSecond: 22;
    readonly panMax: 160;
    readonly panHeadKeep: 1.15;
    readonly stepCount: 3;
    readonly stepZoom: 1.06;
    readonly stepSnapMs: 90;
    readonly stepEveryMs: 420;
    readonly transition: {
        cut: {
            ms: number;
            lead: number;
        };
        whip: {
            ms: number;
            lead: number;
            travel: number;
            blur: number;
        };
        zoom: {
            ms: number;
            lead: number;
            scale: number;
        };
        flash: {
            ms: number;
            lead: number;
            peak: number;
        };
        dip: {
            ms: number;
            lead: number;
            peak: number;
        };
        dissolve: {
            ms: number;
            lead: number;
        };
    };
    readonly favorWidth: 1380;
    readonly favorCenter: 0.33;
    readonly pipWidth: 0.26;
    readonly pipWidthVertical: 0.32;
    readonly pipRatio: 1.25;
    readonly pipRatioVertical: 1.1;
    readonly pipMargin: 0.035;
    readonly pipCorner: 'top' | 'bottom';
    readonly pipHeadShare: 0.56;
    readonly pipChinRoom: 22;
    readonly pipLead: 0.05;
    readonly pipGap: 0.015;
    readonly headSweep: readonly [number, number];
    readonly headRest: 536;
    readonly headPad: 12;
    readonly angleHeadShift: 1.7;
    readonly splitFavor: 0.62;
    readonly palette: {
        calm: {
            sizes: ("close" | "medium" | "mediumClose")[];
            angles: "main"[];
            moves: ("drift" | "pull" | "push" | "static")[];
            transitions: ("cut" | "dissolve")[];
            framings: ("single" | "two" | "wide")[];
            maxShotMs: number;
            specialPerMinute: number;
        };
        interview: {
            sizes: ("close" | "extreme" | "medium" | "mediumClose")[];
            angles: ("main" | "side")[];
            moves: ("drift" | "pan" | "pull" | "push" | "snap" | "static")[];
            transitions: "cut"[];
            framings: ("favor" | "insert" | "single" | "two" | "wide")[];
            maxShotMs: number;
            specialPerMinute: number;
        };
        dynamic: {
            sizes: ("close" | "extreme" | "loose" | "medium" | "mediumClose")[];
            angles: ("dutch" | "high" | "low" | "main" | "side")[];
            moves: ("pull" | "punchOut" | "push" | "shake" | "snap" | "static" | "step")[];
            transitions: ("cut" | "flash" | "whip" | "zoom")[];
            framings: ("favor" | "insert" | "single" | "split" | "two" | "wide")[];
            maxShotMs: number;
            specialPerMinute: number;
        };
        live: {
            sizes: ("close" | "medium" | "mediumClose")[];
            angles: ("main" | "side")[];
            moves: ("handheld" | "pan" | "push" | "static")[];
            transitions: "cut"[];
            framings: ("favor" | "insert" | "pip" | "single" | "split" | "two" | "wide")[];
            maxShotMs: number;
            specialPerMinute: number;
        };
        cinematic: {
            sizes: ("close" | "loose" | "medium" | "mediumClose")[];
            angles: ("high" | "low" | "main" | "side")[];
            moves: ("drift" | "pan" | "pull" | "push" | "static")[];
            transitions: ("cut" | "dip" | "dissolve")[];
            framings: ("favor" | "insert" | "single" | "two" | "wide")[];
            maxShotMs: number;
            specialPerMinute: number;
        };
    };
    readonly profile: {
        video: {
            minShotMs: number;
            maxShotScale: number;
            openWide: true;
            closePull: true;
            headRow: number;
            closeCap: number;
        };
        short: {
            minShotMs: number;
            maxShotScale: number;
            openWide: false;
            closePull: false;
            headRow: number;
            closeCap: number;
        };
    };
    readonly fit: {
        readonly handPad: 20;
        readonly leadMs: 300;
        readonly holdMaxMs: 2800;
        readonly slideMs: 280;
        readonly openStep: 1.12;
        readonly openZoomMin: 0.72;
        readonly hookWidest: ShotSize;
        readonly hookGuardMs: 3200;
    };
    readonly keep: {
        readonly margin: 6;
        readonly openZoomMin: 0.85;
        readonly openStep: 0.01;
    };
    readonly hookMs: readonly [number, number];
    readonly asideMs: readonly [number, number];
    readonly listMs: readonly [number, number];
    readonly impactMs: readonly [number, number];
    readonly ctaMs: readonly [number, number];
    readonly angleHoldMs: readonly [number, number];
    readonly pipMs: readonly [number, number];
    readonly panMinMs: 4000;
    readonly impactProminence: 0.88;
    readonly impactEveryMs: 30000;
    readonly talkTopicGapMs: 650;
    readonly varyWindow: readonly [number, number];
    readonly angleTurnMinMs: 1600;
    readonly transitionRoom: 1.5;
    readonly variety: {
        calm: {
            closeProminence: number;
            punch: ("close" | "mediumClose")[];
            punchMove: "push";
            reaction: ("reaction" | "reactionClose")[];
            both: ("two" | "wide")[];
            topic: never[];
            vary: ("close" | "mediumClose" | "push" | "reaction")[];
            longMoves: "drift"[];
            handheld: false;
            turnAngleEvery: number;
            questionFavor: false;
            topicTransitions: never[];
            closingTransition: "dissolve";
        };
        interview: {
            closeProminence: number;
            punch: ("close" | "mediumClose" | "side")[];
            punchMove: "static";
            reaction: ("reaction" | "reactionClose")[];
            both: ("favor" | "reactionClose" | "two" | "wide")[];
            topic: ("mediumClose" | "side")[];
            vary: ("close" | "favor" | "mediumClose" | "push" | "reaction" | "side")[];
            longMoves: "drift"[];
            handheld: false;
            turnAngleEvery: number;
            questionFavor: false;
            topicTransitions: never[];
            closingTransition: "cut";
        };
        dynamic: {
            closeProminence: number;
            punch: ("close" | "low" | "mediumClose" | "side")[];
            punchMove: "static";
            reaction: ("reaction" | "reactionClose")[];
            both: ("favor" | "reactionClose" | "two" | "wide")[];
            topic: ("loose" | "mediumClose" | "side")[];
            vary: ("close" | "loose" | "mediumClose" | "push" | "reaction" | "side")[];
            longMoves: never[];
            handheld: false;
            turnAngleEvery: number;
            questionFavor: false;
            topicTransitions: ("flash" | "whip" | "zoom")[];
            closingTransition: "cut";
        };
        live: {
            closeProminence: number;
            punch: ("close" | "mediumClose" | "side")[];
            punchMove: "static";
            reaction: ("pip" | "reaction" | "reactionClose")[];
            both: ("favor" | "two" | "wide")[];
            topic: ("mediumClose" | "side")[];
            vary: ("close" | "favor" | "mediumClose" | "pip" | "push" | "side")[];
            longMoves: never[];
            handheld: true;
            turnAngleEvery: number;
            questionFavor: true;
            topicTransitions: never[];
            closingTransition: "cut";
        };
        cinematic: {
            closeProminence: number;
            punch: ("close" | "high" | "low" | "mediumClose" | "side")[];
            punchMove: "push";
            reaction: ("reaction" | "reactionClose")[];
            both: ("favor" | "two" | "wide")[];
            topic: ("loose" | "mediumClose" | "side")[];
            vary: ("loose" | "mediumClose" | "push" | "reaction" | "side")[];
            longMoves: ("drift" | "pull" | "push")[];
            handheld: false;
            turnAngleEvery: number;
            questionFavor: false;
            topicTransitions: ("dip" | "dissolve")[];
            closingTransition: "dissolve";
        };
    };
    readonly profilePolicy: {
        video: {
            hook: false;
            bothShots: true;
            pingPong: true;
            reactionScale: number;
            closeBias: number;
            openingMs: number;
        };
        short: {
            hook: true;
            bothShots: false;
            pingPong: false;
            reactionScale: number;
            closeBias: number;
            openingMs: number;
        };
    };
};
export type CameraGrammar = typeof CAMERA_GRAMMAR;
