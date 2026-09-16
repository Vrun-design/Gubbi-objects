export type Product = {
  slug: string;
  number: string;
  name: string;
  short: string;
  story: string;
  colour: string;
  position: string;
  tags: string[];
  price: number;
  mood: string;
};

export const products: Product[] = [
  {
    slug: 'traffic-kumar', number: '01', name: 'Traffic Kumar', price: 1490, mood: 'For the permanently en route',
    short: 'Moves nowhere. Looks great here.',
    story: 'An auto, one tiny passenger, and enough optimism to take the flyover. Traffic Kumar is our tribute to Bengaluru’s most familiar waiting room: the road.',
    colour: 'Auto green', position: 'p-1', tags: ['Bengaluru', 'Desk object'],
  },
  {
    slug: 'doomscroll-buddy', number: '02', name: 'Doomscroll Buddy', price: 1290, mood: 'For the chronically online',
    short: 'Thumbs move. Life pauses.',
    story: 'A small wooden witness to the very long five minutes before bed. DoomScroll Buddy won’t improve your screen time, but he will judge it beautifully.',
    colour: 'Notification red', position: 'p-2', tags: ['Internet brain', 'Desk object'],
  },
  {
    slug: 'silk-board-forever-loop', number: '03', name: 'Silk Board Forever Loop', price: 2490, mood: 'For the scenic route to nowhere',
    short: 'Vehicles go round. So do our hopes.',
    story: 'A roundabout, a traffic jam and a promise that time is merely a suggestion. Turn it once for every meeting you joined from the cab.',
    colour: 'Signal green', position: 'p-3', tags: ['Bengaluru', 'Kinetic'],
  },
  {
    slug: 'workflow-spinner-2am', number: '04', name: 'Workflow Spinner 2AM', price: 1690, mood: 'For the “one last deployment” crowd',
    short: 'DevOps, but emotionally louder.',
    story: 'Sleep, debug, retry, blame webhook. For the nights when the incident channel becomes your entire personality. Spin responsibly; production is watching.',
    colour: 'Pager yellow', position: 'p-4', tags: ['Tech worker', 'Kinetic'],
  },
  {
    slug: 'copilot-confusion', number: '05', name: 'Copilot Confusion', price: 1990, mood: 'For your favourite pair programmer',
    short: 'Helpful. Hallucinates sometimes.',
    story: 'One confused engineer and one very confident machine. A small monument to modern collaboration, existential questions, and code that definitely worked in the demo.',
    colour: 'Assistant blue', position: 'p-5', tags: ['Tech worker', 'Two-piece'],
  },
  {
    slug: 'namma-metro-sprint', number: '06', name: 'Namma Metro Sprint', price: 1790, mood: 'For the almost-on-time friend',
    short: 'Doors close faster than your life decisions.',
    story: 'The chime has sounded. The backpack is bouncing. Dignity can wait for the next train. A tribute to every heroic last-second platform sprint.',
    colour: 'Metro purple', position: 'p-6', tags: ['Bengaluru', 'Desk object'],
  },
];

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
// Illustrative frontend prices. Replace with approved prices before launch.
export const money = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
