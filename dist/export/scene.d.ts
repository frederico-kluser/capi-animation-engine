import { type TalkFrameScene } from '../core/render-scene/resolve.js';
import type { AnchorTalkProps } from '../adapters/remotion/AnchorTalk.js';
import type { CharacterId } from '../contracts/character.js';
import type { OutfitInput } from '../contracts/outfit.js';
import type { RasterProfile, SceneFeature, SceneFontRef, SceneSourceRef } from '../contracts/render-scene.js';
import type { CompiledTimeline, TimelineSpec } from '../contracts/timeline.js';
import type { ScenarioBackdrop } from '../contracts/scenario.js';
export declare class RendererUnavailableError extends Error {
    readonly code: 'renderer_unavailable';
    constructor(message: string);
}
export declare class SceneInputError extends Error {
    readonly code: 'invalid_input';
    constructor(message: string);
}
export declare class TalkSceneUnsupportedError extends Error {
    readonly code: 'unsupported_feature';
    readonly unsupported: readonly string[];
    readonly reasons: readonly string[];
    constructor(unsupported: readonly string[], reasons: readonly string[]);
}
export declare function assertSelfContainedSvg(markup: string, label?: string): string;
export declare function captionFontFamilyOf(path: string): string;
export declare function resolveCaptionFont(weight?: number): SceneFontRef;
export declare function captionFontOf(profile: RasterProfile): SceneFontRef | undefined;
export declare function talkRasterProfile(fonts?: readonly SceneFontRef[]): RasterProfile;
export declare function talkHeadTop(character: CharacterId | undefined, outfit: OutfitInput | undefined): number | undefined;
export type TalkSceneProps = Omit<AnchorTalkProps, 'timeline'> & {
    timeline: TimelineSpec | CompiledTimeline;
};
export interface TalkSceneInputResources {
    asset: (relativePath: string) => SceneSourceRef | null;
    backgroundImage?: SceneSourceRef;
    scenario?: {
        resolved: ScenarioBackdrop;
        media?: SceneSourceRef;
        loopMs: number;
    };
}
export interface TalkSceneInput {
    jobId: string;
    props: TalkSceneProps;
    frameIndex: number;
    fps: number;
    profile: RasterProfile;
    resources: TalkSceneInputResources;
    width: number;
    height: number;
    idPrefix?: string;
}
export declare function resolveTalkFrameScene(input: TalkSceneInput): TalkFrameScene;
export declare function assertTalkSceneSupported(scene: TalkFrameScene, supported?: readonly SceneFeature[]): void;
export declare function isTalkSceneSupported(scene: TalkFrameScene, supported?: readonly SceneFeature[]): boolean;
