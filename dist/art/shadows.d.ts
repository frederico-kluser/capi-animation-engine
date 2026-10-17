import type { ReactElement } from 'react';
import { type SolvedPose } from '../contracts/pose.js';
import { type SleeveWear } from './arm.js';
export interface CastShadowsProps {
    pose: SolvedPose;
    ids: (local: string) => string;
    propShadow?: number | undefined;
    propScale?: number | undefined;
    sleeve?: SleeveWear | undefined;
}
export declare function CastShadows({ pose, ids, propShadow, propScale, sleeve }: CastShadowsProps): ReactElement | null;
