import type { AspectRecordId } from '../../../contracts/aspects.js';
import type { CameraIntentKind, CameraStyle } from '../../../contracts/camera.js';
import type { CatalogDetail } from '../../../contracts/catalog.js';
import { EXPRESSION_IDS } from '../../../contracts/face.js';
import { type PodcastActionKind } from '../../../contracts/podcast.js';
import type { ProfileAspect, VideoProfileId } from '../../../contracts/profile.js';
import { type CameraVocabulary } from '../../../presets/catalog/camera.js';
import type { PoseId } from '../../../presets/poses.js';
import { intIn, priorityOf } from '../common.js';
import type { AspectTurn, PodcastAspectContext } from './context.js';
export interface AspectParseResult<T> {
    value: T | null;
    problems: string[];
    fatal: boolean;
}
export interface PodcastAspectTask<T> {
    id: AspectRecordId;
    mode: 'podcast';
    system: string;
    user: string;
    parse(content: string): AspectParseResult<T>;
    score(value: T, problems: readonly string[]): number;
    needsRepair?(parsed: AspectParseResult<T>): boolean;
    repairUser?(previous: string, problems: readonly string[]): string;
    fallback?(): T | null;
    samples?: number;
    note?: string;
}
export declare function repairMessage(user: string, previous: string, problems: readonly string[]): string;
export declare const isRecord: (v: unknown) => v is Record<string, unknown>;
export declare function jsonRoot(content: string): Record<string, unknown> | null;
export declare function enumOf<V extends string>(value: unknown, list: readonly V[]): V | undefined;
export declare function wordIndexOf(turn: AspectTurn, value: unknown): {
    ok: true;
    index: number;
} | {
    ok: false;
    problem: string;
};
export declare function expressionOf(value: unknown): (typeof EXPRESSION_IDS)[number] | undefined;
export declare const whyOf: (value: unknown) => string | undefined;
export { intIn, priorityOf };
export declare function tooManyProblems(problems: readonly string[], entries: number): boolean;
export declare function capByPriority<T extends {
    priority: number;
}>(items: readonly T[], target: number, factor: number): {
    kept: T[];
    dropped: T[];
};
export declare function noteBlock(ctx: Pick<PodcastAspectContext, 'notes'>, id: string): string;
export declare const ANSWER_RULES = "Think it through and check every rule against your plan before answering.\nLANGUAGE: every \"why\" in Brazilian Portuguese (short), never Chinese or English. Ids stay exactly as listed.\nAnswer with ONE JSON object and nothing else (no prose, no markdown fences).";
export declare const STUDIO_TEXT = "THE STUDIO: a 2D cartoon PODCAST of the channel \u00CDNDICE IA. Two characters sit at the same table, facing each other \u2014 each with a microphone on the table in front and a chair behind. The table hides everything below the tabletop: every gesture happens above it. The host is seen at three-quarters facing screen-right; the guest is drawn MIRRORED, facing the host. They talk TO EACH OTHER, not to the camera \u2014 only the welcome and the goodbye address the audience. Blinks, breathing, lip-sync, small nods on stressed words and the weight shift around a gesture are automatic. While one talks the elbows of the other rest on the table.";
export declare const REVIEW_STUDIO_TEXT = "THE STUDIO: a 2D cartoon PODCAST of the channel \u00CDNDICE IA, in REVIEW mode \u2014 the two are watching and commenting a VIDEO. They sit SIDE BY SIDE at the two ends of one long table, both FACING THE CAMERA, with a big TV screen BETWEEN and behind them that plays the video (each one sits in front of a lower corner of the picture). Each has a microphone on the table in front and a chair behind; the table hides everything below the tabletop: every gesture happens above it. The host, at the left end, is seen at three-quarters facing screen-right \u2014 toward the TV and the guest; the guest, at the right end, is drawn MIRRORED, facing the TV and the host. So \"right\" (presentRight, pointGuest) points TOWARD THE TV and the other person at the same time: presenting toward the screen is natural when the words refer to what the video just showed or said. They talk to each other and ABOUT THE VIDEO; the welcome, the verdict and the goodbye address the audience. Blinks, breathing, lip-sync, small nods on stressed words and the weight shift around a gesture are automatic. While one talks the elbows of the other rest on the table.";
export declare function studioText(ctx: Pick<PodcastAspectContext, 'review'>): string;
export declare const DIRECTORS_TEXT = "SIX DIRECTORS work IN PARALLEL on this episode, each owning ONE aspect; an engine merges the six plans word by word:\n- gestures-host / gestures-guest: the BODY of whoever speaks, in that seat's own lines (poses, head macros, accents);\n- expressions: the FACE of whoever speaks, and when they glance at the camera;\n- interactions: what the LISTENER does while the other talks (listening poses, reactions, laughs, nods);\n- actions: PHYSICAL actions with the things on the table (drinking, adjusting the microphone, checking notes) \u2014 always while LISTENING;\n- camera: the EDIT (wide shots, punch-ins, snap zooms, reaction shots, split screen).\nEverything is anchored to WORDS: a turn label (T1, T2\u2026) and the [index] of a word in that turn \u2014 never seconds. The times shown are only to judge how long things are.";
export interface CatalogTextOptions {
    detail?: CatalogDetail;
    aspects?: readonly ProfileAspect[];
}
export declare function tablePosesCatalog(ids?: readonly PoseId[], options?: CatalogTextOptions): string;
export declare function tablePosesLegend(detail?: CatalogDetail): string;
export declare function listenPoses(): PoseId[];
export declare function listenPosesCatalog(options?: CatalogTextOptions): string;
export declare function expressionsCatalog(detail?: CatalogDetail): string;
export declare const ACTION_SPECS: Readonly<Record<PodcastActionKind, {
    ms: number;
    needs?: string;
    text: string;
}>>;
export declare const ACTION_MARGIN_MS = 900;
export declare function actionsCatalog(): string;
export declare function cameraBudget(style: CameraStyle, durationMs: number): {
    emphasis: number;
    punchline: number;
    establish: number;
    split: number;
    reactions: number;
};
export interface PodcastCameraLook {
    multiSeat: boolean;
    zooms: boolean;
    profile?: VideoProfileId;
    review?: boolean;
    detail?: CatalogDetail;
    intents?: readonly CameraIntentKind[];
}
export declare function podcastCameraVocabulary(style: CameraStyle, opts: PodcastCameraLook): CameraVocabulary;
export declare function cameraCatalog(style: CameraStyle, durationMs: number, opts: PodcastCameraLook): string;
export declare const MACRO_TEXT = "MACROS: \"agree\" = double head nod; \"deny\" = head shake; \"laugh\" = laughing face with the body shaking; \"wave\" = FAREWELL WAVE ONLY (the very last goodbye to the audience). A macro keeps the body busy ~1 s.";
export declare const isTablePose: (id: unknown) => id is PoseId;
export declare const TABLE_POSES: readonly PoseId[];
export declare const tableVersionOf: (id: unknown) => PoseId | undefined;
