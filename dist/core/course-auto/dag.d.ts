import type { CourseAutoNode, CourseAutoPolicy, CourseBundle, CourseBundleLesson, CourseDag, CourseDagEdge, CourseDeliverable, CourseNodeState, CourseSelection } from '../../contracts/course-auto.js';
export interface CourseTemplateNode {
    readonly id: string;
    readonly name: string;
    readonly phase: string;
    readonly scope: 'course' | 'lesson';
    readonly dependsOn: readonly string[];
    readonly resources: readonly string[];
    readonly condition?: string;
}
export declare const COURSE_TEMPLATE_NODES: readonly CourseTemplateNode[];
export declare const LESSON_TEMPLATE_NODES: readonly CourseTemplateNode[];
export interface CourseDagOptions {
    readonly selection?: CourseSelection;
    readonly lessons?: readonly string[];
    readonly deliverables?: readonly CourseDeliverable[];
    readonly short?: boolean;
    readonly video?: 'tutorial' | 'create' | 'none';
    readonly maxLessons?: number;
    readonly draft?: boolean;
}
export declare const isCourseNodeSettled: (state: CourseNodeState) => boolean;
export declare const courseLessonNodeKey: (lessonId: string, logicalId: string) => string;
export declare function assertCourseDagValid(nodes: readonly CourseAutoNode[]): void;
export declare function courseDagTopologicalOrder(dag: Pick<CourseDag, 'nodes'>): string[];
export declare function courseDagEdges(dag: Pick<CourseDag, 'nodes'>): CourseDagEdge[];
export declare function selectedCourseLessons(bundle: CourseBundle, options?: CourseDagOptions): CourseBundleLesson[];
export declare function planCourseDag(bundle: CourseBundle, policy: CourseAutoPolicy, options?: CourseDagOptions): CourseDag;
export declare function readyCourseNodes(dag: CourseDag, running?: ReadonlySet<string>): CourseAutoNode[];
export declare function withCourseNodeState(dag: CourseDag, key: string, patch: Partial<Pick<CourseAutoNode, 'state' | 'revision' | 'attempt' | 'inputDigest' | 'outputDigest' | 'detail' | 'gates' | 'dependsOn' | 'required' | 'optionalReason'>>): CourseDag;
export declare const courseDagRevision: (dag: Pick<CourseDag, 'nodes'>) => number;
export declare const courseProjectedLogicalIds: (dag: Pick<CourseDag, 'nodes'>) => string[];
