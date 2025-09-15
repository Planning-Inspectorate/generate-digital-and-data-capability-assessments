import {levelsForRole} from "./parse-role.js";
import {NO_GRADE, ROLE_CONFIG} from "./config.js";
import excel from "./excel.cjs";

async function run() {
  const outputDir = ((process.argv[2] || './').replace(/[/\\]?$/, '/'));
  console.log('writing to', outputDir);
  for (const role of ROLE_CONFIG) {
    console.log('-'.repeat(60));
    const roleLevels = await levelsForRole(role);
    for (const roleLevel of roleLevels) {
      if (roleLevel.grade !== NO_GRADE) {
        await excel.toSheet(roleLevel, `${outputDir}DDaT assessment - ${role.title} - ${roleLevel.grade} - ${roleLevel.name}.xlsx`);
      }

      debugPrintRole(roleLevel, false);
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