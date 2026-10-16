import React, { useState, useEffect } from 'react';
import TopBar from '../components/common/TopBar';

const primaryColor = '#FF7722';

const timelineData = [
  { month: 'مهر ۱۴۰۵', year: '1405', badge: 'آخرین وضعیت عملکردی', ratio: '۳۱.۶٪', allocVal: '۱,۱۹۵,۰۴۴,۰۰۰,۰۰۰ ریال (۱۱۹.۵ میلیارد تومان)', allocWidth: 46.9, consVal: '۳۷۷,۹۳۹,۰۰۰,۰۰۰ ریال (۳۷.۸ میلیارد تومان)', consWidth: 47.3, usersVal: '۸۴,۲۱۷ نفر (B2C: ۸۳,۳۷۸ | B2B: ۸۳۹)', usersWidth: 2.1 },
  { month: 'شهریور ۱۴۰۵', year: '1405', badge: '🔥 اوج تاریخی جذب کاربر (۳.۹۸ میلیون)', peak: true, ratio: '۳۰.۴٪', allocVal: '۱,۹۸۷,۳۷۱,۰۰۰,۰۰۰ ریال (۱۹۸.۷ میلیارد تومان)', allocWidth: 78.0, consVal: '۶۰۴,۲۲۰,۰۰۰,۰۰۰ ریال (۶۰.۴ میلیارد تومان)', consWidth: 75.6, usersVal: '۳,۹۸۶,۹۸۹ نفر (B2C: ۳,۹۸۶,۰۲۲ | B2B: ۹۶۷)', usersWidth: 100.0 },
  { month: 'مرداد ۱۴۰۵', year: '1405', badge: '⭐ رکورد تاریخی تخصیص (۲.۵۵ همت ریال)', record: true, ratio: '۲۴.۴٪', allocVal: '۲,۵۴۸,۸۵۵,۰۰۰,۰۰۰ ریال (۲۵۴.۹ میلیارد تومان)', allocWidth: 100.0, consVal: '۶۲۱,۱۴۱,۰۰۰,۰۰۰ ریال (۶۲.۱ میلیارد تومان)', consWidth: 77.7, usersVal: '۱,۹۹۷,۸۸۵ نفر (B2C: ۱,۹۹۷,۸۲۳ | B2B: ۶۲)', usersWidth: 50.1 },
  { month: 'تیر ۱۴۰۵', year: '1405', badge: null, ratio: '۹۰.۴٪', allocVal: '۳۸۹,۲۷۰,۰۰۰,۰۰۰ ریال (۳۸.۹ میلیارد تومان)', allocWidth: 15.3, consVal: '۳۵۱,۸۵۶,۰۰۰,۰۰۰ ریال (۳۵.۲ میلیارد تومان)', consWidth: 44.0, usersVal: '۳۸,۶۸۹ نفر (B2C: ۳۸,۴۶۶ | B2B: ۲۲۳)', usersWidth: 1.0 },
  { month: 'خرداد ۱۴۰۵', year: '1405', badge: null, ratio: '۵۱.۶٪', allocVal: '۴۷۳,۷۴۹,۰۰۰,۰۰۰ ریال (۴۷.۴ میلیارد تومان)', allocWidth: 18.6, consVal: '۲۴۴,۶۵۶,۰۰۰,۰۰۰ ریال (۲۴.۵ میلیارد تومان)', consWidth: 30.6, usersVal: '۵۰,۱۷۸ نفر (B2C: ۴۹,۶۹۳ | B2B: ۴۸۵)', usersWidth: 1.3 },
  { month: 'اردیبهشت ۱۴۰۵', year: '1405', badge: null, ratio: '۲۳۷.۶٪', allocVal: '۸۸,۷۶۸,۰۰۰,۰۰۰ ریال (۸.۹ میلیارد تومان)', allocWidth: 3.5, consVal: '۲۱۰,۸۷۱,۰۰۰,۰۰۰ ریال (۲۱.۱ میلیارد تومان)', consWidth: 26.4, usersVal: '۸,۱۷۷ نفر (B2C: ۷,۷۷۰ | B2B: ۴۰۷)', usersWidth: 0.2 },
  { month: 'فروردین ۱۴۰۵', year: '1405', badge: null, ratio: '۳۸۸.۸٪', allocVal: '۳۶,۶۵۱,۰۰۰,۰۰۰ ریال (۳.۷ میلیارد تومان)', allocWidth: 1.4, consVal: '۱۴۲,۵۱۳,۰۰۰,۰۰۰ ریال (۱۴.۳ میلیارد تومان)', consWidth: 17.8, usersVal: '۷,۳۲۵ نفر (B2C: ۷,۳۲۱ | B2B: ۴)', usersWidth: 0.2 },
  { month: 'اسفند ۱۴۰۴', year: '1404', badge: null, ratio: '۲۱۵.۹٪', allocVal: '۱۵۵,۷۷۸,۰۰۰,۰۰۰ ریال (۱۵.۶ میلیارد تومان)', allocWidth: 6.1, consVal: '۳۳۶,۳۱۹,۰۰۰,۰۰۰ ریال (۳۳.۶ میلیارد تومان)', consWidth: 42.1, usersVal: '۲۵,۴۲۸ نفر (B2C: ۲۴,۹۱۹ | B2B: ۵۰۹)', usersWidth: 0.6 },
  { month: 'بهمن ۱۴۰۴', year: '1404', badge: '⚡ رکورد تاریخی مصرف (۷۹۹ میلیارد ریال)', consRec: true, ratio: '۷۸.۲٪', allocVal: '۱,۰۲۱,۸۱۲,۰۰۰,۰۰۰ ریال (۱۰۲.۲ میلیارد تومان)', allocWidth: 40.1, consVal: '۷۹۹,۴۱۴,۰۰۰,۰۰۰ ریال (۷۹.۹ میلیارد تومان)', consWidth: 100.0, usersVal: '۱۶۰,۶۴۴ نفر (B2C: ۱۲۴,۶۲۸ | B2B: ۳۶,۰۱۶)', usersWidth: 4.0 },
  { month: 'دی ۱۴۰۴', year: '1404', badge: null, ratio: '۱۱۵.۱٪', allocVal: '۲۲۰,۷۸۱,۰۰۰,۰۰۰ ریال (۲۲.۱ میلیارد تومان)', allocWidth: 8.7, consVal: '۲۵۴,۱۳۷,۰۰۰,۰۰۰ ریال (۲۵.۴ میلیارد تومان)', consWidth: 31.8, usersVal: '۳۵,۳۹۲ نفر (B2C: ۳۴,۹۴۹ | B2B: ۴۴۳)', usersWidth: 0.9 },
  { month: 'آذر ۱۴۰۴', year: '1404', badge: null, ratio: '۹۷.۹٪', allocVal: '۲۹۰,۳۵۳,۰۰۰,۰۰۰ ریال (۲۹.۰ میلیارد تومان)', allocWidth: 11.4, consVal: '۲۸۴,۳۹۷,۰۰۰,۰۰۰ ریال (۲۸.۴ میلیارد تومان)', consWidth: 35.6, usersVal: '۴۷,۶۲۵ نفر (B2C: ۴۷,۲۰۷ | B2B: ۴۱۸)', usersWidth: 1.2 },
  { month: 'آبان ۱۴۰۴', year: '1404', badge: null, ratio: '۲۱۹.۱٪', allocVal: '۹۳,۷۲۴,۰۰۰,۰۰۰ ریال (۹.۴ میلیارد تومان)', allocWidth: 3.7, consVal: '۲۰۵,۳۵۷,۰۰۰,۰۰۰ ریال (۲۰.۵ میلیارد تومان)', consWidth: 25.7, usersVal: '۶,۰۲۶ نفر (B2C: ۵,۱۹۹ | B2B: ۸۲۷)', usersWidth: 0.2 },
  { month: 'مهر ۱۴۰۴', year: '1404', badge: null, ratio: '۱۰۲.۴٪', allocVal: '۲۰۳,۸۰۸,۰۰۰,۰۰۰ ریال (۲۰.۴ میلیارد تومان)', allocWidth: 8.0, consVal: '۲۰۸,۶۰۸,۰۰۰,۰۰۰ ریال (۲۰.۹ میلیارد تومان)', consWidth: 26.1, usersVal: '۲۶,۲۷۸ نفر (B2C: ۲۵,۳۹۳ | B2B: ۸۸۵)', usersWidth: 0.7 },
  { month: 'شهریور ۱۴۰۴', year: '1404', badge: null, ratio: '۹۰.۰٪', allocVal: '۲۳۳,۰۶۵,۰۰۰,۰۰۰ ریال (۲۳.۳ میلیارد تومان)', allocWidth: 9.1, consVal: '۲۰۹,۶۵۸,۰۰۰,۰۰۰ ریال (۲۱.۰ میلیارد تومان)', consWidth: 26.2, usersVal: '۱۳,۶۶۳ نفر (B2C: ۱۲,۰۷۷ | B2B: ۱,۵۸۶)', usersWidth: 0.3 },
  { month: 'مرداد ۱۴۰۴', year: '1404', badge: null, ratio: '۱۱۲.۴٪', allocVal: '۱۱۶,۳۶۸,۰۰۰,۰۰۰ ریال (۱۱.۶ میلیارد تومان)', allocWidth: 4.6, consVal: '۱۳۰,۸۱۳,۰۰۰,۰۰۰ ریال (۱۳.۱ میلیارد تومان)', consWidth: 16.4, usersVal: '۱۳,۶۹۵ نفر (B2C: ۱۳,۲۸۳ | B2B: ۴۱۲)', usersWidth: 0.3 },
  { month: 'تیر ۱۴۰۴', year: '1404', badge: null, ratio: '۳۱۲.۷٪', allocVal: '۲۹,۲۰۶,۰۰۰,۰۰۰ ریال (۲.۹ میلیارد تومان)', allocWidth: 1.1, consVal: '۹۱,۳۱۵,۰۰۰,۰۰۰ ریال (۹.۱ میلیارد تومان)', consWidth: 11.4, usersVal: '۴,۲۷۲ نفر (B2C: ۴,۲۵۸ | B2B: ۱۴)', usersWidth: 0.1 },
  { month: 'خرداد ۱۴۰۴', year: '1404', badge: null, ratio: '۱۲۳.۵٪', allocVal: '۹۱,۰۹۵,۰۰۰,۰۰۰ ریال (۹.۱ میلیارد تومان)', allocWidth: 3.6, consVal: '۱۱۲,۴۸۹,۰۰۰,۰۰۰ ریال (۱۱.۲ میلیارد تومان)', consWidth: 14.1, usersVal: '۱۳,۰۹۲ نفر (B2C: ۱۲,۹۸۴ | B2B: ۱۰۸)', usersWidth: 0.3 },
  { month: 'اردیبهشت ۱۴۰۴', year: '1404', badge: null, ratio: '۱۵۲.۶٪', allocVal: '۸۹,۳۵۱,۰۰۰,۰۰۰ ریال (۸.۹ میلیارد تومان)', allocWidth: 3.5, consVal: '۱۳۶,۳۴۸,۰۰۰,۰۰۰ ریال (۱۳.۶ میلیارد تومان)', consWidth: 17.1, usersVal: '۹,۵۳۵ نفر (B2C: ۹,۴۹۸ | B2B: ۳۷)', usersWidth: 0.2 },
  { month: 'فروردین ۱۴۰۴', year: '1404', badge: null, ratio: '۱۳۸.۰٪', allocVal: '۸۳,۵۴۶,۰۰۰,۰۰۰ ریال (۸.۴ میلیارد تومان)', allocWidth: 3.3, consVal: '۱۱۵,۲۷۱,۰۰۰,۰۰۰ ریال (۱۱.۵ میلیارد تومان)', consWidth: 14.4, usersVal: '۸,۴۹۱ نفر (B2C: ۸,۴۹۱ | B2B: ۰)', usersWidth: 0.2 },
  { month: 'اسفند ۱۴۰۳', year: '1403', badge: null, ratio: '۸۴.۴٪', allocVal: '۱۰۵,۹۰۴,۰۰۰,۰۰۰ ریال (۱۰.۶ میلیارد تومان)', allocWidth: 4.2, consVal: '۸۹,۳۶۰,۰۰۰,۰۰۰ ریال (۸.۹ میلیارد تومان)', consWidth: 11.2, usersVal: '۱۲,۵۲۲ نفر (B2C: ۱۱,۷۵۹ | B2B: ۷۶۳)', usersWidth: 0.3 },
  { month: 'بهمن ۱۴۰۳', year: '1403', badge: null, ratio: '۳۳۵.۴٪', allocVal: '۲۰,۸۵۷,۰۰۰,۰۰۰ ریال (۲.۱ میلیارد تومان)', allocWidth: 0.8, consVal: '۶۹,۹۶۴,۰۰۰,۰۰۰ ریال (۷.۰ میلیارد تومان)', consWidth: 8.8, usersVal: '۳,۶۷۳ نفر (B2C: ۳,۴۷۳ | B2B: ۲۰۰)', usersWidth: 0.1 },
  { month: 'دی ۱۴۰۳', year: '1403', badge: null, ratio: '۱۶۰.۶٪', allocVal: '۳۴,۳۱۴,۰۰۰,۰۰۰ ریال (۳.۴ میلیارد تومان)', allocWidth: 1.3, consVal: '۵۵,۱۰۳,۰۰۰,۰۰۰ ریال (۵.۵ میلیارد تومان)', consWidth: 6.9, usersVal: '۵,۷۲۵ نفر (B2C: ۵,۷۲۵ | B2B: ۰)', usersWidth: 0.1 },
  { month: 'آذر ۱۴۰۳', year: '1403', badge: null, ratio: '۱۷۷.۰٪', allocVal: '۲۷,۵۸۷,۰۰۰,۰۰۰ ریال (۲.۸ میلیارد تومان)', allocWidth: 1.1, consVal: '۴۸,۸۲۵,۰۰۰,۰۰۰ ریال (۴.۹ میلیارد تومان)', consWidth: 6.1, usersVal: '۴,۶۴۸ نفر (B2C: ۴,۶۰۹ | B2B: ۳۹)', usersWidth: 0.1 },
  { month: 'آبان ۱۴۰۳', year: '1403', badge: null, ratio: '۱۰۶.۵٪', allocVal: '۵۴,۲۴۴,۰۰۰,۰۰۰ ریال (۵.۴ میلیارد تومان)', allocWidth: 2.1, consVal: '۵۷,۷۴۳,۰۰۰,۰۰۰ ریال (۵.۸ میلیارد تومان)', consWidth: 7.2, usersVal: '۹,۰۵۵ نفر (B2C: ۹,۰۵۲ | B2B: ۳)', usersWidth: 0.2 },
  { month: 'مهر ۱۴۰۳', year: '1403', badge: null, ratio: '۲۲.۱٪', allocVal: '۵۸,۲۸۲,۰۰۰,۰۰۰ ریال (۵.۸ میلیارد تومان)', allocWidth: 2.3, consVal: '۱۲,۸۶۸,۰۰۰,۰۰۰ ریال (۱.۳ میلیارد تومان)', consWidth: 1.6, usersVal: '۹,۷۲۵ نفر (B2C: ۹,۷۲۵ | B2B: ۰)', usersWidth: 0.2 },
  { month: 'شهریور ۱۴۰۳', year: '1403', badge: null, ratio: '۴۹.۸٪', allocVal: '۶,۸۲۶,۰۰۰,۰۰۰ ریال (۶۸۲.۶ میلیون تومان)', allocWidth: 0.3, consVal: '۳,۳۹۸,۰۰۰,۰۰۰ ریال (۳۳۹.۸ میلیون تومان)', consWidth: 0.4, usersVal: '۱,۱۴۱ نفر (B2C: ۱,۱۴۱ | B2B: ۰)', usersWidth: 0.0 },
  { month: 'مرداد ۱۴۰۳', year: '1403', badge: null, ratio: '۹۳.۱٪', allocVal: '۲,۷۸۳,۰۰۰,۰۰۰ ریال (۲۷۸.۳ میلیون تومان)', allocWidth: 0.1, consVal: '۲,۵۹۲,۰۰۰,۰۰۰ ریال (۲۵۹.۲ میلیون تومان)', consWidth: 0.3, usersVal: '۴۶۵ نفر (B2C: ۴۶۵ | B2B: ۰)', usersWidth: 0.0 },
  { month: 'تیر ۱۴۰۳', year: '1403', badge: null, ratio: '۸۲.۴٪', allocVal: '۱,۷۸۰,۰۰۰,۰۰۰ ریال (۱۷۸.۰ میلیون تومان)', allocWidth: 0.1, consVal: '۱,۴۶۶,۰۰۰,۰۰۰ ریال (۱۴۶.۶ میلیون تومان)', consWidth: 0.2, usersVal: '۲۹۹ نفر (B2C: ۲۹۸ | B2B: ۱)', usersWidth: 0.0 },
  { month: 'خرداد ۱۴۰۳', year: '1403', badge: 'آغاز راه‌اندازی طرح', ratio: '۸۷۳۱.۲٪', allocVal: '۳۲,۰۰۰,۰۰۰ ریال (۳.۲ میلیون تومان)', allocWidth: 0.0, consVal: '۲,۷۹۴,۰۰۰,۰۰۰ ریال (۲۷۹.۴ میلیون تومان)', consWidth: 0.3, usersVal: '۶ نفر (B2C: ۶ | B2B: ۰)', usersWidth: 0.0 },
];

