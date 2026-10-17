export declare const ATTACHMENT_ACCEPT = ".md,.markdown,.txt,.docx";
export declare const ATTACHMENT_LABEL = "Markdown (.md), texto (.txt) ou Word (.docx)";
export type AttachmentRead = {
    ok: true;
    text: string;
    truncated: boolean;
} | {
    ok: false;
    error: string;
};
export declare function readAttachment(name: string, bytes: Uint8Array): Promise<AttachmentRead>;
export declare function docxText(xml: string): string;
