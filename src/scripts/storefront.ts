import { products, money, heroSrc, gallerySrc, gallerySrcset } from '../data/products';
import { site } from '../data/site';

type BagItem = { slug: string; quantity: number };
const storageKey = 'the-gubbi-bag-v1';
const $ = <T extends Element = HTMLElement>(selector: string) => document.querySelector<T>(selector);
const quantity = (value: unknown) => Math.min(10, Math.max(1, Math.floor(Number(value)) || 1));
function readBag(): BagItem[] {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (!Array.isArray(data)) return [];
    const seen = new Set<string>();
    return data.filter(item => item && typeof item.slug === 'string' && products.some(product => product.slug === item.slug) && !seen.has(item.slug) && seen.add(item.slug)).map(item => ({ slug: item.slug, quantity: quantity(item.quantity) }));
  } catch { return []; }
}
let items = readBag();
let toastTimer: ReturnType<typeof setTimeout>;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
function say(message: string) {
  const toast = $('#toast')!;
  clearTimeout(toastTimer);
  toast.className = 'toast is-visible';
  toast.textContent = message;
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3200);
}
// A richer toast for additions: thumbnail, name and a way into the bag.
function celebrate(product: (typeof products)[number], count: number, from: HTMLElement) {
  const toast = $('#toast')!;
  clearTimeout(toastTimer);
  toast.className = 'toast toast--bag';
  toast.replaceChildren();
  const thumb = document.createElement('div');
  thumb.className = 'product-thumb';
  thumb.innerHTML = `<img src="${heroSrc(product.slug, 480)}" width="480" height="360" alt=""/>`;
  const copy = document.createElement('div');
  copy.className = 'toast-copy';
  const label = document.createElement('span');
  const lines = ['In the bag. Good decision.', 'Added. Your desk just got promoted.', 'Bagged. Faster than Silk Board.', 'In. Zero regrets, zero refactors.', 'Added. Works on your desk, guaranteed.'];
  label.textContent = count > 1 ? `×${count} in the bag. Big haul energy.` : lines[Math.floor(Math.random() * lines.length)];
  const name = document.createElement('strong');
  name.textContent = product.name;
  copy.append(label, name);
  const open = document.createElement('button');
  open.type = 'button';
  open.className = 'toast-open';
  open.setAttribute('data-open-bag', '');
  open.textContent = 'Show me';
  toast.append(thumb, copy, open);
  void toast.offsetWidth;
  toast.classList.add('is-visible');
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 4200);

  // The bag button acknowledges the arrival.
  const bagButton = $('[data-open-bag].bag-button');
  bagButton?.classList.remove('is-bumped');
  void bagButton?.offsetWidth;
  bagButton?.classList.add('is-bumped');
  from.classList.remove('is-added');
  void from.offsetWidth;
  from.classList.add('is-added');
  if (reducedMotion.matches) return;

  // A small burst of flowers from the pressed button.
  const rect = from.getBoundingClientRect();
  const burst = document.createElement('div');
  burst.className = 'petal-burst';
  burst.style.left = `${rect.left + rect.width / 2}px`;
  burst.style.top = `${rect.top + rect.height / 2}px`;
  const colours = ['var(--yellow)', 'var(--orange)', 'var(--blue)', 'var(--paper)', 'var(--green-leaf)'];
  for (let i = 0; i < 14; i++) {
    const petal = document.createElement('span');
    const angle = (Math.PI * 2 * i) / 14 + (Math.random() - .5) * .6;
    const distance = 70 + Math.random() * 90;
    petal.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
    petal.style.setProperty('--y', `${Math.sin(angle) * distance - 40}px`);
    petal.style.setProperty('--r', `${Math.random() * 540 - 270}deg`);
    petal.style.setProperty('--s', `${.5 + Math.random() * .7}`);
    petal.style.setProperty('--d', `${Math.random() * 120}ms`);
    petal.style.color = colours[i % colours.length];
    petal.innerHTML = '<svg viewBox="0 0 60 60" aria-hidden="true"><g fill="currentColor"><ellipse cx="30" cy="30" rx="11" ry="29"/><ellipse cx="30" cy="30" rx="11" ry="29" transform="rotate(60 30 30)"/><ellipse cx="30" cy="30" rx="11" ry="29" transform="rotate(120 30 30)"/></g><circle cx="30" cy="30" r="6" fill="var(--ink)"/></svg>';
    burst.append(petal);
  }
  document.body.append(burst);
  setTimeout(() => burst.remove(), 1400);
}
function persist() {
  try { localStorage.setItem(storageKey, JSON.stringify(items)); }
  catch { say('Bag works, but this browser has amnesia. It forgets between visits.'); }
  render();
}
function makeItem(item: BagItem, editable: boolean) {
  const product = products.find(product => product.slug === item.slug)!;
  const row = document.createElement('div');
  row.className = 'bag-item';
  // All interpolated values below come from the authored catalogue or bounded integers.
  row.innerHTML = `<a class="bag-item-image" href="/shop/${product.slug}" aria-label="View object"><div class="product-thumb"><img src="${heroSrc(product.slug, 480)}" width="480" height="360" alt=""/></div></a><div><h3><a href="/shop/${product.slug}"></a></h3><span class="bag-item-price">${money(product.price * item.quantity)}</span>${editable ? `<div class="bag-item-controls"><div class="bag-item-quantity"><button data-bag-step="-1" data-slug="${product.slug}" ${item.quantity <= 1 ? 'disabled' : ''} aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button data-bag-step="1" data-slug="${product.slug}" ${item.quantity >= 10 ? 'disabled' : ''} aria-label="Increase quantity">+</button></div><button class="bag-item-remove" data-remove="${product.slug}">Remove</button></div>` : `<div class="small muted">Qty ${item.quantity} · ${money(product.price)} each</div>`}</div>`;
  row.querySelector('h3 a')!.textContent = product.name;
  row.querySelector('.bag-item-image')!.setAttribute('aria-label', `View ${product.name}`);
  row.querySelectorAll('[data-bag-step]').forEach(button => button.setAttribute('aria-label', `${button.getAttribute('data-bag-step') === '1' ? 'Increase' : 'Decrease'} ${product.name} quantity`));
  row.querySelector('[data-remove]')?.setAttribute('aria-label', `Remove ${product.name}`);
  return row;
}
function render() {
  $('[data-bag-count]')!.textContent = String(items.reduce((sum, item) => sum + item.quantity, 0));
  $('#bag-items')!.replaceChildren(...items.map(item => makeItem(item, true)));
  $('#bag-empty')!.hidden = items.length > 0;
  $('#bag-summary')!.hidden = items.length === 0;
  const total = items.reduce((sum, item) => sum + products.find(product => product.slug === item.slug)!.price * item.quantity, 0);
  $('[data-bag-total]')!.textContent = money(total);
  const nudge = $('[data-bag-nudge]');
  if (nudge && total) nudge.textContent = total >= site.freeShippingOver ? 'Free shipping unlocked. You did that.' : `${money(site.freeShippingOver - total)} more and shipping is free. Just saying.`;
  if ($('#checkout-items')) {
    $('#checkout-items')!.replaceChildren(...items.map(item => makeItem(item, false)));
    const shipping = total >= site.freeShippingOver ? 0 : site.shippingFlat;
    $('[data-checkout-subtotal]')!.textContent = money(total);
    $('[data-checkout-shipping]')!.textContent = shipping ? money(shipping) : 'Free';
    $('[data-checkout-total]')!.textContent = money(total + shipping);
    if ($('#checkout-success')!.hidden) {
      $('#checkout-content')!.hidden = items.length === 0;
      $('#checkout-empty')!.hidden = items.length > 0;
    }
  }
}
const bag = $<HTMLDialogElement>('#bag')!;
const zoom = $<HTMLDialogElement>('#image-dialog');
const quantityInput = $<HTMLInputElement>('#product-quantity');
function syncQuantity() {
  if (!quantityInput) return;
  quantityInput.value = String(quantity(quantityInput.value));
  document.querySelectorAll<HTMLButtonElement>('[data-quantity-step]').forEach(button => {
    button.disabled = button.dataset.quantityStep === '-1' ? Number(quantityInput.value) <= 1 : Number(quantityInput.value) >= 10;
  });
}
quantityInput?.addEventListener('change', syncQuantity);
syncQuantity();
const menuButton = $<HTMLButtonElement>('[data-menu]');
function closeMenu() { $('#mobile-nav')!.hidden = true; menuButton?.setAttribute('aria-expanded', 'false'); menuButton?.setAttribute('aria-label', 'Open navigation'); }
document.addEventListener('click', event => {
  if (!(event.target instanceof Element)) return;
  const target = event.target;
  if (target.closest('[data-open-bag]')) { closeMenu(); render(); if (!bag.open) bag.showModal(); }
  if (target.closest('[data-close-bag]')) bag.close();
  const add = target.closest<HTMLElement>('[data-add]');
  if (add) {
    const product = products.find(product => product.slug === add.dataset.add);
    if (!product) return;
    const amount = add.hasAttribute('data-use-quantity') ? quantity(quantityInput?.value) : 1;
    const existing = items.find(item => item.slug === product.slug);
    if (existing && existing.quantity >= 10) { say('Ten per character, boss. Ten. Write to us for wholesale-level feelings.'); return; }
    if (existing) existing.quantity = Math.min(10, existing.quantity + amount);
    else items.push({ slug: product.slug, quantity: amount });
    persist();
    celebrate(product, items.find(item => item.slug === product.slug)!.quantity, add);
  }
  const remove = target.closest<HTMLElement>('[data-remove]');
  if (remove) {
    const rows = [...document.querySelectorAll<HTMLElement>('[data-remove]')];
    const index = rows.indexOf(remove);
    items = items.filter(item => item.slug !== remove.dataset.remove);
    persist();
    (document.querySelectorAll<HTMLElement>('[data-remove]')[Math.min(index, items.length - 1)] || $('[data-close-bag]'))?.focus();
    say('Removed. It will remember this.');
  }
  const step = target.closest<HTMLElement>('[data-bag-step]');
  if (step) {
    const item = items.find(item => item.slug === step.dataset.slug);
    if (item) {
      item.quantity = quantity(item.quantity + Number(step.dataset.bagStep));
      const slug = item.slug;
      const direction = step.dataset.bagStep;
      persist();
      const buttons = [...document.querySelectorAll<HTMLButtonElement>(`[data-slug="${slug}"][data-bag-step]`)];
      (buttons.find(button => button.dataset.bagStep === direction && !button.disabled) || buttons.find(button => !button.disabled))?.focus();
    }
  }
  const quantityStep = target.closest<HTMLElement>('[data-quantity-step]');
  if (quantityStep && quantityInput) { quantityInput.value = String(quantity(Number(quantityInput.value) + Number(quantityStep.dataset.quantityStep))); syncQuantity(); }
  if (target.closest('[data-menu]')) { const expanded = menuButton!.getAttribute('aria-expanded') === 'true'; menuButton!.setAttribute('aria-expanded', String(!expanded)); menuButton!.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation'); $('#mobile-nav')!.hidden = expanded; }
  else if (!target.closest('.site-header')) closeMenu();
  const view = target.closest<HTMLElement>('[data-view]');
  if (view) {
    const index = Number(view.dataset.view);
    const slug = location.pathname.split('/').pop()!;
    const caption = view.getAttribute('aria-label')!.replace(/^View \d+: /, '');
    const tabs = document.querySelectorAll('[data-view]');
    for (const image of [$<HTMLImageElement>('[data-gallery] img'), zoom?.querySelector('img')]) {
      if (!image) continue;
      image.src = gallerySrc(slug, index);
      image.srcset = gallerySrcset(slug, index);
      image.alt = image.alt.replace(/\..*$/, `. ${caption}`);
    }
    const zoomCaption = $('[data-zoom-caption]');
    if (zoomCaption) zoomCaption.textContent = zoomCaption.textContent!.replace(/ · .* · /, ` · ${caption} · `);
    tabs.forEach(button => { button.classList.toggle('is-active', button === view); button.setAttribute('aria-pressed', String(button === view)); });
  }
  if (target.closest('[data-zoom]')) zoom?.showModal();
  if (target.closest('[data-close-zoom]')) zoom?.close();
});
[bag, zoom].forEach(dialog => dialog?.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
}));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); } });
matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
window.addEventListener('storage', event => { if (event.key === storageKey || event.key === null) { items = readBag(); render(); } });

