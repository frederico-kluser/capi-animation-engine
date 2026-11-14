import { type ThumbAspect, type ThumbLayout, type ThumbScheme, type ThumbSource, type ThumbVariant } from '../../contracts/thumbs.js';
import type { ThumbMoodId, YouTubeThumbnailText } from '../../contracts/youtube.js';
export declare const THUMB_MOODS: {
    readonly shock: {
        readonly poses: readonly ["mindBlown", "oops", "facepalm", "peekEyes"];
        readonly faces: readonly ["amazed", "surprised", "nervous", "embarrassed"];
    };
    readonly excited: {
        readonly poses: readonly ["celebrate", "fistPump", "thumbsUpBoth", "doublePeace", "rockOn", "openArms"];
        readonly faces: readonly ["excited", "delighted", "amazed", "proud"];
    };
    readonly question: {
        readonly poses: readonly ["shrug", "headScratch", "thinking", "chinHold", "cupEar"];
        readonly faces: readonly ["curious", "confused", "thinking", "skeptical"];
    };
    readonly warning: {
        readonly poses: readonly ["stop", "thumbsDown", "timeOut", "crossArms", "pointUp"];
        readonly faces: readonly ["serious", "concerned", "skeptical", "annoyed"];
    };
    readonly teach: {
        readonly poses: readonly ["pointScreenRight", "presentRight", "explain", "pointUp"];
        readonly faces: readonly ["friendly", "confident", "excited", "focused"];
    };
    readonly approve: {
        readonly poses: readonly ["thumbsUp", "okSign", "chefKiss", "clap", "thumbsUpBoth"];
        readonly faces: readonly ["confident", "delighted", "proud", "wink"];
    };
    readonly secret: {
        readonly poses: readonly ["shush", "pointCamera", "chinHold"];
        readonly faces: readonly ["wink", "mischievous", "smug"];
    };
    readonly versus: {
        readonly poses: readonly ["scalesBalance", "shrug", "thinking", "presentRight", "chinHold", "crossArms"];
        readonly faces: readonly ["skeptical", "curious", "thinking", "confident"];
    };
};
export declare const THUMB_POINTERS: readonly ["pointScreenRight", "presentRight"];
export declare const THUMB_DEBATE: {
    readonly poses: readonly ["handsOnHips", "crossArms", "pointCamera", "stop"];
    readonly faces: readonly ["confident", "skeptical", "smug", "determined"];
};
export declare function thumbTitle(title: string, maxWords?: number): string;
export declare function thumbQuestion(hook: string | undefined, fallbackTitle: string): string;
export declare function thumbHighlight(text: string): string | undefined;
export declare function sourceMood(source: ThumbSource): ThumbMoodId;
export declare function layoutCandidates(source: ThumbSource, text?: Pick<YouTubeThumbnailText, 'number' | 'versus'>): ThumbLayout[];
export declare function chooseLayouts(candidates: readonly ThumbLayout[], r: () => number): ThumbLayout[];
export interface PlanThumbsOptions {
    plates?: readonly string[];
    scheme?: ThumbScheme;
}
export declare function planThumbs(source: ThumbSource, seed: number, aspect?: ThumbAspect, options?: PlanThumbsOptions): ThumbVariant[];
