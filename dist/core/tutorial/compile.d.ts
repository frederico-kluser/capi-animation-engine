import type { PodcastSeat } from '../../contracts/podcast.js';
import type { PoseInput } from '../../contracts/pose.js';
import type { ReviewStageLayout, ReviewTimeline } from '../../contracts/review.js';
import type { TimelineSpec } from '../../contracts/timeline.js';
import type { CompiledTutorial, TutorialFrame, TutorialOverlay } from '../../contracts/tutorial.js';
export declare const TUTORIAL_CURSOR: {
    readonly showBeforeMs: 300;
    readonly hideAfterMs: 3000;
    readonly fadeMs: 250;
    readonly typingHideMs: 120;
    readonly pressPeakMs: 60;
    readonly pressEndMs: 140;
    readonly pressScale: 0.9;
    readonly rippleMs: 500;
};
export declare const TUTORIAL_CARD: {
    readonly enterMs: 450;
    readonly exitMs: 350;
    readonly dim: 0.55;
};
export interface CompileTutorialOptions {
    layout?: Pick<ReviewStageLayout, 'seats' | 'screen'> & Partial<Pick<ReviewStageLayout, 'width' | 'height' | 'bezel' | 'captionBox'>>;
    seats?: ReadonlyArray<{
        seat: PodcastSeat;
        timeline: TimelineSpec;
        base?: PoseInput;
    }>;
}
export declare function compileTutorial(overlay: TutorialOverlay, timeline: Pick<ReviewTimeline, 'segments' | 'blocks' | 'durationMs'>, options?: CompileTutorialOptions): CompiledTutorial;
export declare function tutorialFrameAt(compiled: CompiledTutorial, ms: number, videoMs: number): TutorialFrame;
