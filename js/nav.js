/*
  NETJET INFOTECH
  Navigation — sticky scroll, mobile hamburger, active page highlighting
*/

(function () {
  'use strict';

  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.nav-mobile');

  if (!nav) return;

  // Sticky scroll behaviour
  let lastScroll = 0;
  const handleScroll = () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Mobile hamburger
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileNav.setAttribute('aria-hidden', isOpen ? 'false' : 'true');

      // Animate bars
      const bars = toggle.querySelectorAll('.nav-toggle-bar');
      if (isOpen) {
        bars[0].style.transform = 'translateY(6px) rotate(45deg)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'translateY(-6px) rotate(-45deg)';
      } else {
        bars[0].style.transform = '';
        bars[1].style.opacity = '';
        bars[2].style.transform = '';
      }
    });
  }

  // Mark active page link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-links a, .nav-mobile a');
  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  // Close mobile nav on link click
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
        const bars = toggle ? toggle.querySelectorAll('.nav-toggle-bar') : [];
        bars[0] && (bars[0].style.transform = '');
        bars[1] && (bars[1].style.opacity = '');
        bars[2] && (bars[2].style.transform = '');
      });
    });
  }
})();
