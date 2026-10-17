export declare const CHROMA_KEY_IDS: readonly ['green', 'blue'];
export type ChromaKey = (typeof CHROMA_KEY_IDS)[number];
export declare const DEFAULT_CHROMA_KEY: ChromaKey;
export declare const CHROMA_MIN_DISTANCE = 40;
export declare const CHROMA_KEYS: Readonly<Record<ChromaKey, string>>;
export declare const CHROMA_LABELS: Readonly<Record<ChromaKey, string>>;
export declare const isChromaKey: (value: unknown) => value is ChromaKey;
export declare function chromaColor(key?: ChromaKey | null): string;
export declare function chromaDistance(hex: string, key: ChromaKey): number;
export interface ChromaClash {
    name: string;
    color: string;
    distance: number;
}
export declare function chromaClashes(palette: Readonly<Record<string, string>>, key: ChromaKey, minDistance: number): ChromaClash[];
