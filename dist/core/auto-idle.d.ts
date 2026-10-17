export interface AutoIdleConfig {
    blink: boolean;
    breath: boolean;
    sway: boolean;
}
export declare const DEFAULT_AUTO_IDLE: AutoIdleConfig;
export interface AutoIdleSample {
    blink: {
        left: number;
        right: number;
    };
    breath: number;
    sway: number;
}
export declare const SWAY_AMPLITUDE_DEG = 0.4;
export declare function sampleAutoIdle(timeMs: number, seed: number, config?: AutoIdleConfig): AutoIdleSample;
export declare function combineBlinkClosures(auto: {
    left: number;
    right: number;
}, manual: {
    left?: number;
    right?: number;
} | undefined): {
    left: number;
    right: number;
};
