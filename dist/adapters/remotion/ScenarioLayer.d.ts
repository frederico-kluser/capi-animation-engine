import { type ReactElement } from 'react';
import type { Scenario, ScenarioMode } from '../../contracts/scenario.js';
import { type ScenarioMediaRender } from '../../render/ScenarioBackdrop.js';
export declare function scenarioRemotionMedia(fps: number): ScenarioMediaRender;
export interface ScenarioLayerProps {
    scenario: Scenario;
    mode: ScenarioMode;
    size: {
        width: number;
        height: number;
    };
    assetUrl: (src: string) => string;
    idPrefix?: string | undefined;
}
export declare function ScenarioLayer(props: ScenarioLayerProps): ReactElement;
