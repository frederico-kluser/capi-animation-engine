import type { AutoLessonManifest, AutoLessonVideoRoute } from '../../contracts/auto-lesson.js';
import type { AutoLessonEditStep, AutoLessonEditStepId } from '../../contracts/auto-lesson-edit.js';
import { type AutoLessonRefineRedo, type AutoLessonRefineRedoTarget, type AutoLessonDiffItem, type AutoLessonDiffLine, type AutoLessonRefineDiff, type AutoLessonRefineFacts, type AutoLessonRefinement, type AutoLessonRefinePart } from '../../contracts/auto-lesson-refine.js';
import type { TutorialLesson } from '../../contracts/tutorial.js';
export declare const REFINE_STALE_MS: number;
export declare const orderParts: (parts: Iterable<AutoLessonRefinePart>) => AutoLessonRefinePart[];
export declare function refinePartsOf(value: unknown): {
    parts: AutoLessonRefinePart[];
} | {
    problem: string;
};
export interface RefineMaterial {
    route: AutoLessonVideoRoute;
    hasVideo: boolean;
    hasShort: boolean;
    hasStudy: boolean;
}
export declare function refineMaterialOf(manifest: AutoLessonManifest): RefineMaterial;
export declare function availableRefineParts(material: RefineMaterial): AutoLessonRefinePart[];
export declare function closeRefineParts(chosen: readonly AutoLessonRefinePart[], material: RefineMaterial): {
    parts: AutoLessonRefinePart[];
    chosen: AutoLessonRefinePart[];
    derived: AutoLessonRefinePart[];
};
export declare function refineRequestFor(r: Pick<AutoLessonRefinement, 'parts' | 'derived' | 'request'>, part: AutoLessonRefinePart): string | undefined;
export declare const AUTO_LESSON_REFINE_STEP_ORDER: readonly AutoLessonEditStepId[];
export declare const AUTO_LESSON_REFINE_STEP_LABELS: Readonly<Partial<Record<AutoLessonEditStepId, string>>>;
export type RefinePlanInput = Pick<AutoLessonRefinement, 'parts' | 'partsBy'> & {
    derived?: readonly AutoLessonRefinePart[];
    facts?: AutoLessonRefineFacts;
};
export declare function planRefineSteps(r: RefinePlanInput, material: RefineMaterial): AutoLessonEditStep[];
export declare function replanRefineSteps(current: readonly AutoLessonEditStep[], planned: readonly AutoLessonEditStep[]): AutoLessonEditStep[];
export declare const refinementsOf: (manifest: AutoLessonManifest) => AutoLessonRefinement[];
export declare const refinementOf: (manifest: AutoLessonManifest, id: string | undefined) => AutoLessonRefinement | undefined;
export declare function nextRefinementId(items: readonly AutoLessonRefinement[]): string;
export declare const refinementCost: (steps: readonly AutoLessonEditStep[], redone?: readonly AutoLessonRefineRedo[]) => number;
export interface NewRefinementInput {
    request: string;
    parts?: readonly AutoLessonRefinePart[];
    automatic?: boolean;
    now: string;
    studyCommit?: string;
    publish?: AutoLessonRefinement['publish'];
}
export declare function addRefinement(manifest: AutoLessonManifest, input: NewRefinementInput): {
    manifest: AutoLessonManifest;
    refinement: AutoLessonRefinement;
};
export declare function withRefinement(manifest: AutoLessonManifest, id: string, patch: Partial<Omit<AutoLessonRefinement, 'id'>>, now: string): AutoLessonManifest;
export declare function withRefineStep(manifest: AutoLessonManifest, id: string, stepId: AutoLessonEditStepId, patch: Partial<Omit<AutoLessonEditStep, 'id' | 'label'>>, now: string): AutoLessonManifest;
export declare function isRefinementActive(r: AutoLessonRefinement, nowMs: number, staleMs?: number): boolean;
export declare function activeRefinement(manifest: AutoLessonManifest, nowMs: number): AutoLessonRefinement | undefined;
export declare function isRefinementResumable(r: AutoLessonRefinement, nowMs: number): boolean;
export declare const REFINE_REDO: Readonly<Record<AutoLessonRefineRedoTarget, {
    part: AutoLessonRefinePart;
    steps: readonly AutoLessonEditStepId[];
    facts: ReadonlyArray<keyof AutoLessonRefineFacts>;
    label: string;
}>>;
export declare function refineRedoTargetsOf(value: unknown): {
    targets: AutoLessonRefineRedoTarget[];
} | {
    problem: string;
};
export declare function isRefinementRedoable(r: AutoLessonRefinement, nowMs: number): boolean;
export declare function redoRefinement(r: AutoLessonRefinement, targets: readonly AutoLessonRefineRedoTarget[], input: {
    now: string;
    nowMs: number;
    material: RefineMaterial;
    archive?: string;
}): {
    patch: Partial<AutoLessonRefinement>;
    steps: AutoLessonEditStepId[];
} | {
    problem: string;
};
export declare function isRefinementApprovable(r: AutoLessonRefinement): boolean;
export declare function isRefinementDiscardable(r: AutoLessonRefinement, nowMs: number): boolean;
export declare function refineSummaryLines(manifest: AutoLessonManifest): string[];
export declare function lineDiff(before: readonly string[], after: readonly string[]): AutoLessonDiffLine[];
export declare function collapseDiff(lines: readonly AutoLessonDiffLine[], context?: number): AutoLessonDiffLine[];
export declare function diffCounts(lines: readonly AutoLessonDiffLine[]): {
    added: number;
    removed: number;
};
export declare function formatClock(seconds: number): string;
export interface ScriptNames {
    host: string;
    guest: string;
    visitor?: string;
}
export declare function lessonReadLines(lesson: Pick<TutorialLesson, 'segments'>, names: ScriptNames): string[];
export declare function scriptDiff(before: Pick<TutorialLesson, 'segments'> | null, after: Pick<TutorialLesson, 'segments'> | null, names: ScriptNames): AutoLessonRefineDiff;
export declare function textDiff(part: AutoLessonRefinePart, title: string, before: readonly string[], after: readonly string[], describe?: (counts: {
    added: number;
    removed: number;
}) => string): AutoLessonRefineDiff;
export interface DiffableItem {
    id: string;
    title: string;
    text: string;
    key?: string;
}
export declare function textSimilarity(a: string, b: string): number;
export declare const ITEM_SIMILARITY = 0.6;
export declare function itemsDiff(before: readonly DiffableItem[], after: readonly DiffableItem[]): AutoLessonDiffItem[];
export declare function itemsSummary(items: readonly AutoLessonDiffItem[], noun: {
    one: string;
    many: string;
}): string;
export declare function listDiff(part: AutoLessonRefinePart, title: string, before: readonly DiffableItem[], after: readonly DiffableItem[], noun: {
    one: string;
    many: string;
}): AutoLessonRefineDiff;
export declare function mediaDiff(input: {
    part: AutoLessonRefinePart;
    title: string;
    kind: 'video' | 'image' | 'preview';
    before?: string;
    after?: string;
    beforeLabel?: string;
    afterLabel?: string;
    summary: string;
}): AutoLessonRefineDiff;
export declare function studyPageItems(page: {
    theory?: ReadonlyArray<{
        id: string;
        title: string;
        markdown: string;
    }>;
    assertions?: ReadonlyArray<{
        id: string;
        question: string;
        options: readonly string[];
        answerIndex: number;
        feedback: string;
        sectionId?: string;
    }>;
} | null): DiffableItem[];
export declare function codeTaskItems(tasks: ReadonlyArray<{
    id: string;
    title: string;
    statement: string;
    starter: string;
    solution: string;
    hints?: readonly string[];
    checks?: {
        stdout?: string;
    };
    mistakes?: ReadonlyArray<{
        title: string;
    }>;
    difficulty?: number;
}> | null | undefined, noun: string): DiffableItem[];
export declare function shortReadLines(short: {
    turns: ReadonlyArray<{
        speaker: string;
        text: string;
    }>;
} | null, names: ScriptNames): string[];
export declare function youtubeReadLines(text: {
    title?: string;
    titles?: readonly string[];
    description?: string;
    tags?: readonly string[];
    hashtags?: readonly string[];
} | null): string[];
export declare const REFINE_PLANNER_SYSTEM = "Voc\u00EA \u00E9 o planeador do est\u00FAdio do canal Capi Study (aulas de programa\u00E7\u00E3o em v\u00EDdeo, com uma p\u00E1gina de estudo no site). O dono v\u00EA uma AULA PRONTA e escreve UM pedido para a refinar. A sua tarefa \u00E9 decidir que PE\u00C7AS da aula esse pedido toca \u2014 o est\u00FAdio refaz s\u00F3 elas, mostra o antes e o depois ao dono, e cada pe\u00E7a refeita custa tempo e dinheiro.\n\nAs regras:\n1. Escolha o M\u00CDNIMO que cumpre o pedido: as pe\u00E7as que o pedido manda mudar, diretamente ou porque a mudan\u00E7a n\u00E3o se faz sem elas.\n2. O roteiro arrasta sozinho o v\u00EDdeo, a p\u00E1gina de estudo, os exerc\u00EDcios e a prova (refeitos do roteiro novo): n\u00E3o os ponha s\u00F3 por isso \u2014 ponha-os quando o pedido tamb\u00E9m fala deles.\n3. Mudar as falas, a explica\u00E7\u00E3o, os exemplos ou a ordem da aula \u00E9 o roteiro. Mudar s\u00F3 o t\u00EDtulo ou a descri\u00E7\u00E3o \u00E9 o youtube (n\u00E3o pede v\u00EDdeo novo).\n4. As perguntas, os exerc\u00EDcios e a prova do site s\u00E3o pe\u00E7as \u00E0 parte do roteiro: um pedido s\u00F3 sobre eles n\u00E3o toca o roteiro.\n5. Um pedido vago sobre \u00ABa aula toda\u00BB toca o roteiro (e o que mais ele disser).\n6. S\u00F3 pe\u00E7as da lista \u00ABpecas_disponiveis\u00BB.\nResponda S\u00D3 com um objeto JSON: {\"pecas\": [\"\u2026\"], \"porque\": \"uma frase curta, em portugu\u00EAs do Brasil\"}.";
export declare function refinePlannerUser(input: {
    request: string;
    available: readonly AutoLessonRefinePart[];
    material: Record<string, unknown>;
}): string;
export declare function readRefinePlannerAnswer(value: unknown, available: readonly AutoLessonRefinePart[]): {
    parts: AutoLessonRefinePart[];
    why: string;
} | null;
export declare function fallbackRefineParts(material: RefineMaterial): AutoLessonRefinePart[];
export declare function refinePlannerMaterial(input: {
    title: string;
    lesson?: Pick<TutorialLesson, 'segments' | 'objective'> | null;
    names?: ScriptNames;
    page?: Parameters<typeof studyPageItems>[0];
    exercises?: ReadonlyArray<{
        title: string;
    }> | null;
    exam?: ReadonlyArray<{
        title: string;
    }> | null;
    short?: {
        title?: string;
        turns: ReadonlyArray<{
            speaker: string;
            text: string;
        }>;
    } | null;
    youtubeTitle?: string;
}): Record<string, unknown>;
