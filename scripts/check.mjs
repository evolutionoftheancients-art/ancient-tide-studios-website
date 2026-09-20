import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { files } from './files.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const html = await readFile(join(root, 'index.html'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(ids.length, new Set(ids).size, 'Duplicate HTML IDs');
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'Expected one primary heading');
JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);

async function checkPath(path) {
  const parts = path.replaceAll('\\', '/').split('/');
  let directory = root;
  for (const part of parts) {
    assert.ok((await readdir(directory)).includes(part), `Missing file or filename case mismatch: ${path}`);
    directory = join(directory, part);
  }
  assert.ok((await stat(directory)).isFile(), `Not a file: ${path}`);
  assert.ok(files.includes(path), `Referenced file missing from deployment manifest: ${path}`);
}

for (const file of files) {
  await checkPath(file);
  assert.ok((await stat(join(root, file))).size < 25 * 1024 * 1024, `Oversized Pages asset: ${file}`);
}
for (const pageName of ['index.html', '404.html']) {
  const page = await readFile(join(root, pageName), 'utf8');
  for (const match of page.matchAll(/(?:^|\s)(href|src|srcset|data-image)="([^"]+)"/g)) {
    const refs = match[1] === 'srcset' ? match[2].split(',').map(candidate => {
      const [path, descriptor, ...extra] = candidate.trim().split(/\s+/);
      assert.ok(path && extra.length === 0, `Invalid srcset candidate: ${candidate}`);
      if (descriptor) {
        assert.match(descriptor, /^(?:[1-9]\d*w|(?:\d+(?:\.\d+)?|\.\d+)x)$/, `Invalid srcset descriptor: ${descriptor}`);
        assert.ok(parseFloat(descriptor) > 0, `Invalid srcset descriptor: ${descriptor}`);
      }
      return path;
    }) : [match[2]];
    for (const ref of refs) {
      if (/^(https?:|mailto:|data:)/.test(ref) || ref === '/') continue;
      if (ref.startsWith('#')) assert.ok(ids.includes(ref.slice(1)), `Broken anchor: ${ref}`);
      else await checkPath(ref.replace(/^\//, ''));
    }
  }
  for (const tag of page.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert.match(tag[0], /rel="[^"]*noopener/, 'External tab missing noopener');
}
const css = await readFile(join(root, 'assets/css/studio.css'), 'utf8');
for (const match of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) {
  const full = resolve(root, 'assets/css', match[1]);
  await checkPath(full.slice(root.length).replaceAll('\\', '/'));
}
console.log('Checks passed: local assets, exact filename case, deployment coverage, anchors, metadata, external links, and Pages size limits.');
