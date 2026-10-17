import type { ResolvedPropPose } from '../contracts/pose.js';
import type { ResolvedSet } from '../contracts/set.js';
import { type AnchorInput, type ResolvedAnchorState } from '../contracts/state.js';
import { type ItemGrips } from './pose/pin.js';
export declare const VIEW_LIMITS: {
    readonly turn: 30;
    readonly nod: 15;
};
export declare const VIEW_LOOK_PER_DEGREE: {
    readonly turn: number;
    readonly nod: number;
};
export declare const SWAY_HEAD_TILT = 0.6;
export declare function hasTabletop(set: ResolvedSet): boolean;
export declare function withHeldItems(set: ResolvedSet, prop: ResolvedPropPose | null): ResolvedSet;
export declare function itemGrips(set: ResolvedSet): ItemGrips;
export declare function resolveAnchor(input?: AnchorInput): ResolvedAnchorState;
