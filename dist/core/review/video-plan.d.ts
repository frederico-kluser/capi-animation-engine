import type { ReviewSegment } from '../../contracts/review.js';
export interface ReviewVideoPiece {
    kind: 'play' | 'hold';
    from: number;
    durationInFrames: number;
    trimBefore?: number;
    freezeFrame?: number;
    fromMs: number;
    toMs: number;
}
export declare function reviewVideoPlan(segments: readonly ReviewSegment[], fps: number): ReviewVideoPiece[];
export declare function reviewVideoFrameAt(plan: readonly ReviewVideoPiece[], frame: number, fps: number, videoFps: number): number | null;
export declare function reviewPieceVideoFrame(piece: ReviewVideoPiece, frame: number, fps: number, videoFps: number): number;
