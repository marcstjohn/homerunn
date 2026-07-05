// Generate the homerunn "D" logo as outlined SVG paths.
// Compounding size curve, weight-compensated (h/o/m at 800, rest at 700),
// exact advance widths from font metrics + small optical tracking.
const opentype = require('opentype.js');
const fs = require('fs');

function loadFont(p) {
  const buf = fs.readFileSync(p);
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}
const bold = loadFont('./sora-700.ttf');
const xbold = loadFont('./sora-800.ttf');

const letters = [
  { ch: 'h', size: 30, font: xbold },
  { ch: 'o', size: 32, font: xbold },
  { ch: 'm', size: 35, font: xbold },
  { ch: 'e', size: 39, font: bold },
  { ch: 'r', size: 43, font: bold },
  { ch: 'u', size: 48, font: bold },
  { ch: 'n', size: 54, font: bold },
  { ch: 'n', size: 60, font: bold },
];

const TRACKING = 0.6; // px between letters, optical breathing room
const baseline = 56;
let x = 2;
const paths = [];

for (const { ch, size, font } of letters) {
  const glyph = font.charToGlyph(ch);
  const path = font.getPath(ch, x, baseline, size);
  const d = path.toPathData(2);
  paths.push(`  <path d="${d}"/>`);
  const advance = (glyph.advanceWidth / font.unitsPerEm) * size;
  x += advance + TRACKING;
}

const totalWidth = Math.ceil(x + 2);
// tallest letter: final n at 60px — ascender height
const asc = (bold.ascender / bold.unitsPerEm) * 60;
const top = baseline - asc;

console.log('total width:', totalWidth, '| top of tallest letter:', top.toFixed(1));
console.log('---SVG---');
console.log(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth} 70" role="img" aria-label="homerunn">
<title>homerunn</title>
<g fill="CURRENTCOLOR_PLACEHOLDER">
${paths.join('\n')}
</g>
</svg>`);
