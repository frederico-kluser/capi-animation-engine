import { type ReactElement } from 'react';
import type { AnchorInput, ResolvedAnchorState } from '../contracts/state.js';
import type { CharacterSpec } from '../contracts/character.js';
export interface AnchorProps extends AnchorInput {
    state?: ResolvedAnchorState;
    width?: number | string;
    height?: number | string;
    title?: string;
    decorative?: boolean;
    idPrefix?: string;
    className?: string;
    debug?: boolean;
    viewBox?: string;
    characterSpec?: CharacterSpec;
    assetUrl?: (src: string) => string;
}
export declare function Anchor(props: AnchorProps): ReactElement;
