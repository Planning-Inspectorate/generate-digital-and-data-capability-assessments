import {
  getDescendantByClass,
  getDescendantByContent,
  getDescendantById,
  getDescendantByTag,
  getDescendantsByTag,
  getText
} from "./parsing.js";
import {RoleLevel, SkillLevel} from "./role-level.js";
import {BASE_URL, DEFAULT_GRADE_MAP, NO_GRADE, NO_PREFIX} from "./config.js";
import {parse} from "parse5";

/**
 * @param {RoleConfig} role
 * @param {SkillDefinition[]} skillDefinitions
 * @returns {Promise<RoleLevel[]>}
 */
export async function levelsForRole(role, skillDefinitions) {
  const res = await fetch(BASE_URL + '/role/' + role.url);
  return parseHtmlPageToRoleLevels(await res.text(), role, skillDefinitions);
}

/**
 * @param {string} html
 * @param {RoleConfig} role
 * @param {SkillDefinition[]} skillDefinitions
 * @returns {RoleLevel[]}
 */
export function parseHtmlPageToRoleLevels(html, role, skillDefinitions) {
  const page = parse(html);
  const body = page.childNodes[1].childNodes.find(n => n.tagName === 'body');
  const main = getDescendantById(body, 'main-content');
  return toRoleLevels(main, role, skillDefinitions);
}

/**
 * @param {import('parse5').DefaultTreeAdapterTypes.ChildNode} content
 * @param {RoleConfig} role
 * @param {SkillDefinition[]} skillDefinitions
 * @returns {RoleLevel[]}
 */
export function toRoleLevels(content, role, skillDefinitions) {
  const elements = getRoleLevelsElements(content, role.name);
  return elements.map(els => parseElementGroupToRoleLevel(els, role, role.gradeMap || DEFAULT_GRADE_MAP, skillDefinitions));
}

/**
 * @param {import('parse5').DefaultTreeAdapterTypes.ChildNode[]} els
 * @param {RoleConfig} role
 * @param {Object<string|Symbol, string>} gradeMap
 * @param {SkillDefinition[]} skillDefinitions
 * @returns {RoleLevel}
 */
function parseElementGroupToRoleLevel(els, role, gradeMap, skillDefinitions) {
  const table = els.find(el => el.tagName === 'table');
  const tbody = table.childNodes.find(el => el.tagName === 'tbody');
  const rows = getDescendantsByTag(tbody, 'tr');
  const skills = [];
  for (const row of rows) {
    const header = getDescendantByTag(row, 'th');
    const skill = getDescendantByClass(header, 'skill-name');
    const level = getDescendantByContent(header, 'Level:');
    const youCan = getDescendantsByTag(getDescendantByTag(row, 'td'), 'li');
    const skillName = getText(skill);

    skills.push(new SkillLevel({
      name: skillName,
      level: getText(level)?.replace('Level: ', ''),
      description: skillDefinitions.find(sd => sd.name === skillName)?.description,
      levelDescription: youCan.map(getText)
    }));
  }

  const name = getText(els[0])?.replace(/^[0-9]+\.\s/, '');

  return new RoleLevel({
    // replace leading numeric
    name,
    title: role.title,
    grade: gradeForRoleName(name, role.name, gradeMap),
    skills
  });
}

/**
 * @param {string} name
 * @param {string} role
 * @param {Object<string|Symbol, string>} gradeMap
 * @returns {string|Symbol}
 */
function gradeForRoleName(name, role, gradeMap) {
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
 * @param {import('parse5').DefaultTreeAdapterTypes.ChildNode} main
 * @param {string} role
 * @returns {import('parse5').DefaultTreeAdapterTypes.ChildNode[][]}
 */
function getRoleLevelsElements(main, role) {
  const levels = [];
  let els = [];
  for (const node of main.childNodes) {
    if (node.tagName === 'h3' && getText(node).toLowerCase().includes(role)) {
      if (els.length > 0) {
        levels.push(els);
        els = [];
      }
      els.push(node);
    } else if (els.length > 0) {
      els.push(node);
    }
  }
  if (els.length > 0) {
    levels.push(els); // push the last role level
  }
  return levels;
}