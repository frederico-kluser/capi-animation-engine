import { type CharacterId } from '../../contracts/character.js';
import type { EmbedBackground, EmbedTalkData, EncryptedMovementEnvelope } from '../../contracts/embed.js';
import type { OutfitInput } from '../../contracts/outfit.js';
import type { AnchorPlayerHandle } from './PlayerShell.js';
export interface AnchorLivePlayerProps {
    movement: EmbedTalkData | EncryptedMovementEnvelope | null;
    audioUrl?: string | null;
    thinking?: boolean;
    autoPlay?: boolean;
    character?: CharacterId;
    outfit?: OutfitInput;
    background?: EmbedBackground;
    maxFps?: number;
    title?: string;
    onPlay?: () => void;
    onEnded?: () => void;
    onPause?: () => void;
}
export declare const AnchorLivePlayer: import("react").ForwardRefExoticComponent<AnchorLivePlayerProps & import("react").RefAttributes<AnchorPlayerHandle>>;
