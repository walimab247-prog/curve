/* Curve Learn — shared site scripts
   Handles: navbar menu toggle, FAQ accordion, smooth anchor scrolling,
   news filtering, contact form validation, cookie consent banner. */
(function () {
  'use strict';

  /* ---------- Navbar menu toggle ---------- */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    document.addEventListener('click', function (e) {
      if (!menu.classList.contains('open')) return;
      if (toggle.contains(e.target) || menu.contains(e.target)) return;
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ---------- FAQ accordion ---------- */
  function initFaq() {
    var items = document.querySelectorAll('.faq-item');
    items.forEach(function (item) {
      var header = item.querySelector('.faq-question');
      if (!header) return;
      header.addEventListener('click', function () {
        var open = item.getAttribute('data-open') === 'true';
        item.setAttribute('data-open', open ? 'false' : 'true');
        header.setAttribute('aria-expanded', open ? 'false' : 'true');
      });
      header.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          header.click();
        }
      });
    });
  }

  /* ---------- Smooth scrolling for same-page anchors ---------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href').slice(1);
        if (!id) return;
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (history.pushState) history.pushState(null, '', '#' + id);
      });
    });
  }

  /* ---------- News category filter ---------- */
  function initNewsFilter() {
    var buttons = document.querySelectorAll('.filter-btn');
    var cards = document.querySelectorAll('[data-category]');
    if (!buttons.length || !cards.length) return;
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var filter = btn.getAttribute('data-filter');
        cards.forEach(function (card) {
          var show = filter === 'all' || card.getAttribute('data-category') === filter;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---------- Contact form (client-side validation only) ---------- */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#cf-name');
      var email = form.querySelector('#cf-email');
      var message = form.querySelector('#cf-message');
      var status = document.getElementById('contact-status');
      var errors = [];
      if (!name.value.trim()) errors.push('Please enter your name.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) errors.push('Please enter a valid email address.');
      if (message.value.trim().length < 10) errors.push('Please enter a message of at least 10 characters.');
      if (errors.length) {
        status.textContent = errors.join(' ');
        status.style.color = 'var(--color-red-400, #f87171)';
        return;
      }
      form.reset();
      status.style.color = '';
      status.textContent = 'Thank you. Your message has been recorded locally. This demo form does not transmit data to a server — please email the editorial team directly for a guaranteed response.';
    });
  }

  /* ---------- Cookie consent banner ---------- */
  function initCookieBanner() {
    var banner = document.getElementById('cookie-banner');
    if (!banner) return;
    var accepted;
    try {
      accepted = window.localStorage.getItem('cl-cookie-consent');
    } catch (err) {
      accepted = null;
    }
    if (!accepted) banner.classList.add('visible');
    var btn = document.getElementById('cookie-accept');
    if (btn) {
      btn.addEventListener('click', function () {
        try { window.localStorage.setItem('cl-cookie-consent', 'accepted'); } catch (err) { /* storage unavailable */ }
        banner.classList.remove('visible');
      });
    }
  }

  function init() {
    initNav();
    initFaq();
    initSmoothScroll();
    initNewsFilter();
    initContactForm();
    initCookieBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
