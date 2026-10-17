import type { CameraBox, CameraPanel } from '../../contracts/camera.js';
import { type PodcastSeat } from '../../contracts/podcast.js';
export interface HeadZone extends CameraBox {
    crown: number;
    key: string;
}
export interface HeadMeasures {
    headTop?: number | null | undefined;
    headTops?: Partial<Record<PodcastSeat, number | null>> | undefined;
}
export declare function headZones(panels: readonly CameraPanel[] | undefined, measures?: HeadMeasures): HeadZone[];
export declare function headSampleTimes(fromMs: number, toMs: number): number[];
export declare function steadyHeadZones(samples: ReadonlyArray<readonly CameraPanel[] | undefined>, measures?: HeadMeasures): HeadZone[];
