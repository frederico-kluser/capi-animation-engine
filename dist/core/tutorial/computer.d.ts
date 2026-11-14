import type { PoseInput, Point } from '../../contracts/pose.js';
import type { ReviewSegment } from '../../contracts/review.js';
import type { TimelineSpec } from '../../contracts/timeline.js';
import type { TutorialEvent, TutorialLaptopModel } from '../../contracts/tutorial.js';
import { type PoseId } from '../../presets/poses.js';
export declare const TUTORIAL_COMPUTER_TRACK = "tutorial-computer";
export declare const LAPTOP_ROLES: readonly ['Type', 'Mouse', 'Click', 'Look', 'Talk', 'Explain', 'Point', 'Think', 'ThumbsUp'];
export type LaptopRole = (typeof LAPTOP_ROLES)[number];
export declare const LAPTOP_PREFIX: Readonly<Record<TutorialLaptopModel, string>>;
export declare const TUTORIAL_COMPUTER: {
    readonly actionMs: 240;
    readonly backMs: 320;
    readonly minRunMs: 280;
    readonly pads: {
        readonly type: readonly [0, 200];
        readonly key: readonly [80, 260];
        readonly move: readonly [0, 120];
        readonly click: readonly [60, 380];
    };
};
export declare function laptopPose(model: TutorialLaptopModel, role: LaptopRole): PoseId;
export declare function laptopRoleOf(pose: PoseInput | undefined): LaptopRole;
export interface ComputerWindow {
    fromMs: number;
    toMs: number;
    runs: Array<{
        fromMs: number;
        toMs: number;
        role: LaptopRole;
        gaze?: Point;
    }>;
}
export declare function tutorialComputerWindows(events: readonly TutorialEvent[], segments: readonly ReviewSegment[]): ComputerWindow[];
export interface OverlayComputerOptions {
    model: TutorialLaptopModel;
    restLook?: Point;
    calmListening?: boolean;
}
export declare function overlayComputer(spec: TimelineSpec, windows: readonly ComputerWindow[], options: OverlayComputerOptions): TimelineSpec;
