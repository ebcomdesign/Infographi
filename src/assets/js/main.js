// ============================================================
// EBCOM Infographics Landing - Main Script
// ============================================================

// اسکرول نرم برای لینک‌های داخلی (لینک‌هایی که با # شروع می‌شن)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerOffset = 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// لاگ ساده برای اطمینان از لود شدن اسکریپت (اختیاری)
console.log('%c EBCOM Landing ✓ ', 'background:#99CC00; color:#1C1C1C; font-weight:900; padding:3px 8px; border-radius:6px;');