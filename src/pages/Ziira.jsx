import React, { useEffect } from 'react';
import TopBar from '../components/common/TopBar';

const primaryColor = '#A855F7';

export default function Ziira() {
  useEffect(() => {
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

    const archTiers = [
      { id: 1, startX: 218, endX: 76, tierClass: "tier-1", rectId: "clip-rect-1" },
      { id: 2, startX: 178, endX: 76, tierClass: "tier-2", rectId: "clip-rect-2" },
      { id: 3, startX: 138, endX: 76, tierClass: "tier-3", rectId: "clip-rect-3" },
      { id: 4, startX: 98, endX: 76, tierClass: "tier-4", rectId: "clip-rect-4" }
    ];

    let archAnimationRunning = false;

    function resetArchElements() {
      archTiers.forEach((t) => {
        const drop = document.getElementById(`drop-tier-${t.id}`);
        if (drop) {
          drop.classList.remove("drop-active");
          drop.style.opacity = "0";
        }
        const cylinder = document.getElementById(`pyr-tier-${t.id}`);
        if (cylinder) cylinder.classList.remove("tier-expanded");

        const dot = document.getElementById(`dot-tier-${t.id}`);
        if (dot) dot.classList.remove("dot-visible");

        const rect = document.getElementById(t.rectId);
        if (rect) {
          rect.setAttribute("x", t.startX);
          rect.setAttribute("width", "0");
        }

        const badge = document.getElementById(`badge-tier-${t.id}`);
        if (badge) badge.classList.remove("badge-visible");

        const card = document.querySelector(`.arch-capsule-card.${t.tierClass}`);
        if (card) {
          card.classList.remove("card-visible", "card-active-glow");
        }
      });
    }

    function animateSingleTier(tierObj, onTierFinished) {
      const dropEl = document.getElementById(`drop-tier-${tierObj.id}`);
      const cylEl = document.getElementById(`pyr-tier-${tierObj.id}`);
      const dotEl = document.getElementById(`dot-tier-${tierObj.id}`);
      const badgeEl = document.getElementById(`badge-tier-${tierObj.id}`);
      const cardEl = document.querySelector(`.arch-capsule-card.${tierObj.tierClass}`);

      if (dropEl) dropEl.classList.add("drop-active");

      setTimeout(() => {
        if (cylEl) cylEl.classList.add("tier-expanded");
      }, 180);

      setTimeout(() => {
        if (dropEl) dropEl.style.opacity = "0";
        if (dotEl) dotEl.classList.add("dot-visible");

        animateLeaderLine(tierObj.rectId, tierObj.startX, tierObj.endX, 360, () => {
          const isMobile = window.innerWidth <= 768;
          if (badgeEl) badgeEl.classList.add("badge-visible");

          if (!isMobile) {
            if (cardEl) {
              cardEl.classList.add("card-visible", "card-active-glow");
              setTimeout(() => cardEl.classList.remove("card-active-glow"), 800);
            }
            if (onTierFinished) setTimeout(onTierFinished, 240);
          } else {
            setTimeout(() => {
              if (cardEl) {
                cardEl.classList.add("card-visible", "card-active-glow");
                setTimeout(() => cardEl.classList.remove("card-active-glow"), 900);
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

    const gaugeData = [
      { selector: ".gauge-cyan", targetOffset: 75, delay: 0 },
      { selector: ".gauge-green", targetOffset: 95, delay: 160 },
      { selector: ".gauge-purple", targetOffset: 60, delay: 320 },
      { selector: ".gauge-orange", targetOffset: 110, delay: 480 },
    ];

    function playGaugeAnimation() {
      gaugeData.forEach((g) => {
        setTimeout(() => {
          const card = document.querySelector(g.selector);
          if (card) {
            card.classList.add("gauge-visible");
            const circle = card.querySelector(".gauge-fill-circle");
            if (circle) circle.style.strokeDashoffset = g.targetOffset;
          }
        }, g.delay + 100);
      });
    }

    const revealBoxes = document.querySelectorAll(".reveal-box");
    const boxObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("box-revealed");
          boxObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealBoxes.forEach((b) => boxObserver.observe(b));

    const archBox = document.querySelector(".arch-redesign-box");
    let archObs;
    if (archBox) {
      archObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playArchAnimation();
            archObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      archObs.observe(archBox);
    }

    const gaugeSection = document.querySelector(".gauge-section");
    let gaugeObs;
    if (gaugeSection) {
      gaugeObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
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
    <div className="min-h-screen py-6 flex flex-col items-center">
      <TopBar title="پلتفرم هوش مصنوعی زیرا (Ziira)" />

      {/* SVG Definitions */}
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

      <div className="ziira-scope w-full max-w-[1200px] my-4">
        <div className="infographic-container">
          {/* HEADER */}
          <header className="header p-8 sm:p-12 border-b border-white/10">
            <div className="header-top flex justify-between items-center pb-6 mb-8 border-b border-white/10 flex-wrap gap-4">
              <div className="brand-lockup flex items-center gap-4 flex-wrap">
                <div className="brand-row-main flex items-center gap-4">
                  <div className="ebcom-logo-wrap">
                    <img
                      src="/assets/images/Ziira.png"
                      alt="Ziira"
                      className="ebcom-logo-img h-10 sm:h-12 w-auto object-contain"
                      onError={(e) => { e.target.src = '/assets/images/ebcom-sign.png'; }}
                    />
                  </div>
                  <div className="brand-divider"></div>
                  <div className="ziira-brand-badge">
                    <div className="ziira-brand-text">
                      <span className="ziira-brand-name" style={{ color: primaryColor }}>پلتفرم زیرا | Ziira AI[cite: 7]</span>
                      <span className="ziira-brand-sub">هوش مصنوعی یکپارچه سازمانی[cite: 7]</span>
                    </div>
                  </div>
                </div>

                <div className="brand-divider"></div>

                <div className="strategic-affiliation flex items-center gap-3">
                  <div className="affiliation-pill">هم‌پیمان راهبردی: <strong>همراه اول</strong>[cite: 7]</div>
                  <a href="https://ziira.ir" target="_blank" rel="noreferrer" className="affiliation-link">
                    <span className="live-dot"></span>
                    <span>ziira.ir[cite: 7]</span>
                  </a>
                </div>
              </div>

              <div className="exec-badge" style={{ background: primaryColor, color: '#FFFFFF' }}>گزارش راهبردی[cite: 7]</div>
            </div>

            <div className="hero-title-area">
              <div className="hero-text space-y-3">
                <h1 className="text-2xl sm:text-4xl font-black text-white flex items-center gap-3 flex-wrap">
                  پلتفرم هوش مصنوعی «زیرا» (Ziira)[cite: 7]
                  <span className="badge-glow" style={{ borderColor: primaryColor, color: primaryColor, boxShadow: `0 0 15px ${primaryColor}40` }}>زیرساخت حاکمیتی AI[cite: 7]</span>
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed text-justify font-light">
                  پلتفرم جامع، بومی و چندوجهی هوش مصنوعی شرکت همراه کسب‌وکارهای هوشمند (EBCOM)؛ ارائه‌دهنده راهکارهای هوش مصنوعی یکپارچه با تمرکز ویژه بر زبان فارسی، حاکمیت داده سازمانی و اتصال مستقیم به سامانه‌های عملیاتی کشور در بستر ارتباطی همراه اول[cite: 7].
                </p>
              </div>

              <div className="hero-quick-kpi grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="quick-kpi-item bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <div className="quick-kpi-num text-xl font-black mb-1" style={{ color: primaryColor }}>Omni-Channel[cite: 7]</div>
                  <div className="quick-kpi-label text-xs text-slate-400">دسترسی چندرسانه‌ای[cite: 7]</div>
                </div>
                <div className="quick-kpi-item bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <div className="quick-kpi-num text-xl font-black mb-1" style={{ color: primaryColor }}>B2B & B2C[cite: 7]</div>
                  <div className="quick-kpi-label text-xs text-slate-400">مدل درآمدی دوگانه[cite: 7]</div>
                </div>
                <div className="quick-kpi-item bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <div className="quick-kpi-num text-xl font-black mb-1" style={{ color: primaryColor }}>RAG بومی[cite: 7]</div>
                  <div className="quick-kpi-label text-xs text-slate-400">پایگاه دانش سازمانی[cite: 7]</div>
                </div>
              </div>
            </div>
          </header>

          {/* STRATEGIC STRIP */}
          <div className="strategic-strip grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:px-12 bg-black/30 border-b border-white/10">
            <div className="strip-card c-green reveal-box bg-[#181E2C] border border-white/10 p-4 rounded-xl flex items-center gap-3.5 border-r-4 border-r-[#99CC00]">
              <div className="strip-icon-sphere w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 bg-[#99CC00] text-slate-950 font-bold">🇮🇷</div>
              <div>
                <div className="strip-text-title text-xs font-bold text-white">تمرکز عمیق بر زبان فارسی[cite: 7]</div>
                <div className="strip-text-desc text-[11px] text-slate-400 mt-0.5">درک بافت فرهنگی و نگارش تخصصی اداری و تجاری[cite: 7]</div>
              </div>
            </div>
            <div className="strip-card c-cyan reveal-box bg-[#181E2C] border border-white/10 p-4 rounded-xl flex items-center gap-3.5 border-r-4 border-r-[#00D2FF]">
              <div className="strip-icon-sphere w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 bg-[#00D2FF] text-slate-950 font-bold">🏢</div>
              <div>
                <div className="strip-text-title text-xs font-bold text-white">فضای اختصاصی سازمانی[cite: 7]</div>
                <div className="strip-text-desc text-[11px] text-slate-400 mt-0.5">ایزولاسیون کامل داده‌ها و امنیت در تراز Enterprise[cite: 7]</div>
              </div>
            </div>
            <div className="strip-card c-purple reveal-box bg-[#181E2C] border border-white/10 p-4 rounded-xl flex items-center gap-3.5 border-r-4 border-r-[#A855F7]">
              <div className="strip-icon-sphere w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 text-white font-bold" style={{ backgroundColor: primaryColor }}>🤖</div>
              <div>
                <div className="strip-text-title text-xs font-bold text-white">دستیاران متصل به فرآیند[cite: 7]</div>
                <div className="strip-text-desc text-[11px] text-slate-400 mt-0.5">اتصال زنده به جیرا، تیکتینگ و ERP سازمان[cite: 7]</div>
              </div>
            </div>
            <div className="strip-card c-orange reveal-box bg-[#181E2C] border border-white/10 p-4 rounded-xl flex items-center gap-3.5 border-r-4 border-r-[#FF7722]">
              <div className="strip-icon-sphere w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 bg-[#FF7722] text-white font-bold">💳</div>
              <div>
                <div className="strip-text-title text-xs font-bold text-white">کیف پول متمرکز و سهمیه‌بندی[cite: 7]</div>
                <div className="strip-text-desc text-[11px] text-slate-400 mt-0.5">مدیریت مصرف تیم‌ها با مکانیزم Pay-per-Use[cite: 7]</div>
              </div>
            </div>
          </div>

          <div className="content p-8 sm:p-12 space-y-16">
            {/* SECTION 1: 4 TIERS ARCHITECTURE */}
            <div className="space-y-6">
              <div className="section-header flex justify-between items-center mb-6">
                <div className="section-title flex items-center gap-3">
                  <div className="section-title-bar w-1.5 h-6 rounded-full" style={{ backgroundColor: primaryColor }} />
                  <h2 className="text-xl font-black text-white">معماری ۴ سطحی پلتفرم زیرا <span className="sec-title-en text-sm text-slate-400 font-normal">(Layered AI Architecture)[cite: 7]</span></h2>
                </div>
                <div className="section-subtitle text-xs text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                  تفکیک لایه‌های زیرساختی، دانشی، عاملیتی و رابط کاربری[cite: 7]
                </div>
              </div>

              <div className="arch-redesign-box bg-[#121622] border border-white/10 rounded-3xl p-6 sm:p-10">
                <div className="arch-two-col grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="pyramid-stage lg:col-span-5 flex flex-col items-center justify-center">
                    <svg className="pyramid-svg-clean w-full max-w-[420px] h-auto overflow-visible" viewBox="0 0 540 480" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="p-cyl1-top" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FFA0C5" /><stop offset="100%" stopColor="#FF1E7A" /></linearGradient>
                        <linearGradient id="p-cyl1-side" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#FF1E7A" /><stop offset="30%" stopColor="#FF6AA2" /><stop offset="70%" stopColor="#D60057" /><stop offset="100%" stopColor="#800034" /></linearGradient>
                        <linearGradient id="p-cyl2-top" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#E2A6FF" /><stop offset="100%" stopColor="#9C27B0" /></linearGradient>
                        <linearGradient id="p-cyl2-side" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#9C27B0" /><stop offset="30%" stopColor="#BA68C8" /><stop offset="70%" stopColor="#7B1FA2" /><stop offset="100%" stopColor="#4A148C" /></linearGradient>
                        <linearGradient id="p-cyl3-top" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FFC588" /><stop offset="100%" stopColor="#FF6F00" /></linearGradient>
                        <linearGradient id="p-cyl3-side" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#FF6F00" /><stop offset="30%" stopColor="#FFA040" /><stop offset="70%" stopColor="#E65100" /><stop offset="100%" stopColor="#8F3000" /></linearGradient>
                        <linearGradient id="p-cyl4-top" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#EAFF85" /><stop offset="100%" stopColor="#99CC00" /></linearGradient>
                        <linearGradient id="p-cyl4-side" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#99CC00" /><stop offset="30%" stopColor="#BEE838" /><stop offset="70%" stopColor="#739900" /><stop offset="100%" stopColor="#405500" /></linearGradient>
                        <radialGradient id="p-shadow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(0,0,0,0.85)" /><stop offset="60%" stopColor="rgba(0,0,0,0.4)" /><stop offset="100%" stopColor="transparent" /></radialGradient>
                        <clipPath id="clip-line-1"><rect id="clip-rect-1" x="218" y="70" width="0" height="35" /></clipPath>
                        <clipPath id="clip-line-2"><rect id="clip-rect-2" x="178" y="155" width="0" height="40" /></clipPath>
                        <clipPath id="clip-line-3"><rect id="clip-rect-3" x="138" y="250" width="0" height="40" /></clipPath>
                        <clipPath id="clip-line-4"><rect id="clip-rect-4" x="98" y="350" width="0" height="40" /></clipPath>
                      </defs>

                      <ellipse id="pyr-floor-shadow" cx="280" cy="445" rx="200" ry="26" fill="url(#p-shadow)" />

                      <g id="pyr-tier-4" className="tier-shape tier-shape-4">
                        <path d="M 90 340 A 190 38 0 0 0 470 340 L 470 405 A 190 38 0 0 1 90 405 Z" fill="url(#p-cyl4-side)" />
                        <ellipse cx="280" cy="340" rx="190" ry="38" fill="url(#p-cyl4-top)" />
                      </g>
                      <g id="pyr-tier-3" className="tier-shape tier-shape-3">
                        <path d="M 130 240 A 150 30 0 0 0 430 240 L 430 295 A 150 30 0 0 1 130 295 Z" fill="url(#p-cyl3-side)" />
                        <ellipse cx="280" cy="240" rx="150" ry="30" fill="url(#p-cyl3-top)" />
                      </g>
                      <g id="pyr-tier-2" className="tier-shape tier-shape-2">
                        <path d="M 170 150 A 110 24 0 0 0 390 150 L 390 198 A 110 24 0 0 1 170 198 Z" fill="url(#p-cyl2-side)" />
                        <ellipse cx="280" cy="150" rx="110" ry="24" fill="url(#p-cyl2-top)" />
                      </g>
                      <g id="pyr-tier-1" className="tier-shape tier-shape-1">
                        <path d="M 210 65 A 70 16 0 0 0 350 65 L 350 108 A 70 16 0 0 1 210 108 Z" fill="url(#p-cyl1-side)" />
                        <ellipse cx="280" cy="65" rx="70" ry="16" fill="url(#p-cyl1-top)" />
                      </g>

                      {/* DROPLETS */}
                      <g id="drop-tier-1" className="tier-drop drop-1"><circle cx="280" cy="87" r="7" fill="url(#p-cyl1-top)" /></g>
                      <g id="drop-tier-2" className="tier-drop drop-2"><circle cx="280" cy="174" r="8" fill="url(#p-cyl2-top)" /></g>
                      <g id="drop-tier-3" className="tier-drop drop-3"><circle cx="280" cy="268" r="9" fill="url(#p-cyl3-top)" /></g>
                      <g id="drop-tier-4" className="tier-drop drop-4"><circle cx="280" cy="372" r="10" fill="url(#p-cyl4-top)" /></g>

                      {/* CALLOUTS */}
                      <g id="callout-tier-1" className="tier-callout-group">
                        <circle id="dot-tier-1" className="callout-dot dot-1" cx="218" cy="87" r="4.5" fill="#FF1E7A" stroke="#FFFFFF" strokeWidth="1.5" />
                        <path id="line-tier-1" className="callout-line line-1" d="M 218 87 L 76 87" stroke="#FF1E7A" strokeWidth="2" strokeDasharray="4,3" clipPath="url(#clip-line-1)" opacity="0.95" />
                        <g id="badge-tier-1" className="callout-badge badge-1"><rect x="12" y="66" width="64" height="42" rx="12" fill="#181E2C" stroke="#FF1E7A" strokeWidth="2" /><text x="44" y="87" dy="0.35em" textAnchor="middle" fill="#FFA0C5" fontSize="16" fontWeight="900">۲۵٪</text></g>
                      </g>
                      <g id="callout-tier-2" className="tier-callout-group">
                        <circle id="dot-tier-2" className="callout-dot dot-2" cx="178" cy="174" r="4.5" fill="#9C27B0" stroke="#FFFFFF" strokeWidth="1.5" />
                        <path id="line-tier-2" className="callout-line line-2" d="M 178 174 L 76 174" stroke="#9C27B0" strokeWidth="2" strokeDasharray="4,3" clipPath="url(#clip-line-2)" opacity="0.95" />
                        <g id="badge-tier-2" className="callout-badge badge-2"><rect x="12" y="153" width="64" height="42" rx="12" fill="#181E2C" stroke="#A855F7" strokeWidth="2" /><text x="44" y="174" dy="0.35em" textAnchor="middle" fill="#E2A6FF" fontSize="16" fontWeight="900">۵۰٪</text></g>
                      </g>
                      <g id="callout-tier-3" className="tier-callout-group">
                        <circle id="dot-tier-3" className="callout-dot dot-3" cx="138" cy="268" r="4.5" fill="#FF6F00" stroke="#FFFFFF" strokeWidth="1.5" />
                        <path id="line-tier-3" className="callout-line line-3" d="M 138 268 L 76 268" stroke="#FF6F00" strokeWidth="2" strokeDasharray="4,3" clipPath="url(#clip-line-3)" opacity="0.95" />
                        <g id="badge-tier-3" className="callout-badge badge-3"><rect x="12" y="247" width="64" height="42" rx="12" fill="#181E2C" stroke="#FF7A00" strokeWidth="2" /><text x="44" y="268" dy="0.35em" textAnchor="middle" fill="#FFC588" fontSize="16" fontWeight="900">۷۵٪</text></g>
                      </g>
                      <g id="callout-tier-4" className="tier-callout-group">
                        <circle id="dot-tier-4" className="callout-dot dot-4" cx="98" cy="370" r="4.5" fill="#99CC00" stroke="#FFFFFF" strokeWidth="1.5" />
                        <path id="line-tier-4" className="callout-line line-4" d="M 98 370 L 76 370" stroke="#99CC00" strokeWidth="2" strokeDasharray="4,3" clipPath="url(#clip-line-4)" opacity="0.95" />
                        <g id="badge-tier-4" className="callout-badge badge-4"><rect x="12" y="349" width="64" height="42" rx="12" fill="#181E2C" stroke="#99CC00" strokeWidth="2" /><text x="44" y="370" dy="0.35em" textAnchor="middle" fill="#EAFF85" fontSize="16" fontWeight="900">۱۰۰٪</text></g>
                      </g>
                    </svg>

                    <div className="pyramid-footer-note mt-4 text-xs text-slate-400 bg-black/40 border border-white/10 px-4 py-1.5 rounded-full">
                      <span>🎯</span> <span>هرم توزیع کارکردی پلتفرم هوش مصنوعی زیرا[cite: 7]</span>
                    </div>
                  </div>

                  <div className="arch-cards-col lg:col-span-7 space-y-3.5">
                    <div className="arch-capsule-card tier-1 bg-[#181E2C] border border-white/10 p-5 rounded-2xl flex justify-between items-center gap-4" style={{ borderRight: '4px solid #FF1E7A' }}>
                      <div className="capsule-sphere w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0" style={{ background: 'linear-gradient(135deg, #ff6ea7 0%, #ff1e7a 100%)' }}>🌐</div>
                      <div className="capsule-info flex-grow">
                        <h3 className="font-extrabold text-sm text-white mb-1">لایه اول: کانال‌های دسترسی و تجربه یکپارچه <span className="card-title-en text-xs text-slate-400 font-normal">(Omnichannel Experience)[cite: 7]</span></h3>
                        <p className="text-xs text-slate-400 leading-relaxed">دسترسی آسان و چندکاناله از طریق وب‌سایت، اپلیکیشن اندروید، افزونه کروم، پیامک، و به‌زودی بات‌های روبیکا، بله و تلفن گویا با شناسه هویتی واحد[cite: 7].</p>
                        <div className="capsule-tags flex flex-wrap gap-1.5 mt-2">
                          {["وب‌سایت ziira.ir", "اپلیکیشن اندروید", "سرشماره پیامکی", "افزونه Chrome", "روبیکا و بله", "IVR تلفن گویا"].map((t, i) => (
                            <span key={i} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-slate-300">{t}[cite: 7]</span>
                          ))}
                        </div>
                      </div>
                      <div className="capsule-pct-pill font-black text-sm px-3 py-1 rounded-xl bg-black/40 border border-white/10 shrink-0 text-[#FFA0C5]">۲۵٪[cite: 7]</div>
                    </div>

                    <div className="arch-capsule-card tier-2 bg-[#181E2C] border border-white/10 p-5 rounded-2xl flex justify-between items-center gap-4" style={{ borderRight: `4px solid ${primaryColor}` }}>
                      <div className="capsule-sphere w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0" style={{ background: primaryColor }}>🤖</div>
                      <div className="capsule-info flex-grow">
                        <h3 className="font-extrabold text-sm text-white mb-1">لایه دوم: دستیاران تخصصی و یکپارچگی عملیاتی <span className="card-title-en text-xs text-slate-400 font-normal">(Agentic AI & Integration)[cite: 7]</span></h3>
                        <p className="text-xs text-slate-400 leading-relaxed">مجموعه دستیاران هوشمند با قابلیت اتصال زنده به سامانه‌های داخلی سازمان (جیرا، CRM و...)، مدیریت اتوماتیک تسک‌ها، پشتیبانی ۲۴/۷ و پردازش چندوجهی تصویر و ویدیو[cite: 7].</p>
                        <div className="capsule-tags flex flex-wrap gap-1.5 mt-2">
                          {["دستیار مدیریت پروژه", "اتصال مستقیم به Jira", "ویجت پشتیبانی و CRM", "پردازش OCR و ویدیو"].map((t, i) => (
                            <span key={i} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-slate-300">{t}[cite: 7]</span>
                          ))}
                        </div>
                      </div>
                      <div className="capsule-pct-pill font-black text-sm px-3 py-1 rounded-xl bg-black/40 border border-white/10 shrink-0" style={{ color: primaryColor }}>۵۰٪[cite: 7]</div>
                    </div>

                    <div className="arch-capsule-card tier-3 bg-[#181E2C] border border-white/10 p-5 rounded-2xl flex justify-between items-center gap-4" style={{ borderRight: '4px solid #FF6F00' }}>
                      <div className="capsule-sphere w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0" style={{ background: '#FF6F00' }}>📚</div>
                      <div className="capsule-info flex-grow">
                        <h3 className="font-extrabold text-sm text-white mb-1">لایه سوم: پایگاه دانش سازمانی و RAG بومی <span className="card-title-en text-xs text-slate-400 font-normal">(Enterprise Knowledge & Security)[cite: 7]</span></h3>
                        <p className="text-xs text-slate-400 leading-relaxed">ایجاد فضای کار اختصاصی (Tenant ایزوله)، بارگذاری امن مستندات پروژه، ماتریکس کنترل دسترسی تیم‌ها (RBAC) و پاسخگویی دقیق و مستند بدون توهم داده‌ای[cite: 7].</p>
                        <div className="capsule-tags flex flex-wrap gap-1.5 mt-2">
                          {["فضای کار اختصاصی", "موتور RAG بومی", "مدیریت سطوح دسترسی", "حاکمیت داده و امنیت"].map((t, i) => (
                            <span key={i} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-slate-300">{t}[cite: 7]</span>
                          ))}
                        </div>
                      </div>
                      <div className="capsule-pct-pill font-black text-sm px-3 py-1 rounded-xl bg-black/40 border border-white/10 shrink-0 text-[#FFC588]">۷۵٪[cite: 7]</div>
                    </div>

                    <div className="arch-capsule-card tier-4 bg-[#181E2C] border border-white/10 p-5 rounded-2xl flex justify-between items-center gap-4" style={{ borderRight: '4px solid #99CC00' }}>
                      <div className="capsule-sphere w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 text-slate-950 font-bold" style={{ background: '#99CC00' }}>⚡</div>
                      <div className="capsule-info flex-grow">
                        <h3 className="font-extrabold text-sm text-white mb-1">لایه چهارم: زیرساخت تجمیعی مدل‌ها و کیف پول مرکزی <span className="card-title-en text-xs text-slate-400 font-normal">(Foundational Model Hub)[cite: 7]</span></h3>
                        <p className="text-xs text-slate-400 leading-relaxed">محیط چندمدلی یکپارچه با تمرکز بر پردازش زبان فارسی، مدیریت متمرکز اعتبار و مصرف (Pay-as-you-go)، سهمیه‌بندی بودجه تیم‌ها و داشبورد تحلیل مصرف سازمان[cite: 7].</p>
                        <div className="capsule-tags flex flex-wrap gap-1.5 mt-2">
                          {["طیف متنوع LLMها", "پردازش عمیق زبان فارسی", "کیف پول متمرکز مصرف", "داشبورد مانیتورینگ"].map((t, i) => (
                            <span key={i} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-slate-300">{t}[cite: 7]</span>
                          ))}
                        </div>
                      </div>
                      <div className="capsule-pct-pill font-black text-sm px-3 py-1 rounded-xl bg-black/40 border border-white/10 shrink-0 text-[#EAFF85]">۱۰۰٪[cite: 7]</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: DUAL CORE ECOSYSTEM */}
            <div className="space-y-6">
              <div className="section-header flex justify-between items-center mb-6">
                <div className="section-title flex items-center gap-3">
                  <div className="section-title-bar w-1.5 h-6 rounded-full" style={{ backgroundColor: primaryColor }} />
                  <h2 className="text-xl font-black text-white">تفکیک راهبردی مخاطبان هدف <span className="sec-title-en text-sm text-slate-400 font-normal">(Dual Core Ecosystem)[cite: 7]</span></h2>
                </div>
                <div className="section-subtitle text-xs text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                  پوشش هم‌زمان بازار خرد مشترکین و شرکت‌های بزرگ سازمانی[cite: 7]
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="dual-box b2c bg-[#181E2C] border border-white/10 rounded-2xl p-6 border-t-4" style={{ borderTopColor: primaryColor }}>
                  <div className="flex justify-between items-center mb-5 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>👤</div>
                      <div>
                        <h3 className="font-black text-base text-white">زیرا برای کاربران عمومی (B2C)[cite: 7]</h3>
                        <span className="text-xs text-slate-400">مشترکین خرد، پژوهشگران، متخصصین و عموم شهروندان[cite: 7]</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>پایگاه مصرف انبوه[cite: 7]</span>
                  </div>

                  <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: primaryColor }} />
                      <div><strong>دسترسی چندکاناله همه‌جا‌حاضر:</strong> تعامل روان از طریق وب‌سایت، اپلیکیشن، افزونه کروم و بات‌های پیام‌رسان بومی[cite: 7].</div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: primaryColor }} />
                      <div><strong>شناسه هویت واحد (Single Sign-On):</strong> حفظ تاریخچه مکالمات، پرامپت‌ها و داده‌ها با شماره تلفن همراه[cite: 7].</div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: primaryColor }} />
                      <div><strong>کیف پول خرد مرکزی (Micro-Wallet):</strong> شارژ آسان اعتباری و پرداخت منعطف متناسب با مصرف واقعی (Pay-As-You-Go)[cite: 7].</div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: primaryColor }} />
                      <div><strong>تنوع خدمات چندرسانه‌ای:</strong> گفت‌وگو، تولید محتوای متنی، پردازش و ساخت تصاویر و خلاصه‌سازی هوشمند[cite: 7].</div>
                    </li>
                  </ul>

                  <div className="mt-5 p-3 rounded-xl bg-black/40 border border-white/5 text-xs">
                    <strong style={{ color: primaryColor }}>اهرم همراه اول:</strong> امکان فعال‌سازی مستقیم روی بسته اینترنت، شارژ اعتباری و پرداخت روی قبض سیم‌کارت[cite: 7].
                  </div>
                </div>

                <div className="dual-box b2b bg-[#181E2C] border border-white/10 rounded-2xl p-6 border-t-4 border-t-[#99CC00]">
                  <div className="flex justify-between items-center mb-5 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#99CC00]/20 text-[#99CC00] flex items-center justify-center text-xl">🏢</div>
                      <div>
                        <h3 className="font-black text-base text-white">زیرا برای سازمان‌ها و کسب‌وکارها (B2B)[cite: 7]</h3>
                        <span className="text-xs text-slate-400">هلدینگ‌ها، بانک‌ها، اپراتورها و شرکت‌های فناور کشور[cite: 7]</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#99CC00]/20 text-[#99CC00]">درآمدزایی پایدار سازمانی[cite: 7]</span>
                  </div>

                  <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#99CC00]" />
                      <div><strong>فضای کاری اختصاصی (Enterprise Tenant):</strong> محیط امن، رمزنگاری‌شده و کاملاً ایزوله مختص هر سازمان[cite: 7].</div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#99CC00]" />
                      <div><strong>ماتریکس مدیریت دسترسی (RBAC):</strong> تعیین نقش‌ها، دسترسی تیم‌ها به مدل‌های مشخص و پایش امنیت داده‌ها[cite: 7].</div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#99CC00]" />
                      <div><strong>کیف پول سازمانی و سهمیه‌بندی:</strong> تخصیص بودجه و سقف مصرف هوش مصنوعی برای هر دپارتمان یا واحد کاری[cite: 7].</div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#99CC00]" />
                      <div><strong>ادغام عمیق در فرآیندهای کسب‌وکار:</strong> تبدیل هوش مصنوعی به بازوی اتوماسیون تصمیم‌گیری و اجرای وظایف[cite: 7].</div>
                    </li>
                  </ul>

                  <div className="mt-5 p-3 rounded-xl bg-black/40 border border-white/5 text-xs">
                    <strong className="text-[#99CC00]">ارزش افزوده همراه اول:</strong> بسته‌بندی در قالب بسته راهکارهای سازمانی همراه اول (B2B) برای ۵۰۰ شرکت برتر کشور[cite: 7].
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3: 4 VALUE ENGINES (GAUGES) */}
            <div className="gauge-section space-y-6">
              <div className="section-header flex justify-between items-center mb-6">
                <div className="section-title flex items-center gap-3">
                  <div className="section-title-bar w-1.5 h-6 rounded-full" style={{ backgroundColor: primaryColor }} />
                  <h2 className="text-xl font-black text-white">۴ موتور تمایز و ارزش‌آفرینی پلتفرم «زیرا» <span className="sec-title-en text-sm text-slate-400 font-normal">(Core Value Engines)[cite: 7]</span></h2>
                </div>
                <div className="section-subtitle text-xs text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                  مزیت رقابتی پایدار در صنعت هوش مصنوعی کشور[cite: 7]
                </div>
              </div>

              <div className="gauge-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { cls: 'gauge-cyan', icon: '🇮🇷', title: 'بومی‌سازی عمیق فارسی', desc: 'درک دقیق تفاوت‌های زبانی، ادبیات تخصصی اداری، حقوقی و تجاری ایران بدون افت کیفیت در مقایسه با ابزارهای غیربومی.' },
                  { cls: 'gauge-green', icon: '🔗', title: 'لایه اتصال سامانه‌ای', desc: 'یکپارچگی بی‌واسطه با جیرا، سیستم‌های مدیریت وظایف، CRM و پایگاه‌های دانش داخلی به عنوان لایه هوشمند سازمان.' },
                  { cls: 'gauge-purple', icon: '📊', title: 'حاکمیت مصرف و هزینه', desc: 'داشبورد زنده پایش توکن، گزارش‌گیری دپارتمانی، سقف اعتباری تیم‌ها و شفافیت کامل در مدل‌های پرداخت سازمانی و فردی.' },
                  { cls: 'gauge-orange', icon: '👁️', title: 'پردازش چندوجهی رسانه', desc: 'استخراج هوشمند متن از تصاویر، جستجوی ویژوال در کاتالوگ محصولات دیجیتال و خلاصه‌سازی هوشمند محتوای ویدیویی.' },
                ].map((g, idx) => (
                  <div key={idx} className={`gauge-card ${g.cls} bg-[#181E2C] border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg`}>
                    <div className="gauge-vis w-32 h-32 relative flex items-center justify-center mb-4">
                      <svg className="gauge-svg w-full h-full -rotate-90" viewBox="0 0 140 140">
                        <circle className="gauge-bg-circle" cx="70" cy="70" r="56" fill="none" stroke="#252D3D" strokeWidth="12" />
                        <circle className="gauge-fill-circle" cx="70" cy="70" r="56" fill="none" strokeWidth="12" strokeLinecap="round" />
                      </svg>
                      <div className="gauge-inner-sphere absolute w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-2xl shadow-inner border border-white/10">
                        <span>{g.icon}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-sm text-white mb-2">{g.title}[cite: 7]</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{g.desc}[cite: 7]</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 4: ENTERPRISE PORTFOLIO */}
            <div className="space-y-6">
              <div className="section-header flex justify-between items-center mb-6">
                <div className="section-title flex items-center gap-3">
                  <div className="section-title-bar w-1.5 h-6 rounded-full" style={{ backgroundColor: primaryColor }} />
                  <h2 className="text-xl font-black text-white">سبد راهکارهای تخصصی سازمانی <span className="sec-title-en text-sm text-slate-400 font-normal">(Enterprise AI Portfolio)[cite: 7]</span></h2>
                </div>
                <div className="section-subtitle text-xs text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                  محصولات آماده به‌کار جهت ارتقای بهره‌وری عملیاتی[cite: 7]
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#181E2C] border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-white/10">
                    <div className="w-11 h-11 rounded-full bg-[#99CC00] text-slate-950 font-bold flex items-center justify-center text-xl">🎯</div>
                    <div>
                      <h3 className="font-black text-base text-white">دستیار مدیریت و عملیات پروژه (Project Ops AI)[cite: 7]</h3>
                      <span className="text-xs text-slate-400">کاهش محسوس اصطکاک پروژه‌های پیچیده سازمانی[cite: 7]</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs">
                    {[
                      { icon: '📁', title: 'تحلیل اطلاعات و مستندات:', desc: 'استخراج آنی پیش‌نیازها و شناسایی موانع' },
                      { icon: '⚡', title: 'برنامه‌ریزی و اولویت‌بندی:', desc: 'چیدمان فعالیت‌ها بر مبنای توان واقعی تیم' },
                      { icon: '🔗', title: 'اتصال به Jira و Task Manager:', desc: 'ثبت و تخصیص مستقیم وظایف' },
                      { icon: '📈', title: 'گزارش‌های مدیریتی:', desc: 'سنجش وضعیت پیشرفت پروژه بر اساس داده‌های زنده' },
                      { icon: '🛡️', title: 'رعایت سطح دسترسی:', desc: 'تفکیک دسترسی کاربران هنگام فراخوانی اطلاعات پروژه' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/5 p-2.5 rounded-xl">
                        <span className="text-lg">{item.icon}</span>
                        <div>
                          <strong className="text-white ml-1">{item.title}</strong>
                          <span className="text-slate-400">{item.desc}[cite: 7]</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#181E2C] border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-white/10">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-xl text-white font-bold" style={{ backgroundColor: primaryColor }}>🎧</div>
                    <div>
                      <h3 className="font-black text-base text-white">دستیار هوشمند پشتیبانی و پاسخ‌گویی (Omni Support AI)[cite: 7]</h3>
                      <span className="text-xs text-slate-400">پاسخگویی ۲۴/۷ متناسب با محصولات و خدمات کسب‌وکار[cite: 7]</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs">
                    {[
                      { icon: '💬', title: 'پاسخ‌گویی هوشمند:', desc: 'رفع سوالات مشتریان بدون صف انتظار و خستگی' },
                      { icon: '📚', title: 'پایگاه دانش اختصاصی:', desc: 'تکیه بر اطلاعات و اسناد رسمی کسب‌وکار' },
                      { icon: '🌐', title: 'ویجت وب‌سایت و اپلیکیشن:', desc: 'استقرار تجربه گفتگو‌محور در چند دقیقه' },
                      { icon: '🔍', title: 'تحلیل رفتار و تعاملات:', desc: 'شناسایی موضوعات و نیازهای پرتکرار مشتریان' },
                      { icon: '🔄', title: 'اتصال به سیستم‌های تیکتینگ:', desc: 'ارجاع هوشمند موارد خاص به کارشناسان' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/5 p-2.5 rounded-xl">
                        <span className="text-lg">{item.icon}</span>
                        <div>
                          <strong className="text-white ml-1">{item.title}</strong>
                          <span className="text-slate-400">{item.desc}[cite: 7]</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 5: OMNICHANNEL ECOSYSTEM */}
            <div className="omni-section bg-gradient-to-tr from-[#131722] to-[#1F2738] border border-white/10 rounded-3xl p-6 sm:p-10 space-y-6">
              <div className="section-title flex items-center gap-3">
                <div className="section-title-bar w-1.5 h-6 rounded-full" style={{ backgroundColor: primaryColor }} />
                <h2 className="text-xl font-black text-white">کانال‌های دسترسی و نقشه راه توسعه (Omnichannel Ecosystem)[cite: 7]</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="text-xs font-black text-[#00D2FF] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00E676] shadow-sm"></span>
                    <span>کانال‌های فعال و در دسترس کاربران (Active Channels)[cite: 7]</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {[
                      { icon: '🌐', name: 'وب‌سایت اختصاصی', meta: 'ziira.ir (محیط ابری پرسرعت)' },
                      { icon: '📱', name: 'اپلیکیشن اندروید', meta: 'تجربه کاربری نیتیو موبایل' },
                      { icon: '🧩', name: 'افزونه مرورگر Chrome', meta: 'دستیار همراه وب‌گردی و مطالعه' },
                      { icon: '💬', name: 'سرشماره پیامکی (SMS)', meta: 'هوش مصنوعی بدون نیاز به اینترنت' },
                    ].map((ch, i) => (
                      <div key={i} className="bg-black/30 border border-white/10 p-3 rounded-xl flex items-center gap-3 border-r-3 border-r-[#00D2FF]">
                        <span className="text-xl">{ch.icon}</span>
                        <div>
                          <div className="font-bold text-white">{ch.name}[cite: 7]</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{ch.meta}[cite: 7]</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-xs font-black text-purple-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 shadow-sm"></span>
                    <span>کانال‌های در آستانه راه‌اندازی (Upcoming Pipeline)[cite: 7]</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {[
                      { icon: '💬', name: 'ربات پیام‌رسان بله', meta: 'یکپارچگی با جامعه کسب‌وکاری' },
                      { icon: '⚡', name: 'ربات پیام‌رسان روبیکا', meta: 'دسترسی به میلیون‌ها کاربر ملی' },
                      { icon: '📞', name: 'خط تلفن گویا (Smart IVR)', meta: 'تعامل صوتی هوشمند بر بستر همراه اول' },
                      { icon: '⚙️', name: 'سرویس‌های اختصاصی سازمانی', meta: 'طراحی متناسب با سامانه‌های کلان هر شرکت' },
                    ].map((ch, i) => (
                      <div key={i} className="bg-black/30 border border-white/10 p-3 rounded-xl flex items-center gap-3 border-r-3 border-r-purple-500 opacity-90">
                        <span className="text-xl">{ch.icon}</span>
                        <div>
                          <div className="font-bold text-white">{ch.name}[cite: 7]</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{ch.meta}[cite: 7]</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <footer className="footer bg-[#090B10] p-6 sm:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs border-t border-white/10">
            <div className="text-white">پلتفرم زیرا؛ <span style={{ color: primaryColor }}>هوش مصنوعی، یکپارچه و در دسترس[cite: 7]</span></div>
            <div className="text-slate-500">شرکت همراه کسب‌وکارهای هوشمند (EBCOM) • بازوی نوآوری دیجیتال هلدینگ همراه اول[cite: 7]</div>
          </footer>
        </div>
      </div>
    </div>
  );
}