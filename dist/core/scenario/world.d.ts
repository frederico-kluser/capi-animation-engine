import { type PodcastScene, type SceneObject } from '../../contracts/scene.js';
import type { Scenario } from '../../contracts/scenario.js';
export declare const SCENARIO_WORLD: {
    readonly frameWidth: number;
    readonly overlap: 0.3;
    readonly order: -1000;
    readonly idPrefix: 'scn-';
};
export declare function scenarioWorldObjects(scenario: Pick<Scenario, 'pieces' | 'modes'> | undefined): SceneObject[];
export declare function isScenarioWorldObject(object: Pick<SceneObject, 'id'>): boolean;
export declare function withScenarioScene<T extends {
    scene?: PodcastScene;
}>(spec: T, scenario: Pick<Scenario, 'pieces' | 'modes'> | undefined): T;
