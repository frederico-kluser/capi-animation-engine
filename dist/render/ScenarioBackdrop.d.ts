import { type CSSProperties, type ReactElement, type ReactNode } from 'react';
import type { ScenarioBackdrop, ScenarioBackdropMedia } from '../contracts/scenario.js';
export type ScenarioMediaRender = (media: ScenarioBackdropMedia, style: CSSProperties, url: string) => ReactNode;
export interface ScenarioBackdropViewProps {
    backdrop: ScenarioBackdrop;
    size?: {
        width: number;
        height: number;
    } | undefined;
    assetUrl?: ((src: string) => string) | undefined;
    renderMedia?: ScenarioMediaRender | undefined;
    still?: boolean | undefined;
    idPrefix?: string | undefined;
}
export declare function scenarioMediaStyle(backdrop: Pick<ScenarioBackdrop, 'width' | 'height'>, media: ScenarioBackdropMedia, size?: {
    width: number;
    height: number;
}): CSSProperties;
export declare function scenarioBlurFilter(backdrop: Pick<ScenarioBackdrop, 'width' | 'height' | 'blur'>, size?: {
    width: number;
    height: number;
}): string | null;
export declare function ScenarioBackdropView(props: ScenarioBackdropViewProps): ReactElement;
