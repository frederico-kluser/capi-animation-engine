export declare function decodeWindows1252(bytes: Uint8Array): string;
export declare const SUBTITLES_NOT_UTF8 = "as legendas n\u00E3o estavam em UTF-8: leram-se como Windows-1252 (Latin-1) \u2014 confere os acentos; para n\u00E3o haver d\u00FAvidas, grava-as em UTF-8";
export declare function decodeSubtitleBytes(bytes: Uint8Array): {
    text: string;
    encoding: 'utf-8' | 'windows-1252';
    warning?: string;
};
