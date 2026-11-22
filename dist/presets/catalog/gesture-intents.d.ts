import type { GestureIntent, PoseCounterCase } from '../../contracts/catalog.js';
import type { PoseId } from '../poses.js';
export declare const GESTURE_INTENTS: readonly GestureIntent<PoseId>[];
export declare function poseIntents(id: PoseId): readonly string[];
export declare const POSE_COUNTER: Readonly<Partial<Record<PoseId, readonly PoseCounterCase<PoseId>[]>>>;
