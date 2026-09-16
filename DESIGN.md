---
name: Gubbi Objects
description: The Art Club visual language, adapted for a collection preview.
colors:
  paper: "#f8f5ea"
  paper-deep: "#eeeadd"
  paper-shade: "#e7e8da"
  cream: "#fffdf7"
  line: "#d7d7ca"
  line-strong: "#abad9e"
  ink: "#252720"
  ink-soft: "#4b4c43"
  ink-muted: "#55584d"
  ink-faint: "#8d8e82"
  blue: "#2449d8"
  blue-deep: "#1632ab"
  blue-tint: "#dcdcf1"
  blue-pale: "#d9e0ff"
  orange: "#ef643f"
  orange-tint: "#fbd5c5"
  orange-pale: "#efd9cf"
  yellow: "#f4ce4f"
  yellow-soft: "#f3d578"
  yellow-deep: "#edce64"
  yellow-tint: "#fbf0c6"
  yellow-line: "#dfb944"
  yellow-ink: "#7a5a05"
  green: "#e8eddc"
  green-pale: "#f1f4e8"
  green-soft: "#dfe5d3"
  green-leaf: "#cfe0b7"
  green-line: "#9ba88e"
  green-line-soft: "#c5c8ad"
  tape: "#e5c898"
  danger: "#a62e22"
  line-on-dark: "rgb(255 255 255/.5)"
  line-on-dark-soft: "rgb(255 255 255/.25)"
  scrim: "rgb(23 27 52/.66)"
  color-on-action: "#fff"
typography:
  display:
    fontFamily: "Space, Arial, sans-serif"
    fontSize: "clamp(52px,5.55vw,79px)"
    fontWeight: 700
    lineHeight: 1.055
    letterSpacing: "-.04em"
  headline:
    fontFamily: "Space, Arial, sans-serif"
    fontSize: "clamp(32px,3.3vw,47px)"
    fontWeight: 700
    lineHeight: 1.08
  body:
    fontFamily: "DM, Arial, sans-serif"
    fontSize: "15px"
    lineHeight: 1.8
  accent:
    fontFamily: "Georgia, serif"
    fontWeight: 400
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "30px"
  pill: "999px"
spacing:
  space-1: "4px"
  space-2: "8px"
  space-3: "12px"
  space-4: "16px"
  space-5: "24px"
  space-6: "32px"
  space-7: "48px"
  space-8: "64px"
  space-section: "90px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.cream}"
    rounded: "{rounded.sm}"
    padding: "15px 23px"
  button-primary-hover:
    backgroundColor: "{colors.blue-deep}"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.blue}"
    rounded: "{rounded.sm}"
    padding: "15px 23px"
  filter-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.xl}"
    padding: "9px 17px"
---
# Design System: Gubbi Objects

## Overview

**Creative North Star: Gubbi Art Club, directly.** The owner rejected an independent editorial identity. Carry the parent Art Club’s English **gubbi + flower** identity, typography, colors, taped photographs, hand-drawn underlines and playful composition into shopping. This is a direct family resemblance, not a new interpretation.

Warm, local and lightly mischievous: generous paper grounds, confident type, tactile images and practical shopping controls. Concept imagery and illustrative prices remain visibly identified; the frontend takes no live orders or payments.

**Key characteristics:** English wordmark and flower; paper and cobalt; coral, yellow and sage accents; tilted prints; italic asides; clear commerce controls.

## Colors

The frontmatter records the shipped CSS palette; `src/styles/tokens.css` owns its values. `art-club.css` supplies the final presentation over `global.css`.

Cobalt (`blue`) anchors actions, links, the announcement and footer. `blue-deep` marks hover. Coral (`orange`) supplies punctuation and decorative flowers. Yellow supplies stamps, the ticker and selected text; sage (`green`) gives philosophy and craft sections a calm ground. Paper is the page, cream the print or field surface, and paper-deep the quiet section band. Ink and ink-muted carry reading copy; line and line-strong separate and outline. Danger is for errors, not a decorative coral substitute.

