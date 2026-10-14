import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';

const products = [
  {
    id: 'credit',
    title: 'Credit',
    badge: 'فین‌تک و تسهیلات',
    desc: 'اکوسیستم جامع اعتباردهی و راهکارهای فین‌تک بر بستر همراه اول.',
    path: '/infographics/credit',
    iconSrc: '/assets/images/battery.png',
    accentColor: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 hover:border-emerald-500/60',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    glowColor: 'group-hover:bg-emerald-500/20'
  },
  {
    id: 'ziira',
    title: 'Ziira',
    badge: 'هوش مصنوعی',
    desc: 'پلتفرم هوش مصنوعی بومی و یکپارچه سازمانی با تمرکز بر زبان فارسی.',
    path: '/infographics/ziira',
    iconSrc: '/assets/images/Ziira.png',
    accentColor: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 hover:border-purple-500/60',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    glowColor: 'group-hover:bg-purple-500/20'
  },
  {
    id: 'merchants',
    title: 'Merchants',
    badge: 'شبکه پذیرندگی',
    desc: 'اکوسیستم جامع پذیرندگی، فروشگاه‌ها و نقاط فروش اوانو با پوشش ۹,۳۹۷ مرچنت فعال.',
    path: '/infographics/merchants',
    iconSrc: '/assets/images/Ewano.png',
    accentColor: 'from-sky-500/20 to-blue-500/10 border-sky-500/30 hover:border-sky-500/60',
    badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    glowColor: 'group-hover:bg-sky-500/20'
  },
  {
    id: 'ebcom',
    title: 'EBCOM',
    badge: 'اخبار و دستاوردها',
    desc: 'بولتن رسمی اخبار، دستاوردها و گواهی‌نامه‌های شرکت همراه کسب‌وکارهای هوشمند.',
    path: '/infographics/ebcom',
    iconSrc: '/assets/images/ebcom-sign.png',
    accentColor: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 hover:border-amber-500/60',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    glowColor: 'group-hover:bg-amber-500/20'
  }
];

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-8rem)] flex flex-col justify-center py-10">
      {/* بک‌گراند بلور و امبینت برای جلوه گلس‌مورفیسم */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-indigo-600/15 via-blue-600/10 to-teal-500/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* هدر صفحه اصلی */}
      <div className="text-center max-w-3xl mx-auto mb-14 px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-indigo-300 text-xs sm:text-sm font-medium mb-5 backdrop-blur-md shadow-sm">
          <Sparkles size={15} className="text-indigo-400" />
          <span>پرتال اینفوگرافیک محصولات</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
          همراه کسب‌وکارهای هوشمند
        </h1>
        <p className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed font-light">
          بررسی بصری، تحلیلی و معماری پلتفرم‌ها و دستاوردهای اکوسیستم دیجیتال ابکام
        </p>
      </div>

      {/* شبکه کارت‌ها (ریسپانسیو: موبایل ۱ ستونه، تبلت ۲ ستونه، دسکتاپ ۴ ستونه) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto w-full px-4">
        {products.map((item) => (
          <article
            key={item.id}
            className={`group relative rounded-2xl bg-gradient-to-b ${item.accentColor} bg-slate-900/60 backdrop-blur-xl border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/10`}
          >
            {/* جلوه هایلایت درونی */}
            <div className={`absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 blur-sm -z-10 ${item.glowColor}`} />

            <div>
              {/* آیکون و نشان بالای کارت */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-slate-800/90 border border-slate-700/50 p-2.5 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={item.iconSrc}
                    alt={`لوگو ${item.title}`}
                    className="w-full h-full object-contain filter drop-shadow"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border ${item.badgeColor}`}>
                  {item.badge}
                </span>
              </div>

              {/* عنوان و توضیحات */}
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                {item.title}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed font-light mb-6">
                {item.desc}
              </p>
            </div>

            {/* دکمه اکشن پایین کارت */}
            <Link
              to={item.path}
              className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-800/80 text-sm font-medium text-slate-300 group-hover:text-white transition-colors"
            >
              <span>مشاهده اینفوگرافیک</span>
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}