// Cursor companion, ported from Gubbi Art Club: a drop of paint that trails
// the pointer, stretches with speed, and names what it is over. The native
// cursor stays. Fine pointers with motion allowed only.
if (matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches) {
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  dot.setAttribute('aria-hidden', 'true');
  document.body.append(dot);

  const labels: [string, string | null][] = [
    ['[data-cursor]', null],
    ['.product-card__image', 'Meet'],
    ['.quick-add', 'Bag'],
    ['.club-gift', 'Gift'],
    ['.club-invitation', 'Visit'],
    ['.gallery-tab', 'Look'],
  ];
  let tx = 0, ty = 0, x = 0, y = 0, vx = 0, vy = 0, raf = 0;
  const body = document.body;

  const frame = () => {
    const nx = x + (tx - x) * .18, ny = y + (ty - y) * .18;
    vx = nx - x; vy = ny - y; x = nx; y = ny;
    const speed = Math.min(Math.hypot(vx, vy), 40), angle = Math.atan2(vy, vx) * 180 / Math.PI;
    dot.style.transform = `translate(${x}px,${y}px) rotate(${angle}deg) scale(${1 + speed / 45},${1 - speed / 110}) rotate(${-angle}deg)`;
    raf = Math.abs(tx - x) + Math.abs(ty - y) > .1 ? requestAnimationFrame(frame) : 0;
  };

  document.addEventListener('pointermove', event => {
    tx = event.clientX + 12; ty = event.clientY + 12;
    if (!body.classList.contains('pointer-active')) { x = tx; y = ty; body.classList.add('pointer-active'); }
    if (!raf) raf = requestAnimationFrame(frame);
    const target = event.target as HTMLElement;
    let label = '';
    for (const [selector, text] of labels) {
      const hit = target.closest<HTMLElement>(selector);
      if (hit) { label = text ?? hit.dataset.cursor ?? ''; break; }
    }
    dot.textContent = label;
    body.classList.toggle('pointer-label', !!label);
    body.classList.toggle('pointer-hover', !label && !!target.closest('button,a,summary,label'));
    body.classList.toggle('pointer-ink', !!target.closest('.button,.announcement,.bag-button,.filter.is-active,.club-footer,.club-chat-head'));
  }, { passive: true });
  document.addEventListener('pointerout', event => { if (!event.relatedTarget) body.classList.remove('pointer-active'); });
  document.addEventListener('pointerdown', () => body.classList.add('pointer-down'));
  document.addEventListener('pointerup', () => body.classList.remove('pointer-down'));
}
