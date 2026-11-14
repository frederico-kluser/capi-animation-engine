import type { TutorialCastMember, TutorialCourseBrief } from '../../contracts/tutorial.js';
import type { TutorialReadResult } from './lesson.js';
export declare const TUTORIAL_RESEARCH_PROMPT_VERSION = 2;
export declare const TUTORIAL_LEARNER_PERSONALITY = "nunca programou; curioso, faz as perguntas de quem est\u00E1 come\u00E7ando e aprende fazendo";
export declare const TUTORIAL_DEFAULT_AUDIENCE = "quem nunca programou";
export declare const TUTORIAL_BRIEF_LIMITS: {
    readonly topic: 240;
    readonly text: 2000;
    readonly minLessons: 1;
    readonly maxLessons: 200;
};
export declare function defaultCourseCast(): {
    host: TutorialCastMember;
    guest: TutorialCastMember;
};
export declare function courseSlug(text: string): string;
export interface CourseBriefInput {
    id: string;
    topic: string;
    audience?: string;
    entry?: string;
    goal?: string;
    lessons?: number;
    tech?: TutorialCourseBrief['tech'];
    notes?: string;
    language?: string;
    cast?: {
        host: TutorialCastMember;
        guest: TutorialCastMember;
    };
    video?: TutorialCourseBrief['video'];
}
export declare function newCourseBrief(input: CourseBriefInput, createdAt: string): TutorialCourseBrief;
export declare function readCourseBrief(raw: unknown): TutorialReadResult<TutorialCourseBrief>;
export declare function briefRoles(brief: Pick<TutorialCourseBrief, 'cast'>): {
    teacher: TutorialCastMember;
    learner: TutorialCastMember;
};
export declare const RESEARCH_DOCUMENT_SECTIONS: readonly [{
    readonly id: 'audience';
    readonly title: '1. Público, entrada e saída';
    readonly match: RegExp;
}, {
    readonly id: 'concepts';
    readonly title: '2. Inventário de conceitos';
    readonly match: RegExp;
}, {
    readonly id: 'sequence';
    readonly title: '3. Sequência das aulas';
    readonly match: RegExp;
}, {
    readonly id: 'lessons';
    readonly title: '4. Fichas das aulas';
    readonly match: RegExp;
}, {
    readonly id: 'misconceptions';
    readonly title: '5. Equívocos e erros típicos';
    readonly match: RegExp;
}, {
    readonly id: 'sources';
    readonly title: '6. Fontes';
    readonly match: RegExp;
}];
export type ResearchSectionId = (typeof RESEARCH_DOCUMENT_SECTIONS)[number]['id'];
export declare const RESEARCH_APPENDIX_TITLE = "Ap\u00EAndice \u2014 JSON";
export declare const RESEARCH_DUPLA_KEYS: readonly ['pergunta_limite_analogia', 'racional_palpite_iniciante', 'frase_contraste_refutacao'];
export type ResearchDuplaKey = (typeof RESEARCH_DUPLA_KEYS)[number];
export declare const RESEARCH_ERROR_KEYS: readonly ['equivoco_previsao', 'erro_execucao'];
export interface ResearchDocumentCheck {
    chars: number;
    words: number;
    sections: Array<{
        id: ResearchSectionId;
        title: string;
        found: boolean;
    }>;
    lessonSheets: number;
    sources: number;
    appendix: {
        found: boolean;
        ok: boolean;
        concepts: number;
        lessons: number;
        error?: string;
    };
    dupla: {
        boundaryQuestions: number;
        guessRationales: number;
        contrastSentences: number;
        predictionMisconceptions: number;
        executionErrors: number;
        misconceptionSplit: boolean;
    };
    warnings: string[];
}
export declare const RESEARCH_DOCUMENT_MAX_CHARS = 1500000;
export declare function checkResearchDocument(text: string): ResearchDocumentCheck;
export declare function courseResearchPrompt(brief: TutorialCourseBrief): string;
export interface ResearchPromptRequirement {
    id: string;
    title: string;
    test: (prompt: string) => boolean;
}
export interface ResearchPromptCheck {
    ok: boolean;
    missing: Array<{
        id: string;
        title: string;
    }>;
}
export declare const RESEARCH_PROMPT_REQUIREMENTS: ReadonlyArray<ResearchPromptRequirement>;
export declare function checkResearchPrompt(prompt: string): ResearchPromptCheck;
