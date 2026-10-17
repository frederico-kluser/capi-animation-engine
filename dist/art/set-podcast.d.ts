import type { ReactElement } from 'react';
import { type Side, type SolvedPose } from '../contracts/pose.js';
import type { PodcastMicAdjust, PodcastMicId } from '../contracts/set.js';
import { type SleeveWear } from './arm.js';
import { type Palette } from './palette.js';
export { ChairArt, type ChairArtProps } from './set-chairs.js';
type Ids = (local: string) => string;
export interface TableArtProps {
    pose: SolvedPose;
    ids: Ids;
    micBase?: {
        x: number;
        y: number;
        rx: number;
        ry: number;
    } | null | undefined;
    palette?: Palette | undefined;
    propShadow?: number | undefined;
    propScale?: number | undefined;
}
export declare function TableArt({ pose, ids, micBase, palette, propShadow, propScale }: TableArtProps): ReactElement;
export declare function TableArmClips({ pose, ids }: {
    pose: SolvedPose;
    ids: Ids;
}): ReactElement;
export declare function tableArmClip(ids: Ids, side: Side): string;
export declare function TableArms({ pose, ids, sleeve }: {
    pose: SolvedPose;
    ids: Ids;
    sleeve?: SleeveWear | undefined;
}): ReactElement | null;
export interface MicArtProps {
    mirror: boolean;
    ids: Ids;
    model?: PodcastMicId | undefined;
    adjust?: PodcastMicAdjust | undefined;
    pose?: SolvedPose | undefined;
    palette?: Palette | undefined;
}
export declare function MicArt({ mirror, ids, model, adjust, pose, palette }: MicArtProps): ReactElement;
export { TableItemsArt, type TableItemsArtProps } from './set-items.js';
