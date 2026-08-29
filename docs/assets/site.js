/* Hand-authored. Not generated: this file is not derived from the catalog.
   Classic script on purpose — a module would be CORS-fetched, which fails for
   anyone who opens these pages from a file:// URL after cloning.

   Every card is already in the HTML. This only ever hides and reorders what is
   there, so the page is complete and readable with scripting switched off. */

(function () {
  'use strict';

  document.documentElement.classList.add('js');

  // Copy buttons exist on both page kinds.
  wireCopyButtons();

  var dataEl = document.getElementById('skills-data');
  if (!dataEl) return; // a detail page: nothing else to do

  var skills;
  try {
    skills = JSON.parse(dataEl.textContent);
  } catch (e) {
    return; // leave the full, unfiltered list in place
  }

  var input = document.getElementById('q');
  var form = document.getElementById('search-form');
  var countEl = document.getElementById('result-count');
  var chipsEl = document.getElementById('active-filters');
  var emptyEl = document.getElementById('no-results');
  var clearBtn = document.getElementById('clear-filters');
  var sections = Array.prototype.slice.call(document.querySelectorAll('.cat'));
  var cards = Array.prototype.slice.call(document.querySelectorAll('.card'));

  var cardById = Object.create(null);
  cards.forEach(function (el) { cardById[el.getAttribute('data-id')] = el; });

  var activeTags = [];

  // ---- reading the controls ----

  function query() {
    return input ? input.value.trim() : '';
  }

  function checkedValues(key) {
    var boxes = document.querySelectorAll('.facet input[name="' + key + '"]:checked');
    return Array.prototype.map.call(boxes, function (b) { return b.value; })
      .filter(function (v) { return v !== ''; });
  }

  function category() {
    var c = checkedValues('category');
    return c.length ? c[0] : '';
  }

  // Checkbox groups, and the label shown for each value, are read from the
  // DOM rather than a second list here, so a new facet needs no script change.
  var CHECKBOX_KEYS = ['recommended', 'deps', 'license', 'origin', 'claude-ai'];

  function passesFacets(s) {
    var cat = category();
    if (cat && s.category !== cat) return false;

    var rec = checkedValues('recommended');
    if (rec.length && !s.recommended) return false;

    var deps = checkedValues('deps');
    if (deps.length && deps.indexOf(s.deps) === -1) return false;

    var lic = checkedValues('license');
    if (lic.length && lic.indexOf(s.license) === -1) return false;

    var origin = checkedValues('origin');
    if (origin.length && origin.indexOf(s.origin) === -1) return false;

    var claude = checkedValues('claude-ai');
    if (claude.length && !s.claudeAi) return false;

    for (var i = 0; i < activeTags.length; i++) {
      if (s.tags.indexOf(activeTags[i]) === -1) return false;
    }
    return true;
  }

  // ---- applying them ----

  function apply() {
    var q = query();
    var ranked = null;

    if (q && window.Ranking) {
      // The same weights the `npm run search` CLI uses.
      ranked = skills
        .map(function (s) { return { entry: s, score: window.Ranking.scoreEntry(q, s).score }; })
        .filter(function (r) { return r.score > 0; })
        .sort(window.Ranking.compareResults);
    }

    var visible = Object.create(null);
    var order = [];
    var n = 0;

    if (ranked) {
      ranked.forEach(function (r) {
        if (!passesFacets(r.entry)) return;
        visible[r.entry.id] = true;
        order.push(r.entry.id);
        n++;
      });
    } else {
      skills.forEach(function (s) {
        if (!passesFacets(s)) return;
        visible[s.id] = true;
        n++;
      });
    }

    cards.forEach(function (el) {
      el.hidden = !visible[el.getAttribute('data-id')];
    });

    if (ranked) {
      // One ranked list, best match first; every category section goes away
      // so nothing empty is left stacked under the results.
      reorder(order);
      sections.forEach(function (sec) { sec.hidden = true; });
    } else {
      restore();
      sections.forEach(function (sec) {
        sec.hidden = !sec.querySelector('.card:not([hidden])');
      });
    }

    countEl.textContent = n === skills.length
      ? skills.length + ' skills'
      : n + ' of ' + skills.length + (n === 1 ? ' skill' : ' skills');
    emptyEl.hidden = n !== 0;
    renderActiveFilters(q);
    writeUrl(q);
  }

  // Move matching cards into one list, best first. Cards are re-parented, so
  // their original section is restored when the query is cleared.
  var pool = document.createElement('ul');
  pool.className = 'cards';
  pool.id = 'ranked-results';
  var home = Object.create(null);
  cards.forEach(function (el) { home[el.getAttribute('data-id')] = el.parentNode; });

  function reorder(ids) {
    if (!pool.parentNode) emptyEl.insertAdjacentElement('afterend', pool);
    ids.forEach(function (id) { pool.appendChild(cardById[id]); });
    pool.hidden = ids.length === 0;
  }

  function restore() {
    if (!pool.parentNode) return;
    cards.forEach(function (el) {
      var id = el.getAttribute('data-id');
      if (el.parentNode === pool) home[id].appendChild(el);
    });
    pool.parentNode.removeChild(pool);
  }

  // ---- the active-filter row ----

  function facetLabel(inputEl) {
    var l = inputEl.parentNode.querySelector('.facet-label');
    return l ? l.textContent : inputEl.value;
  }

  function renderActiveFilters(q) {
    var chips = [];
    if (q) chips.push({ remove: 'q', text: '\u201C' + q + '\u201D' });

    var catBox = document.querySelector('.facet input[name="category"]:checked');
    if (catBox && catBox.value) chips.push({ remove: 'facet:category', text: facetLabel(catBox) });

    CHECKBOX_KEYS.forEach(function (key) {
      var boxes = document.querySelectorAll('.facet input[name="' + key + '"]:checked');
      Array.prototype.forEach.call(boxes, function (b) {
        chips.push({ remove: 'facet:' + key + '=' + b.value, text: facetLabel(b) });
      });
    });

    activeTags.forEach(function (t) {
      chips.push({ remove: 'tag:' + t, text: '#' + t });
    });

    while (chipsEl.firstChild) chipsEl.removeChild(chipsEl.firstChild);
    chips.forEach(function (c) {
      var li = document.createElement('li');
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'il chip';
      btn.setAttribute('data-remove', c.remove);
      btn.setAttribute('aria-label', 'Remove filter ' + c.text);
      var label = document.createElement('span');
      label.className = 'il-label';
      label.textContent = c.text;
      var icon = document.createElement('span');
      icon.className = 'il-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = '\u00D7';
      btn.appendChild(label);
      btn.appendChild(icon);
      li.appendChild(btn);
      chipsEl.appendChild(li);
    });
    chipsEl.hidden = chips.length === 0;
    if (clearBtn) clearBtn.hidden = chips.length === 0;
  }

  function removeFilter(spec) {
    if (spec === 'q') {
      if (input) input.value = '';
      return;
    }
    if (spec === 'facet:category') {
      var all = document.querySelector('.facet input[name="category"][value=""]');
      if (all) all.checked = true;
      return;
    }
    if (spec.indexOf('facet:') === 0) {
      var eq = spec.indexOf('=');
      var key = spec.slice(6, eq);
      var value = spec.slice(eq + 1);
      var box = document.querySelector('.facet input[name="' + cssEscape(key) + '"][value="' + cssEscape(value) + '"]');
      if (box) box.checked = false;
      return;
    }
    if (spec.indexOf('tag:') === 0) {
      setTag(spec.slice(4), false);
    }
  }

  function clearAll() {
    activeTags = [];
    document.querySelectorAll('.facet input[type=checkbox]').forEach(function (b) { b.checked = false; });
    var all = document.querySelector('.facet input[name="category"][value=""]');
    if (all) all.checked = true;
    document.querySelectorAll('.tag[aria-pressed]').forEach(function (el) { el.setAttribute('aria-pressed', 'false'); });
    if (input) input.value = '';
  }

  // ---- URL state ----

  // ?q=, ?category= and ?tag= make a search shareable. Reading is safe
  // everywhere; writing can throw on file://, so it is allowed to fail.
  function writeUrl(q) {
    try {
      var params = new URLSearchParams();
      if (q) params.set('q', q);
      var cat = category();
      if (cat) params.set('category', cat);
      activeTags.forEach(function (t) { params.append('tag', t); });
      var qs = params.toString();
      var next = window.location.pathname + (qs ? '?' + qs : '') + window.location.hash;
      if (next !== window.location.pathname + window.location.search + window.location.hash) {
        window.history.replaceState(null, '', next);
      }
    } catch (e) { /* no history support here: the page still works */ }
  }

  function readUrl() {
    try {
      var params = new URLSearchParams(window.location.search);
      var q0 = params.get('q');
      var c0 = params.get('category');
      var t0 = params.getAll('tag');
      if (q0 && input) input.value = q0;
      if (c0) {
        var box = document.querySelector('.facet input[name="category"][value="' + cssEscape(c0) + '"]');
        if (box) box.checked = true;
      }
      t0.forEach(function (t) { setTag(t, true); });
      return !!(q0 || c0 || t0.length);
    } catch (e) {
      return false;
    }
  }

  // ---- tags ----

  // Every tag is a filter, which is what keeps 140-odd tags usable without a
  // wall of checkboxes. Tags combine with AND: each added tag narrows.
  function setTag(tag, on) {
    var i = activeTags.indexOf(tag);
    if (on && i === -1) activeTags.push(tag);
    if (!on && i !== -1) activeTags.splice(i, 1);
    document.querySelectorAll('.tag[data-tag="' + cssEscape(tag) + '"]').forEach(function (el) {
      el.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function toggleTag(tag) {
    setTag(tag, activeTags.indexOf(tag) === -1);
    apply();
  }

  // ---- events ----

  if (form) {
    form.addEventListener('submit', function (e) { e.preventDefault(); apply(); });
  }
  if (input) {
    input.addEventListener('input', debounce(apply, 120));
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && input.value) {
        input.value = '';
        apply();
      }
    });
  }

  document.addEventListener('change', function (e) {
    if (e.target.matches('.facet input')) apply();
  });

  document.addEventListener('click', function (e) {
    var tag = e.target.closest('.tag[data-tag]');
    if (tag) {
      e.preventDefault();
      toggleTag(tag.getAttribute('data-tag'));
      return;
    }
    var chip = e.target.closest('[data-remove]');
    if (chip) {
      removeFilter(chip.getAttribute('data-remove'));
      apply();
      return;
    }
    if (e.target.closest('#clear-filters, [data-clear]')) {
      clearAll();
      apply();
      if (input) input.focus();
    }
  });

  // "/" or Cmd/Ctrl+K jumps to the search box from anywhere on the page.
  document.addEventListener('keydown', function (e) {
    if (!input) return;
    var inField = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement && document.activeElement.tagName);
    var isK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
    if (isK || (e.key === '/' && !inField && !e.metaKey && !e.ctrlKey && !e.altKey)) {
      e.preventDefault();
      input.focus();
      input.select();
    }
  });

  if (readUrl()) apply();

  // ---- helpers ----

  function wireCopyButtons() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.copy[data-copy]');
      if (!btn) return;
      copy(btn.getAttribute('data-copy'), btn);
    });
  }

  function copy(text, btn) {
    var label = btn.querySelector('.il-label') || btn;
    var done = function () {
      var was = label.textContent;
      label.textContent = 'Copied';
      setTimeout(function () { label.textContent = was; }, 1200);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(text, done); });
    } else {
      fallback(text, done);
    }
  }

  // Safari can refuse the async clipboard outside a secure context; the
  // command still works, and the text is selectable either way.
  function fallback(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { /* nothing to do */ }
    document.body.removeChild(ta);
  }

  function debounce(fn, ms) {
    var t;
    return function () {
      clearTimeout(t);
      t = setTimeout(fn, ms);
    };
  }

  function cssEscape(s) {
    return String(s).replace(/["\\]/g, '\\$&');
  }
}());