## Typography

Self-hosted **Space Grotesk** is registered as `Space`: bold, tightly tracked headings and the English wordmark. Self-hosted **DM Sans** is registered as `DM`: body, labels and controls. **Georgia italic** provides short asides and emphasis, never a replacement identity. The inherited Baloo font declaration is not permission to introduce a Kannada or hybrid wordmark.

Home display uses the frontmatter scale; page display uses `clamp(40px,5vw,68px)` and section headings use the headline scale. Body is 15px, paragraphs use 1.8 leading and a maximum 65ch. Hero supporting copy is capped at 430px. Compact labels remain secondary to titles and readable actions.

## Layout

The main wrap is `min(1280px,90%)`. Desktop hero uses two columns, copy slightly wider; sections alternate open paper, photographic arrangements and full-width tinted bands. Main section padding is 90px top / 85px bottom. Product grids use three columns and 38px / 25px gaps.

At 1000px the hero and decorative details compact. At 760px navigation switches to its menu, major compositions stack, sections use 55px vertical padding and product grids use two columns. At 390px product grids become one column. Preserve deliberate image rotations and generous separation without horizontal overflow. Shopping and checkout layouts also inherit their 1100px and 760px adjustments from global CSS.

## Elevation & Depth

Depth comes from paper mats, overlapping tape, slight rotation and warm ink-brown shadows. Photo frames use `--shadow-md`; product cards remain open rather than floating in generic dashboard panels. Buttons lift slightly on hover without a shadow. The sidecar records exact depth and motion tokens. Respect reduced motion: disable marquee animation, transitions and smooth scrolling.

## Shapes

Small control corners are 6px, product images 8px and gift panels 12px. Filters use 30px pill corners; stamps and quick-add controls are circular. Borders are restrained. Photo mats remain crisp rectangular prints with irregular composition, a tape strip and handwritten-feeling italic captions. Decorative flowers and curved arrows support the composition.

## Components

- **Identity and navigation:** English lowercase `gubbi`, flower, and small tracked `OBJECTS`. Desktop brand is 42px, mobile 36px; footer uses the same identity in paper on cobalt. Main navigation is understated with active underlines; the bag is a cobalt action with a circular count.
- **Buttons:** cobalt/cream, 13px DM, 50px minimum height, 15px 23px padding, 6px corners. Hover darkens and moves up 3px with a -1deg rotation. Light variants use paper/cobalt. Preserve visible keyboard focus: 3px outlines with 5px offset; buttons, links and summaries use cobalt, fields use coral.
- **Filters and personality selectors:** outlined pills, minimum 44px height, ink/paper active state. Preserve active semantics and clear hover borders.
- **Product cards:** image first, open text below, 24px Space title, 13px illustrative price and compact description. Cobalt circular quick-add remains visibly actionable. Keep concept-image labels.
- **Fields:** cream checkout inputs with line-strong borders, 2px corners and 12px padding. Search uses a quieter underlined field. Keep labels and native validation readable.
- **Photos and signatures:** taped hero print at -5deg, yellow circular stamp, cobalt flower, curved arrow and hand underline. Reuse these Art Club motifs with restraint and retain image subject visibility.
- **Shopping dialogs:** paper bag drawer, dark scrim, explicit close and quantity controls. Preview checkout must clearly state that no payment or order is taken.

## Do's and Don'ts

- **Do** copy the parent Art Club’s established visual language and adapt content for shopping.
- **Do** use the English gubbi lettering plus flower in header, footer, empty states and favicon.
- **Do** preserve the supplied six product concepts, concept-image disclosures and illustrative-price labels.
- **Do** keep focus, reduced motion, mobile layouts and shopping controls usable.
- **Don't** create an independent editorial identity or substitute a hybrid/Kannada wordmark.
- **Don't** use bird icons anywhere on this website. Supplied product concept artwork stays intact.
- **Don't** imply real orders, stock, production guarantees or fulfilled nest-box impact from this frontend preview.
