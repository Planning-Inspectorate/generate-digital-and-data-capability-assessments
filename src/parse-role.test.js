import {describe, test} from 'node:test';
import fs from 'fs/promises';
import {parseHtmlPageToRoleLevels} from "./parse-role.js";
import * as assert from "node:assert";
import {GRADES, NO_GRADE} from "./config.js";

describe('parse-role', () => {
  test('should parse roles and skill levels',  async() => {
    const page = await fs.readFile(new URL('./software-developer.html', import.meta.url));
    const roleLevels = parseHtmlPageToRoleLevels(page.toString(), {
      url: 'software-developer',
      name: 'developer'
    }, []);

    assert.strictEqual(roleLevels.length, 9);

    const expected = [
      {name: 'Apprentice developer', grade: NO_GRADE, skillsCount: 7},
      {name: 'Junior developer', grade: GRADES.EO, skillsCount: 9},
      {name: 'Developer', grade: GRADES.HEO, skillsCount: 10},
      {name: 'Senior developer', grade: GRADES.SEO, skillsCount: 10},
      {name: 'Senior developer - management', grade: GRADES.SEO, skillsCount: 10},
      {name: 'Lead developer', grade: GRADES.G7, skillsCount: 10},
      {name: 'Lead developer - management', grade: GRADES.G7, skillsCount: 10},
      {name: 'Principal developer', grade: GRADES.G6, skillsCount: 10},
      {name: 'Principal developer - management', grade: GRADES.G6, skillsCount: 10}
    ];
    for (let i = 0; i < expected.length; i++) {
      assert.strictEqual(roleLevels[i].name, expected[i].name);
      assert.strictEqual(roleLevels[i].grade, expected[i].grade);
      assert.strictEqual(roleLevels[i].skills.length, expected[i].skillsCount);
    }
  });
});