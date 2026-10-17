import { type Scenario, type ScenarioAspect, type ScenarioBackdrop, type ScenarioFill, type ScenarioFit, type ScenarioLook, type ScenarioMode, type ScenarioPiece, type ScenarioRect, type ScenarioTarget } from '../../contracts/scenario.js';
export declare function scenarioAspectOf(width: number, height: number): ScenarioAspect;
export declare function scenarioFitFor(scenario: Pick<Scenario, 'fit' | 'modes' | 'aspects'>, mode: ScenarioMode, aspect: ScenarioAspect): ScenarioFit;
export declare function scenarioLookFor(scenario: Pick<Scenario, 'look' | 'modes' | 'aspects'>, mode: ScenarioMode, aspect: ScenarioAspect): ScenarioLook;
export declare function scenarioMediaRect(media: {
    width: number;
    height: number;
}, fit: ScenarioFit, frame: {
    width: number;
    height: number;
}): ScenarioRect;
export declare function scenarioDragFocus(media: {
    width: number;
    height: number;
}, fit: ScenarioFit, frame: {
    width: number;
    height: number;
}, dx: number, dy: number): {
    focusX: number;
    focusY: number;
};
export declare function scenarioPaint(fill: ScenarioFill): {
    color: string;
    paint: string;
};
export declare function scenarioPieceNatural(piece: Pick<ScenarioPiece, 'type' | 'kind' | 'natural'>): {
    width: number;
    height: number;
};
export declare function resolveScenario(scenario: Scenario, target: ScenarioTarget): ScenarioBackdrop;
export declare function scenarioLoopMs(durationMs: number | undefined, timeMs: number): number;
export declare function scenarioLoopFrames(durationMs: number | undefined, fps: number): number;
export declare function scenarioVignettePaint(vignette: number, ink: string): string | null;
