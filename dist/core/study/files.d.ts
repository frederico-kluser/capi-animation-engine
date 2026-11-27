import type { StudyLessonBundle, StudyModuleJson, StudyTrackJson } from '../../contracts/study.js';
export type StudyRunner = 'python' | 'shell' | 'nenhuma';
export interface StudyTrackInput {
    slug: string;
    title: string;
    description: string;
    runner: StudyRunner;
    language?: string;
    entryCriteria?: readonly string[];
    roadmapCourse?: string;
}
export declare function studyTrackJson(input: StudyTrackInput, modules?: readonly string[]): StudyTrackJson;
export declare function withTrackModule(track: StudyTrackJson, module: string, orderOf: (slug: string) => number): StudyTrackJson;
export declare function withModuleLesson(module: StudyModuleJson | null, base: {
    slug: string;
    title: string;
    order: number;
}, lesson: string, numberOf: (slug: string) => number): StudyModuleJson;
export declare function withoutModuleLesson(module: StudyModuleJson, lesson: string): StudyModuleJson;
export declare function studyLessonPaths(track: string, module: string, lesson: string, challenge?: string | null): {
    track: string;
    module: string;
    dir: string;
    lesson: string;
    errors: string;
    challenge?: string;
};
export declare function studyLessonFiles(track: string, module: string, bundle: StudyLessonBundle): Record<string, unknown>;
export declare const studyJsonText: (value: unknown) => string;
