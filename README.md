# The Gubbi

Self-contained Astro storefront frontend. Its visual language directly follows Gubbi Art Club: English gubbi lettering and flower, the same fonts and colours, playful photographs and warm layouts. No hybrid wordmark or bird icons.

## Run

```sh
npm install
npm run dev
```

Build with `npm run build`; output is `dist`. Preview a build with `npm run preview`. This directory can be moved into its own repository and deployed independently of the parent Art Club site.

## Included

- Homepage with showcase, craft notes, Art Club invitation and FAQs (FAQPage schema).
- Shop with category filters, search, empty state and sorting.
- Six product pages with gallery, specs, care, shipping and Product schema.
- Browser-local bag, quantity controls, shipping calculation and checkout with a backend seam.
- Story, craft, shipping & returns, privacy, terms and a custom 404.
- Sitemap, robots, canonical URLs, Open Graph card, favicons and web manifest.
- Responsive layout, keyboard controls, native dialogs and reduced-motion support.

## Before going live

- Product renders live in `product-source/<slug>/` (`hero.png` 4:3 for cards and the home page, `01.png`, `02.png`… 3:4 for the product page gallery). Run `node scripts/make-product-images.mjs` after adding or replacing a render; it writes the WebP sizes and a 1200×630 share card to `public/products/<slug>/`, which is what the site serves. Add a caption for each new render to `views` in `src/data/products.ts`.
- Wire `placeOrder()` in `src/scripts/storefront.ts` to the order API and payment gateway.
- Confirm the facts in `src/data/site.ts` (shipping cost, windows, return days, handles) and heights in `src/data/products.ts`.
- Run `node scripts/make-assets.mjs` if the brand or tagline changes, to refresh favicons and `public/og/default.png`.

Only the bag is stored in localStorage.

## Check the frontend

With the site running at http://127.0.0.1:4321:

```sh
npx playwright install chromium
npm test
```

Set `OBJECTS_URL` to test another local address. The check exercises the shopping flow, malformed storage, the personality picker and mobile navigation, then checks routes at 1440, 768, 390 and 360px. Captures are written to `.impeccable/review/`.
