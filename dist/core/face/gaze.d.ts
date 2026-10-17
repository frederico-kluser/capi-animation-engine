import type { EyeStyle } from '../../contracts/character.js';
import type { EyeShape } from '../../contracts/face.js';
import type { Point } from '../../contracts/pose.js';
export declare const GAZE: {
    readonly eyeTravel: {
        solid: number;
        catchlight: number;
        pupil: number;
    };
    readonly catchlight: {
        readonly rest: {
            readonly x: 0.42;
            readonly y: -0.36;
        };
        readonly left: -0.62;
        readonly right: 0.72;
        readonly up: -0.72;
        readonly down: 0.5;
        readonly radius: 0.3;
    };
    readonly pupil: {
        readonly reach: {
            readonly x: 0.48;
            readonly y: 0.42;
        };
        readonly radius: 0.56;
    };
};
export declare function eyeTravel(style: EyeStyle): number;
export declare function gazeSpot(style: Exclude<EyeStyle, 'solid'>, look: Point, aspect?: number): Point;
export declare function gazeSpotOpacity(eye: EyeShape): number;
