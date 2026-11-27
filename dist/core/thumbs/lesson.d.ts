import type { ThumbAspect, ThumbSource, ThumbVariant } from '../../contracts/thumbs.js';
export declare const LESSON_ROTATION: {
    readonly teacherWide: readonly [readonly ["pointScreenRight", "smug"], readonly ["okSign", "confident"], readonly ["pointUp", "excited"], readonly ["chinHold", "thinking"], readonly ["thumbsUp", "proud"], readonly ["presentRight", "friendly"], readonly ["shush", "mischievous"], readonly ["clap", "delighted"], readonly ["crossArms", "skeptical"], readonly ["explain", "friendly"], readonly ["fistPump", "proud"], readonly ["pointCamera", "confident"], readonly ["chefKiss", "delighted"], readonly ["thinking", "curious"]];
    readonly teacherTall: readonly [readonly ["explain", "friendly"], readonly ["pointUp", "excited"], readonly ["okSign", "confident"], readonly ["shush", "mischievous"], readonly ["thumbsUp", "proud"], readonly ["chefKiss", "delighted"], readonly ["clap", "delighted"], readonly ["pointCamera", "confident"]];
    readonly learnerTall: readonly [readonly ["headScratch", "confused"], readonly ["chinHold", "curious"], readonly ["thinking", "skeptical"], readonly ["peekEyes", "surprised"], readonly ["oops", "nervous"], readonly ["facepalm", "embarrassed"]];
};
export declare function isLessonSource(source: Pick<ThumbSource, 'kind' | 'number'>): boolean;
export declare function courseShortName(topic: string | undefined): string;
export declare function seriesLabel(source: Pick<ThumbSource, 'topic' | 'number'>): string;
export interface PlanLessonThumbOptions {
    plates?: readonly string[];
}
export declare function planLessonThumb(source: ThumbSource, seed: number, aspect?: ThumbAspect, options?: PlanLessonThumbOptions): ThumbVariant;
