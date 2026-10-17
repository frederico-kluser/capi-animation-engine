import { type CSSProperties, type ReactElement, type ReactNode } from 'react';
import type { PodcastAudioClip, PodcastSeat } from '../../contracts/podcast.js';
import { type Point } from '../../contracts/pose.js';
import type { VideoProfileId } from '../../contracts/profile.js';
import type { Scenario } from '../../contracts/scenario.js';
import type { CompiledReview, CompiledReviewSeat, ReviewAspect, ReviewCommentary, ReviewFrame, ReviewRect, ReviewSegment, ReviewSpec, ReviewStageLayout, SubtitleWord } from '../../contracts/review.js';
import { type ResolvedAnchorState } from '../../contracts/state.js';
import type { CompiledTimeline } from '../../contracts/timeline.js';
import { type ReviewScreenFill } from '../../art/review-stage.js';
import { type AnchorProps } from '../../render/Anchor.js';
import { type ScenarioMediaRender } from '../../render/ScenarioBackdrop.js';
export type ReviewBackground = {
    kind: 'studio';
} | {
    kind: 'color';
    color: string;
} | {
    kind: 'image';
    src: string;
    dim?: number;
} | {
    kind: 'chroma';
    key?: 'green' | 'blue';
} | {
    kind: 'scenario';
    scenario: Scenario;
};
export declare const REVIEW_SIZES: Record<ReviewAspect, {
    width: number;
    height: number;
}>;
export declare const REVIEW_COMPOSITION_ID = "AnchorReview";
export declare const REVIEW_TV_MEDIA_STYLE: CSSProperties;
export interface ReviewFrameViewProps {
    frame: ReviewFrame;
    seats: CompiledReview['seats'];
    timelines: Partial<Record<PodcastSeat, CompiledTimeline>>;
    layout: ReviewStageLayout;
    frameIndex: number;
    fps: number;
    size?: {
        width: number;
        height: number;
    };
    idPrefix?: string;
    assetUrl?: (src: string) => string;
    tv?: ReactNode;
    tvUnder?: ReactNode;
    screenFill?: ReviewScreenFill;
    posterHref?: string;
    background?: ReviewBackground;
    scenarioMedia?: ScenarioMediaRender;
    subtitles?: {
        video: boolean;
        commentary: boolean;
    };
    names?: Partial<Record<PodcastSeat, string>>;
    states?: (seat: PodcastSeat, plane: 'top' | 'under') => ResolvedAnchorState | undefined;
}
export interface AnchorReviewProps {
    spec: ReviewSpec;
    commentary: ReviewCommentary;
    aspect?: ReviewAspect;
    assetsBase?: string;
    background?: ReviewBackground;
    subtitles?: {
        video: boolean;
        commentary: boolean;
    };
    talkWords?: readonly SubtitleWord[];
    screen?: 'video' | 'off';
    profile?: VideoProfileId;
}
export interface ReviewVideoPiece {
    kind: 'play' | 'hold';
    from: number;
    durationInFrames: number;
    trimBefore?: number;
    freezeFrame?: number;
    fromMs: number;
    toMs: number;
}
export type ReviewSeatAnchorProps = Pick<AnchorProps, 'timeline' | 'frame' | 'fps' | 'seed' | 'character' | 'outfit' | 'mirror' | 'set' | 'pose' | 'expression' | 'title'>;
export declare function reviewAspectOf(spec: Pick<ReviewSpec, 'layout'> | undefined, aspect?: ReviewAspect, profile?: VideoProfileId): ReviewAspect;
export declare function reviewProfileOf(spec: Pick<ReviewSpec, 'profile'> | undefined, profile?: VideoProfileId): VideoProfileId | undefined;
export declare function reviewLayoutOf(spec: Pick<ReviewSpec, 'layout' | 'mode'> | undefined, commentary: Pick<ReviewCommentary, 'kind'> | undefined, aspect?: ReviewAspect): ReviewStageLayout;
export declare function reviewMetadata(props: Pick<AnchorReviewProps, 'spec' | 'commentary' | 'aspect' | 'profile'>): {
    durationInFrames: number;
    fps: number;
    width: number;
    height: number;
};
export declare function reviewSeatTimelines(compiled: Pick<CompiledReview, 'seats'>): Partial<Record<PodcastSeat, CompiledTimeline>>;
export declare function reviewHeadTops(compiled: Pick<CompiledReview, 'seats'>): Partial<Record<PodcastSeat, number>>;
export declare function reviewSeatAnchorProps(seat: CompiledReviewSeat, timeline: CompiledTimeline | undefined, request: {
    frame: number;
    fps: number;
    title?: string;
}): ReviewSeatAnchorProps;
export declare function reviewVideoPlan(segments: readonly ReviewSegment[], fps: number): ReviewVideoPiece[];
export declare function reviewVideoVolumeAt(compiled: Pick<CompiledReview, 'segments' | 'duck'>, timeMs: number, audio?: {
    videoGainDb?: number;
    duckDb?: number;
}): number;
export declare function reviewBackgroundStyle(background: ReviewBackground): CSSProperties;
export declare function reviewStudioScreen(spec: Pick<ReviewSpec, 'video'> | undefined, assetsBase: string | undefined, staticFiles: readonly string[]): 'video' | 'off';
export declare function reviewCommentaryClips(commentary: ReviewCommentary, options?: {
    tvLook?: Point;
    durationMs?: number;
}): PodcastAudioClip[];
export interface ReviewPanelDraw {
    seat: PodcastSeat;
    rect: ReviewRect;
    viewBox: string;
    clip?: Array<[number, number]>;
    view?: {
        turn?: number;
        nod?: number;
    };
}
export declare function reviewPanelDraws(frame: Pick<ReviewFrame, 'panels' | 'crop'>, layout: Pick<ReviewStageLayout, 'mode' | 'seats'>, size?: {
    width: number;
    height: number;
}): ReviewPanelDraw[];
export declare function ReviewFrameView(props: ReviewFrameViewProps): ReactElement;
export declare const AnchorReview: (props: AnchorReviewProps) => ReactElement;
