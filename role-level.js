export class RoleLevel {
  /**
   * @param {string} name
   * @param {string} title
   * @param {string|symbol} grade
   * @param {SkillLevel[]} skills
   */
  constructor({name, title, grade, skills}) {
    this.name = name;
    this.title = title;
    this.grade = grade;
    this.skills = skills;
  }
}

export class SkillLevel {
  /**
   * @param {string} name
   * @param {string} description - general description for this skill
   * @param {string} level
   * @param {string[]} levelDescription - specific description points for this skill-level
   */
  constructor({name, level, description, levelDescription}) {
    this.name = name;
    this.level = level;
    this.description = description;
    this.levelDescription = levelDescription;
  }

  get levelDescriptionString() {
    return 'You can:\r\n' + this.levelDescription.map(d => ' - ' + d).join('\r\n');
  }
}