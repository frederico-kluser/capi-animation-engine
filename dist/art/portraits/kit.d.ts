import type { PortraitFace } from '../face-portrait.js';
import type { SkinKey } from '../palette.js';
export interface PortraitKit {
    face: PortraitFace;
    skin: Partial<Record<SkinKey, string>>;
}
