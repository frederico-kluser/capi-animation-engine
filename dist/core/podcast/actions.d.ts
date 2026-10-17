import type { CharacterId } from '../../contracts/character.js';
import { type ExpressionId } from '../../contracts/face.js';
import { type PodcastAction, type PodcastActionKind, type PodcastSeat } from '../../contracts/podcast.js';
import { type HandShape, type HandView, type Point, type Pose, type Side, type SolvedPose } from '../../contracts/pose.js';
import type { DrinkKind, DrinkSlot, DrinkSpec, PodcastMicAdjust, PodcastMicId, TableItemSpec } from '../../contracts/set.js';
import { type MicZone } from '../set/mic-zone.js';
import type { TimelineTrack } from '../../contracts/timeline.js';
import { type Beat } from '../timeline/choreograph.js';
import type { EffectiveTurn } from './turns.js';
export declare const PODCAST_ACTIONS: {
    readonly holdMs: 200;
    readonly accent: 'soft';
    readonly micClearance: 8;
    readonly drink: {
        readonly reachShape: HandShape;
        readonly gripShape: HandShape;
        readonly gripView: HandView;
        readonly reachOpen: 10;
        readonly liftTilt: {
            glass: number;
            mug: number;
            bottle: number;
            cup: number;
        };
        readonly sipTilt: {
            glass: number;
            mug: number;
            bottle: number;
            cup: number;
        };
        readonly lipFromMouth: {
            glass: {
                x: number;
                y: number;
            };
            mug: {
                x: number;
                y: number;
            };
            bottle: {
                x: number;
                y: number;
            };
            cup: {
                x: number;
                y: number;
            };
        };
        readonly liftAt: 0.55;
        readonly liftFore: 0.85;
        readonly elbow: {
            readonly upper: 0.6;
            readonly fore: 1.1;
            readonly minUpper: 0.35;
            readonly micUpper: 0.32;
            readonly clearance: 12;
        };
        readonly sipHead: {
            readonly nod: -9;
            readonly tilt: -4;
            readonly turnRight: 2;
            readonly turnLeft: 10;
        };
        readonly sipEyes: 0.42;
        readonly sipMouth: 'MBP';
        readonly sipHoldMs: 380;
    };
    readonly adjustMic: {
        readonly along: 0.6;
        readonly palm: 58;
        readonly forearm: readonly [number, number];
        readonly gripReach: 104;
        readonly openBack: 14;
        readonly reachGap: 150;
        readonly holdMs: 260;
    };
    readonly check: {
        readonly head: {
            readonly nod: 16;
            readonly tilt: -3;
        };
        readonly look: {
            readonly y: 0.75;
            readonly x: 0.45;
        };
        readonly notesHoldMs: 1250;
        readonly phoneHoldMs: 1050;
        readonly shape: HandShape;
        readonly reach: 142;
        readonly overlap: 14;
        readonly clearance: 34;
        readonly forearm: readonly [number, number];
    };
    readonly leanBack: {
        readonly body: {
            readonly y: -6;
            readonly lean: -1;
        };
        readonly head: {
            readonly nod: -4;
            readonly tilt: -9;
        };
        readonly left: {
            readonly hand: {
                readonly x: 404;
                readonly y: 676;
            };
        };
        readonly right: {
            readonly hand: {
                readonly x: 596;
                readonly y: 668;
            };
        };
        readonly holdMs: readonly [number, number];
    };
    readonly sitUp: {
        readonly body: {
            readonly y: -7;
        };
        readonly head: {
            readonly nod: -3;
        };
        readonly holdMs: 300;
    };
};
export declare function mouthPoint(head: SolvedPose['head'], character?: CharacterId): Point;
export declare function facePoint(head: SolvedPose['head'], p: Point): Point;
export declare function drinkHand(slot: DrinkSlot): Side;
export declare const DRINK_LIP: {
    readonly glass: {
        readonly x: 0;
        readonly y: -56;
    };
    readonly mug: {
        readonly x: 0;
        readonly y: -54;
    };
    readonly bottle: {
        readonly x: 0;
        readonly y: -112;
    };
    readonly cup: {
        readonly x: 7;
        readonly y: -78;
    };
};
export declare function heldLip(kind: DrinkKind, hand: Side, wrist: Point, tilt: number): Point;
export declare function lipWrist(kind: DrinkKind, hand: Side, lip: Point, tilt: number): Point;
export interface ActionSeat {
    character?: CharacterId | undefined;
    table?: boolean | undefined;
    mic?: boolean | undefined;
    drink?: DrinkSpec | undefined;
    items?: readonly TableItemSpec[] | undefined;
    micModel?: PodcastMicId | undefined;
    micAdjust?: PodcastMicAdjust | undefined;
}
export interface ActionContext {
    seat: ActionSeat;
    restPose: string;
    restExpression: ExpressionId;
}
export interface ActionStep extends Omit<Beat, 'atMs'> {
    offsetMs: number;
    label: string;
}
export interface ActionScript {
    kind: PodcastActionKind;
    steps: ActionStep[];
    durationMs: number;
    hand?: Side;
}
export type ActionResult = {
    script: ActionScript;
    problem?: undefined;
} | {
    script?: undefined;
    problem: string;
};
export declare function restElbow(restPose: string, side: Side): Point;
export interface DrinkPoses {
    hand: Side;
    kind: DrinkKind;
    foot: Point;
    grip: Point;
    reach: Pose;
    grab: Pose;
    lift: Pose;
    sip: Pose;
}
export declare function foldElbow(shoulder: Point, wrist: Point, side: Side, upper: number, fore: number): Point;
export declare function lowElbow(wrist: Point, side: Side, fore: number, maxY: number): Point;
export declare function seatMicZone(seat: Pick<ActionSeat, 'mic' | 'micModel' | 'micAdjust'>, pad?: number): MicZone | null;
export declare function drinkPoses(drink: DrinkSpec, restPose: string, character?: CharacterId, mic?: MicZone | null): DrinkPoses;
export declare function checkTouch(item: TableItemSpec, side: Side, seat: ActionSeat, restPose?: string): {
    wrist: Point;
    angle: number;
    tips: Point;
    elbow: Point;
} | null;
export declare function actionScript(kind: PodcastActionKind, ctx: ActionContext): ActionResult;
export declare function stretchStep(script: ActionScript, label: string, extraMs: number): ActionScript;
export declare const ACTION_PLACEMENT: {
    readonly marginMs: 300;
    readonly laterMs: 2400;
    readonly earlierMs: 400;
    readonly stepMs: 100;
    readonly firstMs: 600;
    readonly tailMs: 600;
    readonly listenPad: {
        readonly before: 900;
        readonly after: 400;
    };
};
export type ActionBeat = Beat & {
    priority: number;
    action: PodcastActionKind;
};
export interface PlacedAction {
    kind: PodcastActionKind;
    turn: string;
    word: number;
    fromMs: number;
    toMs: number;
    scripted: boolean;
    steps: Array<{
        label: string;
        atMs: number;
    }>;
}
export interface ActionPlacementInput {
    seat: PodcastSeat;
    actions: readonly PodcastAction[] | undefined;
    turns: readonly EffectiveTurn[];
    busy: ReadonlyArray<readonly [number, number]>;
    listen: ReadonlyArray<Beat>;
    listenTracks: ReadonlyArray<{
        atMs: number;
        track: TimelineTrack;
    }>;
    context: ActionContext;
    restLook?: Point | undefined;
}
export interface ActionPlacement {
    placed: PlacedAction[];
    beats: ActionBeat[];
    windows: Array<[number, number]>;
    needMs: number;
    warnings: string[];
    decisions: string[];
}
export declare function lintAction(script: ActionScript, context: ActionContext, restLook?: Point): string[];
export declare function placeSeatActions(input: ActionPlacementInput): ActionPlacement;
