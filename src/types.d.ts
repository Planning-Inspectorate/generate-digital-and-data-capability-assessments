export interface GradeMap {
    [key: string|symbol]: string;
}

export interface RoleConfig {
    name: string;
    url: string;
    title: string;
    gradeMap?: GradeMap;
}

