import type { ThumbAspect, ThumbScheme, ThumbSourceKind } from '../../contracts/thumbs.js';
export declare const THUMB_STYLE_VERSION = 1;
export declare const THUMB_HOUSE_STYLE = "Background plate for a composite image: a flat cartoon presenter and a large title will be added on top later, so this image shows only the environment. Stylized 2.5D digital painting with simplified rounded shapes, smooth soft gradients and a subtle painterly grain; no outlines, no fine detail, no tiny objects. The whole scene is softly out of focus with light atmospheric haze. Soft key light from an off-frame source at the upper left. Calm, slightly desaturated, mid-to-low contrast.";
export declare const THUMB_PALETTE_BLOCKS: Record<ThumbScheme, string>;
export declare const THUMB_LAYOUT_BLOCKS: Record<ThumbAspect, string>;
export declare const THUMB_EXCLUSIONS: {
    readonly positive: 'Every surface is plain and unmarked: blank walls, blank book spines, unlabeled objects. Any screen faces away from the camera or glows with soft abstract light and shows nothing. The space is empty and unoccupied; nobody is present.';
    readonly explicit: 'Constraints: no text, letters, numbers, code, logos, watermarks, signatures, user-interface elements, people, faces, hands, animals or characters anywhere in the image. Do not add a presenter.';
};
export declare function cleanScene(scene: string): string;
export declare const THUMB_FORMAT_SCHEMES: Record<ThumbSourceKind, ThumbScheme>;
export interface BackgroundPromptInput {
    scene: string;
    scheme: ThumbScheme;
    aspect: ThumbAspect;
    explicit?: boolean;
    references?: number;
}
export declare function backgroundPrompt(input: BackgroundPromptInput): string;
export declare function backgroundKeyText(model: string, prompt: string, references?: readonly string[]): string;
export declare const BACKGROUND_CHECK_PROMPT = "You are a strict quality checker for background images. Look at the image and answer ONLY with a JSON object: {\"text\": true|false, \"people\": true|false, \"logos\": true|false, \"panels\": true|false, \"notes\": \"\u2026\"}. \"text\" = any readable or pseudo letters, numbers, words or code anywhere. \"people\" = any human, face, hand, animal or cartoon character. \"logos\" = any brand mark, logo or user interface. \"panels\" = the image is split into several stacked or side-by-side panels instead of one continuous scene. Be strict: tiny blurry glyphs count as text.";
export declare function readBackgroundCheck(content: string): {
    ok: boolean;
    problems: string[];
};
