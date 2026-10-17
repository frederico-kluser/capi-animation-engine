import { type Scenario, type ScenarioMode } from '../contracts/scenario.js';
export declare const FACTORY_SCENARIOS: readonly Scenario[];
export declare const FACTORY_SCENARIO_IDS: readonly string[];
export declare function isFactoryScenarioId(id: unknown): boolean;
export declare function factoryScenario(id: string): Scenario | undefined;
export declare const SCENARIO_MODE_LABELS: Readonly<Record<ScenarioMode, string>>;
export declare function isScenarioMode(value: unknown): value is ScenarioMode;
export declare const SCENARIO_NONE = "none";
