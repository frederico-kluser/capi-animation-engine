import { AnchorPlayer, type AnchorPlayerProps } from './AnchorPlayer.js';
export interface MountedPlayer {
    update(props: Partial<AnchorPlayerProps>): void;
    unmount(): void;
}
export declare function mount(target: Element | string, props?: AnchorPlayerProps): MountedPlayer;
export declare function mountAll(root?: ParentNode): number;
export declare const version = 1;
export { AnchorPlayer };
