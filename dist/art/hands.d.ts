import type { ReactElement } from 'react';
import { type HandShape, type Point, type Side, type SolvedArm } from '../contracts/pose.js';
import { type GloveLayer, type GloveVersion } from './glove-kit.js';
import { type Palette } from './palette.js';
export declare const OFFICIAL_GLOVES: {
    readonly palm: Readonly<Record<HandShape, readonly GloveLayer[]>>;
    readonly back: Readonly<Partial<Record<HandShape, readonly GloveLayer[]>>>;
};
export declare function setGloveVersions(versions: Readonly<Partial<Record<HandShape, GloveVersion>>>): void;
export declare const gloveVersionInUse: (shape: HandShape) => string | null;
export interface HandArtProps {
    arm: SolvedArm;
    side: Side;
    ids: (local: string) => string;
    palette?: Palette | undefined;
}
export declare function rollWidth(arm: SolvedArm): number;
export declare function HandArt({ arm, side, ids, palette }: HandArtProps): ReactElement;
export declare function GloveSilhouette({ arm }: {
    arm: SolvedArm;
}): ReactElement;
export declare function glovePoints(arm: SolvedArm, part?: 'all' | 'thumb'): Point[];
export interface GloveLayerInfo {
    index: number;
    kind: 'volume' | 'crease';
    parts: readonly string[];
    points: readonly (readonly (readonly [number, number])[])[];
    outline: boolean;
    thumb: 'tucked' | 'out' | null;
    palm: boolean;
}
export interface GloveAnatomy {
    source: 'GLOVES' | 'GLOVES_BACK' | 'derived';
    scale: number;
    transform: string;
    light: {
        x: number;
        y: number;
    };
    shadeShift: {
        x: number;
        y: number;
    };
    layers: readonly GloveLayerInfo[];
    palmLayers: readonly GloveLayerInfo[];
    version: string | null;
}
export declare function gloveAnatomy(arm: SolvedArm): GloveAnatomy;
