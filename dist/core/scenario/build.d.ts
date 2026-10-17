import type { DecorKind } from '../../contracts/scene.js';
import { type Scenario, type ScenarioFit, type ScenarioLook, type ScenarioMedia, type ScenarioPiece } from '../../contracts/scenario.js';
export declare const SCENARIO_MEDIA_FILL = "#000000";
export interface ScenarioFromMediaOptions {
    id?: string;
    name?: string;
    fit?: Partial<ScenarioFit>;
    look?: Partial<ScenarioLook>;
}
export declare function scenarioFromMedia(media: ScenarioMedia, options?: ScenarioFromMediaOptions): Scenario;
export declare function duplicateScenario(scenario: Scenario, id: string, name: string): Scenario;
export declare function defaultPieceSize(kind: DecorKind): number;
export declare function newScenarioPiece(kind: DecorKind, index: number, id: string): ScenarioPiece;
