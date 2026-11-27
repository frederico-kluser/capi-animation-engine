import type { TutorialGateId } from '../../contracts/tutorial.js';
export interface TutorialGateExit {
    measures: string;
    exit: string;
}
export declare const TUTORIAL_GATE_EXITS: Readonly<Record<TutorialGateId, TutorialGateExit>>;
export declare function tutorialGateExit(gate: string): TutorialGateExit | null;
export declare function gateExitQuotes(exit: string): string[];
