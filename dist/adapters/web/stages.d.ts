import { type CSSProperties, type ReactElement } from 'react';
import type { EmbedBackground, EmbedPodcastData, EmbedReviewData, EmbedTalkData } from '../../contracts/embed.js';
import { type ReviewBackground } from '../remotion/AnchorReview.js';
import { type TalkBackground } from '../remotion/AnchorTalk.js';
export interface StageProps<Data> {
    data: Data;
    frame: number;
    captions: boolean;
    idPrefix: string;
    baseUrl?: string | undefined;
    background?: EmbedBackground | undefined;
    title?: string | undefined;
    playing?: boolean | undefined;
    preload?: 'none' | 'metadata' | 'auto' | undefined;
}
export interface ReviewStageProps extends StageProps<EmbedReviewData> {
    playing: boolean;
}
export declare function frameStyle(size: {
    width: number;
    height: number;
}, background: CSSProperties): CSSProperties;
export declare function knownBackground(background: EmbedBackground | undefined, fallback: EmbedBackground): EmbedBackground;
export declare function talkBackgroundOf(background: EmbedBackground | undefined, baseUrl?: string): TalkBackground;
export declare function reviewBackgroundOf(background: EmbedBackground | undefined): ReviewBackground;
export declare function ImageLayers(props: {
    background: Extract<TalkBackground, {
        kind: 'image';
    }>;
    part: string;
}): ReactElement;
export declare function TalkStage(props: StageProps<EmbedTalkData>): ReactElement;
export declare function PodcastStage(props: StageProps<EmbedPodcastData>): ReactElement;
export declare function ReviewStage(props: ReviewStageProps): ReactElement;
