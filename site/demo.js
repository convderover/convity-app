// Convity website: discreet reveal on scroll, and a static simulation of one function before and after a change.
// The simulation uses fixed, hand-written data. It is not the Convity engine and it never analyzes anything.
'use strict';
document.documentElement.classList.add('js');

// No animation starts by itself. The same button stops it, also with reduced motion.
const animation=document.getElementById('comparison-animation'),toggle=document.getElementById('animation-toggle');
toggle?.addEventListener('click',()=>{const play=toggle.getAttribute('aria-pressed')!=='true';
  animation.src=play?'assets/demo/before-after.gif':'assets/screenshots/en/explained-1440.png';
  toggle.setAttribute('aria-pressed',String(play));toggle.textContent=play?'Pause animation':'Play short animation';});

(() => {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -8% 0px' });
  items.forEach(el => io.observe(el));
})();

(() => {
  const svg = document.getElementById('sim-svg');
  if (!svg) return;
  const NS = 'http://www.w3.org/2000/svg';
  const versions = {
    before: {
      code: ['export function total(items: number[], discount: boolean) {', '  let sum = 0;', '  for (const price of items) sum += price;',
        '  if (discount) return sum * 0.9;', '  return sum;', '}'],
      added: [],
      explain: 'Before: it adds up every price. If discount is true, it returns 90% of the sum; otherwise, the sum.',
      nodes: {
        entry: { x: 170, y: 30, text: 'Entry', kind: 'entry', line: 1, say: 'The function starts. It receives items and discount.' },
        init: { x: 170, y: 92, text: 'let sum = 0', kind: 'step', line: 2, say: 'Sets sum to 0.' },
        loop: { x: 170, y: 156, text: 'for price of items', kind: 'decision', line: 3, say: 'Is there another price in items? Choose a path.' },
        add: { x: 85, y: 232, text: 'sum += price', kind: 'step', line: 3, say: 'Adds price to sum and goes back to the loop.' },
        disc: { x: 255, y: 232, text: 'if (discount)', kind: 'decision', line: 4, say: 'Is discount true? Choose a path.' },
        ret1: { x: 215, y: 316, text: 'sum × 0.9', kind: 'end', w: 80, line: 4, say: 'Returns sum × 0.9. The function ends.' },
        ret2: { x: 300, y: 316, text: 'sum', kind: 'end', w: 76, line: 5, say: 'Returns sum. The function ends.' }
      },
      edges: [['entry', 'init'], ['init', 'loop'], ['loop', 'add', 'each price'], ['loop', 'disc', 'done'], ['add', 'loop', '', true],
        ['disc', 'ret1', 'yes'], ['disc', 'ret2', 'no']]
    },
    after: {
      code: ['export function total(items: number[], discount: boolean) {', '  let sum = 0;', '  for (const price of items) {',
        "    if (price < 0) throw new Error('Negative price');", '    else sum += price;', '  }', '  if (discount) return sum * 0.9;', '  return sum;', '}'],
      added: [4, 5],
      explain: 'What changed: a new check. If a price is less than 0, it raises an error; otherwise, it adds it to sum. The graph gains one decision and one way to end (dashed).',
      nodes: {
        entry: { x: 170, y: 30, text: 'Entry', kind: 'entry', line: 1, say: 'The function starts. It receives items and discount.' },
        init: { x: 170, y: 92, text: 'let sum = 0', kind: 'step', line: 2, say: 'Sets sum to 0.' },
        loop: { x: 170, y: 156, text: 'for price of items', kind: 'decision', line: 3, say: 'Is there another price in items? Choose a path.' },
        check: { x: 85, y: 232, text: 'if (price < 0)', kind: 'decision', line: 4, isNew: true, say: 'New: is price less than 0? Convity does not evaluate it — both paths are possible.' },
        fail: { x: 64, y: 316, text: 'throw Error', kind: 'end', w: 92, line: 4, isNew: true, say: "Raises the error 'Negative price'. The function stops here." },
        add: { x: 168, y: 316, text: 'sum += price', kind: 'step', w: 100, line: 5, say: 'Adds price to sum and goes back to the loop.' },
        disc: { x: 255, y: 232, text: 'if (discount)', kind: 'decision', line: 7, say: 'Is discount true? Choose a path.' },
        ret1: { x: 215, y: 400, text: 'sum × 0.9', kind: 'end', w: 80, line: 7, say: 'Returns sum × 0.9. The function ends.' },
        ret2: { x: 300, y: 400, text: 'sum', kind: 'end', w: 76, line: 8, say: 'Returns sum. The function ends.' }
      },
      edges: [['entry', 'init'], ['init', 'loop'], ['loop', 'check', 'each price'], ['loop', 'disc', 'done'], ['check', 'fail', 'yes'],
        ['check', 'add', 'no'], ['add', 'loop', '', true], ['disc', 'ret1', 'yes'], ['disc', 'ret2', 'no']]
    }
  };
  const $ = id => document.getElementById(id);
  let version = 'after', current = 'entry', walked = [], visited = new Set(['entry']);

  const el = (tag, attrs = {}, text) => {
    const e = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    if (text !== undefined) e.textContent = text;
    return e;
  };
  const size = n => ({ w: n.w || 128, h: 34 });

  function drawGraph() {
    const v = versions[version];
    [...svg.querySelectorAll('.layer')].forEach(n => n.remove());
    svg.setAttribute('viewBox', version === 'after' ? '0 0 346 428' : '0 0 346 350');
    const edges = el('g', { class: 'layer' });
    v.edges.forEach(([from, to, label, back], i) => {
      const a = v.nodes[from], b = v.nodes[to], sa = size(a), sb = size(b);
      let d;
      if (back) {
        // Vuelta al bucle por un carril libre a la izquierda: baja, va al margen, sube y entra por el lado.
        const y0 = a.y + sa.h / 2;
        d = `M${a.x} ${y0} V${y0 + 16} H6 V${b.y} H${b.x - sb.w / 2}`;
      } else {
        const y0 = a.y + sa.h / 2, y1 = b.y - sb.h / 2, mid = (y0 + y1) / 2;
        d = `M${a.x} ${y0} C${a.x} ${mid} ${b.x} ${mid} ${b.x} ${y1}`;
      }
      const isWalked = walked.includes(i);
      edges.append(el('path', { d, class: 'edge' + (isWalked ? ' walked' : ''), 'marker-end': 'url(#sim-arrow)' }));
      if (label) {
        // Junto a la salida de la decisión, donde no hay otros nodos.
        const lx = a.x + (b.x - a.x) * 0.3 + (b.x < a.x ? -6 : 6), ly = a.y + sa.h / 2 + 14;
        edges.append(el('text', { x: lx, y: ly, class: 'label', 'text-anchor': b.x < a.x ? 'end' : 'start' }, label));
      }
    });
    const nodes = el('g', { class: 'layer' });
    for (const [id, n] of Object.entries(v.nodes)) {
      const { w, h } = size(n);
      const g = el('g', { class: 'node' + (n.isNew ? ' new' : '') + (visited.has(id) ? ' visited' : '') + (id === current ? ' current' : '') });
      if (n.kind === 'decision') {
        const x0 = n.x - w / 2, x1 = n.x + w / 2, y0 = n.y - h / 2, y1 = n.y + h / 2;
        g.append(el('polygon', { points: `${x0 + 10},${y0} ${x1 - 10},${y0} ${x1},${n.y} ${x1 - 10},${y1} ${x0 + 10},${y1} ${x0},${n.y}` }));
      } else {
        g.append(el('rect', { x: n.x - w / 2, y: n.y - h / 2, width: w, height: h, rx: n.kind === 'entry' ? 17 : n.kind === 'end' ? 12 : 6 }));
      }
      g.append(el('text', { x: n.x, y: n.y + 4, 'text-anchor': 'middle' }, n.text));
      nodes.append(g);
    }
    svg.append(edges, nodes);
  }

  function drawCode() {
    const v = versions[version], node = v.nodes[current], code = $('sim-code');
    code.replaceChildren(...v.code.map((line, i) => {
      const span = document.createElement('span');
      span.className = 'ln' + (v.added.includes(i + 1) ? ' added' : '') + (node.line === i + 1 ? ' current' : '');
      span.dataset.n = String(i + 1);
      span.textContent = line;
      return span;
    }));
  }

  function outgoing() { return versions[version].edges.map((e, i) => ({ from: e[0], to: e[1], label: e[2], i })).filter(e => e.from === current); }

  function go(edge) {
    walked.push(edge.i); current = edge.to; visited.add(current); render();
  }

  function render() {
    const v = versions[version], node = v.nodes[current], out = outgoing();
    drawGraph(); drawCode();
    $('sim-step').textContent = node.say;
    $('sim-explain').textContent = v.explain;
    const choices = $('sim-choices');
    choices.replaceChildren(...(out.length > 1 ? out.map(e => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = e.label.charAt(0).toUpperCase() + e.label.slice(1);
      b.addEventListener('click', () => go(e));
      return b;
    }) : []));
    $('sim-next').disabled = out.length !== 1;
  }

  function reset() { current = 'entry'; walked = []; visited = new Set(['entry']); render(); }

  // Flecha de las aristas.
  const defs = el('defs'), marker = el('marker', { id: 'sim-arrow', viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' });
  marker.append(el('path', { d: 'M0 0 L10 5 L0 10 z', fill: 'currentColor', class: 'arrow' }));
  defs.append(marker); svg.append(defs);

  $('sim-next').addEventListener('click', () => { const out = outgoing(); if (out.length === 1) go(out[0]); });
  $('sim-restart').addEventListener('click', reset);
  for (const b of document.querySelectorAll('.sim-tabs button')) {
    b.addEventListener('click', () => {
      version = b.dataset.version;
      for (const o of document.querySelectorAll('.sim-tabs button')) o.setAttribute('aria-pressed', String(o === b));
      reset();
    });
  }
  reset();
})();
