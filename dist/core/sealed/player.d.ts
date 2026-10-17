export declare const SEALED_STATES: readonly ['loading', 'ready', 'playing', 'paused', 'ended', 'error'];
export type SealedState = (typeof SEALED_STATES)[number];
export interface SealedStatus {
    error: boolean;
    loaded: boolean;
    fitted: boolean;
    playing: boolean;
    played: boolean;
    ended: boolean;
}
export declare function sealedState(status: SealedStatus): SealedState;
export type SealedPress = 'play' | 'pause' | 'none';
export declare function sealedPress(state: SealedState, allowPause: boolean): SealedPress;
export type SealedTab = 'suspend' | 'resume' | 'none';
export declare function sealedHidden(state: SealedState, hidden: boolean): SealedTab;
export declare function sealedButtonShown(state: SealedState): boolean;
export declare function sealedFormatOf(text: string): {
    width: number;
    height: number;
} | undefined;
