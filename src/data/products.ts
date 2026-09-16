export type Product = {
  slug: string;
  number: string;
  name: string;
  short: string;
  story: string;
  colour: string;
  /** Swatch hex shown next to the colour name. */
  swatch: string;
  tags: string[];
  price: number;
  mood: string;
  /** Approximate height, centimetres. Desk scale by design. */
  height: number;
  /** Image alt text: what is actually in the hero picture. */
  alt: string;
  /** Gallery captions, in order: 01.png, 02.png … from product-source/<slug>/. */
  views: string[];
  /** 1-based gallery index of the in-situ desk shot, used on the personality section. */
  scene: number;
};

export const collection = { name: 'Collection 01', material: 'Hand-turned ivory wood (aale mara), natural lac colour, leaf-polished', origin: 'Made in Channapatna, Karnataka' };

export const products: Product[] = [
  {
    slug: 'traffic-kumar', number: '01', name: 'Traffic Kumar', price: 1490, mood: 'For the permanently en route', height: 9,
    short: 'Still at Silk Board. Looks great here.',
    story: 'One yellow-and-green auto, one very determined gubbi at the handlebar, and a number plate that says BLR 404. Kumar is our tribute to the city’s most familiar waiting room: the road. The back of the auto tells you exactly where he is. Still.',
    colour: 'Auto yellow, meter green', swatch: '#f2b51c', tags: ['Bengaluru', 'Desk'],
    alt: 'Traffic Kumar, a yellow and green wooden auto-rickshaw driven by a small red sparrow, number plate BLR 404',
    views: ['Head on. Meter down.', 'Side profile, passenger side', 'From the back: “Traffic Kumar. Still at Silk Board.”', 'Parked by the laptop', 'Three-quarter view'],
    scene: 4,
  },
  {
    slug: 'bartha-idini', number: '02', name: 'Bartha Idini', price: 1990, mood: 'For the “reaching in five minutes” friend', height: 4,
    short: 'Spin for an ETA. Believe none of them.',
    story: '“Bartha idini” means “I’m coming”. This spinner decides how much of that is true. 12 min, 28 min, 47 min, 1 hr 15, Silk Board, or rain, cancel plans. A little wooden auto rides the disc round on a walnut base. Flick the knob, then text accordingly.',
    colour: 'Walnut, signal blue, meter yellow', swatch: '#1f3f8c', tags: ['Bengaluru', 'Kinetic'],
    alt: 'Bartha Idini, a wooden spinner disc with six ETA segments and a tiny auto-rickshaw at its centre',
    views: ['Resting on its walnut base', 'The segments, up close', 'The knob that decides your evening', 'Felt pads underneath. Desk safe.', 'Mid-spin', 'Landing on 1 hr 15', 'In the hand'],
    scene: 7,
  },
  {
    slug: 'silk-board-forever', number: '03', name: 'Silk Board Forever', price: 2490, mood: 'For the scenic route to nowhere', height: 11,
    short: 'Same jam. Different day.',
    story: 'A flyover loop, six cars that are going absolutely nowhere, and a green board that reads Silk Board ∞ Forever. The city’s most honest landmark, scaled down to fit beside your keyboard, where at least you are already home.',
    colour: 'Rosewood, signal green, a little chevron', swatch: '#18613d', tags: ['Bengaluru', 'Desk'],
    alt: 'Silk Board Forever, a wooden flyover loop with six tiny cars, a green highway sign and a plaque that says same jam different day',
    views: ['The sign says it all', 'Chevron, plaque, trees', 'Felt pads underneath', 'Beside the laptop', 'The whole junction'],
    scene: 4,
  },
  {
    slug: 'token-maxxer', number: '04', name: 'Token Maxxer', price: 2290, mood: 'For the “one more prompt” crowd', height: 14,
    short: 'Spin before shipping.',
    story: 'Five moods on one wheel: burn 50k tokens, ask Claude, let Cursor cook, start a new chat, ship it anyway. A rosewood base, a brass plaque, and a red pointer that has never once said “write it yourself”. Spin responsibly; production is watching.',
    colour: 'Rosewood, five moods', swatch: '#8a3b1f', tags: ['Vibe coding', 'Kinetic'],
    alt: 'Token Maxxer, a wooden prize wheel with five coloured segments on a rosewood base with a brass plaque',
    views: ['Front and centre', 'Slight angle, pointer on burn 50k tokens', 'Profile', 'Full wheel', 'Pointer, up close', 'The plaque', 'Ready to spin'],
    scene: 4,
  },
  {
    slug: 'i-got-it-bruh', number: '05', name: 'I Got It Bruh', price: 2690, mood: 'For your favourite pair programmer', height: 9,
    short: 'Ship it. Refactor later. Works on my machine.',
    story: 'One engineer, one very confident robot, and a flip sign between them with the only four answers that matter: ship it, refactor later, ask again with context, works on my machine. Flip to whichever one the pull request deserves today.',
    colour: 'Mustard, moss, assistant blue', swatch: '#c78a1f', tags: ['Vibe coding', 'Kinetic'],
    alt: 'I Got It Bruh, a wooden engineer with a laptop and a small smiling robot either side of a flip sign that reads ship it',
    views: ['The full standup', 'From the left', 'From the right', 'Back of house', 'On the desk', 'The flip sign, up close', 'The robot has a plan'],
    scene: 5,
  },
  {
    slug: 'yaavdu-dice', number: '06', name: 'Yaavdu Dice', price: 990, mood: 'For the model-agnostic', height: 4,
    short: 'Roll. Prompt. Pray.',
    story: '“Yaavdu?” means “which one?”. Six faces, six model logos, zero decision fatigue. Roll it on the walnut tray before you open the chat, then blame the dice. The most honest routing layer in the office.',
    colour: 'Beech, forest green, mustard', swatch: '#1d3d2e', tags: ['Vibe coding', 'Desk'],
    alt: 'Yaavdu Dice, a chunky wooden dice with a different AI model logo inlaid on each face',
    views: ['Three faces up', 'Mustard face', 'Cream face', 'Black face', 'In its walnut tray', 'Blue face', 'Green face'],
    scene: 5,
  },
];

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
export const money = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

/** Web images live in public/products/<slug>/, built by scripts/make-product-images.mjs. */
export const heroWidths = [480, 800, 1200, 1600];
export const galleryWidths = [480, 800, 1200];
export const heroSrc = (slug: string, width = 800) => `/products/${slug}/hero-${width}.webp`;
export const gallerySrc = (slug: string, index: number, width = 800) => `/products/${slug}/${String(index).padStart(2, '0')}-${width}.webp`;
export const heroSrcset = (slug: string) => heroWidths.map(width => `${heroSrc(slug, width)} ${width}w`).join(', ');
export const gallerySrcset = (slug: string, index: number) => galleryWidths.map(width => `${gallerySrc(slug, index, width)} ${width}w`).join(', ');
