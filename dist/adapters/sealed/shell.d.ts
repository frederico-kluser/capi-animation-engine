import { type CSSProperties, type ReactElement, type ReactNode } from 'react';
export interface SealedLabels {
    play: string;
    replay: string;
    resume: string;
    loading: string;
    error: string;
}
export declare const SEALED_LABELS: SealedLabels;
export declare const SEALED_CSS = "\n.ias-view{position:relative;display:block;box-sizing:border-box;width:100%;max-width:100%;margin:0 auto;color:#f4f6fb;font:500 13px/1.3 system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-tap-highlight-color:transparent}\n.ias-view:focus{outline:none}\n.ias-view:focus-visible{outline:2px solid var(--ias-accent,#ffd23f);outline-offset:2px}\n.ias-box{position:relative;width:100%;overflow:hidden;background:var(--ias-stage-bg,transparent);border-radius:var(--ias-radius,10px);cursor:pointer;user-select:none;-webkit-user-select:none}\n.ias-view[data-state=\"playing\"]:not([data-allow-pause]) .ias-box,.ias-view[data-state=\"loading\"] .ias-box,.ias-view[data-state=\"error\"] .ias-box{cursor:default}\n.ias-frame{all:initial;display:block;position:absolute;left:0;top:0;transform-origin:0 0;overflow:hidden}\n.ias-frame svg,.ias-frame img,.ias-frame video,.ias-frame canvas{max-width:none;max-height:none}\n.ias-big{position:absolute;left:50%;top:50%;width:clamp(52px,16cqw,88px);height:clamp(52px,16cqw,88px);margin:0;padding:0;transform:translate(-50%,-50%);border:0;border-radius:50%;background:rgba(10,14,26,.74);color:#fff;display:grid;place-items:center;cursor:pointer;box-shadow:0 4px 18px rgba(0,0,0,.35)}\n.ias-big:hover{background:rgba(10,14,26,.9)}\n.ias-big:disabled{cursor:default;opacity:.8}\n.ias-big svg{width:46%;height:46%;margin-left:6%}\n.ias-big[data-spin=\"1\"] svg{margin:0}\n.ias-view:focus-visible .ias-big,.ias-big:focus-visible{outline:2px solid var(--ias-accent,#ffd23f);outline-offset:2px}\n.ias-note{position:absolute;left:8px;right:8px;bottom:8px;margin:0;padding:8px 10px;border-radius:8px;background:rgba(10,14,26,.88);color:#fff;font:500 13px/1.35 system-ui,sans-serif;text-align:left}\n.ias-sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}\n@media (prefers-reduced-motion:no-preference){.ias-big{transition:background-color .15s ease,opacity .15s ease}.ias-big[data-spin=\"1\"] svg{animation:ias-spin 1s linear infinite}@keyframes ias-spin{to{transform:rotate(360deg)}}}\n";
export declare function prefersReducedMotion(): boolean;
export interface SealedShellProps {
    title: string;
    lang?: string | undefined;
    kind: string;
    format: {
        width: number;
        height: number;
    };
    maxHeight?: string | undefined;
    className?: string | undefined;
    style?: CSSProperties | undefined;
    labels?: Partial<SealedLabels> | undefined;
    playing: boolean;
    loaded: boolean;
    played: boolean;
    ended: boolean;
    error: boolean;
    allowPause?: boolean | undefined;
    frame?: number | undefined;
    frames?: number | undefined;
    soundMs?: number | null | undefined;
    measured?: boolean | undefined;
    start(): void;
    hold(): void;
    children(idPrefix: string): ReactNode;
}
export declare function SealedShell(props: SealedShellProps): ReactElement;