const search = $<HTMLInputElement>('#product-search');
const sort = $<HTMLSelectElement>('#product-sort');
if (search && sort) {
  let category = new URLSearchParams(location.search).get('category') || 'all';
  const filters = [...document.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  if (!filters.some(button => button.dataset.filter === category)) category = 'all';
  const cards = [...document.querySelectorAll<HTMLElement>('[data-product-tags]')];
  function filterProducts() {
    filters.forEach(button => { const active = button.dataset.filter === category; button.classList.toggle('is-active', active); button.setAttribute('aria-pressed', String(active)); });
    let count = 0;
    const term = search!.value.trim().toLowerCase();
    cards.forEach(card => { card.hidden = !(category === 'all' || card.dataset.productTags!.split(',').includes(category)) || !card.dataset.search!.includes(term); if (!card.hidden) count++; });
    $('#result-count')!.textContent = `${count} ${count === 1 ? 'character' : 'characters'}. ${count ? 'Plenty of personality.' : 'Let’s try another search.'}`;
    $('#search-empty')!.hidden = count > 0;
  }
  filters.forEach(button => button.addEventListener('click', () => { category = button.dataset.filter!; const url = new URL(location.href); if (category === 'all') url.searchParams.delete('category'); else url.searchParams.set('category', category); history.replaceState(null, '', url); filterProducts(); }));
  search.addEventListener('input', filterProducts);
  sort.addEventListener('change', () => {
    cards.sort((a, b) => sort.value === 'low' ? Number(a.dataset.price) - Number(b.dataset.price) : sort.value === 'high' ? Number(b.dataset.price) - Number(a.dataset.price) : sort.value === 'name' ? a.dataset.name!.localeCompare(b.dataset.name!) : Number(a.dataset.order) - Number(b.dataset.order));
    $('#shop-grid')!.append(...cards);
  });
  $('[data-reset-search]')?.addEventListener('click', () => { search.value = ''; filters[0].click(); search.focus(); });
  filterProducts();
  if (location.hash === '#search') search.focus();
}
const giftToggle = $<HTMLInputElement>('#gift-toggle');
giftToggle?.addEventListener('change', () => { $('#gift-note-field')!.hidden = !giftToggle.checked; $<HTMLTextAreaElement>('[name="giftNote"]')!.disabled = !giftToggle.checked; });
const checkoutForm = $<HTMLFormElement>('#checkout-form');
// Order submission. The storefront is static; this is the single seam where
// the order API and payment gateway plug in. Until then the form validates,
// hands over the payload and shows the confirmation state.
async function placeOrder(payload: { customer: Record<string, string>; items: BagItem[] }) {
  // TODO(backend): POST payload to the order endpoint, then redirect to the
  // payment gateway's hosted page. Resolve on success, throw on failure.
  void payload;
}
if (checkoutForm) {
  const error = $('#checkout-error')!;
  const submit = $<HTMLButtonElement>('#checkout-form button[type="submit"]')!;
  checkoutForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (!items.length) { render(); return; }
    error.hidden = true;
    if (!checkoutForm.checkValidity()) { checkoutForm.reportValidity(); return; }
    const customer = Object.fromEntries(new FormData(checkoutForm).entries()) as Record<string, string>;
    submit.disabled = true;
    submit.textContent = 'Wrapping it up…';
    try {
      await placeOrder({ customer, items });
      items = [];
      persist();
      checkoutForm.reset();
      $('#gift-note-field')!.hidden = true;
      $<HTMLTextAreaElement>('[name="giftNote"]')!.disabled = true;
      $('#checkout-content')!.hidden = true;
      $('#checkout-empty')!.hidden = true;
      $('#checkout-success')!.hidden = false;
      $('#checkout-success')!.focus();
      $('#checkout-success')!.scrollIntoView({ behavior: 'auto', block: 'center' });
    } catch {
      error.textContent = 'That didn’t go through. Nothing charged, nothing lost. Try again, or write to ' + site.email + '.';
      error.hidden = false;
      submit.disabled = false;
      submit.innerHTML = 'Pay and make it official';
    }
  });
}
render();
