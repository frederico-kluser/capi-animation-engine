import type { CreateTask } from './material.js';
import type { CritiqueIssue, CritiqueUnit } from './critique.js';
export declare const KNOWN_ACRONYMS: ReadonlySet<string>;
export declare function comprehensionChecks(units: readonly CritiqueUnit[], duo: boolean, options?: {
    known?: ReadonlySet<string>;
}): CritiqueIssue[];
export declare const LAY_CONFUSION_KINDS: readonly ['term', 'number', 'leap', 'rush'];
export type LayConfusionKind = (typeof LAY_CONFUSION_KINDS)[number];
export interface LayConfusion {
    unit: string;
    quote: string;
    kind: LayConfusionKind;
    fix: string;
}
export declare const LAY_VIEWER_PROFILE = "uma pessoa adulta no Brasil, com o ensino m\u00E9dio, curiosa, que NUNCA leu nada sobre este assunto nem a not\u00EDcia ou o artigo de que o v\u00EDdeo fala, n\u00E3o l\u00EA ingl\u00EAs t\u00E9cnico e assiste ao v\u00EDdeo de uma vez, sem pausar nem voltar atr\u00E1s";
export declare const LAY_MAX_CONFUSIONS = 10;
export declare function buildLayViewerMessages(units: readonly CritiqueUnit[], context: {
    title?: string;
    concepts?: readonly string[];
}): {
    system: string;
    user: string;
};
export declare function parseLayViewer(content: string, units: readonly CritiqueUnit[]): {
    value: LayConfusion[] | null;
    problems: string[];
    fatal: boolean;
};
export declare function layIssues(confusions: readonly LayConfusion[]): CritiqueIssue[];
export declare function layViewerTask(units: readonly CritiqueUnit[], context: {
    title?: string;
    concepts?: readonly string[];
}): CreateTask<LayConfusion[]>;
