export class RoleLevel {
  /**
   * @param {string} name
   * @param {string[]} grades
   * @param {Skill[]} skills
   */
  constructor({name, grades, skills}) {
    this.name = name;
    this.grades = grades;
    this.skills = skills;
  }
}

export class Skill {
  /**
   * @param {string} name
   * @param {string} level
   * @param {string[]} description
   */
  constructor({name, level, description}) {
    this.name = name;
    this.level = level;
    this.description = description;
  }
}