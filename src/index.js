import {levelsForRole} from "./parse-role.js";
import {NO_GRADE, ROLE_CONFIG} from "./config.js";
import excel from "./excel.cjs";
import {loadSkills} from "./skills.js";

async function run() {
  const outputDir = ((process.argv[2] || './').replace(/[/\\]?$/, '/'));
  console.log('Output to', outputDir);

  // load skill definitions
  const skillDefinitions = await loadSkills();

  for (const role of ROLE_CONFIG) {
    console.log('-'.repeat(60));
    const roleLevels = await levelsForRole(role, skillDefinitions);
    for (const roleLevel of roleLevels) {
      if (roleLevel.grade === NO_GRADE) {
        console.log(roleLevel.name, '(skipping role-level with no grade configured)');
      } else {
        debugPrintRole(roleLevel, false);
        await excel.toSheet(roleLevel, `${outputDir}PINS D&D Capability Assessment - ${role.title} - ${roleLevel.grade} - ${roleLevel.name}.xlsx`);
      }
    }
  }
}

/**
 * @param {RoleLevel} roleLevel
 * @param {boolean} [full]
 */
function debugPrintRole(roleLevel, full = false) {
  console.log(roleLevel.name, roleLevel.grade);
  if (full) {
    for (const skill of roleLevel.skills) {
      console.log('\t', skill.name, '@', skill.level);
      for (const str of skill.description) {
        console.log('\t\t', str);
      }
    }
  }
}

run().catch(console.error);