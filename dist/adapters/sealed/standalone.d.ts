import { SealedView, type AnchorViewOptions } from './view.js';
export interface MountedView {
    update(props: Partial<AnchorViewOptions>): void;
    unmount(): void;
}
export declare function mount(target: Element | string, props?: AnchorViewOptions): MountedView;
export declare function mountAll(root?: ParentNode): number;
export { SealedView };
