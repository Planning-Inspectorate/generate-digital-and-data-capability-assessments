/**
 * A map of the role-level name prefix to the grade.
 * Use the NO_PREFIX symbol if the grade is the role name with no prefix.
 *
 * For example, for the following names and grades:
 * - Junior developer = EO
 * - Developer (no prefix) = HEO
 * - Senior developer = SEO
 *
 * the GradeMap would be:
 * @example
 * {
 *     'Junior': GRADES.EO,
 *     NO_PREFIX: GRADES.HEO,
 *     'Senior': GRADES.SEO
 * }
 */
export interface GradeMap {
    [key: string|symbol]: string;
}

export interface RoleConfig {
    name: string;
    url: string;
    title: string;
    gradeMap?: GradeMap;
}

