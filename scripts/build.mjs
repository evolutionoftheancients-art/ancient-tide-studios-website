import { copyFile, mkdir, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { files } from './files.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
let total = 0;
for (const file of files) {
  const source = resolve(root, file);
  const bytes = (await stat(source)).size;
  if (bytes > 25 * 1024 * 1024) throw new Error(`${file} exceeds Cloudflare Pages' 25 MiB asset limit.`);
  const destination = resolve(root, 'dist', file);
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(source, destination);
  total += bytes;
}
console.log(`Built ${files.length} files in dist (${(total / 1024 / 1024).toFixed(2)} MiB total).`);
