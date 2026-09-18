/*
  NETJET INFOTECH — Navigation
  Mobile hamburger menu + sticky header + active page highlight
*/
(function () {
  'use strict';

  var nav    = document.querySelector('.site-nav');
  var toggle = document.querySelector('.nav-toggle');
  var menu   = document.querySelector('.nav-mobile');

  if (!nav || !toggle || !menu) return;

  /* ── Toggle open / closed ─────────────────────── */
  function isOpen() {
    return menu.classList.contains('is-open');
  }

  function openMenu() {
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    // Animate hamburger → X
    var bars = toggle.querySelectorAll('.nav-toggle-bar');
    if (bars[0]) bars[0].style.transform = 'translateY(7px) rotate(45deg)';
    if (bars[1]) bars[1].style.opacity   = '0';
    if (bars[2]) bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    // Reset hamburger bars
    var bars = toggle.querySelectorAll('.nav-toggle-bar');
    if (bars[0]) bars[0].style.transform = '';
    if (bars[1]) bars[1].style.opacity   = '';
    if (bars[2]) bars[2].style.transform = '';
  }

  /* ── Hamburger button click ───────────────────── */
  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    isOpen() ? closeMenu() : openMenu();
  });

  /* ── Close on any nav link tap ───────────────── */
  var links = menu.querySelectorAll('a');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', closeMenu);
  }

  /* ── Close on outside tap ────────────────────── */
  document.addEventListener('click', function (e) {
    if (isOpen() && !nav.contains(e.target)) closeMenu();
  });

  /* ── Close on Escape key ─────────────────────── */
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Escape' || e.key === 'Esc') && isOpen()) {
      closeMenu();
      toggle.focus();
    }
  });

  /* ── Sticky scroll behaviour ─────────────────── */
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ── Mark active page link ───────────────────── */
  var page = window.location.pathname.split('/').pop() || 'index.html';
  var allLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');
  for (var j = 0; j < allLinks.length; j++) {
    var href = allLinks[j].getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      allLinks[j].setAttribute('aria-current', 'page');
    }
  }

})();
