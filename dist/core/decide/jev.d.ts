export declare const JEV_MODEL = "typesafe/jev-1.13";
export declare const JEV_LIMITS: {
    readonly maxChoices: 255;
    readonly minLevels: 2;
    readonly maxLevels: 10;
    readonly maxQuestions: 40;
    readonly maxStateChars: 90000;
};
export declare const JEV_BANDS: {
    readonly auto: 0.9;
    readonly hitl: 0.5;
};
export type JevRubric = string | null | {
    what: string;
    not_for?: string;
    examples?: string[];
};
export interface JevNoulQuestion {
    type: 'noul';
    instructions: string;
    criteria?: {
        true: string;
        false: string;
    };
}
export interface JevChoiceQuestion {
    type: 'choice';
    instructions: string;
    criteria: Record<string, JevRubric>;
}
export interface JevScoreQuestion {
    type: 'score';
    instructions: string;
    criteria: string[];
}
export type JevQuestion = JevNoulQuestion | JevChoiceQuestion | JevScoreQuestion;
export interface JevRequest {
    model?: string;
    state: unknown;
    questions: Record<string, JevQuestion>;
}
export interface JevNoulAnswer {
    type: 'noul';
    p: number;
}
export interface JevChoiceAnswer {
    type: 'choice';
    choice: string;
    probabilities: Record<string, number>;
    confidence: number;
}
export interface JevScoreAnswer {
    type: 'score';
    score: number;
    level: number;
    probabilities: number[];
    confidence: number;
}
export type JevAnswer = JevNoulAnswer | JevChoiceAnswer | JevScoreAnswer;
export type JevBand = 'auto' | 'hitl' | 'abstain';
export declare function checkJevRequest(request: JevRequest): {
    errors: string[];
    warnings: string[];
};
export declare function jevBody(request: JevRequest): Record<string, unknown>;
export declare function readJevAnswers(questions: Record<string, JevQuestion>, raw: unknown): {
    answers: Record<string, JevAnswer>;
    problems: string[];
};
export declare function jevCertainty(answer: JevAnswer | undefined): number;
export declare function jevBand(answer: JevAnswer | undefined, bands?: {
    auto: number;
    hitl: number;
}): JevBand;
export declare function jevYes(answer: JevAnswer | undefined, margin?: number): boolean | undefined;
export declare function jevScore01(answer: JevAnswer | undefined, levels: number): number | undefined;
