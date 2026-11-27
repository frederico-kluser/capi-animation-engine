export declare const STUDY_PUBLIC_BASE = "https://study.ondokai.com";
export declare const STUDY_LOCAL_PORT = 5190;
export declare const STUDY_FILE = "estudo.json";
export declare const STUDY_CONTENT_DIR = "apps/study/content/tracks";
export declare const STUDY_VIDEOS_TRACK = "aulas";
export declare const STUDY_VIDEOS_FILE = "apps/study/content/videos.json";
export declare const STUDY_RECORD_VERSION = 1;
export type StudySourceKind = 'tutorial' | 'create' | 'roadmap';
export type StudySource = {
    kind: 'tutorial';
    course: string;
    lesson: string;
    number: number;
} | {
    kind: 'create';
    run: string;
    format: string;
} | {
    kind: 'roadmap';
    course: string;
    lesson: string;
    number: number;
};
export type StudyAuthor = 'roteiro' | (string & {});
export interface StudyPage {
    path: string;
    url: string;
    track: string;
    module: string;
    lesson: string;
    files: string[];
    author: StudyAuthor;
    sourceSha1: string;
    createdAt: string;
    counts: {
        sections: number;
        questions: number;
        challenge: boolean;
    };
    cost?: number;
    warnings?: string[];
    quiz?: StudyPageQuiz;
    exercises?: StudyPagePractice;
    exam?: StudyPagePractice;
}
export interface StudyPagePractice {
    file: string;
    items: number;
    runner: StudyCodeRunner;
    author: StudyAuthor;
    createdAt: string;
    sourceSha1: string;
    cost?: number;
    warnings?: string[];
}
export interface StudyPageQuiz {
    file: string;
    questions: number;
    author: StudyAuthor;
    createdAt: string;
    sourceSha1: string;
    cost?: number;
    warnings?: string[];
}
export interface StudyRecord {
    version: typeof STUDY_RECORD_VERSION;
    kind: 'capi-study-page';
    wanted: boolean;
    decidedAt: string;
    source: StudySource;
    page?: StudyPage;
}
export type StudyState = 'undecided' | 'declined' | 'wanted' | 'ready' | 'stale';
export interface StudyTrackJson {
    schemaVersion: 1;
    slug: string;
    title: string;
    description: string;
    language: string;
    domain: 'programming';
    programmingLanguage: string;
    runtime: string;
    harnessLanguage: string;
    entryCriteria: string[];
    access: 'open';
    dependencies: unknown[];
    modules: string[];
    capi?: {
        roadmapCourse?: string;
        generatedBy: 'capi-animation-studio';
    };
}
export interface StudyModuleJson {
    schemaVersion: 1;
    slug: string;
    title: string;
    order: number;
    lessons: string[];
}
export interface StudyTheorySection {
    id: string;
    title: string;
    markdown: string;
}
export interface StudyAssertion {
    id: string;
    statement: string;
    question: string;
    options: string[];
    answerIndex: number;
    feedback: string;
    sectionId: string;
}
export interface StudyLessonJson {
    schemaVersion: 1;
    slug: string;
    title: string;
    summary: string;
    difficulty: number;
    role: string;
    concepts: string[];
    prerequisites: string[];
    theory: StudyTheorySection[];
    assertions: StudyAssertion[];
    sources: Array<{
        title: string;
        url: string;
        description?: string;
    }>;
    challenges: string[];
    capi?: {
        path: string;
        source: StudySource;
        author: StudyAuthor;
    };
}
export interface StudyErrorEntry {
    id: string;
    kind: 'quiz' | 'challenge';
    targetId: string;
    optionIndex?: number;
    title: string;
    condition: string;
    match: {
        phrases: string[];
        codePatterns: string[];
        stderrPatterns: string[];
        failedTests: string[];
    };
    feedback: string;
    check: string;
}
export interface StudyErrorsJson {
    schemaVersion: 1;
    lesson: string;
    errors: StudyErrorEntry[];
}
export interface StudyChallengeJson {
    schemaVersion: 1;
    slug: string;
    title: string;
    concept: string;
    difficulty: number;
    language: string;
    outputChannel: 'impressao';
    statement: string;
    starterCode: string;
    testsCode: string;
    solutionCode: string;
    expectedTestCount: number;
    requirements: Array<{
        id: string;
        teste: string;
        descricao: string;
    }>;
}
export interface StudyLessonBundle {
    lesson: StudyLessonJson;
    errors: StudyErrorsJson;
    challenge: StudyChallengeJson | null;
}
export declare const STUDY_QUIZ_FILE = "quiz.json";
export declare const STUDY_QUIZ_QUESTIONS = 10;
export declare const STUDY_QUIZ_OPTIONS = 4;
export declare const STUDY_QUIZ_PASS_SCORE = 7;
export declare const STUDY_QUIZ_PROMPT_VERSION = 1;
export declare const STUDY_QUIZ_SKILLS: readonly ['recall', 'understand', 'apply', 'predict', 'misconception', 'transfer'];
export type StudyQuizSkill = (typeof STUDY_QUIZ_SKILLS)[number];
export interface StudyQuizOption {
    text: string;
    correct: boolean;
    feedback: string;
}
export interface StudyQuizQuestion {
    id: string;
    prompt: string;
    code?: string;
    options: StudyQuizOption[];
    skill: StudyQuizSkill;
    sectionId?: string;
    explanation: string;
}
export interface StudyQuizJson {
    schemaVersion: 1;
    kind: 'capi-study-quiz';
    lesson: string;
    title: string;
    passScore: number;
    questions: StudyQuizQuestion[];
    capi?: {
        path: string;
        author: StudyAuthor;
        createdAt: string;
        promptVersion: number;
        cost?: number;
        sourceSha1?: string;
    };
}
export declare const STUDY_EXERCISES_FILE = "exercicios.json";
export declare const STUDY_EXAM_FILE = "prova.json";
export declare const STUDY_PRACTICE_ITEMS = 10;
export declare const STUDY_EXERCISES_SHOWN = 3;
export declare const STUDY_EXAM_PASS_COUNT = 1;
export declare const STUDY_EXERCISES_PROMPT_VERSION = 1;
export declare const STUDY_EXAM_PROMPT_VERSION = 1;
export declare const STUDY_CODE_RUNNERS: readonly ['shell', 'python', 'node'];
export type StudyCodeRunner = (typeof STUDY_CODE_RUNNERS)[number];
export declare const STUDY_CODE_ENTRY: Readonly<Record<StudyCodeRunner, string>>;
export declare const STUDY_CODE_TESTS: Readonly<Record<StudyCodeRunner, string | null>>;
export interface StudyCodeFile {
    path: string;
    content: string;
}
export interface StudyCodeFileCheck {
    path: string;
    kind: 'file' | 'dir';
    content?: string;
    absent?: boolean;
}
export interface StudyCodeChecks {
    stdout?: string;
    compare?: 'trim' | 'exact';
    files?: StudyCodeFileCheck[];
    tests?: {
        code: string;
        count: number;
    };
}
export interface StudyCodeMistake {
    id: string;
    title: string;
    match: {
        code?: string[];
        stdout?: string[];
        stderr?: string[];
    };
    feedback: string;
    example: string;
}
export interface StudyCodeTask {
    id: string;
    title: string;
    statement: string;
    runner: StudyCodeRunner;
    starter: string;
    solution: string;
    fixtures?: StudyCodeFile[];
    stdin?: string;
    checks: StudyCodeChecks;
    hints: string[];
    mistakes: StudyCodeMistake[];
    difficulty?: number;
}
export interface StudyExercisesJson {
    schemaVersion: 1;
    kind: 'capi-study-exercises';
    lesson: string;
    title: string;
    runner: StudyCodeRunner;
    show: number;
    exercises: StudyCodeTask[];
    capi?: {
        path: string;
        author: StudyAuthor;
        createdAt: string;
        promptVersion: number;
        cost?: number;
        sourceSha1?: string;
    };
}
export interface StudyExamJson {
    schemaVersion: 1;
    kind: 'capi-study-exam';
    lesson: string;
    title: string;
    runner: StudyCodeRunner;
    passCount: number;
    problems: StudyCodeTask[];
    capi?: {
        path: string;
        author: StudyAuthor;
        createdAt: string;
        promptVersion: number;
        cost?: number;
        sourceSha1?: string;
    };
}
export type StudyVideoSource = 'manual' | 'canal';
export interface StudyVideo {
    youtubeId: string;
    title?: string;
    durationSec?: number;
    start?: number;
    allocatedAt: string;
    source: StudyVideoSource;
}
export interface StudyVideosJson {
    version: 1;
    kind: 'capi-study-videos';
    videos: Record<string, StudyVideo>;
}
export declare const STUDY_SHORT_LINKS_FILE = "apps/study/content/short-links.json";
export declare const STUDY_SHORT_PREFIX = "a";
export interface StudyShortLinksJson {
    version: 1;
    kind: 'capi-study-short-links';
    courses: Record<string, string>;
    links: Record<string, string>;
}
export interface StudyFinding {
    severity: 'error' | 'warning';
    where: string;
    message: string;
}
