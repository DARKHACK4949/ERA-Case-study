/**
 * Fail the build on any asset reference that does not resolve.
 *
 * This is the same rule the ERA token build applies to token references, and it
 * exists because the opposite kept happening: a @font-face pointing at a file
 * that was not shipped fails silently, the browser falls back to the system
 * stack, and a three typeface system renders in one typeface while looking
 * completely fine. It shipped that way twice.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');
const problems = [];

/* 1. Every url() in the stylesheets resolves to a real file in public/. */
for (const sheet of ['app/case-study.css', 'app/era.css']) {
  const path = join(root, sheet);
  if (!existsSync(path)) { problems.push(`missing stylesheet: ${sheet}`); continue; }
  const css = readFileSync(path, 'utf8');
  for (const m of css.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) {
    const ref = m[1].trim();
    if (/^(data:|https?:|\/\/)/.test(ref)) continue;
    const file = join(pub, ref.replace(/^\//, ''));
    if (!existsSync(file)) problems.push(`${sheet} references ${ref}, which is not in public/`);
  }
}

/* 2. Every next/image src in the page resolves. */
const pagePath = join(root, 'app/page.tsx');
if (existsSync(pagePath)) {
  const page = readFileSync(pagePath, 'utf8');
  for (const m of page.matchAll(/<Image\s[^>]*src="(\/[^"]+)"/g)) {
    const file = join(pub, m[1].replace(/^\//, ''));
    if (!existsSync(file)) problems.push(`app/page.tsx references ${m[1]}, which is not in public/`);
  }
}

/* 3. Each brand must have a typeface that is actually present. One font file
      standing in for three is exactly how this went unnoticed before. */
const BRAND_FONTS = {
  'Brand 1': { family: 'IBM Plex Sans', file: 'font/plex.woff2' },
  'Brand 2': { family: 'Geist', file: 'font/geist.woff2' },
  'Brand 3': { family: 'Source Sans 3', file: 'font/source.woff2' },
};
const css = existsSync(join(root, 'app/case-study.css'))
  ? readFileSync(join(root, 'app/case-study.css'), 'utf8')
  : '';
for (const [brand, { family, file }] of Object.entries(BRAND_FONTS)) {
  if (!css.includes(`font-family:"${family}"`)) {
    problems.push(`${brand}: no @font-face declares "${family}"`);
  }
  if (!existsSync(join(pub, file))) {
    problems.push(`${brand}: ${file} is not in public/, so it would fall back to the system font`);
  }
}

const shipped = existsSync(join(pub, 'font')) ? readdirSync(join(pub, 'font')) : [];

if (problems.length) {
  console.error('\nAsset check failed:\n');
  for (const p of problems) console.error('  - ' + p);
  console.error(`\npublic/font currently holds: ${shipped.join(', ') || 'nothing'}\n`);
  process.exit(1);
}

console.log(`Asset check passed. Fonts shipped: ${shipped.join(', ')}`);
