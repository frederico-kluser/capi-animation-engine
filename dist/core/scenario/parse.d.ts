import { type Scenario, type ScenarioKind } from '../../contracts/scenario.js';
export declare function isScenarioColor(value: unknown): value is string;
export declare function isScenarioId(value: unknown): value is string;
export declare function isScenarioSource(value: unknown): value is string;
export interface ScenarioParse {
    scenario: Scenario | null;
    problems: string[];
}
export declare function parseScenario(raw: unknown): ScenarioParse;
export declare function scenarioKind(scenario: Pick<Scenario, 'media' | 'wall' | 'pieces'>): ScenarioKind;
export declare function scenarioMoves(scenario: Pick<Scenario, 'media'>): boolean;
export declare function scenarioFiles(scenario: Pick<Scenario, 'media' | 'pieces'>): string[];
export declare function mapScenarioSources<S extends Pick<Scenario, 'media' | 'pieces'>>(scenario: S, map: (src: string) => string): S;
export declare function scenarioSlug(name: string): string;
export declare function uniqueScenarioId(base: string, taken: (id: string) => boolean): string;
export declare const SCENARIO_KIND_LABELS: Readonly<Record<ScenarioKind, string>>;
export declare function scenarioSummary(scenario: Scenario): string;
