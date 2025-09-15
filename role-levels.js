import {
  getDescendantByClass,
  getDescendantByContent,
  getDescendantByTag,
  getDescendantsByTag,
  getText
} from "./parsing.js";
import {RoleLevel, Skill} from "./role-level.js";
import {NO_GRADE, NO_PREFIX} from "./roles.js";

/**
 * @param {import('parse5').DefaultTreeAdapterTypes.ChildNode} content
 * @param {string} role
 * @param {Object<string|Symbol, string>} gradeMap
 * @returns {RoleLevel[]}
 */
export function getRoleLevels(content, role, gradeMap) {
  const elements = getRoleLevelsElements(content, role);
  return elements.map(els => toRoleLevel(els, role, gradeMap));
}

/**
 * @param {import('parse5').DefaultTreeAdapterTypes.ChildNode[]} els
 * @param {string} role
 * @param {Object<string|Symbol, string>} gradeMap
 * @returns {RoleLevel}
 */
function toRoleLevel(els, role, gradeMap) {
  const table = els.find(el => el.tagName === 'table');
  const tbody = table.childNodes.find(el => el.tagName === 'tbody');
  const rows = getDescendantsByTag(tbody, 'tr');
  const skills = [];
  for (const row of rows) {
    const header = getDescendantByTag(row, 'th');
    const skill = getDescendantByClass(header, 'skill-name');
    const level = getDescendantByContent(header, 'Level:');
    const youCan = getDescendantsByTag(getDescendantByTag(row, 'td'), 'li');

    skills.push(new Skill({
      name: getText(skill),
      level: getText(level)?.replace('Level: ', ''),
      description: youCan.map(getText)
    }));
  }

  const name = getText(els[0])?.replace(/^[0-9]+\.\s/, '');

  return new RoleLevel({
    // replace leading numeric
    name,
    grade: gradeForRoleName(name, role, gradeMap),
    skills
  });
}

/**
 * @param {string} name
 * @param {string} role
 * @param {Object<string|Symbol, string>} gradeMap
 * @returns {string|Symbol}
 */
function gradeForRoleName(name, role,  gradeMap) {
  const lowerName = name.toLowerCase().trim();
  for (const [prefix, grade] of Object.entries(gradeMap)) {
    if (lowerName.startsWith(prefix)) {
      return grade;
    }
  }
  if (gradeMap[NO_PREFIX] && lowerName === role) {
    return gradeMap[NO_PREFIX];
  }
  return NO_GRADE;
}


/**
 *
 * @param {import('parse5').DefaultTreeAdapterTypes.ChildNode} main
 * @param {string} role
 * @returns {import('parse5').DefaultTreeAdapterTypes.ChildNode[][]}
 */
function getRoleLevelsElements(main, role) {
  const levels = [];
  let els = [];
  for (const node of main.childNodes) {
    if (node.tagName === 'h3' && node.childNodes[0].value.toLowerCase().includes(role)) {
      if (els.length > 0) {
        levels.push(els);
        els = [];
      }
      els.push(node);
    } else if (els.length > 0) {
      els.push(node);
    }
  }
  return levels;
}