import { type CSSProperties, type ReactElement, type ReactNode, type Ref } from 'react';
export interface PlayerLabels {
    play: string;
    pause: string;
    replay: string;
    seek: string;
    mute: string;
    unmute: string;
    volume: string;
    captions: string;
    fullscreen: string;
    exitFullscreen: string;
    position: string;
    audioError: string;
}
export declare const PLAYER_LABELS: PlayerLabels;
export interface AnchorPlayerHandle {
    play(): void;
    pause(): void;
    toggle(): void;
    seek(ms: number): void;
    getTimeMs(): number;
    isPlaying(): boolean;
}
export interface AnchorPlayerOptions {
    className?: string | undefined;
    style?: CSSProperties | undefined;
    controls?: boolean | undefined;
    autoPlay?: boolean | undefined;
    loop?: boolean | undefined;
    muted?: boolean | undefined;
    volume?: number | undefined;
    captions?: boolean | undefined;
    maxHeight?: string | undefined;
    posterMs?: number | undefined;
    preload?: 'none' | 'metadata' | 'auto' | undefined;
    maxFps?: number | undefined;
    title?: string | undefined;
    labels?: Partial<PlayerLabels> | undefined;
    onPlay?: (() => void) | undefined;
    onPause?: (() => void) | undefined;
    onEnded?: (() => void) | undefined;
    onTimeUpdate?: ((timeMs: number) => void) | undefined;
    onError?: ((message: string) => void) | undefined;
}
export interface StageRenderState {
    frame: number;
    playing: boolean;
    captions: boolean;
    idPrefix: string;
}
export interface PlayerShellProps extends AnchorPlayerOptions {
    kind: string;
    profile: string;
    frame: {
        width: number;
        height: number;
    };
    durationMs: number;
    fps: number;
    audioSrc: string;
    audioType?: string | undefined;
    lang?: string | undefined;
    hasCaptions: boolean;
    captionsInitial: boolean;
    dataTitle: string;
    renderStage(state: StageRenderState): ReactNode;
    handle?: Ref<AnchorPlayerHandle> | undefined;
}
export declare function PlayerShell(props: PlayerShellProps): ReactElement;
