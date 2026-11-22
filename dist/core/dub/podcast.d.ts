import type { PodcastAspectId } from '../../contracts/aspects.js';
import type { ContentLanguageId } from '../../contracts/languages.js';
import { type PodcastManualCut, type PodcastSeat, type PodcastSpec, type PodcastTurnKind } from '../../contracts/podcast.js';
import type { YouTubePackagingChapter } from '../../contracts/youtube.js';
import type { NormalizedPodcastScript } from '../podcast/script.js';
import { type DubWordMap, type WordSpan } from './index.js';
export type PodcastDubMaps = ReadonlyMap<string, DubWordMap>;
export type PodcastDubAnchors = Map<string, Set<number>>;
export declare function podcastDubAnchors(values: Partial<Record<PodcastAspectId, unknown>>, script: Pick<NormalizedPodcastScript, 'turns'>): PodcastDubAnchors;
export interface PodcastDubTurn {
    id: string;
    speaker: PodcastSeat;
    kind: PodcastTurnKind;
    spans: WordSpan[];
    markers: Map<number, number>;
    from: number;
    to: number;
}
export interface PodcastDubSource {
    paragraphs: string[];
    turns: PodcastDubTurn[];
    anchors: number;
}
export declare function markPodcastTurns(script: Pick<NormalizedPodcastScript, 'turns'>, anchors: ReadonlyMap<string, ReadonlySet<number>>): PodcastDubSource;
export declare function buildPodcastDubMessages(input: {
    source: PodcastDubSource;
    names: Readonly<Record<PodcastSeat, string>>;
    from: ContentLanguageId;
    to: ContentLanguageId;
    title?: string;
}): {
    system: string;
    user: string;
};
export declare function parsePodcastDubTranslation(content: string, source: PodcastDubSource): {
    paragraphs: string[] | null;
    problem?: string;
};
export interface PodcastDubMapping {
    maps: Map<string, DubWordMap>;
    texts: Map<string, string>;
    lost: Array<{
        turn: string;
        word: number;
    }>;
    empty: string[];
}
export declare function podcastDubMaps(source: PodcastDubSource, translated: readonly string[]): PodcastDubMapping;
export declare function mapTurnWord(maps: PodcastDubMaps, turn: string | undefined, word: number): number;
export declare function remapPodcastAspects(values: Partial<Record<PodcastAspectId, unknown>>, maps: PodcastDubMaps): Partial<Record<PodcastAspectId, unknown>>;
export interface DubPodcastScriptInput {
    raw: Readonly<Record<string, unknown>>;
    script: Pick<NormalizedPodcastScript, 'turns'>;
    texts: ReadonlyMap<string, string>;
    maps: PodcastDubMaps;
    language: ContentLanguageId;
    spec?: Pick<PodcastSpec, 'seats' | 'scene' | 'eyes' | 'camera'>;
    voices?: Partial<Record<PodcastSeat, string>>;
}
export declare function dubPodcastScript(input: DubPodcastScriptInput): {
    script: Record<string, unknown>;
    warnings: string[];
};
export type EpisodeRetimer = (ms: number, options?: {
    keepOffset?: boolean;
}) => number;
export declare function podcastEpisodeRetimer(original: PodcastSpec, dubbed: PodcastSpec, maps: PodcastDubMaps): EpisodeRetimer;
export declare function retimePodcastChapters(chapters: readonly YouTubePackagingChapter[], retime: EpisodeRetimer): YouTubePackagingChapter[];
export declare function remapManualCuts(cuts: readonly PodcastManualCut[], retime: EpisodeRetimer): PodcastManualCut[];
