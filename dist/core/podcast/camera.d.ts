import type { CameraIntent, CameraShot } from '../../contracts/camera.js';
import { type PodcastSeat, type PodcastShot, type PodcastSpec } from '../../contracts/podcast.js';
import { type VideoProfileId } from '../../contracts/profile.js';
import type { TimelineSpec } from '../../contracts/timeline.js';
import { type CameraDrink, type CameraSip, type CameraTiming, type CompileCameraOptions } from '../camera/compile.js';
import { type EffectiveTurn } from './turns.js';
export interface ShotOptions {
    durationMs?: number;
    turns?: readonly EffectiveTurn[];
    warnings?: string[];
    layoutMs?: number;
    sips?: Partial<Record<PodcastSeat, readonly CameraSip[]>>;
    profile?: VideoProfileId;
}
export declare function drinkSipsOf(timeline: TimelineSpec | undefined): CameraSip[];
export declare function podcastCameraTiming(turns: readonly EffectiveTurn[], durationMs: number): CameraTiming;
export declare function podcastCameraOptions(spec: PodcastSpec, profile?: VideoProfileId): {
    intents: CameraIntent[];
    options: CompileCameraOptions;
};
export declare function podcastDrinks(spec: PodcastSpec, sips?: Partial<Record<PodcastSeat, readonly CameraSip[]>>): Partial<Record<PodcastSeat, CameraDrink>>;
export declare function podcastShotOf(shot: CameraShot, fallbackSeat?: PodcastSeat): PodcastShot;
export declare function cameraShotOf(shot: PodcastShot): CameraShot;
export declare function shotShowsListener(shot: PodcastShot, seat: PodcastSeat): boolean;
export declare function computeShots(spec: PodcastSpec, options?: ShotOptions): PodcastShot[];
