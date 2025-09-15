export class RoleLevel {
  /**
   * @param {string} name
   * @param {string} grade
   * @param {Skill[]} skills
   */
  constructor({name, grade, skills}) {
    this.name = name;
    this.grade = grade;
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