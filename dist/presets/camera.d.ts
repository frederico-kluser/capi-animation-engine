import type { CameraAngle, CameraIntentKind, CameraMoveKind, CameraShot, CameraStyle, CameraTransitionKind, ShotFraming, ShotSize } from '../contracts/camera.js';
export declare const CAMERA_FRAMING_LABELS: Record<ShotFraming, string>;
export declare const CAMERA_SIZE_LABELS: Record<ShotSize, string>;
export declare const CAMERA_ANGLE_LABELS: Record<CameraAngle, string>;
export declare const CAMERA_TRANSITION_LABELS: Record<CameraTransitionKind, string>;
export declare const CAMERA_MOVE_LABELS: Record<CameraMoveKind, string>;
export declare const CAMERA_INTENT_LABELS: Record<CameraIntentKind, string>;
export declare const CAMERA_STYLE_LABELS: Record<CameraStyle, string>;
export declare function cameraShotLook(shot: Partial<Pick<CameraShot, 'framing' | 'size' | 'zoom' | 'move' | 'angle' | 'transition' | 'shiftX'>>): string;
export declare const CAMERA_TAGS: {
    readonly framing: {
        single: string;
        two: string;
        wide: string;
        split: string;
        insert: string;
        favor: string;
        pip: string;
    };
    readonly size: {
        loose: string;
        medium: string;
        mediumClose: string;
        close: string;
        extreme: string;
    };
    readonly angle: {
        main: string;
        side: string;
        low: string;
        high: string;
        dutch: string;
    };
    readonly move: {
        static: string;
        push: string;
        pull: string;
        snap: string;
        drift: string;
        punchOut: string;
        shake: string;
        handheld: string;
        pan: string;
        step: string;
    };
    readonly transition: {
        cut: string;
        whip: string;
        zoom: string;
        flash: string;
        dip: string;
        dissolve: string;
    };
};
export declare function cameraShotTag(shot: Partial<Pick<CameraShot, 'framing' | 'size' | 'move' | 'angle' | 'transition'>>): string;
