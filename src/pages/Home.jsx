import React from 'react';
import { Link } from 'react-router-dom';

const cards = [
  {
    id: 'credit',
    className: 'card-credit',
    title: 'Credit',
    color: '#FF7722',
    desc: 'اکوسیستم جامع اعتباردهی و راهکارهای فین‌تک بر بستر همراه اول.',
    path: '/infographics/credit',
    icon: '/assets/images/battery.png',
    alt: 'لوگو Credit',
    isEwano: false,
  },
  {
    id: 'ziira',
    className: 'card-ziira',
    title: 'Ziira',
    color: '#A855F7',
    desc: 'پلتفرم هوش مصنوعی بومی و یکپارچه سازمانی با تمرکز بر زبان فارسی.',
    path: '/infographics/ziira',
    icon: '/assets/images/Ziira.png',
    alt: 'لوگو Ziira',
    isEwano: false,
  },
  {
    id: 'merchants',
    className: 'card-merchants',
    title: 'Merchants',
    color: '#3DD598',
    desc: 'اکوسیستم جامع پذیرندگی، فروشگاه‌ها و نقاط فروش اوانو با پوشش ۹,۳۹۷ مرچنت فعال.',
    path: '/infographics/merchants',
    icon: '/assets/images/Ewano.png',
    alt: 'لوگو Ewano',
    isEwano: true,
  },
  {
    id: 'ebcom',
    className: 'card-ebcom',
    title: 'EBCOM',
    color: '#688A00',
    desc: 'بولتن رسمی اخبار، دستاوردها و گواهی‌نامه‌های شرکت همراه کسب‌وکارهای هوشمند.',
    path: '/infographics/ebcom',
    icon: '/assets/images/ebcom-sign.png',
    alt: 'لوگو EBCOM',
    isEwano: false,
  },
];

export default function Home() {
  return (
    <section className="min-h-screen flex items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {cards.map((card) => (
            <article 
              key={card.id} 
              className={`home-card ${card.className} ${card.isEwano ? 'font-ewano' : ''}`}
            >
              <Link to={card.path} className="flex flex-col h-full p-8 no-underline text-inherit group">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shrink-0 border border-white/5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${card.color}18` }}
                >
                  <img src={card.icon} alt={card.alt} className="w-9 h-9 object-contain drop-shadow" />
                </div>

                <div className="flex flex-col flex-grow">
                  <h3 className="text-xl font-extrabold text-white mb-3">
                    {card.title}
                  </h3>
                  <p className="text-sm font-normal text-slate-400 leading-relaxed mb-6 flex-grow text-right">
                    {card.desc}
                  </p>
                  
                  <span 
                    className="text-sm font-bold inline-flex items-center gap-2 pt-4 border-t border-white/10 transition-transform duration-200 group-hover:-translate-x-1"
                    style={{ color: card.color }}
                  >
                    مشاهده ←
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}