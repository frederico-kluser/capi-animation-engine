import type { ReactElement } from 'react';
import type { DecorKind } from '../contracts/scene.js';
import { type Palette } from './palette.js';
type Ids = (local: string) => string;
export declare function decorSilhouette(kind: DecorKind, palette?: Palette): string[];
export interface DecorArtProps {
    kind: DecorKind;
    ids: Ids;
    rotation?: number | undefined;
    scale?: number | undefined;
    flipX?: boolean | undefined;
    palette?: Palette | undefined;
}
export declare function DecorArt({ kind, rotation, scale, flipX, palette }: DecorArtProps): ReactElement;
export {};
