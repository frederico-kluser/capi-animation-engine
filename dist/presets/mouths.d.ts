import type { ExpressiveMouthId, MouthId, MouthShape, VisemeId } from '../contracts/face.js';
export declare const EXPRESSIVE_MOUTHS: Record<ExpressiveMouthId, MouthShape>;
export declare const VISEME_MOUTHS: Record<VisemeId, MouthShape>;
export declare const MOUTHS: Record<MouthId, MouthShape>;
export declare function isMouthId(value: unknown): value is MouthId;
