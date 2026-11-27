export declare const TERMINAL_CURSOR = "\u258C";
export declare const TERMINAL_CHAR_EM = 0.62;
export declare const TERMINAL_LINE_HEIGHT = 1.28;
export interface TerminalLine {
    prompt: string;
    body: string;
    code: boolean;
    cursor: boolean;
    error: boolean;
}
export declare function terminalLine(text: string): TerminalLine;
export interface TerminalRow {
    line: number;
    prompt: string;
    text: string;
    code: boolean;
    error: boolean;
    cursor: boolean;
    chars: number;
}
export declare function terminalRows(lines: readonly string[], cols: number): TerminalRow[];
export interface TerminalLayout {
    font: number;
    lineHeight: number;
    padX: number;
    bar: number;
    top: number;
    rows: TerminalRow[];
}
export declare function terminalLayout(lines: readonly string[], width: number, height: number, unit: number, maxFont: number): TerminalLayout;
export declare function accentLineOf(lines: readonly string[], accent: string | undefined, explicit?: number): number | undefined;
export interface RoadmapCheckLike {
    kind?: string;
    prompt?: string;
    expected?: string;
}
export declare function checkTerminal(check: RoadmapCheckLike | null | undefined): string[];
