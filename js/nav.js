/*
  NETJET INFOTECH
  Navigation — sticky header, mobile hamburger toggle, active page highlight
*/

(function () {
  'use strict';

  const nav     = document.querySelector('.site-nav');
  const toggle  = document.querySelector('.nav-toggle');
  const mobile  = document.querySelector('.nav-mobile');

  if (!nav) return;

  /* ── Sticky: hide on scroll down, show on scroll up ─────────── */
  let lastY = 0;
  window.addEventListener('scroll', function () {
    const y = window.pageYOffset;
    if (y > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastY = y;
  }, { passive: true });

  /* ── Mobile hamburger ──────────────────────────────────────────
     CSS class is: .nav-mobile.is-open
     This JS adds / removes .is-open to match exactly.           */
  function openMenu() {
    mobile.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    mobile.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent scroll behind menu
    animateBars(true);
  }

  function closeMenu() {
    mobile.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    mobile.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    animateBars(false);
  }

  function animateBars(open) {
    const bars = toggle.querySelectorAll('.nav-toggle-bar');
    if (!bars.length) return;
    if (open) {
      bars[0].style.transform = 'translateY(7px) rotate(45deg)';
      bars[1].style.opacity   = '0';
      bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      bars[0].style.transform = '';
      bars[1].style.opacity   = '';
      bars[2].style.transform = '';
    }
  }

  if (toggle && mobile) {
    /* Click / tap on hamburger */
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (mobile.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    /* Close when a nav link is tapped */
    mobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });

    /* Close when tapping outside the nav */
    document.addEventListener('click', function (e) {
      if (mobile.classList.contains('is-open') && !nav.contains(e.target)) {
        closeMenu();
      }
    });

    /* Close on Escape key */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobile.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* ── Active page link highlight ────────────────────────────── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(function (a) {
    const href = a.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      a.setAttribute('aria-current', 'page');
    }
  });

})();
