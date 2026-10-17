import { type CSSProperties, type ReactElement } from 'react';
import { type SealedLabels } from './shell.js';
export interface AnchorViewOptions {
    className?: string | undefined;
    style?: CSSProperties | undefined;
    autoPlay?: boolean | undefined;
    maxHeight?: string | undefined;
    posterMs?: number | undefined;
    captions?: boolean | undefined;
    title?: string | undefined;
    labels?: Partial<SealedLabels> | undefined;
    videoBaseUrl?: string | undefined;
    onPlay?: (() => void) | undefined;
    onEnded?: (() => void) | undefined;
}
export interface SealedViewProps extends AnchorViewOptions {
    payload: string;
    format?: {
        width: number;
        height: number;
    } | undefined;
}
export declare function SealedView(props: SealedViewProps): ReactElement;
