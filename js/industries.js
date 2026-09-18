/*
  NETJET INFOTECH
  Industries page — live filter + tab logic
*/

(function () {
  'use strict';

  const tabs = document.querySelectorAll('.filter-tab');
  const searchInput = document.querySelector('.filter-search');
  const items = document.querySelectorAll('.industry-item');

  if (!tabs.length && !searchInput) return;

  let activeCategory = 'all';
  let searchTerm = '';

  function applyFilter () {
    items.forEach(item => {
      const cat = item.dataset.category || '';
      const name = item.textContent.trim().toLowerCase();
      const catMatch = activeCategory === 'all' || cat === activeCategory;
      const searchMatch = searchTerm === '' || name.includes(searchTerm);
      item.classList.toggle('hidden', !(catMatch && searchMatch));
    });
  }

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      activeCategory = tab.dataset.category || 'all';
      applyFilter();
    });

    // Keyboard: arrow key navigation between tabs
    tab.addEventListener('keydown', e => {
      const tabArray = Array.from(tabs);
      const idx = tabArray.indexOf(tab);
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        tabArray[(idx + 1) % tabArray.length].focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        tabArray[(idx - 1 + tabArray.length) % tabArray.length].focus();
      }
    });
  });

  // Live search
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchTerm = searchInput.value.trim().toLowerCase();
      applyFilter();
    });
  }
})();
