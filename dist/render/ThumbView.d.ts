import type { ReactElement } from 'react';
import type { ThumbSpec } from '../contracts/thumbs.js';
export declare function thumbTitleFit(text: string, widthPx: number, maxSizePx: number, maxLines?: number): {
    size: number;
    lines: string[];
};
export declare function ThumbView(props: {
    spec: ThumbSpec;
    width: number;
    height: number;
    idPrefix?: string;
    backgroundUrl?: string;
    screenUrl?: string;
}): ReactElement;
