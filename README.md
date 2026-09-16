# The Gubbi

Self-contained Astro storefront frontend. Its visual language directly follows Gubbi Art Club: English gubbi lettering and flower, the same fonts and colours, playful photographs and warm layouts. No hybrid wordmark or bird icons.

## Run

```sh
npm install
npm run dev
```

Build with `npm run build`; output is `dist`. Preview a build with `npm run preview`. This directory can be moved into its own repository and deployed independently of the parent Art Club site.

## Included

- Homepage with interactive personality picker and collection/gifting paths.
- Shop with category filters, search, empty state and sorting.
- Six product pages with full/detail concept views and image enlargement.
- Browser-local bag, quantity controls, totals and checkout preview.
- Story, philosophy, FAQs and a custom 404.
- Responsive layout, keyboard controls, native dialogs and reduced-motion support.

## Preview boundaries

`public/Toy.png` is the supplied concept sheet, framed with CSS without modifying the source. Detail views are crops of that same concept, not additional photographs. Prices in `src/data/products.ts` are illustrative. Production specifications, final photography, pricing, taxes, shipping and returns must be confirmed before launch.

Only the bag is stored in localStorage. Checkout details and gift notes are never sent or saved. No order, payment, reservation or email signup takes place. The website remains noindex.

## Check the frontend

With the site running at http://127.0.0.1:4321:

```sh
npx playwright install chromium
npm test
```

Set `OBJECTS_URL` to test another local address. The check exercises the shopping flow, malformed storage, the personality picker and mobile navigation, then checks routes at 1440, 768, 390 and 360px. Captures are written to `.impeccable/review/`.
