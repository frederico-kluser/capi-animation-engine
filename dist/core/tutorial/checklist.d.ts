import type { TutorialChecklist, TutorialFinding, TutorialGateId, TutorialLesson, TutorialReviewReport } from '../../contracts/tutorial.js';
export interface PocketChecklistPoint {
    n: number;
    id: string;
    moment: number;
    question: string;
    gates: readonly TutorialGateId[];
    reviewCheck: string;
}
export declare const TUTORIAL_POCKET_CHECKLIST: ReadonlyArray<PocketChecklistPoint>;
export declare const TUTORIAL_CHECKLIST_KEYWORDS: {
    readonly label: readonly ['rotulo', 'nome do passo', 'verbo', 'mecanic', 'subobjetivo', ' label ', 'infinitivo', 'carateres', 'caracteres'];
    readonly coConstruction: readonly ['co-constr', 'coconstr', 'co constr', 'comando primeiro'];
    readonly silence: readonly ['silencio', 'pausa', 'pergunta de quem ensina', 'thinkms'];
    readonly guess: readonly ['hipotese', 'reage', 'reacao', 'contraste', ' ri ', ' rir ', ' riso ', ' risada ', 'adianta', 'resposta pronta'];
    readonly orderPhrases: readonly ['antes do palpite', 'depois do palpite'];
    readonly guessWord: 'palpite';
    readonly noPrediction: readonly ['falta uma previsao', 'sem previsao', 'previsao nao tem falas'];
    readonly opening: readonly ['abertura', 'abre com', 'pergunta academica', 'tentativa'];
    readonly afterOpening: readonly ['cena final', 'despedida', 'aula seguinte'];
    readonly jargon: readonly ['jargao'];
    readonly errorMoment: readonly ['erro', 'contraste'];
    readonly tripleIdea: readonly ['ideia', 'analogia'];
};
export declare function d8Kind(finding: Pick<TutorialFinding, 'message'>): 'label' | 'co-construction' | 'both';
export declare function d3Kind(finding: Pick<TutorialFinding, 'message'>): 'silence' | 'guess' | 'both';
export declare function openingSceneId(lesson: Pick<TutorialLesson, 'segments'>): string | undefined;
export type ChecklistReview = Pick<TutorialReviewReport, 'findings' | 'verdict' | 'checks'>;
export interface ChecklistDirection {
    ok: boolean;
    violations: ReadonlyArray<{
        code: string;
        message: string;
    }>;
}
export interface LessonChecklistInput {
    lesson: string;
    findings: readonly TutorialFinding[];
    review?: ChecklistReview | null;
    direction?: ChecklistDirection | null;
    openingSegment?: string;
    now: string;
}
export declare function lessonChecklist(input: LessonChecklistInput): TutorialChecklist;
export declare function checklistSummary(c: TutorialChecklist | null | undefined): {
    passed: number;
    failed: number;
    pending: number;
    total: number;
    general?: number;
};
export declare function checklistText(c: TutorialChecklist): string;
