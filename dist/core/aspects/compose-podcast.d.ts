import type { AspectRecord, CompositionReport, PodcastAspectId } from '../../contracts/aspects.js';
import type { CameraIntent, CameraStyle } from '../../contracts/camera.js';
import { type PodcastSpec } from '../../contracts/podcast.js';
import { type EffectiveTurn } from '../podcast/turns.js';
export interface ComposePodcastInput {
    base: PodcastSpec;
    records: Partial<Record<PodcastAspectId, AspectRecord>>;
    camera?: {
        style?: CameraStyle;
        multiSeat?: boolean;
        zooms?: boolean;
    };
    files?: Partial<Record<string, string>>;
    pickSeeds?: boolean;
    moments?: ReadonlyArray<{
        kind: string;
        turn?: string;
    }>;
}
export declare const RETURN_AFTER_MS = 3000;
export interface ComposePodcastOutput {
    spec: PodcastSpec;
    report: CompositionReport;
}
export declare function listenSpan(turn: EffectiveTurn, word: number, holdWords?: number): {
    last: number;
    endMs: number;
};
export declare function scriptedBase(spec: PodcastSpec, scriptCamera?: readonly CameraIntent[]): PodcastSpec;
export declare function composePodcast(input: ComposePodcastInput): ComposePodcastOutput;
