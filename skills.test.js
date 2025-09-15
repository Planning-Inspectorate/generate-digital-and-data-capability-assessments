import {describe, test} from 'node:test';
import fs from 'fs/promises';
import * as assert from "node:assert";
import {parseSkills} from "./skills.js";

describe('skills', () => {
  test('should parse skills',  async() => {
    const page = await fs.readFile('./skills.html');
    const skills = parseSkills(page.toString());

    assert.strictEqual(skills.length, 188);

    assert.strictEqual(skills[0].name, 'Accessibility');
    assert.strictEqual(skills[0].description, 'Accessibility involves ensuring your service can be used by as many people as possible, including those with impaired vision, motor difficulties, cognitive impairments, learning disabilities and deafness.');

    const skill = skills.find(s => s.name === 'User focus');
    assert.ok(skill);
    assert.strictEqual(skill.description, 'User focus involves understanding the user needs to develop a detailed understanding of the problems that need to be solved.');

    const programmingBuild = skills.find(s => s.name === 'Programming and build (software engineering)');
    assert.ok(programmingBuild);
    assert.strictEqual(programmingBuild.description, '');
  });
});