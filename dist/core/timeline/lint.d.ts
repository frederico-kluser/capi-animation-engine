import type { PoseInput } from '../../contracts/pose.js';
import type { TimelineSpec } from '../../contracts/timeline.js';
export type LintRule = 'invalid' | 'prop-pop' | 'through-head' | 'wrist-bent' | 'too-fast' | 'linear-ease' | 'hard-stop' | 'hold-too-short' | 'clash' | 'too-slow' | 'slow-bounce' | 'jump-cut' | 'interrupted' | 'loop-cut' | 'past-end' | 'expression-snap' | 'eyes-twitch' | 'stuck-offset' | 'static';
export declare const LINT_RULES: readonly ["invalid", "prop-pop", "through-head", "wrist-bent", "too-fast", "linear-ease", "hard-stop", "hold-too-short", "clash", "too-slow", "slow-bounce", "jump-cut", "interrupted", "loop-cut", "past-end", "expression-snap", "eyes-twitch", "stuck-offset", "static"];
export type LintLevel = 'error' | 'warn' | 'info';
export interface TimelineIssue {
    rule: LintRule;
    level: LintLevel;
    atMs: number;
    message: string;
    fix: string;
}
export interface LintOptions {
    base?: PoseInput;
}
export declare function lintTimeline(spec: TimelineSpec, options?: LintOptions): TimelineIssue[];
