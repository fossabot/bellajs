/**
 * Check built-files to ensure they have been regenated correctly
 * @ndaidong
 */

var fs = require('fs');
var test = require('tape');

var pkgFake = require('../../package.json');
var proFile = './dist/bella.js';
var devFile = './dist/bella.min.js';

test('Validate production output', (assert) => {
  assert.ok(fs.existsSync(proFile), 'Production file must be generated');

  let s = fs.readFileSync(proFile, 'utf8');
  let a = s.split('\n');
  assert.ok(s.length > 0 && a.length > 5, 'Production file must be not empty');

  assert.ok(a[1] === ` * ${pkgFake.name}`, 'Package name must be correct');
  assert.ok(a[2] === ` * v${pkgFake.version}`, 'Package version must be correct');
  assert.ok(a[3].startsWith(' * built:'), 'Package built time must be showed');
  assert.ok(a[4] === ` * git: ${pkgFake.repository.url}`, 'Package repository must be correct');
  assert.ok(a[5] === ` * author: ${pkgFake.author}`, 'Package author must be correct');
  assert.ok(a[6] === ` * License: ${pkgFake.license}`, 'Package license must be correct');

  assert.end();
});

test('Validate development output', (assert) => {
  assert.ok(fs.existsSync(devFile), 'Development file must be generated');

  let s = fs.readFileSync(devFile, 'utf8');
  let a = s.split('\n');
  assert.ok(s.length > 0 && a.length > 1, 'Development file must be not empty');
  let cmt = a[0];
  let pack = `${pkgFake.name}@${pkgFake.version}`;
  assert.ok(cmt.includes(pack), 'Package must be presented with name and version');
  let author = `${pkgFake.author}`;
  assert.ok(cmt.includes(author), 'Package author must be correct');
  let license = `${pkgFake.license}`;
  assert.ok(cmt.includes(license), 'Package license must be correct');

  assert.end();
});
