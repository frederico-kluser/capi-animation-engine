import type { ReactElement } from 'react';
import type { ResolvedPropPose, Side, SolvedArm } from '../contracts/pose.js';
type Ids = (local: string) => string;
export interface PropSilhouetteProps {
    prop: ResolvedPropPose;
    arm: SolvedArm;
    scale?: number | undefined;
}
export interface PropArtProps extends PropSilhouetteProps {
    ids: Ids;
    arms?: Record<Side, SolvedArm> | undefined;
}
export declare function PropSilhouette({ prop, arm, scale }: PropSilhouetteProps): ReactElement | null;
export declare function PropArt({ prop, arm, ids, scale, arms }: PropArtProps): ReactElement;
export declare function PropFrontArt({ prop, arm, ids, arms }: PropArtProps): ReactElement | null;
export {};
