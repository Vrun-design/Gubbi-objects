# The Gubbi storefront

Standalone Astro frontend in this folder. Sister site to Gubbi Art Club; never modify the parent Art Club site as part of this work.

## Owner's direction

The owner rejected a separate editorial visual identity on 16 September 2026. Copy the Art Club site's existing visual language directly: its English gubbi lettering, flower, paper, cobalt, coral, yellow, sage, type scale, taped photographs and playful section composition. Adapt content and navigation for shopping.

On 16 September 2026 the owner replaced the six-character lineup with the products that actually exist: Traffic Kumar, Bartha Idini (ETA spinner), Silk Board Forever, Token Maxxer, I Got It Bruh and Yaavdu Dice. Doomscroll Buddy, Workflow Spinner 2AM, Copilot Confusion and Namma Metro Sprint are gone. Shop filters are Bengaluru, Vibe coding, Kinetic and Desk.

Also on 16 September 2026 the owner rejected both "objects" and "gang" as names. The brand is simply **The Gubbi** (wordmark `gubbi` + flower). Product routes are `/shop/<slug>`. The voice is Bengaluru Kanglish in Latin script. Bengaluru is one edge, not the only one: the characters are equally about internet habits and work life (doomscrolling, deploys, pair programming), and the copy should keep all three in view.

Never use the Kannada/hybrid wordmark or bird icons on this website, including the header, footer, empty states and favicon. The supplied product imagery stays intact.

## Audience and stance

Adult decorative collectibles, hand-turned in Channapatna. Not toys; not for children under 14. The site is written as a live shop, ready to buy: real prices, stock, shipping, returns, privacy and terms. No preview or "concept" language anywhere in the UI.

Do not invent partner names, maker names, statistics or testimonials. The nest-box commitment is stated without a counter until there is a real number.

## Facts live in one place

`src/data/site.ts` holds domain, email, social handles, shipping cost, free-shipping threshold, dispatch and delivery windows and return days. `src/data/products.ts` holds the catalogue, including height and image alt text. Edit those, not page copy.

## Backend seam

The storefront is static. `placeOrder()` in `src/scripts/storefront.ts` is the single point where the order API and payment gateway plug in. Until it is wired, the checkout form validates, hands over the payload and shows the confirmation state. Do not put the checkout live before that is connected.

## SEO

Canonical origin is `site` in `astro.config.mjs` (`https://thegubbi.com`). Every page sets title, description, canonical, Open Graph, Twitter card and JSON-LD (Organization, WebSite, plus BreadcrumbList/Product on product pages, FAQPage on home, ItemList on shop). `@astrojs/sitemap` writes `sitemap-index.xml`; `public/robots.txt` points to it. Checkout and 404 are noindex. `node scripts/make-assets.mjs` regenerates favicons and the Open Graph card.
