import type { Point } from './pose.js';
export type ExpressionId = 'neutral' | 'friendly' | 'excited' | 'laughing' | 'confident' | 'serious' | 'curious' | 'thinking' | 'skeptical' | 'surprised' | 'concerned' | 'sad' | 'wink';
export declare const EXPRESSION_IDS: readonly ["neutral", "friendly", "excited", "laughing", "confident", "serious", "curious", "thinking", "skeptical", "surprised", "concerned", "sad", "wink"];
export type VisemeId = 'rest' | 'MBP' | 'FV' | 'TH' | 'TDNL' | 'KG' | 'CHSH' | 'SZ' | 'A' | 'E' | 'O' | 'U';
export declare const VISME_IDS: readonly ["rest", "MBP", "FV", "TH", "TDNL", "KG", "CHSH", "SZ", "A", "E", "O", "U"];
export type ExpressiveMouthId = 'smile' | 'open' | 'laugh' | 'grin' | 'flat' | 'frown' | 'smirk' | 'oh' | 'pout';
export declare const EXPRESSIVE_MOUTH_IDS: readonly ["smile", "open", "laugh", "grin", "flat", "frown", "smirk", "oh", "pout"];
export type MouthId = ExpressiveMouthId | VisemeId;
export declare const MOUTH_IDS: readonly ["smile", "open", "laugh", "grin", "flat", "frown", "smirk", "oh", "pout", "rest", "MBP", "FV", "TH", "TDNL", "KG", "CHSH", "SZ", "A", "E", "O", "U"];
export interface MouthShape {
    w: number;
    corner: number;
    skew: number;
    top: number;
    bottom: number;
    tongue: number;
    x: number;
}
export interface BrowShape {
    y: number;
    angle: number;
    curve: number;
}
export interface EyeShape {
    open: number;
    smile: number;
}
export interface Expression {
    brows: Record<'left' | 'right', BrowShape>;
    eyes: Record<'left' | 'right', EyeShape>;
    mouth: MouthShape;
    look: Point;
}
export interface ExpressionSpec {
    base?: ExpressionId;
    intensity?: number;
    brows?: Partial<BrowShape> | {
        left?: Partial<BrowShape>;
        right?: Partial<BrowShape>;
    };
    eyes?: Partial<EyeShape> | {
        left?: Partial<EyeShape>;
        right?: Partial<EyeShape>;
    };
    mouth?: MouthId | Partial<MouthShape>;
    look?: Point;
}
export type ExpressionInput = ExpressionId | ExpressionSpec;
export interface ResolvedFace {
    brows: Record<'left' | 'right', BrowShape>;
    eyes: Record<'left' | 'right', EyeShape>;
    look: Point;
    mouth: MouthShape;
}
export declare const FACE: {
    readonly eye: {
        readonly x: 76;
        readonly y: 14;
        readonly rx: 19.5;
        readonly ry: 40;
    };
    readonly brow: {
        readonly x: 86;
        readonly y: -68;
        readonly halfLength: 19;
        readonly thickness: 13.5;
    };
    readonly mouth: {
        readonly y: 80;
        readonly stroke: 11;
    };
    readonly lookRange: {
        readonly x: 11;
        readonly y: 8;
    };
};
