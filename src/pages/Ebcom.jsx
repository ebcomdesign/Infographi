import React, { useState } from 'react';
import TopBar from '../components/common/TopBar';
import { CreditCard, Wifi, Utensils, Cpu, ShieldCheck, TrendingUp, Layers, CheckCircle2 } from 'lucide-react';

const primaryColor = '#688A00';

export default function Ebcom() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="min-h-screen py-6 flex flex-col items-center">
      <TopBar title="بولتن اخبار EBCOM" />

      <div className="w-full max-w-[1200px] bg-white text-slate-900 rounded-[28px] shadow-2xl border border-slate-200 overflow-hidden my-4">
        {/* HEADER */}
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
                <span className="bg-white/10 px-3 py-1.5 rounded-full border border-white/10">هم‌پیمان استراتژیک: <strong className="text-[#99CC00]">همراه اول</strong>[cite: 9]</span>
                <span className="bg-white/10 px-3 py-1.5 rounded-full border border-white/10">محصولات کلیدی: <strong className="text-[#00A3E0]">اوانو (Ewano)</strong> و <strong className="text-[#99CC00]">ردا (RADA)</strong>[cite: 9]</span>
              </div>
            </div>
            <span className="font-black text-xs px-4 py-2 rounded-full text-white shadow-md" style={{ backgroundColor: primaryColor }}>
              بولتن رسمی اخبار و دستاوردهای ایبیکام[cite: 9]
            </span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              گام‌های تحول‌آفرین EBCOM در اقتصاد دیجیتال و نوآوری مالی[cite: 9]
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed text-justify font-light">
              شرکت همراه کسب‌وکارهای هوشمند (ایبیکام)، بازوی نوآوری دیجیتال همراه اول، با تمرکز بر گسترش خدمات فناوری‌محور، همزمان دو دستاورد راهبردی را رقم زد: توسعه فنی بستر هوشمند «ردا» برای ساماندهی جامع خدمات دانشجویان سراسر کشور، و اخذ رسمی گواهی شرکت «دانش‌بنیان» با محوریت سوپراپلیکیشن جامع مدیریت مالی و پرداخت اوانو[cite: 9].
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
            <div className="bg-white/5 border border-white/15 rounded-2xl p-6 text-center backdrop-blur-md relative overflow-hidden" style={{ borderTop: `4px solid ${primaryColor}` }}>
              <span className="inline-block text-xs font-extrabold px-3 py-1 rounded-full mb-3 text-white" style={{ backgroundColor: primaryColor }}>
                زیست‌بوم ردا (رفاه دانشجویان)[cite: 9]
              </span>
              <div className="text-lg font-black text-white mb-1">۴ ستون خدمت‌رسانی یکپارچه[cite: 9]</div>
              <div className="text-xs text-slate-400">تجمیع خدمات بانکی و اعتباری، بسته‌های اینترنت، امور رفاهی و میکروسرویس‌ها در یک پلتفرم هوشمند[cite: 9]</div>
            </div>

            <div className="bg-white/5 border border-white/15 rounded-2xl p-6 text-center backdrop-blur-md relative overflow-hidden" style={{ borderTop: `4px solid #00A3E0` }}>
              <span className="inline-block bg-[#00A3E0] text-white text-xs font-extrabold px-3 py-1 rounded-full mb-3">
                عنوان رسمی دانش‌بنیان[cite: 9]
              </span>
              <div className="text-lg font-black text-white mb-1">احراز صلاحیت علمی و فنی[cite: 9]</div>
              <div className="text-xs text-slate-400">اخذ عنوان شرکت دانش‌بنیان برای سوپراپلیکیشن جامع مدیریت مالی و خدمات پرداخت اوانو (Ewano)[cite: 9]</div>
            </div>

            <div className="bg-white/5 border border-white/15 rounded-2xl p-6 text-center backdrop-blur-md relative overflow-hidden" style={{ borderTop: `4px solid #FFB800` }}>
              <span className="inline-block bg-[#FFB800] text-slate-900 text-xs font-extrabold px-3 py-1 rounded-full mb-3">
                گستره مخاطبان و اثرگذاری[cite: 9]
              </span>
              <div className="text-lg font-black text-white mb-1">جامعه چندمیلیونی دانشگاهی و عمومی[cite: 9]</div>
              <div className="text-xs text-slate-400">ارائه خدمات بدون مرز مالی، دیجیتال و رفاهی با بهره‌گیری از زیرساخت پیشرفته همراه اول[cite: 9]</div>
            </div>
          </div>
        </header>

        {/* INTERACTIVE TABS */}
        <div className="flex bg-[#F3F4F6] border-b border-[#E2E0D9] px-6 sm:px-12 py-3 gap-3 overflow-x-auto">
          {[
            { id: 'all', label: 'همه دستاوردها (نمای جامع)', badge: '★' },
            { id: 'rada', label: 'زیست‌بوم رفاه دانشجویان (ردا)', badge: '۱' },
            { id: 'ewano', label: 'شرکت دانش‌بنیان (اوانو)', badge: '۲' },
            { id: 'matrix', label: 'ماتریس مقایسه و هم‌افزایی', badge: '۳' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer"
              style={{
                backgroundColor: activeTab === tab.id ? '#1C1C1C' : '#FFFFFF',
                color: activeTab === tab.id ? '#FFFFFF' : '#374151',
                border: activeTab === tab.id ? 'none' : '1px solid #E2E0D9'
              }}
            >
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs" style={{ backgroundColor: activeTab === tab.id ? primaryColor : '#E5E7EB', color: activeTab === tab.id ? '#FFFFFF' : '#374151' }}>
                {tab.badge}
              </span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* CONTENT BODY */}
        <div className="p-8 sm:p-12 space-y-16">

          {/* SECTION 1: RADA */}
          {(activeTab === 'all' || activeTab === 'rada') && (
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 rounded-full" style={{ backgroundColor: primaryColor }} />
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#1C1C1C]">
                    توسعه فنی زیست‌بوم «ردا» (رفاه دانشجویان ایران) در EBCOM[cite: 9]
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    (RADA - Iran Student Welfare Smart Ecosystem) • یکپارچه‌سازی خدمات و هوشمندسازی زیست دانشجویی[cite: 9]
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#FAF9F6] border border-[#E2E0D9] rounded-3xl p-6 sm:p-8 items-center">
                <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-16/10 bg-slate-200 flex items-center justify-center">
                  <img src="/assets/images/contract.jpeg" alt="قرارداد ردا" className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 right-3 bg-slate-900/90 text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 backdrop-blur-md">
                    زیست‌بوم دیجیتال ردا (RADA)[cite: 9]
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {['ساده‌سازی دسترسی دانشجویان', 'هوشمندسازی خدمات دانشگاهی', 'فضای واحد خدمات چندگانه'].map((chip, i) => (
                      <span key={i} className="bg-white border border-[#E2E0D9] text-xs font-bold text-slate-800 px-3 py-1 rounded-full shadow-2xs flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                        {chip}[cite: 9]
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-black text-[#1C1C1C]">بستر یکپارچه خدمات معیشتی و دیجیتال دانشگاهی[cite: 9]</h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                    هدف اصلی توسعه فنی زیست‌بوم «ردا»، ساده‌تر کردن دسترسی دانشجویان به خدمات مختلف و حرکت پرشتاب به سمت هوشمندسازی خدمات دانشجویی کشور است[cite: 9]. با توسعه این بستر توسط متخصصان شرکت همراه کسب‌وکارهای هوشمند (EBCOM)، مسیر ایجاد درگاه یکپارچه خدمات وارد مرحله تازه‌ای شده است؛ بستری که خدمات بانکی و اعتباری، بسته‌های اینترنتی، خدمات رفاهی و مجموعه‌ای از میکروسرویس‌ها را در یک فضای واحد در اختیار جامعه دانشگاهی قرار می‌دهد[cite: 9].
                  </p>
                </div>
              </div>

              {/* ۴ ستون خدمت‌رسانی ردا */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  {
                    icon: CreditCard,
                    title: 'خدمات بانکی و اعتباری',
                    desc: 'ارائه کارت‌های هوشمند بانکی متصل به شبکه شتاب، اعتبارات خرد معیشتی دانشجویی، و کیف‌پول دیجیتال اختصاصی.',
                    items: ['تخصیص اعتبارات خرد دوره‌ای', 'انتقال وجه و خرید درون‌دانشگاهی', 'اتصال امن به شبکه پرداخت بانکی']
                  },
                  {
                    icon: Wifi,
                    title: 'بسته‌های اینترنتی و دیتا',
                    desc: 'ارائه بسته‌های اختصاصی اینترنت دانشجویی با تعرفه‌های ویژه و تسهیل اتصال به پلتفرم‌های پژوهشی و آموزشی.',
                    items: ['اینترنت با تخفیف ویژه دانشجویی', 'پوشش ترافیک رایگان سامانه‌های آموزشی', 'سیم‌کارت دانشجویی همراه اول']
                  },
                  {
                    icon: Utensils,
                    title: 'خدمات رفاهی و معیشتی',
                    desc: 'ساماندهی خدمات تغذیه، تسهیلات خوابگاهی، بن‌های تخفیف خرید و خدمات رفاهی متمرکز در سراسر دانشگاه‌ها.',
                    items: ['رزرو و پرداخت غذای دانشجویی', 'تخفیف در شبکه پذیرندگان و فروشگاه‌ها', 'خدمات گردشگری و اقامتی دانشجویی']
                  },
                  {
                    icon: Cpu,
                    title: 'مجموعه میکروسرویس‌ها',
                    desc: 'معماری مدرن مبتنی بر میکروسرویس برای اتصال سریع وب‌سرویس‌های دانشگاه‌ها و نهادهای رفاهی بدون اصطکاک فنی.',
                    items: ['احراز هویت متمرکز (SSO) دانشجو', 'اتصال وب‌سرویسی به صندوق رفاه', 'توسعه‌پذیری ماژولار و مقیاس‌پذیر']
                  }
                ].map((col, idx) => {
                  const Icon = col.icon;
                  return (
                    <div key={idx} className="bg-white border border-[#E2E0D9] rounded-2xl p-5 flex flex-col justify-between hover:shadow-lg transition-all" style={{ borderTop: `4px solid ${primaryColor}` }}>
                      <div>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white" style={{ backgroundColor: primaryColor }}>
                          <Icon size={24} />
                        </div>
                        <h4 className="font-extrabold text-base text-[#1C1C1C] mb-2">{col.title}[cite: 9]</h4>
                        <p className="text-xs text-slate-600 leading-relaxed mb-4">{col.desc}[cite: 9]</p>
                      </div>
                      <ul className="border-t border-dashed border-[#E2E0D9] pt-3 space-y-1.5 text-xs text-slate-500">
                        {col.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-1.5 font-medium">
                            <span className="font-black" style={{ color: primaryColor }}>✓</span>
                            <span>{item}[cite: 9]</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* SECTION 2: KNOWLEDGE-BASED EWANO */}
          {(activeTab === 'all' || activeTab === 'ewano') && (
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-[#00A3E0] rounded-full" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#1C1C1C]">
                    شرکت همراه کسب و کارهای هوشمند دانش‌بنیان شد[cite: 9]
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    (Knowledge-Based Enterprise Certification - Ewano Super-App) • تأیید رسمی نوآوری فناورانه در سطح ملی[cite: 9]
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#FAF9F6] border border-[#E2E0D9] rounded-3xl p-6 sm:p-8 items-center">
                <div className="lg:col-span-7 space-y-4 order-2 lg:order-1">
                  <div className="flex flex-wrap gap-2">
                    {['مجوز رسمی معاونت علمی', 'محصول: سوپراپلیکیشن اوانو', 'فناوری پیشرفته مالی (Fintech)'].map((chip, i) => (
                      <span key={i} className="bg-white border border-[#E2E0D9] text-xs font-bold text-slate-800 px-3 py-1 rounded-full shadow-2xs flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#00A3E0]" />
                        {chip}[cite: 9]
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-black text-[#1C1C1C]">ارتقای جایگاه فناورانه EBCOM به رتبه شرکت دانش‌بنیان[cite: 9]</h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                    شرکت همراه کسب‌وکارهای هوشمند پس از پشت‌سر گذاشتن مراحل دقیق ارزیابی فنی و کارشناسی و اخذ مجوزها و تأییدیه‌های مراجع ذی‌صلاح، موفق به کسب عنوان معتبر <strong>«شرکت دانش‌بنیان»</strong> شد[cite: 9]. این تأییدیه ملی ارزشمند به پاس توسعه محصول راهبردی <strong>«سوپر اپلیکیشن جامع مدیریت مالی و خدمات پرداخت اوانو (Ewano)»</strong> اعطا گردیده که نمایانگر بلوغ فنی، خودکفایی و نوآوری زیرساختی در صنعت فناوری مالی کشور است[cite: 9].
                  </p>
                </div>

                <div className="lg:col-span-5 order-1 lg:order-2 relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-16/10 bg-slate-200 flex items-center justify-center">
                  <img src="/assets/images/BI.JPG" alt="گواهی اوانو" className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 right-3 bg-slate-900/90 text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 backdrop-blur-md">
                    گواهی دانش‌بنیان • اوانو (Ewano)[cite: 9]
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    badge: 'مدیریت مالی و پرداخت',
                    title: 'سوپراپلیکیشن جامع خدمات مالی',
                    desc: 'ارائه زنجیره‌ای کامل از خدمات تراکنشی روزمره شامل انتقال وجه شتابی، کارت به کارت از مبادی متنوع بانکی، خرید شارژ، پرداخت سریع قبوض خدماتی و کیف‌پول دیجیتال یکپارچه با امنیت بسیار بالا.'
                  },
                  {
                    badge: 'نوآوری اعتباری BNPL',
                    title: 'اعتبار خرد و اقساطی اوانو',
                    desc: 'طراحی الگوهای نوین اعتبارسنجی بلادرنگ بدون نیاز به ضامن، چک و سفته کاغذی؛ امکان خرید اقساطی ۴ قسطه در بزرگ‌ترین شبکه پذیرندگان حضوری و آنلاین کشور با تکیه بر ظرفیت مشترکین همراه اول.'
                  },
                  {
                    badge: 'زیرساخت و امنیت داده',
                    title: 'معماری مقیاس‌پذیر و پردازش پایدار',
                    desc: 'پیاده‌سازی پلتفرمی ماژولار و مبتنی بر میکروسرویس با تاب‌آوری بسیار بالا در زمان اوج ترافیک، منطبق با الزامات شاپرک و استانداردهای روز حفاظت از امنیت داده‌های مالی و حریم خصوصی کاربران.'
                  }
                ].map((card, idx) => (
                  <div key={idx} className="bg-white border border-[#E2E0D9] rounded-2xl p-6 hover:shadow-lg transition-all flex flex-col justify-between" style={{ borderTop: '4px solid #00A3E0' }}>
                    <div>
                      <span className="inline-block bg-[#00A3E0]/15 text-[#0081B3] text-xs font-black px-3 py-1 rounded-full mb-3">
                        {card.badge}[cite: 9]
                      </span>
                      <h4 className="font-extrabold text-base text-[#1C1C1C] mb-2">{card.title}[cite: 9]</h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">{card.desc}[cite: 9]</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SECTION 3: COMPARISON MATRIX */}
          {(activeTab === 'all' || activeTab === 'matrix') && (
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-[#FFB800] rounded-full" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#1C1C1C]">
                    ماتریس راهبردی و هم‌افزایی دو رویداد[cite: 9]
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    (Synergy & Strategic Alignment Matrix) • هم‌راستایی در زنجیره ارزش اقتصاد دیجیتال همراه اول[cite: 9]
                  </p>
                </div>
              </div>

              <div className="bg-[#FAF9F6] border border-[#E2E0D9] rounded-2xl p-4 sm:p-6 overflow-x-auto shadow-sm">
                <table className="w-full text-right text-xs sm:text-sm border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-[#1C1C1C] text-white">
                      <th className="p-4 rounded-tr-xl font-bold">محور ارزیابی[cite: 9]</th>
                      <th className="p-4 font-bold">زیست‌بوم دانشجویی «ردا»[cite: 9]</th>
                      <th className="p-4 rounded-tl-xl font-bold">گواهی دانش‌بنیان «اوانو»[cite: 9]</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E0D9]">
                    {[
                      {
                        title: 'موضوع و هدف اصلی',
                        rada: 'یکپارچه‌سازی و هوشمندسازی زنجیره خدمات معیشتی، بانکی و ارتباطی دانشجویان',
                        ewano: 'احراز صلاحیت علمی و نوآوری فنی در سوپراپلیکیشن مدیریت مالی و پرداخت فراگیر'
                      },
                      {
                        title: 'محصول محوری',
                        rada: 'سامانه و زیست‌بوم یکپارچه ردا (RADA Ecosystem)',
                        ewano: 'سوپراپلیکیشن چندوجهی اوانو (Ewano Super-App)'
                      },
                      {
                        title: 'جامعه هدف و ذی‌نفعان',
                        rada: 'دانشجویان، دانشگاه‌ها، صندوق رفاه دانشجویان و مراکز آموزشی کشور',
                        ewano: 'عموم کاربران خدمات مالی، خریداران اعتباری (BNPL) و مشترکین شبکه همراه اول'
                      },
                      {
                        title: 'زیرساخت فنی زیربنایی',
                        rada: 'معماری میکروسرویسی توزیع‌شده با اتصال به درگاه‌های بانکی و وب‌سرویس‌های آموزشی',
                        ewano: 'موتور اعتبارسنجی بلادرنگ، پلتفرم پردازش تراکنش با ظرفیت بالا و اتصال به شاپرک'
                      },
                      {
                        title: 'اثرگذاری راهبردی بر EBCOM',
                        rada: 'توسعه سهم بازار در بخش B2B2C و ایجاد هویت دیجیتال خدماتی در محیط‌های علمی کشور',
                        ewano: 'تثبیت اعتبار برند ملی در صنعت فین‌تک، بهره‌مندی از تسهیلات دانش‌بنیان و شتاب‌دهی توسعه'
                      }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-white transition-colors">
                        <td className="p-4 font-black text-[#1C1C1C] bg-black/2 w-1/4">{row.title}[cite: 9]</td>
                        <td className="p-4 text-slate-700 leading-relaxed border-l border-[#E2E0D9] w-[37.5%]">{row.rada}[cite: 9]</td>
                        <td className="p-4 text-slate-700 leading-relaxed w-[37.5%]">{row.ewano}[cite: 9]</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

        </div>

        {/* FOOTER */}
        <footer className="bg-[#1C1C1C] text-slate-300 p-6 sm:px-12 flex justify-between items-center gap-4 text-xs border-t border-white/10">
          <div><strong className="text-white">شرکت همراه کسب‌وکارهای هوشمند (EBCOM)</strong> • بازوی نوآوری همراه اول[cite: 9]</div>
          <div className="text-slate-500">پرتال رسمی اینفوگرافیک دستاوردها[cite: 9]</div>
        </footer>
      </div>
    </div>
  );
}