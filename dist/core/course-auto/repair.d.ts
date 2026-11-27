import type { CourseRepairFinding, CourseRepairInput, CourseRepairPlan } from '../../contracts/course-auto.js';
export declare const COURSE_REPAIR_SCOPE: Readonly<Record<CourseRepairFinding['owner'], readonly string[]>>;
export declare const COURSE_REPAIR_OWNERS: Array<CourseRepairFinding['owner']>;
export declare function planCourseRepair(input: CourseRepairInput): CourseRepairPlan;
export declare function courseRepairNodeKeys(plan: Pick<CourseRepairPlan, 'invalidates'>, lessonIds: readonly string[]): string[];
export declare function courseRepairSummary(plan: CourseRepairPlan): string;
