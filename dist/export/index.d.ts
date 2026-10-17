import { type AnchorProps } from '../render/Anchor.js';
export interface AnchorSvgExportOptions extends AnchorProps {
    xmlDeclaration?: boolean;
}
export declare function renderAnchorSvg(options?: AnchorSvgExportOptions): string;
