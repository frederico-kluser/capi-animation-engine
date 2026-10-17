import { type CSSProperties, type ReactElement, type ReactNode } from 'react';
import type { CameraBox, CameraFx, CameraView } from '../contracts/camera.js';
import type { AnchorView } from '../contracts/state.js';
export interface FrameSize {
    width: number;
    height: number;
}
export interface PanelFill {
    width: number | string;
    height: number | string;
}
export interface CameraPanelDraw {
    key: string;
    rect: CameraBox;
    roll?: number;
    inset?: boolean;
    attrs?: Readonly<Record<string, string>>;
    style?: CSSProperties;
    render: (fill: PanelFill) => ReactNode;
}
export interface CameraLayerDraw {
    panels: readonly CameraPanelDraw[];
    seam?: ReactNode;
}
export interface CameraFrameViewProps extends CameraLayerDraw {
    under?: CameraLayerDraw | undefined;
    opacity?: number | undefined;
    fx?: CameraFx | undefined;
    format: FrameSize;
    size?: FrameSize | undefined;
    idPrefix?: string | undefined;
    fxOn?: 'frame' | 'content' | undefined;
    bare?: boolean | undefined;
    children?: ReactNode;
}
export declare const CAMERA_DRAW: {
    readonly insetBorder: 0.006;
    readonly insetRadius: 0.022;
    readonly insetShadowOffset: 0.009;
    readonly insetShadowBlur: 0.014;
    readonly insetShadowOpacity: 0.55;
    readonly blurBleed: 2;
};
export declare function panelRectStyle(rect: CameraBox, size?: FrameSize): CSSProperties;
export declare function panelFill(rect: CameraBox, size?: FrameSize): PanelFill;
export declare function rollTransform(rollDeg: number | undefined, rect: CameraBox, format: FrameSize): string | null;
export declare function panelAnchorView(panel: {
    view?: CameraView | undefined;
} | undefined): AnchorView | undefined;
export declare function sameAnchorView(a: AnchorView | undefined, b: AnchorView | undefined): boolean;
export declare function insetMeasures(format: FrameSize): {
    border: number;
    radius: number;
    shadowOffset: number;
    shadowBlur: number;
};
export declare function isPlainCameraDraw(props: Pick<CameraFrameViewProps, 'panels' | 'under' | 'opacity' | 'fx'>): boolean;
export declare function FormatLayer(props: {
    format: FrameSize;
    size?: FrameSize | undefined;
    children: (px: FrameSize) => ReactNode;
}): ReactElement | null;
export declare function CameraFrameView(props: CameraFrameViewProps): ReactElement;