export default function Credit() {
  const [currentView, setCurrentView] = useState('all');
  const [vizMode, setVizMode] = useState('amount');
  const [timelineYear, setTimelineYear] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll('.gauge-needle').forEach((needle) => {
        const angle = needle.getAttribute('data-angle');
        if (angle) {
          needle.style.transform = `rotate(${angle}deg)`;
          setTimeout(() => needle.classList.add('quivering'), 1800);
        }
      });
      document.querySelectorAll('.gauge-progress-arc').forEach((arc) => {
        const pct = parseFloat(arc.getAttribute('data-pct'));
        if (!isNaN(pct)) {
          arc.style.strokeDashoffset = `${205 * (1 - pct / 100)}`;
        }
      });
      document.querySelectorAll('.tl-bar-fill').forEach((bar) => {
        const targetWidth = bar.getAttribute('data-width') || '0';
        bar.style.width = `${targetWidth}%`;
      });
    }, 150);

    return () => clearTimeout(timer);
  }, [currentView, timelineYear]);

  const filteredTimeline = timelineData.filter(item => {
    if (timelineYear === 'all') return true;
    return item.year === timelineYear;
  });

  return (
    <div className="min-h-screen py-6 flex flex-col items-center">
      <TopBar title="داشبورد راهبردی اعتبار EBCOM" />

      <div className="w-full max-w-[1200px] bg-white text-slate-900 rounded-[28px] shadow-2xl border border-[#E2E0D9] overflow-hidden my-4">
        {/* HEADER / BRAND LOCKUP */}
        <header className="bg-[#1C1C1C] text-white p-8 sm:p-12 relative">
          <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-5 flex-wrap">
              <img
                src="/assets/images/EBCOM.png"
                alt="EBCOM"
                className="h-10 sm:h-12 w-auto object-contain brightness-0 invert"
                onError={(e) => { e.target.src = '/assets/images/ebcom-sign.png'; }}
              />
              <div className="hidden sm:block w-px h-8 bg-white/20" />
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
                  هم‌پیمان استراتژیک: <strong style={{ color: primaryColor }}>همراه اول</strong>
                </span>
                <span className="bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
                  پلتفرم اجرا: <strong style={{ color: primaryColor }}>اوانو (Ewano)</strong>
                </span>
              </div>
            </div>
            <div
              className="font-black text-xs px-4 py-2 rounded-full shadow-lg"
              style={{ backgroundColor: primaryColor, color: '#FFFFFF' }}
            >
              اطلاعات خام و تحلیلی BNPL
            </div>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              اکوسیستم جامع خدمات اعتباردهی هوشمند
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed text-justify font-light">
              شرکت همراه کسب‌وکارهای هوشمند (EBCOM)، با تمرکز بر توسعه راهکارهای اعتباردهی، مجموعه‌ای متنوع از طرح‌های اعتباری (BNPL) متناسب با نیاز و رفتار سگمنت‌های مختلف کاربران، از متقاضیان خرد تا ۵۰۰ شرکت برتر کشور و مشترکین ارزشمند دائمی همراه اول را طراحی و عملیاتی کرده است.
            </p>
          </div>

          {/* ۳ بنر شاخص ارقام کلان */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
            <div className="bg-white/5 border border-white/15 rounded-2xl p-6 text-center backdrop-blur-md relative overflow-hidden transition-transform duration-300 hover:-translate-y-1" style={{ borderTop: `4px solid ${primaryColor}` }}>
              <div className="text-3xl sm:text-4xl font-black mb-1" style={{ color: primaryColor }}>
                ۴۹.۲۸٪
              </div>
              <div className="text-sm font-bold text-white mb-1">۴۹.۲۸٪ تحقق مبلغ تخصیص کلوز</div>
              <div className="text-xs text-slate-400">۳,۲۷۰ میلیارد تومان از ۶,۶۳۵ میلیارد تومان تارگت</div>
            </div>

            <div className="bg-white/5 border border-white/15 rounded-2xl p-6 text-center backdrop-blur-md relative overflow-hidden transition-transform duration-300 hover:-translate-y-1" style={{ borderTop: `4px solid #00A3E0` }}>
              <div className="text-3xl sm:text-4xl font-black text-[#00A3E0] mb-1">
                ۱.۵۰ <span className="text-lg">همت</span>
              </div>
              <div className="text-sm font-bold text-white mb-1">مجموع مصرف ریالی</div>
              <div className="text-xs text-slate-400">۱,۴۹۸ میلیارد تومان مصرف کلوز و اوپن (۱۷.۳٪ کل)</div>
            </div>

            <div className="bg-white/5 border border-white/15 rounded-2xl p-6 text-center backdrop-blur-md relative overflow-hidden transition-transform duration-300 hover:-translate-y-1" style={{ borderTop: `4px solid ${primaryColor}` }}>
              <div className="text-3xl sm:text-4xl font-black mb-1" style={{ color: primaryColor }}>
                ۴.۷۱ <span className="text-lg">همت</span>
              </div>
              <div className="text-sm font-bold text-white mb-1">تخصیص منابع (همت)</div>
              <div className="text-xs text-slate-400">۴,۷۱۰ میلیارد تومان مجموع تخصیص ریالی (۴۶.۱٪ کل)</div>
            </div>
          </div>
        </header>

        {/* INTERACTIVE NAV TABS */}
        <div className="flex bg-[#111520] border-b border-white/10 px-6 sm:px-12 py-3 gap-3 overflow-x-auto">
          {[
            { id: 'all', label: 'نمایش جامع سیستم', icon: '🎯' },
            { id: 'close', label: 'اعتبار حلقه بسته', icon: '🔒' },
            { id: 'open', label: 'اعتبار حلقه باز', icon: '🌐' },
            { id: 'installments', label: 'تحلیل مدل‌های اقساطی', icon: '📊' },
            { id: 'timeline', label: 'تایملاین پویای رشد', icon: '📈' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCurrentView(tab.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: currentView === tab.id ? primaryColor : 'rgba(255,255,255,0.05)',
                color: currentView === tab.id ? '#FFFFFF' : '#CBD5E1',
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ۵ ستون استراتژیک */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 p-6 sm:px-12 bg-[#F2F0EB] border-b border-[#E2E0D9]">
          {[
            { num: '۰۱. سگمنت‌بندی کاربران', text: 'تفکیک طرح‌های اعتباری بر اساس ویژگی‌های رفتاری و ارزش هر سگمنت' },
            { num: '۰۲. اهرم همراه اول', text: 'بهره‌گیری هم‌افزا از دارایی‌ها، داده‌ها و کانال‌های از پیش موجود' },
            { num: '۰۳. مکانیزم ریوالو (Revolving)', text: 'افزایش نرخ استفاده مجدد از اعتبار با تسویه‌های دوره‌ای و چرخشی' },
            { num: '۰۴. مشارکت مالی و ریسک', text: 'تأمین مالی با نهادهای بانکی و انتقال بهینه ریسک نکول مطالبات' },
            { num: '۰۵. توسعه طرح پرستیژ', text: 'توسعه تدریجی طرح‌های پیشرفته با تکیه بر تجربه به‌دست‌آمده' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-[#E2E0D9] flex flex-col gap-1 shadow-xs transition-transform duration-200 hover:-translate-y-0.5" style={{ borderRight: `4px solid ${primaryColor}` }}>
              <span className="text-xs font-black" style={{ color: primaryColor }}>{item.num}</span>
              <span className="text-xs font-bold text-slate-800 leading-snug">{item.text}</span>
            </div>
          ))}
        </div>

        {/* محتوای صفحات بر اساس View */}
        <div className="p-8 sm:p-12 space-y-16">
          
          {/* SECTION 1: 5 PRODUCT TIERS */}
          {(currentView === 'all' || currentView === 'close' || currentView === 'open') && (
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: primaryColor }} />
                <h2 className="text-xl font-black text-slate-900">سبد محصولات اعتباری (Credit Product Portfolio)</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-stretch">
                {[
                  { name: 'اعتبار حلقه بسته (B2C)', cap: 'تا ۲۰ میلیون تومان', status: 'فعال و عملیاتی', featured: true, target: '۱ میلیون کاربر فعلی / ۶۵۰ هزار جدید', terms: '۴ تا ۶ قسط ویژه پذیرندگان طرف قرارداد' },
                  { name: 'اعتبار حلقه باز (B2C)', cap: 'تا ۱۰ میلیون تومان', status: 'فعال و عملیاتی', featured: true, target: '۲۵۰ هزار فعلی / ۳۵۰ هزار جذب جدید', terms: 'کلیه پذیرندگان و پایانه‌های بانکی سراسر کشور' },
                  { name: 'اعتبار خرد', cap: '۵۰۰ هزار تا ۱ میلیون تومان', status: 'فعال و عملیاتی', featured: false, target: 'حدود ۵ میلیون کاربر فعال همراه اول', terms: 'تسویه کوتاه‌مدت یک‌ماهه' },
                  { name: 'اعتبار سازمانی (B2B)', cap: '۱۰ تا ۴۰۰ میلیون تومان', status: 'فعال و عملیاتی', featured: false, target: '۵۰۰ شرکت برتر (فاز ۱: ۷۰ تا ۱۰۰ هزار نفر)', terms: 'بازپرداخت ۱ تا ۲۴ قسط' },
                  { name: 'اعتبار پرستیژ', cap: 'تا ۶۰٪ ارزش سیم‌کارت', status: 'در آستانه بهره‌برداری', featured: false, target: 'دارندگان سیم‌کارت‌های دائمی همراه اول', terms: 'وثیقه‌گذاری ارزش نامبر خط دائمی' },
                ].map((p, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-5 flex flex-col justify-between border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    style={{
                      backgroundColor: p.featured ? `${primaryColor}10` : '#FFFFFF',
                      borderColor: p.featured ? primaryColor : '#E2E0D9',
                    }}
                  >
                    <div>
                      <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 block w-fit mb-3">
                        {p.status}
                      </span>
                      <h3 className="font-extrabold text-base text-slate-900 mb-1">{p.name}</h3>
                      <div className="text-base font-black mb-4" style={{ color: primaryColor }}>{p.cap}</div>
                    </div>
                    <div className="border-t border-dashed border-slate-200 pt-3 text-[11px] text-slate-600 space-y-1">
                      <div><strong>کاربران هدف:</strong> {p.target}</div>
                      <div><strong>شرایط:</strong> {p.terms}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SECTION 2: SPEEDOMETERS */}
          {(currentView === 'all' || currentView === 'close' || currentView === 'open') && (
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: primaryColor }} />
                <h2 className="text-xl font-black text-slate-900">داشبورد تحلیلی عملکرد فاز تخصیص و مصرف</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* پنل کلوز */}
                {(currentView === 'all' || currentView === 'close') && (
                  <div className="bg-[#F2F0EB] border border-[#E2E0D9] rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-sm">
                    <div className="bg-[#1C1C1C] text-white p-4 rounded-xl flex justify-between items-center">
                      <span className="font-black text-sm">🔒 اعتبار حلقه بسته (Close Loop)</span>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-md" style={{ backgroundColor: primaryColor, color: '#fff' }}>B2C Ecosystem</span>
                    </div>

                    {/* سرعت‌سنج‌ها */}
                    <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-slate-200">
                      <div className="flex flex-col items-center text-center">
                        <span className="text-xs font-bold text-slate-700">تحقق مبلغ تخصیص</span>
                        <div className="w-36 h-24 relative mt-2">
                          <svg className="w-full h-full" viewBox="0 0 180 110">
                            <path d="M 25 85 A 65 65 0 0 1 155 85" fill="none" stroke="#E5E7EB" strokeWidth="12" strokeLinecap="round" />
                            <path className="gauge-progress-arc" data-pct="49.28" d="M 25 85 A 65 65 0 0 1 155 85" fill="none" stroke={primaryColor} strokeWidth="12" strokeLinecap="round" style={{ strokeDasharray: 205, strokeDashoffset: 205, transition: 'stroke-dashoffset 1.8s ease' }} />
                            <g className="gauge-needle" data-angle="-1.3" style={{ transformOrigin: '90px 85px', transform: 'rotate(-90deg)', transition: 'transform 1.8s' }}>
                              <polygon points="90,85 86,30 90,20 94,30" fill={primaryColor} />
                              <circle cx="90" cy="85" r="9" fill="#1C1C1C" />
                              <circle cx="90" cy="85" r="4" fill="#FFFFFF" />
                            </g>
                          </svg>
                        </div>
                        <span className="text-xl font-black mt-1" style={{ color: primaryColor }}>۴۹.۲۸٪</span>
                      </div>

                      <div className="flex flex-col items-center text-center">
                        <span className="text-xs font-bold text-slate-700">تحقق مبلغ مصرف</span>
                        <div className="w-36 h-24 relative mt-2">
                          <svg className="w-full h-full" viewBox="0 0 180 110">
                            <path d="M 25 85 A 65 65 0 0 1 155 85" fill="none" stroke="#E5E7EB" strokeWidth="12" strokeLinecap="round" />
                            <path className="gauge-progress-arc" data-pct="5.15" d="M 25 85 A 65 65 0 0 1 155 85" fill="none" stroke="#FF3350" strokeWidth="12" strokeLinecap="round" style={{ strokeDasharray: 205, strokeDashoffset: 205, transition: 'stroke-dashoffset 1.8s ease' }} />
                            <g className="gauge-needle" data-angle="-80.73" style={{ transformOrigin: '90px 85px', transform: 'rotate(-90deg)', transition: 'transform 1.8s' }}>
                              <polygon points="90,85 86,30 90,20 94,30" fill="#FF3350" />
                              <circle cx="90" cy="85" r="9" fill="#1C1C1C" />
                              <circle cx="90" cy="85" r="4" fill="#FFFFFF" />
                            </g>
                          </svg>
                        </div>
                        <span className="text-xl font-black text-red-500 mt-1">۵.۱۵٪</span>
                      </div>
                    </div>

                    <div className="overflow-x-auto text-xs">
                      <table className="w-full text-right border-collapse">
                        <tbody>
                          <tr className="border-b border-black/5 py-2">
                            <td className="py-1.5 font-bold">مبلغ تخصیص‌یافته:</td>
                            <td className="py-1.5 font-black text-left">۳,۲۶۹,۹۳۴,۰۰۰,۰۰۰ تومان (۴۹.۲۸٪)</td>
                          </tr>
                          <tr className="border-b border-black/5 py-2">
                            <td className="py-1.5 font-bold">مبلغ مصرف (Consumption):</td>
                            <td className="py-1.5 font-black text-left text-red-600">۳۰۷,۷۵۱,۰۰۰,۰۰۰ تومان (۵.۱۵٪)</td>
                          </tr>
                          <tr className="py-2">
                            <td className="py-1.5 font-bold">مانده اعتبار در گردش:</td>
                            <td className="py-1.5 font-black text-left text-slate-700">۲,۹۶۲,۱۸۳,۰۰۰,۰۰۰ تومان (۹۰.۵۸٪)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* پنل اوپن */}
                {(currentView === 'all' || currentView === 'open') && (
                  <div className="bg-[#F2F0EB] border border-[#E2E0D9] rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-sm">
                    <div className="bg-[#0F2738] text-white p-4 rounded-xl flex justify-between items-center">
                      <span className="font-black text-sm">🌐 اعتبار حلقه باز (Open Loop)</span>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#00A3E0] text-white">B2C National</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-slate-200">
                      <div className="flex flex-col items-center text-center">
                        <span className="text-xs font-bold text-slate-700">تحقق مبلغ تخصیص</span>
                        <div className="w-36 h-24 relative mt-2">
                          <svg className="w-full h-full" viewBox="0 0 180 110">
                            <path d="M 25 85 A 65 65 0 0 1 155 85" fill="none" stroke="#E5E7EB" strokeWidth="12" strokeLinecap="round" />
                            <path className="gauge-progress-arc" data-pct="40.11" d="M 25 85 A 65 65 0 0 1 155 85" fill="none" stroke={primaryColor} strokeWidth="12" strokeLinecap="round" style={{ strokeDasharray: 205, strokeDashoffset: 205, transition: 'stroke-dashoffset 1.8s ease' }} />
                            <g className="gauge-needle" data-angle="-17.8" style={{ transformOrigin: '90px 85px', transform: 'rotate(-90deg)', transition: 'transform 1.8s' }}>
                              <polygon points="90,85 86,30 90,20 94,30" fill={primaryColor} />
                              <circle cx="90" cy="85" r="9" fill="#1C1C1C" />
                              <circle cx="90" cy="85" r="4" fill="#FFFFFF" />
                            </g>
                          </svg>
                        </div>
                        <span className="text-xl font-black mt-1" style={{ color: primaryColor }}>۴۰.۱۱٪</span>
                      </div>

                      <div className="flex flex-col items-center text-center">
                        <span className="text-xs font-bold text-slate-700">تحقق مبلغ مصرف</span>
                        <div className="w-36 h-24 relative mt-2">
                          <svg className="w-full h-full" viewBox="0 0 180 110">
                            <path d="M 25 85 A 65 65 0 0 1 155 85" fill="none" stroke="#E5E7EB" strokeWidth="12" strokeLinecap="round" />
                            <path className="gauge-progress-arc" data-pct="44.22" d="M 25 85 A 65 65 0 0 1 155 85" fill="none" stroke="#00A3E0" strokeWidth="12" strokeLinecap="round" style={{ strokeDasharray: 205, strokeDashoffset: 205, transition: 'stroke-dashoffset 1.8s ease' }} />
                            <g className="gauge-needle" data-angle="-10.4" style={{ transformOrigin: '90px 85px', transform: 'rotate(-90deg)', transition: 'transform 1.8s' }}>
                              <polygon points="90,85 86,30 90,20 94,30" fill="#00A3E0" />
                              <circle cx="90" cy="85" r="9" fill="#1C1C1C" />
                              <circle cx="90" cy="85" r="4" fill="#FFFFFF" />
                            </g>
                          </svg>
                        </div>
                        <span className="text-xl font-black text-[#00A3E0] mt-1">۴۴.۲۲٪</span>
                      </div>
                    </div>

                    <div className="overflow-x-auto text-xs">
                      <table className="w-full text-right border-collapse">
                        <tbody>
                          <tr className="border-b border-black/5 py-2">
                            <td className="py-1.5 font-bold">مبلغ تخصیص‌یافته:</td>
                            <td className="py-1.5 font-black text-left">۱,۴۳۹,۸۱۲,۰۰۰,۰۰۰ تومان (۴۰.۱۱٪)</td>
                          </tr>
                          <tr className="border-b border-black/5 py-2">
                            <td className="py-1.5 font-bold">مبلغ مصرف (Consumption):</td>
                            <td className="py-1.5 font-black text-left text-[#00A3E0]">۱,۱۹۰,۵۴۷,۰۰۰,۰۰۰ تومان (۴۴.۲۲٪)</td>
                          </tr>
                          <tr className="py-2">
                            <td className="py-1.5 font-bold">مانده اعتبار در گردش:</td>
                            <td className="py-1.5 font-black text-left text-slate-700">۲۴۹,۲۶۵,۰۰۰,۰۰۰ تومان (۱۷.۳۱٪)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* SECTION 3: INSTALLMENTS BREAKDOWN */}
          {(currentView === 'all' || currentView === 'installments') && (
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: primaryColor }} />
                <h2 className="text-xl font-black text-slate-900">تحلیل تفکیکی مدل‌های اقساطی تخصیص‌یافته</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#F8FAF9] border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-extrabold text-base text-slate-900">۱ قسطه کلوز (Close)</h3>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">تسویه کوتاه‌مدت</span>
                    </div>
                    <div className="text-2xl font-black text-slate-900 mb-1">۳۸۰.۱۷ میلیارد تومان</div>
                    <p className="text-xs text-slate-500 mb-4">۱۴.۴٪ حجم کل ریالی</p>
                  </div>
                  <div className="border-t border-dashed border-slate-200 pt-3 text-xs text-slate-600">
                    <div><strong>تعداد تخصیص‌ها:</strong> ۷۶,۰۳۶ فقره (۲۳.۱٪)</div>
                    <div className="mt-1"><strong>میانگین تخصیص:</strong> ۵,۰۰۰,۰۰۰ تومان</div>
                  </div>
                </div>

                <div className="bg-gradient-to-b from-white to-[#FF7722]/5 border-2 rounded-2xl p-6 flex flex-col justify-between shadow-sm" style={{ borderColor: primaryColor }}>
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-extrabold text-base text-slate-900">۴ قسطه کلوز (هسته اصلی) ⭐</h3>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full text-white" style={{ backgroundColor: primaryColor }}>حداکثر محبوبیت</span>
                    </div>
                    <div className="text-2xl font-black mb-1" style={{ color: primaryColor }}>۲,۰۳۷.۶۳ میلیارد تومان</div>
                    <p className="text-xs text-slate-500 mb-4">۷۷.۴٪ حجم کل ریالی سبد</p>
                  </div>
                  <div className="border-t border-dashed border-slate-200 pt-3 text-xs text-slate-600">
                    <div><strong>تعداد تخصیص‌ها:</strong> ۲۳۳,۵۶۳ فقره (۷۱.۰٪)</div>
                    <div className="mt-1"><strong>میانگین تخصیص:</strong> ۸,۷۲۴,۰۰۰ تومان</div>
                  </div>
                </div>

                <div className="bg-[#F8FAF9] border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-extrabold text-base text-slate-900">۶ قسطه اوپن (Open)</h3>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#00A3E0]/15 text-[#0077A3]">گردش سراسری</span>
                    </div>
                    <div className="text-2xl font-black text-[#0077A3] mb-1">۲۱۳.۵۸ میلیارد تومان</div>
                    <p className="text-xs text-slate-500 mb-4">۸.۱٪ حجم کل ریالی</p>
                  </div>
                  <div className="border-t border-dashed border-slate-200 pt-3 text-xs text-slate-600">
                    <div><strong>تعداد تخصیص‌ها:</strong> ۱۹,۵۷۵ فقره (۵.۹٪)</div>
                    <div className="mt-1"><strong>میانگین تخصیص:</strong> ۱۰,۹۱۰,۰۰۰ تومان</div>
                  </div>
                </div>
              </div>

              {/* ویژوالایزر نواری */}
              <div className="bg-[#F8FAF9] p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <h3 className="text-sm font-black text-slate-900">سهم نسبی مدل‌های اقساطی در سبد اعتباری</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setVizMode('amount')}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${vizMode === 'amount' ? 'bg-[#1C1C1C] text-white' : 'bg-white border text-slate-700'}`}
                    >
                      حجم ریالی (Amount)
                    </button>
                    <button
                      onClick={() => setVizMode('count')}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${vizMode === 'count' ? 'bg-[#1C1C1C] text-white' : 'bg-white border text-slate-700'}`}
                    >
                      تعداد تخصیص (Volume)
                    </button>
                  </div>
                </div>

                <div className="h-9 w-full bg-slate-200 rounded-xl overflow-hidden flex font-black text-xs text-white">
                  <div className="h-full flex items-center justify-center transition-all duration-500" style={{ width: vizMode === 'amount' ? '77.4%' : '71.0%', backgroundColor: primaryColor }}>
                    ۴ قسطه ({vizMode === 'amount' ? '۷۷.۴٪' : '۷۱.۰٪'})
                  </div>
                  <div className="h-full flex items-center justify-center bg-[#4B6B00] transition-all duration-500" style={{ width: vizMode === 'amount' ? '14.5%' : '23.1%' }}>
                    ۱ قسطه ({vizMode === 'amount' ? '۱۴.۵٪' : '۲۳.۱٪'})
                  </div>
                  <div className="h-full flex items-center justify-center bg-[#00A3E0] transition-all duration-500" style={{ width: vizMode === 'amount' ? '8.1%' : '5.9%' }}>
                    ۶ قسطه ({vizMode === 'amount' ? '۸.۱٪' : '۵.۹٪'})
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* SECTION 4: TIMELINE ANALYTICS */}
          {(currentView === 'all' || currentView === 'timeline') && (
            <section className="space-y-6">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: primaryColor }} />
                  <h2 className="text-xl font-black text-slate-900">تایملاین پویای رشد ماهانه، تخصیص، مصرف و کاربران</h2>
                </div>

                <div className="flex gap-2">
                  {[
                    { key: 'all', label: 'همه دوره‌ها (۲۹ ماه)' },
                    { key: '1405', label: 'سال ۱۴۰۵ (اوج جهش)' },
                    { key: '1404', label: 'سال ۱۴۰۴ (شتاب‌گیری)' },
                    { key: '1403', label: 'سال ۱۴۰۳ (راه‌اندازی)' },
                  ].map(f => (
                    <button
                      key={f.key}
                      onClick={() => setTimelineYear(f.key)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer ${timelineYear === f.key ? 'bg-[#1C1C1C] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTimeline.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`bg-[#F8FAF9] border rounded-2xl p-5 space-y-4 transition-all duration-300 hover:-translate-y-1 ${item.peak || item.record || item.consRec ? 'border-2 shadow-md' : 'border-slate-200'}`}
                    style={{ borderColor: (item.peak || item.record || item.consRec) ? primaryColor : undefined }}
                  >
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }}></span>
                        <h4 className="font-black text-base text-slate-900">{item.month}</h4>
                        {item.badge && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-red-100 text-red-600">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-slate-500">نرخ مصرف به تخصیص: <strong className="text-slate-900">{item.ratio}</strong></span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div>
                        <div className="flex justify-between text-slate-700 mb-1">
                          <span>میزان تخصیص:</span>
                          <span className="font-bold">{item.allocVal}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="tl-bar-fill h-full rounded-full transition-all duration-700" style={{ width: `${item.allocWidth}%`, backgroundColor: primaryColor }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-700 mb-1">
                          <span>میزان مصرف:</span>
                          <span className="font-bold text-[#00A3E0]">{item.consVal}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="tl-bar-fill h-full bg-[#00A3E0] rounded-full transition-all duration-700" style={{ width: `${item.consWidth}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-700 mb-1">
                          <span>جذب کاربران:</span>
                          <span className="font-bold text-red-500">{item.usersVal}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="tl-bar-fill h-full bg-red-500 rounded-full transition-all duration-700" style={{ width: `${item.usersWidth}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* FOOTER */}
        <footer className="bg-[#1C1C1C] text-white p-6 sm:px-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-base font-extrabold">
            <span>خط همراه اول داری؟</span>
            <span className="text-lg font-black" style={{ color: primaryColor }}>«اوانو اعتبارته»</span>
          </div>
          <div className="text-xs text-slate-400 font-light">
            تهیه‌شده توسط شرکت همراه کسب‌و‌کارهای هوشمند (EBCOM)
          </div>
        </footer>
      </div>
    </div>
  );
}