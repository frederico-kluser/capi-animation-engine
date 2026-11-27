import type { ReactElement } from 'react';
import { type VisitUiUnits } from '../../art/visit.js';
import type { CompiledVisitor, ReviewFrameVisit, ReviewRect } from '../../contracts/review.js';
import type { CompiledTimeline, TimelineSpec } from '../../contracts/timeline.js';
export declare function visitTimelineOf(spec: TimelineSpec): CompiledTimeline;
export declare function visitHeadTop(visitor: Pick<CompiledVisitor, 'character' | 'outfit'>): number | undefined;
export declare function visitViewBox(visit: Pick<ReviewFrameVisit, 'call' | 'zoom'>, screenAspect: number): string;
export interface VisitCallLayerProps {
    visit: ReviewFrameVisit;
    screenAspect: number;
    cardRect: ReviewRect;
    frameIndex: number;
    fps: number;
    idPrefix: string;
    ui?: VisitUiUnits;
    chromeAt?: {
        x: number;
        y: number;
    };
}
export declare function VisitCallLayer(props: VisitCallLayerProps): ReactElement;
