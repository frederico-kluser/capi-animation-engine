import { type CameraBox, type CameraFrame, type CameraMoveKind, type CameraPanel, type CameraShot, type CameraTransitionKind, type CameraView, type ShotSize } from '../../contracts/camera.js';
import type { PodcastSeat } from '../../contracts/podcast.js';
import type { SafeArea, VideoProfileId } from '../../contracts/profile.js';
import type { DrinkSlot, DrinkSpec } from '../../contracts/set.js';
import { type FrameAspect } from '../set/frame.js';
export interface CameraFrameOptions {
    defaultSeat?: PodcastSeat;
    base?: CameraBox;
    drinks?: Partial<Record<PodcastSeat, DrinkSlot | Partial<DrinkSpec>>>;
    headTops?: Partial<Record<PodcastSeat, number>>;
    headTop?: number;
    profile?: VideoProfileId;
    safe?: SafeArea;
    heads?: Partial<Record<PodcastSeat, CameraHead>>;
    head?: CameraHead;
}
export interface CameraHead {
    x: number;
    y: number;
    turn?: number;
    tilt?: number;
}
export declare function cameraHeadOf(head: {
    center?: {
        x?: number;
        y?: number;
    };
    turn?: number;
    tilt?: number;
} | undefined): CameraHead | undefined;
export type CameraShotLike = Pick<CameraShot, 'fromMs' | 'toMs'> & Partial<Omit<CameraShot, 'fromMs' | 'toMs'>>;
export declare function normalizeShot(shot: CameraShotLike): CameraShot;
export declare function shotAt<T extends CameraShotLike>(shots: readonly T[], timeMs: number): T | undefined;
export declare function defaultMoveAmount(move: CameraMoveKind, durationMs: number): number | undefined;
export interface CameraMotion {
    zoom: number;
    driftX: number;
    driftY: number;
}
export declare function stepPlan(shot: CameraShotLike): {
    count: number;
    everyMs: number;
    snapMs: number;
};
export declare function moveAt(shot: CameraShotLike, timeMs: number): CameraMotion;
export declare function headroomTop(measured?: number): number;
export declare function cameraHeadSides(head?: CameraHead, seat?: PodcastSeat): {
    x0: number;
    x1: number;
};
export declare function profileBase(ratio: number, profile?: VideoProfileId, base?: CameraBox): CameraBox;
export interface SingleBoxLook {
    driftY?: number;
    moveZoom?: number;
    profile?: VideoProfileId;
    safe?: SafeArea;
    head?: CameraHead;
    roll?: number;
    turn?: number;
}
export declare function singleBox(ratio: number, seat: PodcastSeat | undefined, size: ShotSize, zoom: number, driftX?: number, base?: CameraBox, top?: number, look?: SingleBoxLook): CameraBox;
export declare function slideSingleBox(box: CameraBox, shiftX: number, limits: {
    ratio: number;
    seat?: PodcastSeat | undefined;
    head?: CameraHead | undefined;
    turn?: number | undefined;
    safe?: SafeArea | undefined;
}): CameraBox;
export declare function shiftAt(shots: readonly CameraShotLike[], timeMs: number): number;
export declare function isVerticalRatio(ratio: number): boolean;
export declare function isNarrowRatio(ratio: number): boolean;
export declare function worldBox(ratio: number, framing: 'two' | 'wide', zoom: number, driftX?: number, driftY?: number): CameraBox;
export declare function favorBox(ratio: number, seat: PodcastSeat, zoom: number, driftX?: number, driftY?: number, top?: number): CameraBox;
export declare function splitBox(panelRatio: number, seat: PodcastSeat, zoom: number, driftX?: number, top?: number, driftY?: number): CameraBox;
export declare function pipBox(windowRatio: number, seat: PodcastSeat, top?: number): CameraBox;
export declare function pipRect(ratio: number, seat: PodcastSeat, safe?: SafeArea): {
    rect: CameraBox;
    windowRatio: number;
};
export declare function clearOfWindow(box: CameraBox, window: CameraBox, seat: PodcastSeat, top?: number, safe?: SafeArea, floor?: number, now?: CameraHead): CameraBox;
export declare function insertBox(ratio: number, seat: PodcastSeat, drink: DrinkSlot | Partial<DrinkSpec> | undefined, zoom: number): CameraBox;
export declare function rollCover(rollDeg: number, ratio: number): number;
export declare function rolledView(box: CameraBox, rollDeg: number): {
    box: CameraBox;
    top: number;
    bottom: number;
};
export declare function shotAngle(shot: CameraShotLike, size?: ShotSize): {
    turn: number;
    nod: number;
    roll: number;
    zoom: number;
    lead: number;
};
export interface CameraTransitionState {
    kind: Exclude<CameraTransitionKind, 'cut'>;
    from: CameraShot;
    to: CameraShot;
    cutMs: number;
    startMs: number;
    endMs: number;
    side: 'out' | 'in';
    local: number;
    progress: number;
    direction: 1 | -1;
}
export declare function transitionAt(shots: readonly CameraShotLike[], timeMs: number): CameraTransitionState | undefined;
export declare function cameraFrameAt(shots: readonly CameraShotLike[], timeMs: number, aspect: FrameAspect, options?: CameraFrameOptions): CameraFrame;
export declare function headInFrame(panel: CameraPanel, head?: CameraHead): CameraBox | undefined;
export declare function boxViewBox(box: CameraBox): string;
export interface CameraSlice {
    seat: PodcastSeat;
    rect: CameraBox;
    box: CameraBox;
    view?: CameraView;
    inset?: boolean;
}
export declare function frameSlices(frame: Pick<CameraFrame, 'panels'>, options?: {
    defaultSeat?: PodcastSeat;
    pixels?: {
        width: number;
        height: number;
    };
}): CameraSlice[];
