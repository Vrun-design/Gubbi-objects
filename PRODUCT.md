# The gubbi gang storefront

Standalone Astro frontend in this folder. Sister site to Gubbi Art Club; never modify the parent Art Club site as part of this work.

## Owner's direction

The owner explicitly rejected a separate editorial visual identity on 16 September 2026. Copy the Art Club site's existing visual language directly: its English gubbi lettering, flower, paper, cobalt, coral, yellow, sage, type scale, taped photographs, and playful section composition. Adapt content and navigation for shopping.

On 16 September 2026 the owner also rejected the word "objects" as too mechanical and named the line **gubbi gang**: lowercase `gubbi` plus small tracked `GANG`, product routes at `/gang/<slug>`. The voice is Bengaluru Kanglish in Latin script — the owner chose this over polite English, because describing the city read flatter than speaking like it.

Never use the Kannada/hybrid wordmark or bird icons on this website, including the header, footer, empty states, and favicon. The original six product concepts themselves are supplied imagery and remain intact.

## Audience and content

Adult collectible/decor object concepts inspired by Bengaluru, internet habits and work life. The six concepts in public/Toy.png are the owner's starting visual reference. Product photography and final production details are pending. GUBBI-OBJECTS.md in the parent is strategy context; the owner's direct instruction to use the six reference concepts governs this prototype.

## Scope and truth

Frontend only: collection, search, filters, sorting, product pages, full/detail concept views, image enlargement, local shopping bag with quantities, preview checkout, story, philosophy, FAQ and 404. All prices are illustrative. No live payments, orders, stock claims, manufactured-product guarantees, mailing signup or account. Checkout entries are not sent or stored. Only the bag persists in browser localStorage. Site remains noindex.

The nest-box programme is an ambition, not a currently fulfilled impact claim. Do not invent partner names, maker names, statistics, testimonials, delivery promises or final material specifications.

## Implementation

Astro static output, native CSS, self-hosted Space Grotesk and DM Sans from the Art Club, Georgia italic accents, browser TypeScript. No runtime UI library. Product catalogue: src/data/products.ts. Replace concept images and illustrative prices before launch.
