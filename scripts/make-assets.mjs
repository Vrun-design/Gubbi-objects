// Renders the favicon, touch icon and default Open Graph card from the brand
// SVG and fonts. Run `node scripts/make-assets.mjs` after changing the brand.
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
const root = new URL('../', import.meta.url).pathname;
const icon = readFileSync(root + 'public/brand/gubbi-app-icon.svg', 'utf8');
const font = readFileSync(root + 'public/fonts/display.ttf').toString('base64');
const body = readFileSync(root + 'public/fonts/body.ttf').toString('base64');
const browser = await chromium.launch();
const page = await browser.newPage();

async function png(html, width, height, file, scale = 1) {
  await page.setViewportSize({ width, height });
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: root + file, omitBackground: true, scale: scale === 1 ? 'css' : 'device' });
}
const iconHtml = size => `<body style="margin:0;background:transparent">${icon.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body>`;
await png(iconHtml(180), 180, 180, 'public/apple-touch-icon.png');
await png(iconHtml(32), 32, 32, 'public/favicon-32.png');
await png(iconHtml(512), 512, 512, 'public/icon-512.png');
await png(iconHtml(192), 192, 192, 'public/icon-192.png');

// ICO container around the 32px PNG (PNG-in-ICO is supported everywhere that matters).
const p = readFileSync(root + 'public/favicon-32.png');
const header = Buffer.alloc(6 + 16);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6); header.writeUInt8(32, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12); header.writeUInt32LE(p.length, 14); header.writeUInt32LE(22, 18);
writeFileSync(root + 'public/favicon.ico', Buffer.concat([header, p]));

const og = `<html><head><style>
@font-face{font-family:Space;src:url(data:font/ttf;base64,${font})}
@font-face{font-family:DM;src:url(data:font/ttf;base64,${body})}
body{margin:0;width:1200px;height:630px;background:#f8f5ea;font-family:Space,sans-serif;color:#252720;position:relative;overflow:hidden}
.band{position:absolute;inset:auto 0 0 0;height:22px;background:#f4ce4f;border-top:1px solid #dfb944}
.brand{position:absolute;left:80px;top:72px;display:flex;align-items:center;gap:18px;font-size:64px;font-weight:700;letter-spacing:-.04em;color:#2449d8}
.brand svg{width:56px;height:56px}
h1{position:absolute;left:80px;top:200px;margin:0;font-size:92px;line-height:1.02;letter-spacing:-.04em;max-width:900px}
h1 em{font-family:Georgia,serif;font-weight:400;font-style:italic;color:#2449d8}
p{position:absolute;left:80px;top:448px;margin:0;font-family:DM,sans-serif;font-size:28px;color:#55584d;max-width:760px;line-height:1.4}
.flower{position:absolute;right:-60px;top:-60px;width:420px;height:420px;color:#ef643f;transform:rotate(18deg)}
.stamp{position:absolute;right:96px;bottom:70px;width:150px;height:150px;border-radius:50%;background:#f4ce4f;display:grid;place-items:center;text-align:center;font-size:15px;letter-spacing:.08em;line-height:1.35;transform:rotate(-8deg)}
</style></head><body>
<svg class="flower" viewBox="0 0 60 60"><g fill="currentColor"><ellipse cx="30" cy="30" rx="11" ry="29"/><ellipse cx="30" cy="30" rx="11" ry="29" transform="rotate(60 30 30)"/><ellipse cx="30" cy="30" rx="11" ry="29" transform="rotate(120 30 30)"/></g><circle cx="30" cy="30" r="6" fill="#f8f5ea"/></svg>
<div class="brand"><svg viewBox="0 0 60 60"><g fill="currentColor"><ellipse cx="30" cy="30" rx="11" ry="29"/><ellipse cx="30" cy="30" rx="11" ry="29" transform="rotate(60 30 30)"/><ellipse cx="30" cy="30" rx="11" ry="29" transform="rotate(120 30 30)"/></g><circle cx="30" cy="30" r="6" fill="#f8f5ea"/></svg>gubbi</div>
<h1>Little wooden guys.<br><em>Dodda</em> feelings.</h1>
<p>Little wooden collectibles, hand-turned in Channapatna. Old craft, new mischief. Ships across India.</p>
<div class="stamp">MADE IN<br>CHANNAPATNA<br>· KARNATAKA ·</div>
<div class="band"></div>
</body></html>`;
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(og);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: root + 'public/og/default.png' });
await browser.close();
console.log('assets written');
