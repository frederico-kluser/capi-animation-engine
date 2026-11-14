import type { ExpressiveMouthId, MouthId, MouthShape, VisemeId } from '../contracts/face.js';
export declare const EXPRESSIVE_MOUTHS: Record<ExpressiveMouthId, MouthShape>;
export declare const VISEME_MOUTHS: Record<VisemeId, MouthShape>;
export declare const MOUTHS: Record<MouthId, MouthShape>;
export declare function isMouthId(value: unknown): value is MouthId;
export interface MouthLoop {
    swing: MouthId;
    periodMs: number;
    cycles: number;
    grind?: number;
    taper?: readonly number[];
}
export declare const MOUTH_LOOPS: Partial<Record<MouthId, MouthLoop>>;
export declare function mouthLoop(mouth: unknown): MouthLoop | undefined;
