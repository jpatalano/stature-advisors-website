// Theme toggle
(function () {
  const html = document.documentElement;
  const stored = null; // no localStorage in sandboxed iframes
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let theme = prefersDark ? 'dark' : 'light';
  html.setAttribute('data-theme', theme);

  function updateToggle(btn) {
    if (!btn) return;
    btn.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
    btn.innerHTML = theme === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('[data-theme-toggle]');
    updateToggle(btn);
    if (btn) {
      btn.addEventListener('click', () => {
        theme = theme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', theme);
        updateToggle(btn);
      });
    }

    // Scroll-aware nav
    const nav = document.querySelector('.nav');
    if (nav) {
      window.addEventListener('scroll', () => {
        nav.classList.toggle('nav--scrolled', window.scrollY > 20);
      }, { passive: true });
    }

    // Mobile menu
    const toggle = document.querySelector('.nav__mobile-toggle');
    const menu = document.querySelector('.nav__mobile-menu');
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        const open = menu.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open);
      });
      menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => menu.classList.remove('is-open'));
      });
    }

    // Cookie banner
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');
    if (banner) {
      // Show banner after short delay
      setTimeout(() => { banner.removeAttribute('hidden'); }, 800);
    }
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => { banner.setAttribute('hidden', ''); });
    }
    if (declineBtn) {
      declineBtn.addEventListener('click', () => { banner.setAttribute('hidden', ''); });
    }
  });
})();
