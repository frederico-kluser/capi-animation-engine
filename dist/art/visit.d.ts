import type { ReactElement } from 'react';
import { type Palette } from './palette.js';
type Ids = (local: string) => string;
export interface VisitUiUnits {
    unit: 'cqh' | 'cqw';
    scale: number;
}
export declare function VisitRoomArt({ ids, palette }: {
    ids: Ids;
    palette?: Palette;
}): ReactElement;
export declare function VisitCallChromeArt(props: {
    live: number;
    label?: string;
    ui?: VisitUiUnits;
}): ReactElement;
export declare function VisitNameCardArt(props: {
    name: string;
    role?: string | undefined;
    progress: number;
    ui?: VisitUiUnits;
}): ReactElement;
export {};
