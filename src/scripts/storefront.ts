import { products, money } from '../data/products';

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
function say(message: string) {
  const toast = $('#toast')!;
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('is-visible');
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3200);
}
function persist() {
  try { localStorage.setItem(storageKey, JSON.stringify(items)); }
  catch { say('Your bag works here, but this browser cannot save it between visits.'); }
  render();
}
function makeItem(item: BagItem, editable: boolean) {
  const product = products.find(product => product.slug === item.slug)!;
  const row = document.createElement('div');
  row.className = 'bag-item';
  // All interpolated values below come from the authored catalogue or bounded integers.
  row.innerHTML = `<a class="bag-item-image" href="/objects/${product.slug}" aria-label="View object"><div class="product-crop ${product.position}"><img src="/Toy.png" width="1536" height="1024" alt=""/></div></a><div><h3><a href="/objects/${product.slug}"></a></h3><span class="bag-item-price">${money(product.price * item.quantity)}</span>${editable ? `<div class="bag-item-controls"><div class="bag-item-quantity"><button data-bag-step="-1" data-slug="${product.slug}" ${item.quantity <= 1 ? 'disabled' : ''} aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button data-bag-step="1" data-slug="${product.slug}" ${item.quantity >= 10 ? 'disabled' : ''} aria-label="Increase quantity">+</button></div><button class="bag-item-remove" data-remove="${product.slug}">Remove</button></div>` : `<div class="small muted">Qty ${item.quantity} · ${money(product.price)} each</div>`}</div>`;
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
  if ($('#checkout-items')) {
    $('#checkout-items')!.replaceChildren(...items.map(item => makeItem(item, false)));
    $('[data-checkout-total]')!.textContent = money(total);
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
    if (existing && existing.quantity >= 10) { say('Ten of a kind is our preview limit.'); return; }
    if (existing) existing.quantity = Math.min(10, existing.quantity + amount);
    else items.push({ slug: product.slug, quantity: amount });
    persist();
    say(`${product.name} is in your bag.`);
    if (add.hasAttribute('data-use-quantity')) bag.showModal();
  }
  const remove = target.closest<HTMLElement>('[data-remove]');
  if (remove) {
    const rows = [...document.querySelectorAll<HTMLElement>('[data-remove]')];
    const index = rows.indexOf(remove);
    items = items.filter(item => item.slug !== remove.dataset.remove);
    persist();
    (document.querySelectorAll<HTMLElement>('[data-remove]')[Math.min(index, items.length - 1)] || $('[data-close-bag]'))?.focus();
    say('Object removed from your bag.');
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
    const detail = view.dataset.view === 'detail';
    $('[data-gallery] .product-crop')?.classList.toggle('product-crop--detail', detail);
    $('[data-gallery-label]')!.textContent = detail ? 'A CLOSER LOOK / SAME CONCEPT' : 'THE WHOLE PERSONALITY';
    document.querySelectorAll('[data-view]').forEach(button => { button.classList.toggle('is-active', button === view); button.setAttribute('aria-pressed', String(button === view)); });
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
    $('#result-count')!.textContent = `${count} ${count === 1 ? 'object' : 'objects'}. ${count ? 'Plenty of character.' : 'Let’s try another search.'}`;
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
if (checkoutForm) {
  $<HTMLButtonElement>('#checkout-form button[type="submit"]')!.disabled = false;
  checkoutForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!items.length) { render(); return; }
    checkoutForm.reset();
    $('#gift-note-field')!.hidden = true;
    $<HTMLTextAreaElement>('[name="giftNote"]')!.disabled = true;
    $('#checkout-content')!.hidden = true;
    $('#checkout-empty')!.hidden = true;
    $('#checkout-success')!.hidden = false;
    $('#checkout-success')!.focus();
    $('#checkout-success')!.scrollIntoView({ behavior: 'auto', block: 'center' });
  });
}
render();
