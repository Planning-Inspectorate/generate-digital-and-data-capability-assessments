const XlsxPopulate = require('xlsx-populate');

/**
 * @param {RoleLevel} roleLevel
 * @param {string} name
 */
async function toSheet(roleLevel, name) {
  const wb = await XlsxPopulate.fromFileAsync('./template.xlsx');

  const sheet = wb.sheet("Self-Assessment");

  sheet.cell("C13").value(roleLevel.name);

  let row = 17;
  for (const skill of roleLevel.skills) {
    sheet.cell('B' + row).value(skill.name);
    sheet.cell('C' + row).value('');
    sheet.cell('D' + row).value(capitaliseFirst(skill.level));
    sheet.cell('E' + row).value('You can:\r\n' + skill.description.map(d => ' - ' + d).join('\r\n') + '\r\n');
    row++;
  }
  for (;row < 27; row++) {
    sheet.cell('B' + row).value('');
    sheet.cell('C' + row).value('');
    sheet.cell('D' + row).value('');
    sheet.cell('E' + row).value('');
  }

  await wb.toFileAsync(name);
}

/**
 * Capitalises the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
function capitaliseFirst(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
  toSheet
}