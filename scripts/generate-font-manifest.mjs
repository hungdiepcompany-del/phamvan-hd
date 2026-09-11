import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const fontsDir = path.join(root, 'public', 'fonts');
const outputFile = path.join(fontsDir, 'fonts.json');
const allowed = new Set(['.woff2', '.woff', '.ttf', '.otf']);

await fs.mkdir(fontsDir, { recursive: true });

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(abs));
    else if (entry.isFile() && allowed.has(path.extname(entry.name).toLowerCase())) files.push(abs);
  }
  return files;
}

const files = (await walk(fontsDir)).sort((a,b)=>a.localeCompare(b, 'vi'));
const fonts = files.map(abs => {
  const relFs = path.relative(path.join(root, 'public'), abs);
  const relParts = relFs.split(path.sep);
  const url = '/' + relParts.map(encodeURIComponent).join('/');
  const ext = path.extname(abs).slice(1).toLowerCase();
  const base = path.basename(abs, path.extname(abs));
  const hash = crypto.createHash('sha1').update(relFs.toLowerCase()).digest('hex').slice(0, 12);
  return {
    id: `hosting-${hash}`,
    name: base.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim(),
    family: `PVM_Hosting_${hash}`,
    downloadURL: url,
    storagePath: relFs.replaceAll('\\','/'),
    format: ext,
    enabled: true,
    originalName: path.basename(abs),
    source: 'manifest'
  };
});

const payload = {
  version: 1,
  generatedAt: new Date().toISOString(),
  count: fonts.length,
  fonts
};
await fs.writeFile(outputFile, JSON.stringify(payload, null, 2) + '\n', 'utf8');
console.log(`[fonts] ${fonts.length} font(s) -> public/fonts/fonts.json`);
for (const font of fonts) console.log(`  - ${font.name} (${font.format.toUpperCase()}) ${font.downloadURL}`);
