import {BASE_URL} from "./config.js";
import {parse} from "parse5";
import {getDescendantByClass, getDescendantByTag, getDescendantsByClass, getText} from "./parsing.js";

export async function loadSkills() {
  const res = await fetch(BASE_URL + '/skills');
  return parseSkills(await res.text());
}

/**
 * @param {string} html
 * @returns {SkillDefinition[]}
 */
export function parseSkills(html) {
  const page = parse(html);
  const body = page.childNodes[1].childNodes.find(n => n.tagName === 'body');
  const accordions = getDescendantsByClass(body, 'govuk-accordion__section');
  const skills = [];
  for (const accordion of accordions) {
    const heading = getDescendantByTag(accordion, 'h2');
    if (!heading) {
      continue;
    }
    const name = getText(getDescendantByTag(getDescendantByTag(heading, 'span'), 'span'));
    const contentNode = getDescendantByClass(accordion, 'govuk-accordion__section-content');
    if (!contentNode) {
      continue;
    }
    const paragraph = getDescendantByTag(contentNode, 'p');
    let description = '';
    if (paragraph.parentNode === contentNode) {
      description = getText(paragraph);
    }
    skills.push(new SkillDefinition({name, description}))
  }
  return skills;
}

export class SkillDefinition {
  constructor({name, description}) {
    this.name = name;
    this.description = description;
  }
}