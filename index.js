import {parse} from "parse5";
import {getDescendantById} from "./parsing.js";
import {getRoleLevels} from "./role-levels.js";
import {ROLES} from "./roles.js";

const BASE_URL = 'https://ddat-capability-framework.service.gov.uk/role/';

async function run() {
  for (const role of ROLES) {
    console.log('-'.repeat(60));
    const res = await fetch(BASE_URL + role.url);
    const page = parse(await res.text());
    const body = page.childNodes[1].childNodes.find(n => n.tagName === 'body');
    const main = getDescendantById(body, 'main-content');
    const roleLevels = getRoleLevels(main, role.name);
    for (const roleLevel of roleLevels) {
      debugPrintRole(roleLevel, true);
    }
  }
}

/**
 * @param {RoleLevel} roleLevel
 * @param {boolean} [full]
 */
function debugPrintRole(roleLevel, full = false) {
  console.log(roleLevel.name);
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