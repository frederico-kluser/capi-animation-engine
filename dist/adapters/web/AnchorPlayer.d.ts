import type { EmbedBackground, EmbedPodcastData, EmbedReviewData, EmbedTalkData } from '../../contracts/embed.js';
import { type AnchorPlayerHandle, type AnchorPlayerOptions } from './PlayerShell.js';
export interface ModePlayerProps<Data> extends AnchorPlayerOptions {
    data: Data;
    baseUrl?: string | undefined;
    background?: EmbedBackground | undefined;
}
export type AnchorTalkPlayerProps = ModePlayerProps<EmbedTalkData>;
export type AnchorPodcastPlayerProps = ModePlayerProps<EmbedPodcastData>;
export type AnchorReviewPlayerProps = ModePlayerProps<EmbedReviewData>;
export interface AnchorPlayerProps extends AnchorPlayerOptions {
    data?: unknown;
    src?: string | undefined;
    baseUrl?: string | undefined;
    background?: EmbedBackground | undefined;
    placeholderRatio?: string | undefined;
}
export declare const AnchorTalkPlayer: import("react").ForwardRefExoticComponent<AnchorTalkPlayerProps & import("react").RefAttributes<AnchorPlayerHandle>>;
export declare const AnchorPodcastPlayer: import("react").ForwardRefExoticComponent<AnchorPodcastPlayerProps & import("react").RefAttributes<AnchorPlayerHandle>>;
export declare const AnchorReviewPlayer: import("react").ForwardRefExoticComponent<AnchorReviewPlayerProps & import("react").RefAttributes<AnchorPlayerHandle>>;
export declare const AnchorPlayer: import("react").ForwardRefExoticComponent<AnchorPlayerProps & import("react").RefAttributes<AnchorPlayerHandle>>;
