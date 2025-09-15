import {levelsForRole} from "./parse-role.js";
import {ROLE_CONFIG} from "./config.js";


async function run() {
  for (const role of ROLE_CONFIG) {
    console.log('-'.repeat(60));
    const roleLevels = await levelsForRole(role);
    for (const roleLevel of roleLevels) {
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