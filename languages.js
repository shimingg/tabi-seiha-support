const menu = document.querySelector('.languages');
if (menu) {
  const input = menu.querySelector('input[type="search"]');
  const entries = Array.from(menu.querySelectorAll('a[hreflang]'));
  const normalize = value => value.normalize('NFKD').toLowerCase().replace(/\p{M}/gu, '');
  const names = entries.map(entry => normalize([entry.textContent, entry.dataset.name, entry.hreflang].join(' ')));
  input.hidden = false;
  input.addEventListener('input', () => {
    const term = normalize(input.value.trim());
    entries.forEach((entry, i) => { entry.hidden = !names[i].includes(term); });
  });
  menu.addEventListener('toggle', () => {
    if (!menu.open) {
      input.value = '';
      entries.forEach(entry => { entry.hidden = false; });
      menu.querySelector('.language-list').scrollTop = 0;
    }
  });
  menu.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
}
