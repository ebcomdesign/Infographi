import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';

export default function Ziira() {
  const containerRef = useRef(null);

  useEffect(() => {
    // پیاده‌سازی انیمیشن هرم معماری ۴ سطحی
    const archTiers = [
      { id: 1, startX: 218, endX: 76, tierClass: "tier-1", rectId: "clip-rect-1" },
      { id: 2, startX: 178, endX: 76, tierClass: "tier-2", rectId: "clip-rect-2" },
      { id: 3, startX: 138, endX: 76, tierClass: "tier-3", rectId: "clip-rect-3" },
      { id: 4, startX: 98, endX: 76, tierClass: "tier-4", rectId: "clip-rect-4" }
    ];

    let archAnimationRunning = false;

    function animateLeaderLine(rectId, startX, endX, duration, onComplete) {
      const rectEl = document.getElementById(rectId);
      if (!rectEl) return;
      const startTime = performance.now();
      const distance = startX - endX;

      function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const curX = startX - distance * ease;
        const curWidth = startX - curX;
        rectEl.setAttribute("x", curX);
        rectEl.setAttribute("width", curWidth);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else if (onComplete) {
          onComplete();
        }
      }
      requestAnimationFrame(step);
    }

    function resetArchElements() {
      archTiers.forEach(t => {
        const drop = document.getElementById(`drop-tier-${t.id}`);
        if (drop) {
          drop.classList.remove('drop-active');
          drop.style.opacity = '0';
        }
        const cylinder = document.getElementById(`pyr-tier-${t.id}`);
        if (cylinder) cylinder.classList.remove('tier-expanded');

        const dot = document.getElementById(`dot-tier-${t.id}`);
        if (dot) dot.classList.remove('dot-visible');

        const rect = document.getElementById(t.rectId);
        if (rect) {
          rect.setAttribute("x", t.startX);
          rect.setAttribute("width", "0");
        }

        const badge = document.getElementById(`badge-tier-${t.id}`);
        if (badge) badge.classList.remove('badge-visible');

        const card = document.querySelector(`.arch-capsule-card.${t.tierClass}`);
        if (card) card.classList.remove('card-visible', 'card-active-glow');
      });
    }

    function animateSingleTier(tierObj, onTierFinished) {
      const dropEl = document.getElementById(`drop-tier-${tierObj.id}`);
      const cylEl = document.getElementById(`pyr-tier-${tierObj.id}`);
      const dotEl = document.getElementById(`dot-tier-${tierObj.id}`);
      const badgeEl = document.getElementById(`badge-tier-${tierObj.id}`);
      const cardEl = document.querySelector(`.arch-capsule-card.${tierObj.tierClass}`);

      if (dropEl) dropEl.classList.add('drop-active');

      setTimeout(() => {
        if (cylEl) cylEl.classList.add('tier-expanded');
      }, 180);

      setTimeout(() => {
        if (dropEl) dropEl.style.opacity = '0';
        if (dotEl) dotEl.classList.add('dot-visible');

        animateLeaderLine(tierObj.rectId, tierObj.startX, tierObj.endX, 360, () => {
          const isMobile = window.innerWidth <= 768;
          if (badgeEl) badgeEl.classList.add('badge-visible');

          if (!isMobile) {
            if (cardEl) {
              cardEl.classList.add('card-visible', 'card-active-glow');
              setTimeout(() => cardEl.classList.remove('card-active-glow'), 800);
            }
            if (onTierFinished) setTimeout(onTierFinished, 240);
          } else {
            setTimeout(() => {
              if (cardEl) {
                cardEl.classList.add('card-visible', 'card-active-glow');
                setTimeout(() => cardEl.classList.remove('card-active-glow'), 900);
              }
              if (onTierFinished) setTimeout(onTierFinished, 450);
            }, 380);
          }
        });
      }, 550);
    }

    function playArchAnimation() {
      if (archAnimationRunning) return;
      archAnimationRunning = true;
      resetArchElements();

      let currentIdx = 0;
      function next() {
        if (currentIdx < archTiers.length) {
          const t = archTiers[currentIdx++];
          animateSingleTier(t, next);
        } else {
          archAnimationRunning = false;
        }
      }
      setTimeout(next, 100);
    }

    // پیاده‌سازی انیمیشن گیج‌ها
    const gaugeData = [
      { selector: '.gauge-cyan', targetOffset: 75, delay: 0 },
      { selector: '.gauge-green', targetOffset: 95, delay: 160 },
      { selector: '.gauge-purple', targetOffset: 60, delay: 320 },
      { selector: '.gauge-orange', targetOffset: 110, delay: 480 }
    ];

    let gaugeAnimationRunning = false;
    function playGaugeAnimation() {
      if (gaugeAnimationRunning) return;
      gaugeAnimationRunning = true;

      gaugeData.forEach(g => {
        setTimeout(() => {
          const card = document.querySelector(g.selector);
          if (card) {
            card.classList.add('gauge-visible');
            const circle = card.querySelector('.gauge-fill-circle');
            if (circle) circle.style.strokeDashoffset = g.targetOffset;
          }
        }, g.delay + 100);
      });

      setTimeout(() => {
        gaugeAnimationRunning = false;
      }, 1800);
    }

    // مشاهده‌گرهای تقاطع (Intersection Observers)
    const revealBoxes = document.querySelectorAll('.reveal-box');
    const boxObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('box-revealed');
          boxObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealBoxes.forEach(b => boxObserver.observe(b));

    const archBox = document.querySelector('.arch-redesign-box');
    let archObs;
    if (archBox) {
      archObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            playArchAnimation();
            archObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      archObs.observe(archBox);
    }

    const gaugeSection = document.querySelector('.gauge-section');
    let gaugeObs;
    if (gaugeSection) {
      gaugeObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            playGaugeAnimation();
            gaugeObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      gaugeObs.observe(gaugeSection);
    }

    return () => {
      boxObserver.disconnect();
      if (archObs) archObs.disconnect();
      if (gaugeObs) gaugeObs.disconnect();
    };
  }, []);

  return (
    <div className="ziira-scope pb-16 max-w-[1220px] mx-auto space-y-6" ref={containerRef}>
      {/* دکمه‌های کنترل و ناوبری بالا */}
      <div className="flex items-center justify-between">
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowRight size={16} />
          <span>بازگشت به پرتال اصلی</span>
        </Link>
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <Download size={14} />
          <span>چاپ / خروجی PDF</span>
        </button>
      </div>

      {/* SVG تعاریف گرادینت‌های مرجع */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="grad-cyan-svg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#70E1FF" />
            <stop offset="50%" stopColor="#00B4D8" />
            <stop offset="100%" stopColor="#0077B6" />
          </linearGradient>
          <linearGradient id="grad-green-svg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4FF4D" />
            <stop offset="50%" stopColor="#99CC00" />
            <stop offset="100%" stopColor="#557300" />
          </linearGradient>
          <linearGradient id="grad-orange-svg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA24A" />
            <stop offset="50%" stopColor="#FF6F00" />
            <stop offset="100%" stopColor="#E64A00" />
          </linearGradient>
          <linearGradient id="grad-purple-svg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DC8CFF" />
            <stop offset="50%" stopColor="#A838FF" />
            <stop offset="100%" stopColor="#6B05D6" />
          </linearGradient>
          <linearGradient id="grad-pink-svg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6EA7" />
            <stop offset="50%" stopColor="#FF1E7A" />
            <stop offset="100%" stopColor="#BA004E" />
          </linearGradient>
        </defs>
      </svg>

      {/* پوسته اینفوگرافیک زیرا */}
      <div className="infographic-container">
        <header className="header">
          <div className="header-top">
            <div className="brand-lockup">
              <div className="brand-row-main">
                <div className="ebcom-logo-wrap">
                  <img
                    src="/assets/images/Ziira.png"
                    alt="شرکت همراه کسب‌وکارهای هوشمند (EBCOM)"
                    className="ebcom-logo-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/images/ebcom-sign.png';
                    }}
                  />
                </div>

                <div className="brand-divider brand-divider-internal"></div>

                <div className="ziira-brand-badge">
                  <div className="ziira-brand-text">
                    <span className="ziira-brand-name">پلتفرم زیرا | Ziira AI</span>
                    <span className="ziira-brand-sub">هوش مصنوعی یکپارچه سازمانی</span>
                  </div>
                </div>
              </div>

              <div className="brand-divider brand-divider-main"></div>

              <div className="strategic-affiliation">
                <div className="affiliation-pill">
                  هم‌پیمان راهبردی: <strong>همراه اول</strong>
                </div>
                <a
                  href="https://ziira.ir"
                  target="_blank"
                  rel="noreferrer"
                  className="affiliation-link"
                >
                  <span className="live-dot"></span>
                  <span>ziira.ir</span>
                </a>
              </div>
            </div>

            <div className="exec-badge">گزارش راهبردی</div>
          </div>

          <div className="hero-title-area">
            <div className="hero-text">
              <h1>
                پلتفرم هوش مصنوعی «زیرا» (Ziira)
                <span className="badge-glow">زیرساخت حاکمیتی AI</span>
              </h1>
              <p>
                پلتفرم جامع، بومی و چندوجهی هوش مصنوعی شرکت همراه کسب‌وکارهای هوشمند (EBCOM)؛ ارائه‌دهنده راهکارهای هوش مصنوعی یکپارچه با تمرکز ویژه بر زبان فارسی، حاکمیت داده سازمانی و اتصال مستقیم به سامانه‌های عملیاتی کشور در بستر ارتباطی همراه اول.
              </p>
            </div>

            <div className="hero-quick-kpi">
              <div className="quick-kpi-item">
                <div className="quick-kpi-num">Omni-Channel</div>
                <div className="quick-kpi-label">دسترسی چندرسانه‌ای</div>
              </div>
              <div className="quick-kpi-item">
                <div className="quick-kpi-num">B2B & B2C</div>
                <div className="quick-kpi-label">مدل درآمدی دوگانه</div>
              </div>
              <div className="quick-kpi-item">
                <div className="quick-kpi-num">RAG بومی</div>
                <div className="quick-kpi-label">پایگاه دانش سازمانی</div>
              </div>
            </div>
          </div>
        </header>

        {/* نوار ۴ گانه استراتژیک */}
        <div className="strategic-strip">
          <div className="strip-card c-green reveal-box">
            <div className="strip-icon-sphere">🇮🇷</div>
            <div>
              <div className="strip-text-title">تمرکز عمیق بر زبان فارسی</div>
              <div className="strip-text-desc">درک بافت فرهنگی و نگارش تخصصی اداری و تجاری</div>
            </div>
          </div>

          <div className="strip-card c-cyan reveal-box">
            <div className="strip-icon-sphere">🏢</div>
            <div>
              <div className="strip-text-title">فضای اختصاصی سازمانی</div>
              <div className="strip-text-desc">ایزولاسیون کامل داده‌ها و امنیت در تراز Enterprise</div>
            </div>
          </div>

          <div className="strip-card c-purple reveal-box">
            <div className="strip-icon-sphere">🤖</div>
            <div>
              <div className="strip-text-title">دستیاران متصل به فرآیند</div>
              <div className="strip-text-desc">اتصال زنده به جیرا، تیکتینگ و ERP سازمان</div>
            </div>
          </div>

          <div className="strip-card c-orange reveal-box">
            <div className="strip-icon-sphere">💳</div>
            <div>
              <div className="strip-text-title">کیف پول متمرکز و سهمیه‌بندی</div>
              <div className="strip-text-desc">مدیریت مصرف تیم‌ها با مکانیزم Pay-per-Use</div>
            </div>
          </div>
        </div>

        <div className="content">
          {/* بخش اول: معماری ۴ لایه و هرم سه‌بعدی */}
          <div className="section-header">
            <div className="section-title">
              <div className="section-title-bar bar-cyan"></div>
              <h2>
                معماری ۴ سطحی پلتفرم زیرا
                <span className="sec-title-en">(Layered AI Architecture)</span>
              </h2>
            </div>
            <div className="section-subtitle">
              تفکیک لایه‌های زیرساختی، دانشی، عاملیتی و رابط کاربری
            </div>
          </div>

          <div className="arch-redesign-box">
            <div className="arch-two-col">
              <div className="pyramid-stage" id="arch-pyramid-stage">
                <svg
                  className="pyramid-svg-clean"
                  viewBox="0 0 540 480"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="p-cyl1-top" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFA0C5" />
                      <stop offset="100%" stopColor="#FF1E7A" />
                    </linearGradient>
                    <linearGradient id="p-cyl1-side" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FF1E7A" />
                      <stop offset="30%" stopColor="#FF6AA2" />
                      <stop offset="70%" stopColor="#D60057" />
                      <stop offset="100%" stopColor="#800034" />
                    </linearGradient>

                    <linearGradient id="p-cyl2-top" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E2A6FF" />
                      <stop offset="100%" stopColor="#9C27B0" />
                    </linearGradient>
                    <linearGradient id="p-cyl2-side" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#9C27B0" />
                      <stop offset="30%" stopColor="#BA68C8" />
                      <stop offset="70%" stopColor="#7B1FA2" />
                      <stop offset="100%" stopColor="#4A148C" />
                    </linearGradient>

                    <linearGradient id="p-cyl3-top" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFC588" />
                      <stop offset="100%" stopColor="#FF6F00" />
                    </linearGradient>
                    <linearGradient id="p-cyl3-side" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FF6F00" />
                      <stop offset="30%" stopColor="#FFA040" />
                      <stop offset="70%" stopColor="#E65100" />
                      <stop offset="100%" stopColor="#8F3000" />
                    </linearGradient>

                    <linearGradient id="p-cyl4-top" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#EAFF85" />
                      <stop offset="100%" stopColor="#99CC00" />
                    </linearGradient>
                    <linearGradient id="p-cyl4-side" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#99CC00" />
                      <stop offset="30%" stopColor="#BEE838" />
                      <stop offset="70%" stopColor="#739900" />
                      <stop offset="100%" stopColor="#405500" />
                    </linearGradient>

                    <radialGradient id="p-shadow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(0,0,0,0.85)" />
                      <stop offset="60%" stopColor="rgba(0,0,0,0.4)" />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>

                    <filter id="badge-glow-pink" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(255, 46, 147, 0.4)" />
                    </filter>
                    <filter id="badge-glow-purple" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(168, 85, 247, 0.4)" />
                    </filter>
                    <filter id="badge-glow-orange" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(255, 122, 0, 0.4)" />
                    </filter>
                    <filter id="badge-glow-green" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(153, 204, 0, 0.4)" />
                    </filter>

                    <clipPath id="clip-line-1"><rect id="clip-rect-1" x="218" y="70" width="0" height="35" /></clipPath>
                    <clipPath id="clip-line-2"><rect id="clip-rect-2" x="178" y="155" width="0" height="40" /></clipPath>
                    <clipPath id="clip-line-3"><rect id="clip-rect-3" x="138" y="250" width="0" height="40" /></clipPath>
                    <clipPath id="clip-line-4"><rect id="clip-rect-4" x="98" y="350" width="0" height="40" /></clipPath>
                  </defs>

                  <ellipse id="pyr-floor-shadow" cx="280" cy="445" rx="200" ry="26" fill="url(#p-shadow)" />

                  {/* لایه ۴ */}
                  <g id="pyr-tier-4" className="tier-shape tier-shape-4">
                    <path d="M 90 340 A 190 38 0 0 0 470 340 L 470 405 A 190 38 0 0 1 90 405 Z" fill="url(#p-cyl4-side)" />
                    <ellipse cx="280" cy="340" rx="190" ry="38" fill="url(#p-cyl4-top)" />
                    <path d="M 100 340 A 180 34 0 0 0 460 340" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />
                  </g>

                  {/* لایه ۳ */}
                  <g id="pyr-tier-3" className="tier-shape tier-shape-3">
                    <path d="M 130 240 A 150 30 0 0 0 430 240 L 430 295 A 150 30 0 0 1 130 295 Z" fill="url(#p-cyl3-side)" />
                    <ellipse cx="280" cy="240" rx="150" ry="30" fill="url(#p-cyl3-top)" />
                    <path d="M 140 240 A 140 26 0 0 0 420 240" stroke="rgba(255,255,255,0.45)" strokeWidth="2" fill="none" />
                  </g>

                  {/* لایه ۲ */}
                  <g id="pyr-tier-2" className="tier-shape tier-shape-2">
                    <path d="M 170 150 A 110 24 0 0 0 390 150 L 390 198 A 110 24 0 0 1 170 198 Z" fill="url(#p-cyl2-side)" />
                    <ellipse cx="280" cy="150" rx="110" ry="24" fill="url(#p-cyl2-top)" />
                    <path d="M 178 150 A 102 20 0 0 0 382 150" stroke="rgba(255,255,255,0.45)" strokeWidth="2" fill="none" />
                  </g>

                  {/* لایه ۱ */}
                  <g id="pyr-tier-1" className="tier-shape tier-shape-1">
                    <path d="M 210 65 A 70 16 0 0 0 350 65 L 350 108 A 70 16 0 0 1 210 108 Z" fill="url(#p-cyl1-side)" />
                    <ellipse cx="280" cy="65" rx="70" ry="16" fill="url(#p-cyl1-top)" />
                    <path d="M 216 65 A 64 14 0 0 0 344 65" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" />
                  </g>

                  {/* قطره‌ها و امواج */}
                  <g id="drop-tier-1" className="tier-drop drop-1">
                    <circle className="drop-core" cx="280" cy="87" r="7" fill="url(#p-cyl1-top)" filter="url(#badge-glow-pink)" />
                    <circle className="drop-ripple-a" cx="280" cy="87" r="14" fill="none" stroke="#FF1E7A" strokeWidth="2.5" />
                    <circle className="drop-ripple-b" cx="280" cy="87" r="24" fill="none" stroke="#FFA0C5" strokeWidth="1.5" />
                  </g>
                  <g id="drop-tier-2" className="tier-drop drop-2">
                    <circle className="drop-core" cx="280" cy="174" r="8" fill="url(#p-cyl2-top)" filter="url(#badge-glow-purple)" />
                    <circle className="drop-ripple-a" cx="280" cy="174" r="16" fill="none" stroke="#9C27B0" strokeWidth="2.5" />
                    <circle className="drop-ripple-b" cx="280" cy="174" r="28" fill="none" stroke="#E2A6FF" strokeWidth="1.5" />
                  </g>
                  <g id="drop-tier-3" className="tier-drop drop-3">
                    <circle className="drop-core" cx="280" cy="268" r="9" fill="url(#p-cyl3-top)" filter="url(#badge-glow-orange)" />
                    <circle className="drop-ripple-a" cx="280" cy="268" r="18" fill="none" stroke="#FF6F00" strokeWidth="2.5" />
                    <circle className="drop-ripple-b" cx="280" cy="268" r="32" fill="none" stroke="#FFA040" strokeWidth="1.5" />
                  </g>
                  <g id="drop-tier-4" className="tier-drop drop-4">
                    <circle className="drop-core" cx="280" cy="372" r="10" fill="url(#p-cyl4-top)" filter="url(#badge-glow-green)" />
                    <circle className="drop-ripple-a" cx="280" cy="372" r="22" fill="none" stroke="#99CC00" strokeWidth="2.5" />
                    <circle className="drop-ripple-b" cx="280" cy="372" r="38" fill="none" stroke="#EAFF85" strokeWidth="1.5" />
                  </g>

                  {/* خطوط اتصال و درصدها */}
                  <g id="callout-tier-1" className="tier-callout-group">
                    <circle id="dot-tier-1" className="callout-dot dot-1" cx="218" cy="87" r="4.5" fill="#FF1E7A" stroke="#FFFFFF" strokeWidth="1.5" />
                    <path id="line-tier-1" className="callout-line line-1" d="M 218 87 L 76 87" stroke="#FF1E7A" strokeWidth="2" strokeDasharray="4,3" clipPath="url(#clip-line-1)" opacity="0.95" />
                    <g id="badge-tier-1" className="callout-badge badge-1">
                      <rect x="12" y="66" width="64" height="42" rx="12" fill="#181E2C" stroke="#FF1E7A" strokeWidth="2" filter="url(#badge-glow-pink)" />
                      <text className="badge-text" x="44" y="87" dy="0.35em" textAnchor="middle" fill="#FFA0C5" fontSize="16" fontWeight="900">۲۵٪</text>
                    </g>
                  </g>

                  <g id="callout-tier-2" className="tier-callout-group">
                    <circle id="dot-tier-2" className="callout-dot dot-2" cx="178" cy="174" r="4.5" fill="#9C27B0" stroke="#FFFFFF" strokeWidth="1.5" />
                    <path id="line-tier-2" className="callout-line line-2" d="M 178 174 L 76 174" stroke="#9C27B0" strokeWidth="2" strokeDasharray="4,3" clipPath="url(#clip-line-2)" opacity="0.95" />
                    <g id="badge-tier-2" className="callout-badge badge-2">
                      <rect x="12" y="153" width="64" height="42" rx="12" fill="#181E2C" stroke="#A855F7" strokeWidth="2" filter="url(#badge-glow-purple)" />
                      <text className="badge-text" x="44" y="174" dy="0.35em" textAnchor="middle" fill="#E2A6FF" fontSize="16" fontWeight="900">۵۰٪</text>
                    </g>
                  </g>

                  <g id="callout-tier-3" className="tier-callout-group">
                    <circle id="dot-tier-3" className="callout-dot dot-3" cx="138" cy="268" r="4.5" fill="#FF6F00" stroke="#FFFFFF" strokeWidth="1.5" />
                    <path id="line-tier-3" className="callout-line line-3" d="M 138 268 L 76 268" stroke="#FF6F00" strokeWidth="2" strokeDasharray="4,3" clipPath="url(#clip-line-3)" opacity="0.95" />
                    <g id="badge-tier-3" className="callout-badge badge-3">
                      <rect x="12" y="247" width="64" height="42" rx="12" fill="#181E2C" stroke="#FF7A00" strokeWidth="2" filter="url(#badge-glow-orange)" />
                      <text className="badge-text" x="44" y="268" dy="0.35em" textAnchor="middle" fill="#FFC588" fontSize="16" fontWeight="900">۷۵٪</text>
                    </g>
                  </g>

                  <g id="callout-tier-4" className="tier-callout-group">
                    <circle id="dot-tier-4" className="callout-dot dot-4" cx="98" cy="370" r="4.5" fill="#99CC00" stroke="#FFFFFF" strokeWidth="1.5" />
                    <path id="line-tier-4" className="callout-line line-4" d="M 98 370 L 76 370" stroke="#99CC00" strokeWidth="2" strokeDasharray="4,3" clipPath="url(#clip-line-4)" opacity="0.95" />
                    <g id="badge-tier-4" className="callout-badge badge-4">
                      <rect x="12" y="349" width="64" height="42" rx="12" fill="#181E2C" stroke="#99CC00" strokeWidth="2" filter="url(#badge-glow-green)" />
                      <text className="badge-text" x="44" y="370" dy="0.35em" textAnchor="middle" fill="#EAFF85" fontSize="16" fontWeight="900">۱۰۰٪</text>
                    </g>
                  </g>
                </svg>

                <div className="pyramid-footer-note">
                  <span>🎯</span>
                  <span>هرم توزیع کارکردی پلتفرم هوش مصنوعی زیرا</span>
                </div>
              </div>

              {/* کارت‌های تشریحی کنار هرم */}
              <div className="arch-cards-col">
                <div className="arch-capsule-card tier-1">
                  <div className="capsule-sphere">🌐</div>
                  <div className="capsule-info">
                    <h3>
                      لایه اول: کانال‌های دسترسی و تجربه یکپارچه
                      <span className="card-title-en">(Omnichannel Experience)</span>
                    </h3>
                    <p>
                      دسترسی آسان و چندکاناله از طریق وب‌سایت، اپلیکیشن اندروید، افزونه کروم، پیامک، و به‌زودی بات‌های روبیکا، بله و تلفن گویا با شناسه هویتی واحد.
                    </p>
                    <div className="capsule-tags">
                      <span className="capsule-tag">وب‌سایت ziira.ir</span>
                      <span className="capsule-tag">اپلیکیشن اندروید</span>
                      <span className="capsule-tag">سرشماره پیامکی</span>
                      <span className="capsule-tag">افزونه Chrome</span>
                      <span className="capsule-tag">روبیکا و بله</span>
                      <span className="capsule-tag">IVR تلفن گویا</span>
                    </div>
                  </div>
                  <div className="capsule-pct-pill">۲۵٪</div>
                </div>

                <div className="arch-capsule-card tier-2">
                  <div className="capsule-sphere">🤖</div>
                  <div className="capsule-info">
                    <h3>
                      لایه دوم: دستیاران تخصصی و یکپارچگی عملیاتی
                      <span className="card-title-en">(Agentic AI & Integration)</span>
                    </h3>
                    <p>
                      مجموعه دستیاران هوشمند با قابلیت اتصال زنده به سامانه‌های داخلی سازمان (جیرا، CRM و...)، مدیریت اتوماتیک تسک‌ها، پشتیبانی ۲۴/۷ و پردازش چندوجهی تصویر و ویدیو.
                    </p>
                    <div className="capsule-tags">
                      <span className="capsule-tag">دستیار مدیریت پروژه</span>
                      <span className="capsule-tag">اتصال مستقیم به Jira</span>
                      <span className="capsule-tag">ویجت پشتیبانی و CRM</span>
                      <span className="capsule-tag">پردازش OCR و ویدیو</span>
                    </div>
                  </div>
                  <div className="capsule-pct-pill">۵۰٪</div>
                </div>

                <div className="arch-capsule-card tier-3">
                  <div className="capsule-sphere">📚</div>
                  <div className="capsule-info">
                    <h3>
                      لایه سوم: پایگاه دانش سازمانی و RAG بومی
                      <span className="card-title-en">(Enterprise Knowledge & Security)</span>
                    </h3>
                    <p>
                      ایجاد فضای کار اختصاصی (Tenant ایزوله)، بارگذاری امن مستندات پروژه، ماتریکس کنترل دسترسی تیم‌ها (RBAC) و پاسخگویی دقیق و مستند بدون توهم داده‌ای.
                    </p>
                    <div className="capsule-tags">
                      <span className="capsule-tag">فضای کار اختصاصی</span>
                      <span className="capsule-tag">موتور RAG بومی</span>
                      <span className="capsule-tag">مدیریت سطوح دسترسی</span>
                      <span className="capsule-tag">حاکمیت داده و امنیت</span>
                    </div>
                  </div>
                  <div className="capsule-pct-pill">۷۵٪</div>
                </div>

                <div className="arch-capsule-card tier-4">
                  <div className="capsule-sphere">⚡</div>
                  <div className="capsule-info">
                    <h3>
                      لایه چهارم: زیرساخت تجمیعی مدل‌ها و کیف پول مرکزی
                      <span className="card-title-en">(Foundational Model Hub)</span>
                    </h3>
                    <p>
                      محیط چندمدلی یکپارچه با تمرکز بر پردازش زبان فارسی، مدیریت متمرکز اعتبار و مصرف (Pay-as-you-go)، سهمیه‌بندی بودجه تیم‌ها و داشبورد تحلیل مصرف سازمان.
                    </p>
                    <div className="capsule-tags">
                      <span className="capsule-tag">طیف متنوع LLMها</span>
                      <span className="capsule-tag">پردازش عمیق زبان فارسی</span>
                      <span className="capsule-tag">کیف پول متمرکز مصرف</span>
                      <span className="capsule-tag">داشبورد مانیتورینگ</span>
                    </div>
                  </div>
                  <div className="capsule-pct-pill">۱۰۰٪</div>
                </div>
              </div>
            </div>
          </div>

          {/* بخش دوم: ماتریکس دوگانه B2B و B2C */}
          <div className="section-header">
            <div className="section-title">
              <div className="section-title-bar bar-green"></div>
              <h2>
                تفکیک راهبردی مخاطبان هدف
                <span className="sec-title-en">(Dual Core Ecosystem)</span>
              </h2>
            </div>
            <div className="section-subtitle">
              پوشش هم‌زمان بازار خرد مشترکین و شرکت‌های بزرگ سازمانی
            </div>
          </div>

          <div className="dual-core-grid">
            <div className="dual-box b2c reveal-box">
              <div className="dual-box-header">
                <div className="dual-title-group">
                  <div className="dual-icon-badge">👤</div>
                  <div>
                    <h3>زیرا برای کاربران عمومی (B2C)</h3>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-dim)' }}>
                      مشترکین خرد، پژوهشگران، متخصصین و عموم شهروندان
                    </span>
                  </div>
                </div>
                <span className="dual-tag">پایگاه مصرف انبوه</span>
              </div>

              <ul className="dual-feature-list">
                <li className="dual-feature-item">
                  <span className="dual-feature-bullet"></span>
                  <div>
                    <strong>دسترسی چندکاناله همه‌جا‌حاضر:</strong> تعامل روان از طریق وب‌سایت، اپلیکیشن، افزونه کروم و بات‌های پیام‌رسان بومی.
                  </div>
                </li>
                <li className="dual-feature-item">
                  <span className="dual-feature-bullet"></span>
                  <div>
                    <strong>شناسه هویت واحد (Single Sign-On):</strong> حفظ تاریخچه مکالمات، پرامپت‌ها و داده‌ها با شماره تلفن همراه.
                  </div>
                </li>
                <li className="dual-feature-item">
                  <span className="dual-feature-bullet"></span>
                  <div>
                    <strong>کیف پول خرد مرکزی (Micro-Wallet):</strong> شارژ آسان اعتباری و پرداخت منعطف متناسب با مصرف واقعی (Pay-As-You-Go).
                  </div>
                </li>
                <li className="dual-feature-item">
                  <span className="dual-feature-bullet"></span>
                  <div>
                    <strong>تنوع خدمات چندرسانه‌ای:</strong> گفت‌وگو، تولید محتوای متنی، پردازش و ساخت تصاویر و خلاصه‌سازی هوشمند.
                  </div>
                </li>
              </ul>

              <div className="dual-bottom-note">
                <div className="dual-note-title">اهرم همراه اول:</div>
                <div className="dual-note-desc">
                  امکان فعال‌سازی مستقیم روی بسته اینترنت، شارژ اعتباری و پرداخت روی قبض سیم‌کارت
                </div>
              </div>
            </div>

            <div className="dual-box b2b reveal-box">
              <div className="dual-box-header">
                <div className="dual-title-group">
                  <div className="dual-icon-badge">🏢</div>
                  <div>
                    <h3>زیرا برای سازمان‌ها و کسب‌وکارها (B2B)</h3>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-dim)' }}>
                      هلدینگ‌ها، بانک‌ها، اپراتورها و شرکت‌های فناور کشور
                    </span>
                  </div>
                </div>
                <span className="dual-tag">درآمدزایی پایدار سازمانی</span>
              </div>

              <ul className="dual-feature-list">
                <li className="dual-feature-item">
                  <span className="dual-feature-bullet"></span>
                  <div>
                    <strong>فضای کاری اختصاصی (Enterprise Tenant):</strong> محیط امن، رمزنگاری‌شده و کاملاً ایزوله مختص هر سازمان.
                  </div>
                </li>
                <li className="dual-feature-item">
                  <span className="dual-feature-bullet"></span>
                  <div>
                    <strong>ماتریکس مدیریت دسترسی (RBAC):</strong> تعیین نقش‌ها، دسترسی تیم‌ها به مدل‌های مشخص و پایش امنیت داده‌ها.
                  </div>
                </li>
                <li className="dual-feature-item">
                  <span className="dual-feature-bullet"></span>
                  <div>
                    <strong>کیف پول سازمانی و سهمیه‌بندی:</strong> تخصیص بودجه و سقف مصرف هوش مصنوعی برای هر دپارتمان یا واحد کاری.
                  </div>
                </li>
                <li className="dual-feature-item">
                  <span className="dual-feature-bullet"></span>
                  <div>
                    <strong>ادغام عمیق در فرآیندهای کسب‌وکار:</strong> تبدیل هوش مصنوعی به بازوی اتوماسیون تصمیم‌گیری و اجرای وظایف.
                  </div>
                </li>
              </ul>

              <div className="dual-bottom-note">
                <div className="dual-note-title" style={{ color: 'var(--ebcom-green)' }}>
                  ارزش افزوده همراه اول:
                </div>
                <div className="dual-note-desc">
                  بسته‌بندی در قالب بسته راهکارهای سازمانی همراه اول (B2B) برای ۵۰۰ شرکت برتر کشور
                </div>
              </div>
            </div>
          </div>

          {/* بخش سوم: گیج‌های مدور عملکردی */}
          <div className="gauge-section">
            <div className="section-header">
              <div className="section-title">
                <div className="section-title-bar bar-purple"></div>
                <h2>
                  ۴ موتور تمایز و ارزش‌آفرینی پلتفرم «زیرا»
                  <span className="sec-title-en">(Core Value Engines)</span>
                </h2>
              </div>
              <div className="section-subtitle">
                مزیت رقابتی پایدار در صنعت هوش مصنوعی کشور
              </div>
            </div>

            <div className="gauge-grid">
              <div className="gauge-card gauge-cyan">
                <div className="gauge-vis">
                  <svg className="gauge-svg" viewBox="0 0 140 140">
                    <circle className="gauge-bg-circle" cx="70" cy="70" r="56"></circle>
                    <circle className="gauge-fill-circle" cx="70" cy="70" r="56"></circle>
                  </svg>
                  <div className="gauge-inner-sphere">
                    <span className="gauge-inner-icon">🇮🇷</span>
                  </div>
                </div>
                <div className="gauge-title">بومی‌سازی عمیق فارسی</div>
                <div className="gauge-desc">
                  درک دقیق تفاوت‌های زبانی، ادبیات تخصصی اداری، حقوقی و تجاری ایران بدون افت کیفیت در مقایسه با ابزارهای غیربومی.
                </div>
              </div>

              <div className="gauge-card gauge-green">
                <div className="gauge-vis">
                  <svg className="gauge-svg" viewBox="0 0 140 140">
                    <circle className="gauge-bg-circle" cx="70" cy="70" r="56"></circle>
                    <circle className="gauge-fill-circle" cx="70" cy="70" r="56"></circle>
                  </svg>
                  <div className="gauge-inner-sphere">
                    <span className="gauge-inner-icon">🔗</span>
                  </div>
                </div>
                <div className="gauge-title">لایه اتصال سامانه‌ای</div>
                <div className="gauge-desc">
                  یکپارچگی بی‌واسطه با جیرا، سیستم‌های مدیریت وظایف، CRM و پایگاه‌های دانش داخلی به عنوان لایه هوشمند سازمان.
                </div>
              </div>

              <div className="gauge-card gauge-purple">
                <div className="gauge-vis">
                  <svg className="gauge-svg" viewBox="0 0 140 140">
                    <circle className="gauge-bg-circle" cx="70" cy="70" r="56"></circle>
                    <circle className="gauge-fill-circle" cx="70" cy="70" r="56"></circle>
                  </svg>
                  <div className="gauge-inner-sphere">
                    <span className="gauge-inner-icon">📊</span>
                  </div>
                </div>
                <div className="gauge-title">حاکمیت مصرف و هزینه</div>
                <div className="gauge-desc">
                  داشبورد زنده پایش توکن، گزارش‌گیری دپارتمانی، سقف اعتباری تیم‌ها و شفافیت کامل در مدل‌های پرداخت سازمانی و فردی.
                </div>
              </div>

              <div className="gauge-card gauge-orange">
                <div className="gauge-vis">
                  <svg className="gauge-svg" viewBox="0 0 140 140">
                    <circle className="gauge-bg-circle" cx="70" cy="70" r="56"></circle>
                    <circle className="gauge-fill-circle" cx="70" cy="70" r="56"></circle>
                  </svg>
                  <div className="gauge-inner-sphere">
                    <span className="gauge-inner-icon">👁️</span>
                  </div>
                </div>
                <div className="gauge-title">پردازش چندوجهی رسانه</div>
                <div className="gauge-desc">
                  استخراج هوشمند متن از تصاویر، جستجوی ویژوال در کاتالوگ محصولات دیجیتال و خلاصه‌سازی هوشمند محتوای ویدیویی.
                </div>
              </div>
            </div>
          </div>

          {/* بخش چهارم: سبد راهکارهای سازمانی */}
          <div className="section-header">
            <div className="section-title">
              <div className="section-title-bar bar-orange"></div>
              <h2>
                سبد راهکارهای تخصصی سازمانی
                <span className="sec-title-en">(Enterprise AI Portfolio)</span>
              </h2>
            </div>
            <div className="section-subtitle">
              محصولات آماده به‌کار جهت ارتقای بهره‌وری عملیاتی
            </div>
          </div>

          <div className="pillars-grid">
            <div className="pillar-box reveal-box">
              <div className="pillar-header">
                <div className="pillar-sphere-sm" style={{ background: 'var(--grad-green)', color: '#111a00' }}>
                  🎯
                </div>
                <div>
                  <h3>
                    دستیار مدیریت و عملیات پروژه
                    <span className="card-title-en">(Project Ops AI)</span>
                  </h3>
                  <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                    کاهش محسوس اصطکاک پروژه‌های پیچیده سازمانی
                  </span>
                </div>
              </div>
              <div className="feature-tags">
                <div className="feature-tag">
                  <span style={{ fontSize: '20px' }}>📁</span>
                  <div>
                    <div className="feature-tag-title"><strong>تحلیل اطلاعات و مستندات:</strong></div>
                    <div className="feature-tag-desc">استخراج آنی پیش‌نیازها و شناسایی موانع</div>
                  </div>
                </div>

                <div className="feature-tag">
                  <span style={{ fontSize: '20px' }}>⚡</span>
                  <div>
                    <div className="feature-tag-title"><strong>برنامه‌ریزی و اولویت‌بندی:</strong></div>
                    <div className="feature-tag-desc">چیدمان فعالیت‌ها بر مبنای توان واقعی تیم</div>
                  </div>
                </div>

                <div className="feature-tag">
                  <span style={{ fontSize: '20px' }}>🔗</span>
                  <div>
                    <div className="feature-tag-title"><strong>اتصال به Jira و Task Manager:</strong></div>
                    <div className="feature-tag-desc">ثبت و تخصیص مستقیم وظایف</div>
                  </div>
                </div>

                <div className="feature-tag">
                  <span style={{ fontSize: '20px' }}>📈</span>
                  <div>
                    <div className="feature-tag-title"><strong>گزارش‌های مدیریتی:</strong></div>
                    <div className="feature-tag-desc">سنجش وضعیت پیشرفت پروژه بر اساس داده‌های زنده</div>
                  </div>
                </div>

                <div className="feature-tag">
                  <span style={{ fontSize: '20px' }}>🛡️</span>
                  <div>
                    <div className="feature-tag-title"><strong>رعایت سطح دسترسی:</strong></div>
                    <div className="feature-tag-desc">تفکیک دسترسی کاربران هنگام فراخوانی اطلاعات پروژه</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pillar-box reveal-box">
              <div className="pillar-header">
                <div className="pillar-sphere-sm" style={{ background: 'var(--grad-purple)', color: '#fff' }}>
                  🎧
                </div>
                <div>
                  <h3>
                    دستیار هوشمند پشتیبانی و پاسخ‌گویی
                    <span className="card-title-en">(Omni Support AI)</span>
                  </h3>
                  <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                    پاسخگویی ۲۴/۷ متناسب با محصولات و خدمات کسب‌وکار
                  </span>
                </div>
              </div>
              <div className="feature-tags">
                <div className="feature-tag">
                  <span style={{ fontSize: '20px' }}>💬</span>
                  <div>
                    <div className="feature-tag-title"><strong>پاسخ‌گویی هوشمند:</strong></div>
                    <div className="feature-tag-desc">رفع سوالات مشتریان بدون صف انتظار و خستگی</div>
                  </div>
                </div>

                <div className="feature-tag">
                  <span style={{ fontSize: '20px' }}>📚</span>
                  <div>
                    <div className="feature-tag-title"><strong>پایگاه دانش اختصاصی:</strong></div>
                    <div className="feature-tag-desc">تکیه بر اطلاعات و اسناد رسمی کسب‌وکار</div>
                  </div>
                </div>

                <div className="feature-tag">
                  <span style={{ fontSize: '20px' }}>🌐</span>
                  <div>
                    <div className="feature-tag-title"><strong>ویجت وب‌سایت و اپلیکیشن:</strong></div>
                    <div className="feature-tag-desc">استقرار تجربه گفتگو‌محور در چند دقیقه</div>
                  </div>
                </div>

                <div className="feature-tag">
                  <span style={{ fontSize: '20px' }}>🔍</span>
                  <div>
                    <div className="feature-tag-title"><strong>تحلیل رفتار و تعاملات:</strong></div>
                    <div className="feature-tag-desc">شناسایی موضوعات و نیازهای پرتکرار مشتریان</div>
                  </div>
                </div>

                <div className="feature-tag">
                  <span style={{ fontSize: '20px' }}>🔄</span>
                  <div>
                    <div className="feature-tag-title"><strong>اتصال به سیستم‌های تیکتینگ:</strong></div>
                    <div className="feature-tag-desc">ارجاع هوشمند موارد خاص به کارشناسان</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* بخش پنجم: کانال‌های دسترسی و نقشه راه */}
          <div className="omni-section">
            <div className="section-header" style={{ marginBottom: '20px' }}>
              <div className="section-title">
                <div className="section-title-bar bar-cyan"></div>
                <h2>
                  کانال‌های دسترسی و نقشه راه توسعه
                  <span className="sec-title-en">(Omnichannel Ecosystem)</span>
                </h2>
              </div>
              <div className="section-subtitle">
                دسترسی فراگیر در سراسر زیرساخت ارتباطی و پیام‌رسانی کشور
              </div>
            </div>

            <div className="omni-layout">
              <div>
                <div className="channel-group-title">
                  <span className="status-dot active"></span>
                  <span>کانال‌های فعال و در دسترس کاربران<br />(Active Channels)</span>
                </div>
                <div className="channels-flex">
                  <div className="channel-item active reveal-box">
                    <span style={{ fontSize: '20px' }}>🌐</span>
                    <div>
                      <div className="channel-name">وب‌سایت اختصاصی</div>
                      <div className="channel-meta">ziira.ir (محیط ابری پرسرعت)</div>
                    </div>
                  </div>
                  <div className="channel-item active reveal-box">
                    <span style={{ fontSize: '20px' }}>📱</span>
                    <div>
                      <div className="channel-name">اپلیکیشن اندروید</div>
                      <div className="channel-meta">تجربه کاربری نیتیو موبایل</div>
                    </div>
                  </div>
                  <div className="channel-item active reveal-box">
                    <span style={{ fontSize: '20px' }}>🧩</span>
                    <div>
                      <div className="channel-name">افزونه مرورگر Chrome</div>
                      <div className="channel-meta">دستیار همراه وب‌گردی و مطالعه</div>
                    </div>
                  </div>
                  <div className="channel-item active reveal-box">
                    <span style={{ fontSize: '20px' }}>💬</span>
                    <div>
                      <div className="channel-name">سرشماره پیامکی (SMS)</div>
                      <div className="channel-meta">هوش مصنوعی بدون نیاز به اینترنت</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="channel-group-title" style={{ color: 'var(--ai-purple)' }}>
                  <span className="status-dot pipeline"></span>
                  <span>کانال‌های در آستانه راه‌اندازی<br />(Upcoming Pipeline)</span>
                </div>
                <div className="channels-flex">
                  <div className="channel-item pipeline reveal-box">
                    <span style={{ fontSize: '20px' }}>💬</span>
                    <div>
                      <div className="channel-name">ربات پیام‌رسان بله</div>
                      <div className="channel-meta">یکپارچگی با جامعه کسب‌وکاری</div>
                    </div>
                  </div>
                  <div className="channel-item pipeline reveal-box">
                    <span style={{ fontSize: '20px' }}>⚡</span>
                    <div>
                      <div className="channel-name">ربات پیام‌رسان روبیکا</div>
                      <div className="channel-meta">دسترسی به میلیون‌ها کاربر ملی</div>
                    </div>
                  </div>
                  <div className="channel-item pipeline reveal-box">
                    <span style={{ fontSize: '20px' }}>📞</span>
                    <div>
                      <div className="channel-name">خط تلفن گویا (Smart IVR)</div>
                      <div className="channel-meta">تعامل صوتی هوشمند بر بستر شبکه همراه اول</div>
                    </div>
                  </div>
                  <div className="channel-item pipeline reveal-box">
                    <span style={{ fontSize: '20px' }}>⚙️</span>
                    <div>
                      <div className="channel-name">سرویس‌های اختصاصی سازمانی</div>
                      <div className="channel-meta">طراحی متناسب با سامانه‌های کلان هر شرکت</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer">
          <div className="footer-left">
            <div className="footer-slogan">
              پلتفرم زیرا؛ <span>هوش مصنوعی، یکپارچه و در دسترس</span>
            </div>
          </div>
          <div className="footer-right">
            شرکت همراه کسب‌وکارهای هوشمند (EBCOM) • بازوی نوآوری دیجیتال هلدینگ همراه اول
          </div>
        </footer>
      </div>
    </div>
  );
}
