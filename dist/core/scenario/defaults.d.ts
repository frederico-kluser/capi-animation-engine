import type { ScenarioFit, ScenarioLook } from '../../contracts/scenario.js';
export declare const SCENARIO_DEFAULTS: {
    readonly fit: Readonly<ScenarioFit>;
    readonly look: Readonly<ScenarioLook>;
    readonly radialCenter: {
        readonly x: 0.5;
        readonly y: 0.35;
    };
    readonly linearAngle: 180;
    readonly blurReference: 1080;
    readonly blurBleed: 2.5;
    readonly wallOverdraw: 1.16;
    readonly vignetteInner: 0.42;
    readonly vignetteOuter: 1;
    readonly vignetteMax: 0.85;
};
export declare const SCENARIO_LIMITS: {
    readonly name: 60;
    readonly id: 64;
    readonly stops: {
        readonly min: 2;
        readonly max: 6;
    };
    readonly pieces: 8;
    readonly zoom: {
        readonly min: 1;
        readonly max: 4;
    };
    readonly dim: {
        readonly min: 0;
        readonly max: 0.9;
    };
    readonly blur: {
        readonly min: 0;
        readonly max: 40;
    };
    readonly vignette: {
        readonly min: 0;
        readonly max: 1;
    };
    readonly piecePosition: {
        readonly min: -0.5;
        readonly max: 1.5;
    };
    readonly pieceSize: {
        readonly min: 0.03;
        readonly max: 2;
    };
    readonly mediaSide: 4096;
    readonly videoMs: 30000;
};
