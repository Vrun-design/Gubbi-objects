// Turns the raw product renders in product-source/<slug>/ into the web sizes
// the storefront serves from public/products/<slug>/. Run after adding or
// replacing a render: `node scripts/make-product-images.mjs`.
//
//   hero.png       4:3   → hero-{480,800,1200,1600}.webp   (cards, home, bag)
//   01.png, 02…    3:4   → 01-{480,800,1200}.webp          (PDP gallery)
//   hero.png       → og.jpg 1200×630                         (share cards)
import sharp from 'sharp';
import { readdirSync, mkdirSync, rmSync } from 'node:fs';
const root = new URL('../', import.meta.url).pathname;
const src = root + 'product-source/';
const out = root + 'public/products/';
const heroWidths = [480, 800, 1200, 1600];
const galleryWidths = [480, 800, 1200];

for (const slug of readdirSync(src, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)) {
  rmSync(out + slug, { recursive: true, force: true });
  mkdirSync(out + slug, { recursive: true });
  const files = readdirSync(src + slug).filter(f => f.endsWith('.png')).sort();
  for (const file of files) {
    const name = file.replace('.png', '');
    const hero = name === 'hero';
    const [w, h] = hero ? [4, 3] : [3, 4];
    const image = sharp(src + slug + '/' + file);
    for (const width of hero ? heroWidths : galleryWidths) {
      await image.clone().resize({ width, height: Math.round(width * h / w), fit: 'cover', withoutEnlargement: true })
        .webp({ quality: 82, effort: 5 }).toFile(`${out}${slug}/${name}-${width}.webp`);
    }
    if (hero) await image.clone().resize({ width: 1200, height: 630, fit: 'cover' }).jpeg({ quality: 82, mozjpeg: true }).toFile(`${out}${slug}/og.jpg`);
  }
  console.log(slug, files.length, 'renders');
}
