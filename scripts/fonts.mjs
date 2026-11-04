#!/usr/bin/env node
/**
 * Keeps the Japanese fonts in step with the site's text. They hold only the
 * characters the site uses, so a new character would silently fall back to a
 * system font. This stops that:
 *
 *   node scripts/fonts.mjs --check   fail if the source uses a character the fonts lack (runs before every build)
 *   node scripts/fonts.mjs           fetch fresh subsets from Google Fonts and rewrite src/app/look-fonts.css
 */
import { readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const CSS = 'src/app/look-fonts.css';
const JAPANESE = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}・ー]/gu;
const LATIN = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 !"#$%&'()*+,-./:;<=>?@[]_~—–‘’“”…·×↗→↓↑©`;
// Chrome's user agent, so Google serves woff2.
const AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';

// Boku only sets Japanese. Mincho and Gothic also set each look's Latin headings.
const fonts = [
  { family: 'Yuji Boku', query: 'Yuji+Boku', name: 'Look Boku', file: 'boku', weight: 400, latin: false },
  { family: 'Shippori Mincho', query: 'Shippori+Mincho:wght@800', name: 'Look Mincho', file: 'mincho', weight: 800, latin: true },
  { family: 'Dela Gothic One', query: 'Dela+Gothic+One', name: 'Look Gothic', file: 'gothic', weight: 400, latin: true },
];

const sources = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sources(path);
    return /\.tsx?$/.test(entry.name) ? [path] : [];
  });

/** Japanese visitors can see: the characters in the source, leaving out comments. */
const used = () => {
  const text = sources('src')
    .map((file) => readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, ''))
    .join('');
  return [...new Set(text.match(JAPANESE) ?? [])].sort();
};

const covered = () => {
  try {
    return readFileSync(CSS, 'utf8').match(/Characters: (.*) \*\//)?.[1] ?? '';
  } catch {
    return '';
  }
};

if (process.argv.includes('--check')) {
  const have = new Set(covered());
  const missing = used().filter((char) => !have.has(char));
  if (missing.length) {
    console.error(`\nThe Japanese fonts are missing: ${missing.join(' ')}\nRun \`node scripts/fonts.mjs\` to add them.\n`);
    process.exit(1);
  }
  process.exit(0);
}

const chars = used().join('');
const faces = [];

for (const font of fonts) {
  const text = encodeURIComponent(chars + (font.latin ? LATIN : ''));
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=${font.query}&text=${text}&display=swap`, {
      headers: { 'User-Agent': AGENT },
    })
  ).text();
  const url = css.match(/url\((https:[^)]+)\)/)?.[1];
  if (!url) throw new Error(`No font returned for ${font.family}:\n${css}`);

  const data = Buffer.from(await (await fetch(url)).arrayBuffer());
  writeFileSync(`public/fonts/${font.file}.woff2`, data);
  console.log(`${font.family}: ${(data.length / 1024).toFixed(1)} KB`);

  faces.push(
    `@font-face {\n  font-family: '${font.name}';\n  font-weight: ${font.weight};\n  font-display: swap;\n` +
      `  src: url('/fonts/${font.file}.woff2') format('woff2');\n}\n`
  );
}

for (const file of readdirSync('public/fonts')) {
  if (!fonts.some((font) => file === `${font.file}.woff2`)) rmSync(join('public/fonts', file));
}

writeFileSync(
  CSS,
  `/* Written by scripts/fonts.mjs. Japanese fonts cut down to the characters the site uses,
   so each look costs one small file. Yuji Boku, Shippori Mincho and Dela Gothic One
   are under the SIL Open Font License 1.1.
   Characters: ${chars} */
:root {
  --font-yuji: 'Look Boku';
  --font-shippori: 'Look Mincho';
  --font-dela: 'Look Gothic';
}

${faces.join('\n')}`
);
