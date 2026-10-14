import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Share2, 
  Download, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Wallet, 
  Building2, 
  Smartphone, 
  ShieldCheck, 
  BarChart3, 
  PieChart, 
  Target 
} from 'lucide-react';

export default function Credit() {
  // اطلاعات ۵ محصول اعتباری
  const productTiers = [
    {
      name: 'اعتبار حلقه بسته',
      cap: 'تا ۲۰ میلیون تومان',
      status: 'فعال و عملیاتی',
      featured: true,
      audience: '۱ میلیون کاربر فعلی + ۶۵۰ هزار جدید',
      terms: '۴ تا ۶ قسط ویژه فروشگاه‌های طرف قرارداد',
      icon: Wallet
    },
    {
      name: 'اعتبار حلقه باز',
      cap: 'تا ۱۰ میلیون تومان',
      status: 'فعال و عملیاتی',
      featured: true,
      audience: '۲۵۰ هزار فعلی + ۳۵۰ هزار جذب جدید',
      terms: 'پوشش گسترده پذیرندگان بانکی و فروشگاهی',
      icon: TrendingUp
    },
    {
      name: 'اعتبار خرد',
      cap: '۵۰۰ هزار تا ۱ میلیون تومان',
      status: 'فعال و عملیاتی',
      featured: false,
      audience: '۵ میلیون مشترک فعال همراه اول',
      terms: 'دوره بازپرداخت کوتاه‌مدت ۱ ماهه',
      icon: Users
    },
    {
      name: 'اعتبار سازمانی (B2B)',
      cap: '۱۰ تا ۴۰۰ میلیون تومان',
      status: 'فعال و عملیاتی',
      featured: false,
      audience: '۵۰۰ شرکت برتر (فاز ۱: ۷۰ تا ۱۰۰ هزار نفر)',
      terms: 'بازپرداخت منعطف ۱ تا ۲۴ قسط',
      icon: Building2
    },
    {
      name: 'اعتبار پرستیژ',
      cap: 'تا ۶۰٪ ارزش سیم‌کارت',
      status: 'در آستانه بهره‌برداری',
      featured: false,
      audience: 'دارندگان سیم‌کارت‌های دائمی همراه اول',
      terms: 'وثیقه‌گذاری ارزش خطوط ارتباطی',
      icon: Smartphone
    }
  ];

  // کارت‌های بنتو کمپین دیجیتال
  const bentoMetrics = [
    {
      label: 'مجموع هزینه سرمایه‌گذاری کمپین دیجیتال',
      val: '۴۸۲,۱۷۲,۱۶۹ تومان',
      sub: 'نمایش پیام «اوانو اعتبارته» و «خرید اقساطی دیجی‌کالا» در رسانه‌های پربازدید کشور',
      hero: true
    },
    {
      label: 'تعداد کل نمایش (Impressions)',
      val: '۵۱.۸ M',
      sub: 'رسیدن به جامعه گسترده مخاطبان',
      hero: false
    },
    {
      label: 'تعداد کلیک‌ها (Clicks)',
      val: '۱۳۰,۸۰۷',
      sub: 'نرخ کلیک (CTR): ۰.۲۵۲٪',
      hero: false
    },
    {
      label: 'هزینه به ازای بازدید (CPV)',
      val: '۹.۶ تومان',
      sub: 'راندمان حداکثری در دیده‌شدن',
      hero: false,
      valColor: 'text-[#557300]'
    },
    {
      label: 'هزینه به ازای کلیک (CPC)',
      val: '۳,۶۸۶ تومان',
      sub: 'هدایت به صفحه لندینگ اعتبارسنجی',
      hero: false
    },
    {
      label: 'تعداد سشن‌ها (Sessions)',
      val: '۷۶,۹۳۷',
      sub: 'هزینه هر سشن (CPS): ۶,۲۶۷ تومان',
      hero: false
    },
    {
      label: 'پیام کلیدی تبلیغاتی',
      val: '«اوانو اعتبارته»',
      sub: 'بدون چک، ضامن و پیش‌پرداخت',
      hero: false,
      highlightBg: true
    }
  ];

  return (
    <div className="space-y-6 pb-12 max-w-[1100px] mx-auto">
      {/* دکمه بازگشت بالا */}
      <div className="flex items-center justify-between">
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowRight size={16} />
          <span>بازگشت به پرتال اصلی</span>
        </Link>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Download size={14} />
            <span>چاپ / خروجی PDF</span>
          </button>
        </div>
      </div>

      {/* پوسته اصلی اینفوگرافیک */}
      <div className="bg-white text-[#1C1C1C] rounded-3xl shadow-2xl border border-[#E2E0D9] overflow-hidden">
        
        {/* HEADER / BRAND LOCKUP */}
        <header className="bg-[#1C1C1C] text-white p-6 sm:p-10 relative">
          <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
              <div className="flex items-center">
                <img 
                  src="/assets/images/EBCOM.png" 
                  alt="EBCOM" 
                  className="h-10 sm:h-12 w-auto object-contain brightness-0 invert" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/images/ebcom-sign.png';
                  }}
                />
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/20" />
              <div className="flex items-center gap-2 sm:gap-3 text-xs text-slate-300 flex-wrap">
                <div className="bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                  هم‌پیمان استراتژیک: <strong className="text-[#99CC00]">همراه اول</strong>
                </div>
                <div className="bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                  پلتفرم اجرا: <strong className="text-[#99CC00]">اوانو (Ewano)</strong>
                </div>
              </div>
            </div>
            <div className="bg-[#99CC00] text-[#1C1C1C] font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-sm">
              گزارش راهبردی فین‌تک و اعتباردهی
            </div>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 text-white leading-tight">
              اکوسیستم جامع خدمات اعتباردهی (BNPL)
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
              توسعه راهکارهای اعتباردهی چندسطحی متناسب با نیاز سگمنت‌های مختلف کاربران؛ از کاربران خرد و سازمان‌های برتر کشور تا دارندگان سیم‌کارت‌های دائمی همراه اول، با تکیه بر مکانیزم اعتبار چرخشی و مشارکت با نهادهای تأمین مالی.
            </p>
          </div>
        </header>

        {/* STRATEGIC PILLARS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 p-5 sm:px-10 bg-[#F2F0EB] border-b border-[#E2E0D9]">
          {[
            { num: '۰۱. سگمنت‌بندی', text: 'تفکیک اختصاصی طرح‌ها بر اساس رفتار و ارزش کاربر' },
            { num: '۰۲. اهرم همراه اول', text: 'بهره‌گیری حداکثری از داده‌ها و زیرساخت ارتباطی' },
            { num: '۰۳. مکانیزم ریوالو', text: 'افزایش نرخ استفاده مجدد اعتبار با تسویه دوره‌ای' },
            { num: '۰۴. مدیریت ریسک', text: 'تأمین مالی بانکی و انتقال بهینه ریسک نکول' },
            { num: '۰۵. توسعه تدریجی', text: 'رونمایی از طرح‌های نوین و اختصاصی (پرستیژ)' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-3.5 rounded-xl border border-[#E2E0D9] border-r-4 border-r-[#99CC00] flex flex-col gap-1 shadow-sm">
              <span className="text-[11px] font-black text-[#557300]">{item.num}</span>
              <span className="text-xs font-bold text-[#1C1C1C] leading-snug">{item.text}</span>
            </div>
          ))}
        </div>

        {/* CONTENT BODY */}
        <div className="p-6 sm:p-10 space-y-12">

          {/* SECTION 1: 5 CREDIT SCHEMES */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-6 bg-[#99CC00] rounded-full" />
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[#1C1C1C]">سبد محصولات اعتباری (Credit Product Portfolio)</h2>
                <p className="text-xs text-slate-500 font-medium">۵ طرح تخصصی پوشش‌دهنده کل جامعه مخاطبان</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {productTiers.map((prod, idx) => {
                const IconComponent = prod.icon;
                return (
                  <div 
                    key={idx} 
                    className={`rounded-2xl p-4 flex flex-col justify-between border transition-all duration-200 hover:shadow-lg ${
                      prod.featured 
                        ? 'bg-gradient-to-b from-white to-[#99CC00]/5 border-[#99CC00] shadow-sm' 
                        : 'bg-white border-[#E2E0D9] hover:border-[#99CC00]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          prod.status === 'فعال و عملیاتی' 
                            ? 'bg-[#99CC00]/20 text-[#446000]' 
                            : 'bg-slate-200 text-slate-700'
                        }`}>
                          {prod.status}
                        </span>
                        <IconComponent size={18} className="text-[#557300]" />
                      </div>
                      <h3 className="font-extrabold text-base text-[#1C1C1C] mb-1">{prod.name}</h3>
                      <div className="text-base font-black text-[#557300] mb-3">{prod.cap}</div>
                    </div>
                    <div className="border-t border-dashed border-[#E2E0D9] pt-3 text-[11px] text-slate-600 leading-relaxed">
                      <div><strong>مخاطبان:</strong> {prod.audience}</div>
                      <div className="mt-1"><strong>شرايط:</strong> {prod.terms}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: PERFORMANCE GAUGES */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-6 bg-[#99CC00] rounded-full" />
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[#1C1C1C]">تحلیل وضعیت عملکرد و تحقق شاخص‌ها</h2>
                <p className="text-xs text-slate-500 font-medium">مقایسه نرخ تحقق جذب کاربر، تخصیص منابع مالی و مصرف واقعی</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Close Loop Box */}
              <div className="bg-[#F2F0EB] border border-[#E2E0D9] rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="border-b border-black/5 pb-3 mb-6">
                    <h3 className="font-extrabold text-base text-[#1C1C1C]">عملکرد اعتبار حلقه بسته (Close C2B)</h3>
                    <p className="text-xs text-slate-500">تمرکز بر ایجاد زیرساخت و فعال‌سازی گسترده کاربران</p>
                  </div>

                  <div className="flex items-center justify-around gap-4 my-6">
                    {/* گیج ۱: جذب کاربر */}
                    <div className="flex flex-col items-center text-center">
                      <div className="relative w-28 h-28 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                          <circle cx="60" cy="60" r="48" fill="none" stroke="#E2E0D9" strokeWidth="12" />
                          <circle cx="60" cy="60" r="48" fill="none" stroke="#99CC00" strokeWidth="12" strokeLinecap="round" strokeDasharray="301" strokeDashoffset="0" />
                        </svg>
                        <span className="absolute text-base font-black text-[#1C1C1C]">۲۹۶.۸٪</span>
                      </div>
                      <div className="text-xs font-bold text-[#1C1C1C] mt-2">تحقق جذب کاربر فعال</div>
                      <div className="text-[10px] text-slate-500">۱,۹۶۹,۴۷۲ از ۶۶۳,۵۰۰ تارگت</div>
                    </div>

                    {/* گیج ۲: مصرف */}
                    <div className="flex flex-col items-center text-center">
                      <div className="relative w-28 h-28 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                          <circle cx="60" cy="60" r="48" fill="none" stroke="#E2E0D9" strokeWidth="12" />
                          <circle cx="60" cy="60" r="48" fill="none" stroke="#FF3350" strokeWidth="12" strokeLinecap="round" strokeDasharray="301" strokeDashoffset="294" />
                        </svg>
                        <span className="absolute text-base font-black text-[#FF3350]">۲.۲۶٪</span>
                      </div>
                      <div className="text-xs font-bold text-[#1C1C1C] mt-2">تحقق مبلغ مصرف</div>
                      <div className="text-[10px] text-slate-500">۱۳۵ میلیارد از ۵,۹۷۱ میلیارد ت</div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-black/5 pt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-black/5">
                    <span className="text-slate-500">مبلغ تخصیص‌یافته فعلی:</span>
                    <span className="font-bold">۲,۳۳۰ میلیارد تومان (۳۵.۱۲٪ تحقق)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-black/5">
                    <span className="text-slate-500">تارگت کل تخصیص اعتبار:</span>
                    <span className="font-bold">۶,۶۳۵ میلیارد تومان</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">ارزیابی راهبردی:</span>
                    <span className="font-bold text-[#557300]">موفقیت ۳ برابری در پایگاه کاربر / نیاز به کمپین مصرف</span>
                  </div>
                </div>
              </div>

              {/* Open Loop Box */}
              <div className="bg-[#F2F0EB] border border-[#E2E0D9] rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="border-b border-black/5 pb-3 mb-6">
                    <h3 className="font-extrabold text-base text-[#1C1C1C]">عملکرد اعتبار حلقه باز (Open B2C)</h3>
                    <p className="text-xs text-slate-500">تعادل اثربخش میان تخصیص و مصرف روزمره بازار</p>
                  </div>

                  <div className="flex items-center justify-around gap-4 my-6">
                    {/* گیج ۱: تخصیص */}
                    <div className="flex flex-col items-center text-center">
                      <div className="relative w-28 h-28 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                          <circle cx="60" cy="60" r="48" fill="none" stroke="#E2E0D9" strokeWidth="12" />
                          <circle cx="60" cy="60" r="48" fill="none" stroke="#99CC00" strokeWidth="12" strokeLinecap="round" strokeDasharray="301" strokeDashoffset="216" />
                        </svg>
                        <span className="absolute text-base font-black text-[#1C1C1C]">۲۸.۳٪</span>
                      </div>
                      <div className="text-xs font-bold text-[#1C1C1C] mt-2">تحقق تخصیص منابع</div>
                      <div className="text-[10px] text-slate-500">۱,۰۱۵ میلیارد از ۳,۵۹۰ میلیارد ت</div>
                    </div>

                    {/* گیج ۲: مصرف */}
                    <div className="flex flex-col items-center text-center">
                      <div className="relative w-28 h-28 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                          <circle cx="60" cy="60" r="48" fill="none" stroke="#E2E0D9" strokeWidth="12" />
                          <circle cx="60" cy="60" r="48" fill="none" stroke="#99CC00" strokeWidth="12" strokeLinecap="round" strokeDasharray="301" strokeDashoffset="197" />
                        </svg>
                        <span className="absolute text-base font-black text-[#557300]">۳۴.۳۴٪</span>
                      </div>
                      <div className="text-xs font-bold text-[#1C1C1C] mt-2">تحقق مبلغ مصرف</div>
                      <div className="text-[10px] text-slate-500">۹۲۵ میلیارد از ۲,۶۹۲ میلیارد ت</div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-black/5 pt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-black/5">
                    <span className="text-slate-500">کاربران فعال جذب‌شده:</span>
                    <span className="font-bold">۱۰۳,۷۴۴ کاربر (۲۸.۹۰٪ از تارگت)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-black/5">
                    <span className="text-slate-500">تارگت کل جذب کاربر:</span>
                    <span className="font-bold">۳۵۹,۰۰۰ کاربر</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">ارزیابی راهبردی:</span>
                    <span className="font-bold text-[#557300]">گردش مالی بالا و نرخ تبدیل موثر اعتبار به خرید</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: FUNNELS COMPARISON */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-6 bg-[#99CC00] rounded-full" />
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[#1C1C1C]">قیف‌های بازاریابی مستقیم و پیامکی</h2>
                <p className="text-xs text-slate-500 font-medium">تحلیل تبدیل مخاطب از پیامک اطلاع‌رسانی تا ثبت سفارش نهایی</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Open Loop Funnel */}
              <div className="bg-white border border-[#E2E0D9] rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-bold text-sm sm:text-base text-[#1C1C1C]">قیف تبدیل اعتبار حلقه باز (Open)</h3>
                  <span className="text-[11px] font-extrabold text-[#446000] bg-[#99CC00]/15 px-2.5 py-1 rounded-full">
                    نرخ تبدیل عالی ۷۸.۸٪
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="bg-[#F2F0EB] rounded-xl px-4 py-3 flex justify-between items-center border-r-4 border-r-[#99CC00]">
                    <span className="text-xs text-slate-700">پیامک‌های ارسال‌شده (از ۱۰ تیر):</span>
                    <span className="text-sm font-extrabold">۱۱,۹۰۰,۰۰۰</span>
                  </div>
                  <div className="bg-[#F2F0EB] rounded-xl px-4 py-3 flex justify-between items-center border-r-4 border-r-[#99CC00]">
                    <span className="text-xs text-slate-700">کل اعتبارهای فعال‌شده:</span>
                    <span className="text-sm font-extrabold">۲۷۸,۰۰۰</span>
                  </div>
                  <div className="bg-gradient-to-r from-[#99CC00]/20 to-[#99CC00]/5 rounded-xl px-4 py-3 flex justify-between items-center border-r-4 border-r-[#557300]">
                    <span className="text-xs font-bold text-slate-900">تعداد مشتریان مصرف‌کننده:</span>
                    <span className="text-sm font-black text-[#446000]">۲۱۹,۰۰۰ نفر</span>
                  </div>
                </div>

                <div className="mt-4 bg-[#99CC00]/10 rounded-xl px-4 py-2.5 flex justify-between items-center text-xs">
                  <span className="text-[#334400] font-medium">مجموع مبلغ مصرف ثبت‌شده:</span>
                  <span className="font-black text-[#446000] text-sm">۲.۷۸ هزار میلیارد تومان</span>
                </div>
              </div>

              {/* Close Loop Funnel */}
              <div className="bg-white border border-[#E2E0D9] rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-bold text-sm sm:text-base text-[#1C1C1C]">قیف تبدیل اعتبار حلقه بسته (Close)</h3>
                  <span className="text-[11px] font-extrabold text-[#446000] bg-[#99CC00]/15 px-2.5 py-1 rounded-full">
                    پایگاه فعال ۲.۱۹ میلیون
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="bg-[#F2F0EB] rounded-xl px-4 py-3 flex justify-between items-center border-r-4 border-r-[#99CC00]">
                    <span className="text-xs text-slate-700">پیامک‌های ارسال‌شده (از ۱۰ تیر):</span>
                    <span className="text-sm font-extrabold">۵,۳۸۰,۰۰۰</span>
                  </div>
                  <div className="bg-gradient-to-r from-[#99CC00]/20 to-[#99CC00]/5 rounded-xl px-4 py-3 flex justify-between items-center border-r-4 border-r-[#557300]">
                    <span className="text-xs font-bold text-slate-900">کل اعتبارهای فعال‌شده:</span>
                    <span className="text-sm font-black text-[#446000]">۲,۱۹۰,۰۰۰</span>
                  </div>
                  <div className="bg-[#F2F0EB] rounded-xl px-4 py-3 flex justify-between items-center border-r-4 border-r-[#99CC00]">
                    <span className="text-xs text-slate-700">تعداد مشتریان خریدار:</span>
                    <span className="text-sm font-extrabold">۱۴۰,۰۰۰ نفر</span>
                  </div>
                </div>

                <div className="mt-4 bg-[#99CC00]/10 rounded-xl px-4 py-2.5 flex justify-between items-center text-xs">
                  <span className="text-[#334400] font-medium">مجموع مبلغ مصرف ثبت‌شده:</span>
                  <span className="font-black text-[#1C1C1C] text-sm">۷۰۷ میلیارد تومان</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: DIGITAL CAMPAIGN BENTO */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-6 bg-[#99CC00] rounded-full" />
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[#1C1C1C]">عملکرد کمپین تبلیغات دیجیتال</h2>
                <p className="text-xs text-slate-500 font-medium">هدف: افزایش آگاهی و ترافیک لندینگ اعتبارسنجی اوانو با خط همراه اول</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {bentoMetrics.map((tile, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl p-5 flex flex-col justify-between border transition-all duration-200 ${
                    tile.hero
                      ? 'sm:col-span-2 bg-[#1C1C1C] text-white border-slate-800'
                      : tile.highlightBg
                      ? 'bg-[#99CC00]/15 border-[#99CC00]'
                      : 'bg-[#F2F0EB] border-[#E2E0D9]'
                  }`}
                >
                  <div>
                    <div className={`text-xs font-semibold mb-2 ${tile.hero ? 'text-slate-400' : 'text-slate-500'}`}>
                      {tile.label}
                    </div>
                    <div className={`text-xl sm:text-2xl font-black ${tile.hero ? 'text-[#99CC00]' : tile.valColor || 'text-[#1C1C1C]'}`}>
                      {tile.val}
                    </div>
                  </div>
                  <div className={`text-[11px] mt-3 ${tile.hero ? 'text-slate-400' : 'text-slate-600'}`}>
                    {tile.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <footer className="bg-[#1C1C1C] text-white p-6 sm:px-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-base font-extrabold">
            <span>خط همراه اول داری؟</span>
            <span className="text-[#99CC00] text-lg font-black">«اوانو اعتبارته»</span>
          </div>
          <div className="text-xs text-slate-400 font-light text-center sm:text-left">
            تهیه‌شده توسط شرکت همراه کسب‌وکارهای هوشمند (EBCOM) • مطابق راهنمای هویت بصری
          </div>
        </footer>

      </div>
    </div>
  );
}