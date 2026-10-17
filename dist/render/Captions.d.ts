import { type ReactElement } from 'react';
import type { CaptionFrame } from '../contracts/captions.js';
import type { PodcastSeat } from '../contracts/podcast.js';
export declare const CAPTION_FONT_STACK = "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
export interface CaptionsLayerProps {
    frame: CaptionFrame | null;
    width: number;
    height: number;
}
export declare function captionAccentColor(seat?: PodcastSeat): string;
export declare function captionTextShadow(outline: number, shadow: {
    y: number;
    blur: number;
    opacity: number;
}, color?: string): string;
export declare function captionWordGrow(input: {
    text: string;
    index: number;
    count: number;
    strong: boolean;
    style: CaptionFrame['style'];
}): {
    scale: number;
    originX: number;
};
export declare function CaptionsLayer(props: CaptionsLayerProps): ReactElement | null;
