import type { ReactElement, ReactNode } from 'react';
import type { SealedActor, SealedCameraFrame, SealedCameraScene, SealedState } from '../../contracts/sealed.js';
import type { ResolvedAnchorState } from '../../contracts/state.js';
export interface SealedStageProps<Scene, Frame> {
    scene: Scene;
    frame: Frame;
    idPrefix: string;
    assetUrl: (src: string) => string;
    captions?: boolean | undefined;
    tv?: ReactNode;
    tvUnder?: ReactNode;
}
export declare function anchorState(actor: SealedActor, state: SealedState): ResolvedAnchorState;
export declare function CameraStage(props: SealedStageProps<SealedCameraScene, SealedCameraFrame>): ReactElement;
