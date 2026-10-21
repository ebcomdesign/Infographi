import React, { useState, useEffect, useRef } from 'react';
import TopBar from '../components/common/TopBar';
import Chart from 'chart.js/auto';
import { Globe, QrCode, Search } from 'lucide-react';

const primaryColor = '#3DD598';

function toPersianDigits(n) {
  if (n === null || n === undefined) return "";
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return n.toString().replace(/\d/g, (x) => farsiDigits[x]).replace(/\B(?=(\d{3})+(?!\d))/g, "،");
}

const categoriesData = [
  { id: 1, name: "پوشاک", total: 2295, online: 408, offline: 1887, pct: 24.42, icon: "👕", color: "#00D4B4" },
  { id: 2, name: "کالای دیجیتال", total: 1414, online: 853, offline: 561, pct: 15.05, icon: "📱", color: "#3DD598" },
  { id: 3, name: "خانه و آشپزخانه", total: 1336, online: 930, offline: 406, pct: 14.22, icon: "🏠", color: "#76DE77" },
  { id: 4, name: "آرایشی بهداشتی", total: 1054, online: 729, offline: 325, pct: 11.22, icon: "💄", color: "#FF7722" },
  { id: 5, name: "فرهنگ و هنر", total: 758, online: 623, offline: 135, pct: 8.07, icon: "🎨", color: "#6F59A9" },
  { id: 6, name: "طلا و زیورآلات", total: 673, online: 311, offline: 362, pct: 7.16, icon: "💍", color: "#FFDB04" },
  { id: 7, name: "لوازم خودرو", total: 629, online: 599, offline: 30, pct: 6.69, icon: "🚗", color: "#0093DD" },
  { id: 8, name: "سوپرمارکت", total: 616, online: 557, offline: 59, pct: 6.55, icon: "🛒", color: "#00D4B4" },
  { id: 9, name: "ورزشی", total: 444, online: 334, offline: 110, pct: 4.72, icon: "⚽", color: "#F16273" },
  { id: 10, name: "خدمات", total: 358, online: 260, offline: 98, pct: 3.81, icon: "🛠️", color: "#3DD598" },
  { id: 11, name: "آموزشی", total: 154, online: 152, offline: 2, pct: 1.64, icon: "🎓", color: "#6F59A9" },
  { id: 12, name: "کودک و نوزاد", total: 142, online: 65, offline: 77, pct: 1.51, icon: "🍼", color: "#FF7722" },
  { id: 13, name: "پت شاپ", total: 135, online: 135, offline: 0, pct: 1.44, icon: "🐾", color: "#00DDBD" },
  { id: 14, name: "سرگرمی", total: 85, online: 64, offline: 21, pct: 0.9, icon: "🎮", color: "#6F59A9" },
  { id: 15, name: "اینستاگرام (کانال فروش)", total: 61, online: 61, offline: 0, pct: 0.65, icon: "📸", color: "#F16273" },
  { id: 16, name: "آجیل و شیرینی", total: 51, online: 6, offline: 45, pct: 0.54, icon: "🥜", color: "#FF7722" },
  { id: 17, name: "پروتئین", total: 20, online: 6, offline: 14, pct: 0.21, icon: "🥩", color: "#F16273" },
  { id: 18, name: "سفر و گردشگری", total: 14, online: 12, offline: 2, pct: 0.15, icon: "✈️", color: "#0093DD" },
  { id: 19, name: "کتاب و لوازم التحریر", total: 12, online: 6, offline: 6, pct: 0.13, icon: "📚", color: "#6F59A9" },
  { id: 20, name: "میوه", total: 12, online: 5, offline: 7, pct: 0.13, icon: "🍏", color: "#76DE77" },
  { id: 21, name: "فروشگاه زنجیره‌ای", total: 11, online: 0, offline: 11, pct: 0.12, icon: "🏬", color: "#00D4B4" },
  { id: 22, name: "تجهیزات", total: 10, online: 10, offline: 0, pct: 0.1, icon: "⚙️", color: "#444444" },
  { id: 23, name: "سلامت و دارو", total: 9, online: 9, offline: 0, pct: 0.1, icon: "💊", color: "#00D4B4" },
  { id: 24, name: "کالای ارگانیک", total: 8, online: 7, offline: 1, pct: 0.09, icon: "🌿", color: "#3DD598" },
  { id: 25, name: "ابزارآلات", total: 7, online: 7, offline: 0, pct: 0.07, icon: "🔨", color: "#6B7280" },
  { id: 26, name: "فروشگاه اینترنتی", total: 7, online: 7, offline: 0, pct: 0.07, icon: "🌐", color: "#0093DD" },
  { id: 27, name: "گل و گیاه", total: 5, online: 4, offline: 1, pct: 0.05, icon: "🌸", color: "#76DE77" },
  { id: 28, name: "لوازم سفر و کوهنوردی", total: 5, online: 5, offline: 0, pct: 0.05, icon: "🏕️", color: "#00D4B4" },
  { id: 29, name: "صنایع دستی", total: 2, online: 2, offline: 0, pct: 0.02, icon: "🏺", color: "#FF7722" },
  { id: 30, name: "کافه و رستوران", total: 2, online: 2, offline: 0, pct: 0.02, icon: "☕", color: "#6F59A9" }
];

const chainGiants = [
  { name: "افق کوروش", branches: 4400, category: "فروشگاه زنجیره‌ای تخفیفی" },
  { name: "دیلی مارکت", branches: 1400, category: "سوپرمارکت‌های محلی و همسایگی" },
  { name: "فروشگاه‌های رفاه", branches: 700, category: "هایپرمارکت و فروشگاه زنجیره‌ای" },
  { name: "فروشگاه‌های هفت", branches: 600, category: "زنجیره‌ای تخفیف‌محور" },
  { name: "شهر کتاب", branches: 100, category: "کتاب، هنر و محصولات فرهنگی" },
  { name: "هایپرفمیلی", branches: 80, category: "هایپرمارکت‌های مدرن استانی" },
  { name: "چرم مشهد", branches: 58, category: "پوشاک، کفش و چرم طبیعی" },
  { name: "فروشگاه شهروند", branches: 50, category: "هایپرمارکت‌های بزرگ پایتخت" },
  { name: "هایپرمی", branches: 26, category: "هایپرمارکت‌های جامع شهری" },
  { name: "هایپراستار", branches: 23, category: "مگامال‌ها و هایپرمارکت‌های کلان" },
  { name: "مادیران", branches: 14, category: "لوازم خانگی و کالای دیجیتال" },
  { name: "بهشتی مارکت", branches: 11, category: "سوپرمارکت زنجیره‌ای پایتخت" },
  { name: "نجم خاورمیانه", branches: 4, category: "هایپرمارکت کلان‌مقیاس" }
];

const creditData = {
  org: {
    badge: "سازمانی رفاهی",
    title: "اعتبار سازمانی اوانو (Corporate Credit)",
    desc: "این اعتبار توسط شرکت‌ها، بانک‌ها و ارگان‌های دولتی به عنوان بسته رفاهی، بن‌کارت ماهانه و پاداش در کیف پول پرسنل شارژ می‌شود. کاربران می‌توانند بدون نیاز به نقدینگی، مایحتاج زندگی خود را در فروشگاه‌های طرف قرارداد تامین کنند.",
    chips: [
      "تخصیص آنی از پنل سازمانی",
      "بدون کارمزد برای کارمند",
      "امکان تسهیم در صندوق",
      "تسویه تضمین‌شده با مرچنت",
    ],
    merchantsTitle: "فروشگاه‌های پرمصرف اعتبار سازمانی:",
    merchants: [
      "افق کوروش (۴،۴۰۰ شعبه)",
      "دیجی‌کالا و سوپرمارکت جت",
      "هایپراستار و هایپرمی",
      "دیلی مارکت و رفاه",
      "اُکالا",
      "شهروند",
      "فروشگاه‌های هفت",
    ],
  },
  bnpl: {
    badge: "الان بخر بعداً پرداخت کن",
    title: "اعتبار اقساطی BNPL اوانو (Buy Now, Pay Later)",
    desc: "کاربران اوانو با سنجش اعتبار بانکی و بدون نیاز به چک و ضامن، خط اعتباری خرید اقساطی دریافت می‌کنند. مبلغ خرید در زمان معامله پرداخت نمی‌شود و طی ۴ قسط مساوی ماهانه از کاربر کسر خواهد شد.",
    chips: [
      "بدون سود و کارمزد",
      "تایید هویت و اعتبارسنجی آنلاین",
      "تا سقف اعتباری ۲۰ میلیون تومان",
      "افزایش سقف با خوش‌حسابی",
    ],
    merchantsTitle: "برترین پذیرندگان اعتبار اقساطی BNPL:",
    merchants: [
      "تکنولایف (کالای دیجیتال)",
      "چرم مشهد (پوشاک)",
      "تپسی‌شاپ",
      "اسنپ‌پی هم‌پیمان",
      "گالری‌های طلا و جواهر",
      "مادیران",
      "ترب‌پی",
    ],
  },
  mci: {
    badge: "همراه اول دائمی",
    title: "اعتبار سیم‌کارت دائمی همراه اول (Direct Carrier Billing)",
    desc: "بیش از ۲۰ میلیون مشترک سیم‌کارت‌های دائمی همراه اول بر اساس خوش‌حسابی و میانگین کارکرد قبض، اعتبار خرید دریافت می‌کنند. هزینه خرید روی صورت‌حساب دوره بعدی خط تلفن همراه آنها منظور می‌شود.",
    chips: [
      "مخصوص مشترکین همراه اول",
      "بدون نیاز به ثبت کارت بانکی",
      "تسویه روی قبض پایان‌دوره",
      "پوشش گسترده خدمات دیجیتال",
    ],
    merchantsTitle: "پذیرندگان پشتیبانی‌کننده از اعتبار قبوض:",
    merchants: [
      "سوپرمارکت دیجی‌کالا",
      "اُکالا",
      "پینکت",
      "خدمات آنلاین و بیمه",
      "خرید شارژ و بسته",
      "سینما و کنسرت",
    ],
  },
  wallet: {
    badge: "موجودی ریالی با کش‌بک",
    title: "کیف پول نقدی و وفاداری اوانو (Ewano Wallet)",
    desc: "کیف پول امن اوانو با قابلیت شارژ سریع از کلیه کارت‌های شتابی و انتقال وجه کارت به کارت. خریدهای انجام‌شده با کیف پول مشمول دریافت کش‌بک نقدی، سکه و شانس شرکت در قرعه‌کشی‌های بزرگ دوره‌ای اوانو می‌شوند.",
    chips: [
      "شارژ آنی با کارت شتاب",
      "کش‌بک و بازگشت نقدی خرید",
      "انتقال وجه فردبه‌فرد",
      "پرداخت سریع زیر ۱ ثانیه",
    ],
    merchantsTitle: "پذیرش در ۱۰۰٪ شبکه پذیرندگان اوانو:",
    merchants: [
      "تمامی ۹،۳۹۷ فروشگاه آنلاین و حضوری",
      "کلیه شعب افق کوروش و دیلی‌مارکت",
      "دیجی‌کالا و اُکالا",
      "تمامی صندوق‌های QR",
    ],
  },
};

const mockupData = {
  online: [
    { name: "دیجی‌کالا", cat: "فروشگاه اینترنتی و سوپرمارکت", avatar: "DK", badge: "درگاه اعتباری" },
    { name: "تکنولایف", cat: "کالای دیجیتال و موبایل", avatar: "TL", badge: "اقساطی BNPL" },
    { name: "اُکالا (Okala)", cat: "سوپرمارکت و میوه تازه", avatar: "OK", badge: "تحویل فوری" },
    { name: "فلای تودی", cat: "بلیط هواپیما و هتل", avatar: "FT", badge: "سفر اعتباری" },
    { name: "طلاسی", cat: "خرید آنلاین طلا و پس‌انداز", avatar: "TL", badge: "سرمایه‌گذاری" }
  ],
  offline: [
    { name: "افق کوروش (شعبه پیروزی)", cat: "سوپرمارکت تخفیفی - کد QR", avatar: "OK", badge: "اسکن در صندوق" },
    { name: "هایپراستار (شعبه باکری)", cat: "هایپرمارکت بزرگ - بارکدخوان", avatar: "HS", badge: "اسکن در صندوق" },
    { name: "چرم مشهد (شعبه پاسداران)", cat: "پوشاک و کیف و کفش - کد QR", avatar: "MC", badge: "اقساطی BNPL" },
    { name: "دیلی مارکت (شعبه سعادت‌آباد)", cat: "سوپرمارکت محلی - کد QR", avatar: "DM", badge: "اسکن در صندوق" },
    { name: "شهر کتاب (شعبه نیاوران)", cat: "کتاب و محصولات فرهنگی", avatar: "BK", badge: "اعتبار سازمانی" }
  ]
};

export default function Merchants() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCredit, setSelectedCredit] = useState('org');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mockupTab, setMockupTab] = useState('online');

  const donutCanvasRef = useRef(null);
  const barCanvasRef = useRef(null);
  const stackedCanvasRef = useRef(null);
  const polarCanvasRef = useRef(null);
  const chainsCanvasRef = useRef(null);

  useEffect(() => {
    Chart.defaults.font.family = "'IRANYekanX', sans-serif";
    Chart.defaults.font.size = 12;
    Chart.defaults.color = "#444444";

    const charts = [];

    if (donutCanvasRef.current) {
      charts.push(new Chart(donutCanvasRef.current, {
        type: 'doughnut',
        data: {
          labels: ["پذیرندگان آنلاین (Web/App)", "فروشگاه‌های حضوری (کد QR)"],
          datasets: [{
            data: [6189, 3208],
            backgroundColor: ["#0093DD", "#FF7722"],
            borderWidth: 3,
            borderColor: "#FFFFFF"
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "70%",
          plugins: { legend: { display: false } }
        }
      }));
    }

    if (barCanvasRef.current) {
      const top10 = categoriesData.slice(0, 10);
      charts.push(new Chart(barCanvasRef.current, {
        type: 'bar',
        data: {
          labels: top10.map(c => c.name),
          datasets: [{
            data: top10.map(c => c.total),
            backgroundColor: ["#00D4B4", "#3DD598", "#76DE77", "#FF7722", "#6F59A9", "#FFDB04", "#0093DD", "#00D4B4", "#F16273", "#3DD598"],
            borderRadius: 5
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { callback: v => toPersianDigits(v) }, grid: { color: "#edf2f7" } },
            y: { grid: { display: false } }
          }
        }
      }));
    }

    if (stackedCanvasRef.current) {
      const top10 = categoriesData.slice(0, 10);
      charts.push(new Chart(stackedCanvasRef.current, {
        type: 'bar',
        data: {
          labels: top10.map(c => c.name),
          datasets: [
            { label: "پذیرندگان آنلاین", data: top10.map(c => c.online), backgroundColor: "#0093DD", borderRadius: 5 },
            { label: "پذیرندگان حضوری QR", data: top10.map(c => c.offline), backgroundColor: "#FF7722", borderRadius: 5 }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { stacked: true, grid: { display: false } },
            y: { stacked: true, ticks: { callback: v => toPersianDigits(v) }, grid: { color: "#edf2f7" } }
          },
          plugins: { legend: { display: false } }
        }
      }));
    }

    if (polarCanvasRef.current) {
      charts.push(new Chart(polarCanvasRef.current, {
        type: 'polarArea',
        data: {
          labels: ["پوشاک و مد", "کالای دیجیتال", "خانه و آشپزخانه", "زیبایی و سلامت", "فرهنگ و کتاب", "طلا و زیورآلات"],
          datasets: [{
            data: [2295, 1414, 1336, 1063, 770, 673],
            backgroundColor: [
              "rgba(0, 212, 180, 0.75)",
              "rgba(0, 147, 221, 0.80)",
              "rgba(118, 222, 119, 0.75)",
              "rgba(255, 119, 34, 0.75)",
              "rgba(111, 89, 169, 0.75)",
              "rgba(255, 219, 4, 0.75)"
            ],
            borderWidth: 2,
            borderColor: "#FFFFFF"
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { r: { ticks: { display: false }, grid: { color: "#e2e8f0" } } }
        }
      }));
    }

    if (chainsCanvasRef.current) {
      charts.push(new Chart(chainsCanvasRef.current, {
        type: 'bar',
        data: {
          labels: chainGiants.map(c => c.name),
          datasets: [{
            label: "تعداد شعب فیزیکی",
            data: chainGiants.map(c => c.branches),
            backgroundColor: "#00D4B4",
            borderRadius: 5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false } },
            y: { ticks: { callback: v => toPersianDigits(v) }, grid: { color: "#edf2f7" } }
          }
        }
      }));
    }

    return () => charts.forEach(c => c.destroy());
  }, [activeTab]);

  const filteredCategories = categoriesData.filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
    if (!matchesSearch) return false;
    if (activeFilter === 'high-online') return cat.online >= 50;
    if (activeFilter === 'high-offline') return cat.offline >= 20;
    if (activeFilter === 'essential') {
      const essentials = ["سوپرمارکت", "پوشاک", "خانه و آشپزخانه", "کالای دیجیتال", "آرایشی بهداشتی", "آجیل و شیرینی", "پروتئین", "میوه", "فروشگاه زنجیره‌ای"];
      return essentials.includes(cat.name);
    }
    return true;
  });

  return (
    <div className="min-h-screen py-6 flex flex-col items-center font-ewano">
      <TopBar title="اکوسیستم پذیرندگان اوانو" />

      <div className="w-full max-w-[1200px] bg-white text-slate-900 rounded-[28px] shadow-2xl border border-slate-200 overflow-hidden my-4">
        {/* HEADER */}
        <header className="bg-[#1C1C1C] text-white p-8 sm:p-12 relative">
          <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-5 flex-wrap">
              <img src="/assets/images/Ewano.png" alt="Ewano" className="h-10 sm:h-12 w-auto object-contain" onError={(e) => { e.target.src = '/assets/images/ebcom-sign.png'; }} />
              <div className="hidden sm:block w-px h-8 bg-white/20" />
              <div className="bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-semibold text-slate-300">
                هم‌پیمان استراتژیک: <strong style={{ color: primaryColor }}>همراه اول</strong>
              </div>
            </div>
            <span className="font-black text-xs px-4 py-2 rounded-full text-slate-900" style={{ backgroundColor: primaryColor }}>
              گزارش جامع شبکه پذیرندگان فروشگاهی
            </span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              اکوسیستم جامع پذیرندگی ، فروشگاه‌ها و <span style={{ color: primaryColor }}>نقاط فروش اوانو</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed text-justify font-light">
              در بخش «فروشگاه» سوپراپلیکیشن اوانو، مجموعه‌ای به وسعت <strong>۹،۳۹۷ مرچنت و پذیرنده فعال</strong> سازمان‌دهی شده است. کاربران اوانو در سراسر کشور می‌توانند انواع اعتبار مالی شامل <strong>اعتبار سازمانی رفاهی، اعتبار اقساطی BNPL، اعتبار قبوض سیم‌کارت دائمی همراه اول و کیف پول ریالی</strong> را چه به صورت آنلاین در برترین وب‌سایت‌های کشور و چه به صورت حضوری در بیش از <strong>۸،۲۰۰ شعبه زنجیره‌ای فیزیکی</strong> از طریق اسکن سریع کد QR بدون نیاز به کارت بانکی یا نقدینگی مصرف کنند.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/5 border border-white/15 rounded-2xl p-6 text-center">
              <div className="text-3xl sm:text-4xl font-black mb-1" style={{ color: primaryColor }}>۹،۳۹۷</div>
              <div className="text-sm font-bold text-white mb-1">کل پذیرندگان فعال شبکه</div>
              <div className="text-xs text-slate-400">پوشش سراسری در ۳۰ صنف تجاری و خدماتی</div>
            </div>
            <div className="bg-white/5 border border-white/15 rounded-2xl p-6 text-center">
              <div className="text-3xl sm:text-4xl font-black text-[#0093DD] mb-1">
                ۶،۱۸۹ <span className="text-lg font-bold text-[#FF7722]">(۶۵.۹٪)</span>
              </div>
              <div className="text-sm font-bold text-white mb-1">پذیرندگان آنلاین (Web & In-App)</div>
              <div className="text-xs text-slate-400">درگاه‌های اعتباری اوانو، زرین‌پلاس، اسنپ‌پی و ترب‌پی</div>
            </div>
            <div className="bg-white/5 border border-white/15 rounded-2xl p-6 text-center">
              <div className="text-3xl sm:text-4xl font-black text-[#FF7722] mb-1">
                ۳،۲۰۸ <span className="text-lg font-bold text-[#00D4B4]">(۳۴.۱٪)</span>
              </div>
              <div className="text-sm font-bold text-white mb-1">پذیرندگان حضوری (صندوق و QR)</div>
              <div className="text-xs text-slate-400">به همراه بیش از ۷،۴۶۶ شعبه زنجیره‌ای قطعی در سراسر کشور</div>
            </div>
          </div>
        </header>

        {/* INTERACTIVE TABS */}
        <div className="flex bg-[#111520] border-b border-white/10 px-6 sm:px-12 py-3 gap-3 overflow-x-auto">
          {[
            { id: 'all', label: 'نمایش جامع شبکه (All Ecosystem)', icon: '🎯' },
            { id: 'channels', label: 'کانال‌های خرید (Online & QR)', icon: '🌐' },
            { id: 'charts', label: 'نمودارهای تحلیلی (Analytics)', icon: '📊' },
            { id: 'credit', label: 'شبیه‌ساز انواع اعتبار (Simulator)', icon: '💳' },
            { id: 'giants', label: 'غول‌های زنجیره‌ای (Retail Giants)', icon: '🏬' },
            { id: 'categories', label: 'کاوشگر ۳۰ صنف (Categories)', icon: '🏷️' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer"
              style={{
                backgroundColor: activeTab === tab.id ? primaryColor : 'rgba(255,255,255,0.05)',
                color: activeTab === tab.id ? '#1C1C1C' : '#D1D5DB'
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ۵ ستون اصلی */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 p-6 sm:px-12 bg-[#F8FAF9] border-b border-slate-200">
          {[
            { num: "۰۱. خرید چندکاناله", text: "پوشش همزمان خرید آنلاین در وب‌سایت‌ها و پرداخت حضوری در صندوق پایانه‌ها" },
            { num: "۰۲. تنوع منابع اعتباری", text: "امکان مصرف اعتبار سازمانی، اقساط ماهانه BNPL، قبوض همراه اول و کیف پول" },
            { num: "۰۳. پرداخت سریع بدون کارت", text: "اسکن کد QR صندوق فروشگاه در کمتر از ۳ ثانیه بدون نیاز به لمس پول نقد یا پوز" },
            { num: "۰۴. اهرم مشترکین همراه اول", text: "هدایت مستقیم تقاضای خرید میلیون‌ها کاربر خطوط دائمی به سمت پذیرندگان شبکه" },
            { num: "۰۵. تسویه تضمین‌شده و شفاف", text: "تسویه منظم بانکی شاپرکی و پایا بدون دغدغه یا ریسک بازپرداخت برای فروشندگان" },
          ].map((pillar, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-1 shadow-xs" style={{ borderRight: `4px solid ${primaryColor}` }}>
              <span className="text-xs font-black" style={{ color: '#00A88E' }}>{pillar.num}</span>
              <span className="text-xs font-bold text-slate-800 leading-snug">{pillar.text}</span>
            </div>
          ))}
        </div>

        {/* بدنه محتوا */}
        <div className="p-8 sm:p-12 space-y-16">

          {/* ۱. کانال‌های خرید */}
          {(activeTab === 'all' || activeTab === 'channels') && (
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: primaryColor }} />
                <h2 className="text-xl font-black text-slate-900">دو بال خرید در فروشگاه اوانو؛ آنلاین و حضوری (Omnichannel Shopping Infrastructure)</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#F0F9FF] border border-[#0093DD]/30 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-200 flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#0093DD]/10 text-[#0093DD] flex items-center justify-center"><Globe size={22} /></div>
                        <h3 className="font-extrabold text-base text-slate-900">فروشگاه‌های آنلاین (Web & In-App)</h3>
                      </div>
                      <span className="bg-[#0093DD]/15 text-[#0093DD] font-black text-xs px-3 py-1 rounded-full">۶،۱۸۹ (۶۵.۹٪)</span>
                    </div>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed mb-6">
                      <li>• <strong>خرید از برترین پلتفرم‌های اینترنتی:</strong> دیجی‌کالا، اُکالا، تکنولایف، تپسی‌شاپ، زرین‌پلاس، فلای‌تودی و...</li>
                      <li>• <strong>تنوع صنفی گسترده:</strong> کالای دیجیتال، طلا و جواهر، سفر و اقامت، خدمات بیمه، آموزش آنلاین و کتاب</li>
                      <li>• <strong>تسویه و تسهیم هوشمند:</strong> کسر آنی از اعتبار سازمانی، اقساط ۴ ماهه BNPL یا بالانس کیف پول</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-wrap gap-2 text-xs">
                    <span className="text-slate-500 font-bold w-full mb-1">کانال‌ها و درگاه‌های آنلاین متصل:</span>
                    {["درگاه مستقیم اوانو", "زرین‌پلاس", "اسنپ‌پی آنلاین", "تپسی‌شاپ", "ترب‌پی"].map((g, i) => (
                      <span key={i} className="bg-slate-100 px-2.5 py-1 rounded-md font-bold">{g}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-[#FFF7F2] border border-[#FF7722]/30 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-200 flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#FF7722]/10 text-[#FF7722] flex items-center justify-center"><QrCode size={22} /></div>
                        <h3 className="font-extrabold text-base text-slate-900">فروشگاه‌های حضوری (کد QR و پایانه)</h3>
                      </div>
                      <span className="bg-[#FF7722]/15 text-[#FF7722] font-black text-xs px-3 py-1 rounded-full">۳،۲۰۸ (۳۴.۱٪)</span>
                    </div>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed mb-6">
                      <li>• <strong>اسکن سریع کد QR پایانه:</strong> پرداخت در کمتر از ۳ ثانیه با دوربین اپلیکیشن اوانو در صندوق فروشگاه</li>
                      <li>• <strong>بیش از ۸،۲۰۰ شعبه فیزیکی زنجیره‌ای:</strong> افق کوروش، دیلی مارکت، رفاه، هفت، هایپراستار، شهروند و چرم مشهد</li>
                      <li>• <strong>خرید حضوری پوشاک و طلا:</strong> ۱،۸۸۷ فروشگاه پوشاک و ۳۶۲ گالری طلا و ساعت مجهز به پایانه‌های حضوری</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-wrap gap-2 text-xs">
                    <span className="text-slate-500 font-bold w-full mb-1">شبکه‌های پذیرش حضوری و پایانه فروشگاهی:</span>
                    {["پینکت (سوپرمارکت و هایپر)", "پایانه‌های پوز متصل به اوانو", "بارکدخوان QR صندوق", "اسنپ‌پی حضوری"].map((g, i) => (
                      <span key={i} className="bg-slate-100 px-2.5 py-1 rounded-md font-bold">{g}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ۲. شبیه‌ساز اعتبار */}
          {(activeTab === 'all' || activeTab === 'credit') && (
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: primaryColor }} />
                <h2 className="text-xl font-black text-slate-900">شبیه‌ساز مصرف انواع اعتبار در فروشگاه اوانو</h2>
              </div>

              <div className="bg-[#F8FAF9] border border-slate-200 rounded-2xl p-6">
                <div className="flex gap-2 mb-6 flex-wrap">
                  {[
                    { key: 'org', label: 'اعتبار سازمانی رفاهی', icon: '🏢' },
                    { key: 'bnpl', label: 'اعتبار اقساطی BNPL', icon: '💳' },
                    { key: 'mci', label: 'اعتبار سیم‌کارت همراه اول', icon: '📱' },
                    { key: 'wallet', label: 'کیف پول ریالی و کش‌بک', icon: '👛' },
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setSelectedCredit(tab.key)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer"
                      style={{
                        backgroundColor: selectedCredit === tab.key ? primaryColor : '#FFFFFF',
                        color: selectedCredit === tab.key ? '#1C1C1C' : '#334155',
                        border: selectedCredit === tab.key ? 'none' : '1px solid #E2E0D9'
                      }}
                    >
                      <span>{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 space-y-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-black" style={{ backgroundColor: `${primaryColor}20`, color: '#008F5D' }}>
                      {creditData[selectedCredit].badge}
                    </span>
                    <h3 className="text-xl font-black text-slate-900">{creditData[selectedCredit].title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">{creditData[selectedCredit].desc}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {creditData[selectedCredit].chips.map((c, i) => (
                        <span key={i} className="text-xs font-bold px-3 py-1 rounded-full border" style={{ borderColor: `${primaryColor}40`, backgroundColor: `${primaryColor}10`, color: '#008F5D' }}>
                          ✓ {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-[#F8FAF9] border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
                    <h4 className="text-xs font-black text-slate-800 mb-3">{creditData[selectedCredit].merchantsTitle}</h4>
                    <div className="flex flex-wrap gap-2">
                      {creditData[selectedCredit].merchants.map((m, i) => (
                        <span key={i} className="bg-white border border-slate-200 text-slate-800 text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-2xs">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ۳. نمودارهای کامل */}
          {(activeTab === 'all' || activeTab === 'charts') && (
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: primaryColor }} />
                <h2 className="text-xl font-black text-slate-900">نمودارهای تحلیلی و بصری‌سازی داده‌های شبکه</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#F8FAF9] border border-slate-200 rounded-2xl p-6">
                  <h3 className="font-extrabold text-base text-slate-900 mb-1">توازن کانال‌های دسترسی شبکه اوانو</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mt-4">
                    <div className="h-48 flex justify-center"><canvas ref={donutCanvasRef}></canvas></div>
                    <div className="space-y-2 text-xs font-bold">
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex justify-between"><span>آنلاین:</span> <span className="text-[#0093DD]">۶،۱۸۹ (۶۵.۹٪)</span></div>
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex justify-between"><span>حضوری QR:</span> <span className="text-[#FF7722]">۳،۲۰۸ (۳۴.۱٪)</span></div>
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex justify-between"><span>مجموع کل:</span> <span className="text-[#00A88E]">۹،۳۹۷</span></div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F8FAF9] border border-slate-200 rounded-2xl p-6">
                  <h3 className="font-extrabold text-base text-slate-900 mb-1">۱۰ صنف برتر تجاری از نظر تعداد پذیرنده</h3>
                  <div className="h-56 mt-4"><canvas ref={barCanvasRef}></canvas></div>
                </div>

                <div className="bg-[#F8FAF9] border border-slate-200 rounded-2xl p-6">
                  <h3 className="font-extrabold text-base text-slate-900 mb-1">ترکیب آنلاین و حضوری در ۱۰ صنف بزرگ</h3>
                  <div className="h-56 mt-4"><canvas ref={stackedCanvasRef}></canvas></div>
                </div>

                <div className="bg-[#F8FAF9] border border-slate-200 rounded-2xl p-6">
                  <h3 className="font-extrabold text-base text-slate-900 mb-1">پوشش سبدهای کلیدی هزینه خانوار</h3>
                  <div className="h-56 mt-4 flex justify-center"><canvas ref={polarCanvasRef}></canvas></div>
                </div>

                <div className="bg-[#F8FAF9] border border-slate-200 rounded-2xl p-6 lg:col-span-2">
                  <h3 className="font-extrabold text-base text-slate-900 mb-1">ظرفیت شبکه فیزیکی غول‌های خرده‌فروشی زنجیره‌ای متصل به اوانو</h3>
                  <div className="h-64 mt-4"><canvas ref={chainsCanvasRef}></canvas></div>
                </div>
              </div>
            </section>
          )}

          {/* ۴. غول‌های زنجیره‌ای */}
          {(activeTab === 'all' || activeTab === 'giants') && (
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: primaryColor }} />
                <h2 className="text-xl font-black text-slate-900">غول‌های خرده‌فروشی زنجیره‌ای در شبکه اوانو (۷،۴۶۶+ شعبه فعال)</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {chainGiants.map((g, idx) => (
                  <div key={idx} className="bg-[#F8FAF9] border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:border-[#3DD598] transition-colors">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-extrabold text-sm text-slate-900">{g.name}</span>
                        <span className="text-sm font-black" style={{ color: '#00A88E' }}>{toPersianDigits(g.branches)}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 block mb-3">{g.category}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${Math.max(8, (g.branches / 4400) * 100)}%`, backgroundColor: primaryColor }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ۵. کاوشگر ۳۰ صنف تجاری کامل */}
          {(activeTab === 'all' || activeTab === 'categories') && (
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: primaryColor }} />
                <h2 className="text-xl font-black text-slate-900">کاوشگر هوشمند ۳۰ صنف تجاری اوانو (۹،۳۹۷ فروشگاه)</h2>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                  <div className="flex gap-2 flex-wrap w-full md:w-auto">
                    {[
                      { key: 'all', label: 'همه اصناف (۳۰ صنف)' },
                      { key: 'high-online', label: 'پیشتازان آنلاین' },
                      { key: 'high-offline', label: 'پیشتازان حضوری' },
                      { key: 'essential', label: 'سبد روزمره و مصرفی' },
                    ].map(f => (
                      <button
                        key={f.key}
                        onClick={() => setActiveFilter(f.key)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors cursor-pointer ${activeFilter === f.key ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  <div className="relative w-full md:w-72">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="جستجوی نام صنف (مثلاً پوشاک...)"
                      className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden"
                    />
                    <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[520px] overflow-y-auto pl-2">
                  {filteredCategories.map(cat => (
                    <div key={cat.id} className="bg-[#F8FAF9] border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:border-[#3DD598] transition-all">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{cat.icon}</span>
                          <div>
                            <div className="font-extrabold text-sm text-slate-900">{cat.name}</div>
                            <div className="text-[11px] text-slate-500 font-bold">{toPersianDigits(cat.pct)}٪ از کل شبکه</div>
                          </div>
                        </div>
                        <span className="text-lg font-black text-slate-900">{toPersianDigits(cat.total)}</span>
                      </div>

                      <div className="space-y-1.5">
                        <div className="h-1.5 w-full bg-slate-200 rounded-full flex overflow-hidden">
                          <div className="bg-[#0093DD]" style={{ width: `${(cat.online / cat.total) * 100}%` }} />
                          <div className="bg-[#FF7722]" style={{ width: `${(cat.offline / cat.total) * 100}%` }} />
                        </div>
                        <div className="flex justify-between text-[11px] font-bold text-slate-500">
                          <span className="text-[#0093DD]">آنلاین: {toPersianDigits(cat.online)}</span>
                          <span className="text-[#FF7722]">حضوری: {toPersianDigits(cat.offline)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ۶. موک‌آپ گوشی */}
          <div className="bg-gradient-to-r from-[#1C2022] to-[#141718] text-white rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-white">تجربه خرید یکپارچه در بخش «فروشگاه» اوانو</h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                در رابط کاربری مدرن اپلیکیشن اوانو، ویترین کاملی از هزاران فروشگاه معتبر کشور در دسترس است. کاربران تنها با دو لمس می‌توانند فروشگاه آنلاین دلخواه را باز کرده یا با لمس آیکون اسکنر، کد QR صندوق فروشگاه فیزیکی را اسکن و خرید خود را نهایی کنند.
              </p>
              <div className="space-y-3 pt-2 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#00D4B4] text-slate-950 font-black flex items-center justify-center shrink-0">۱</div>
                  <span><strong>پوشش ۳۶۰ درجه‌ای:</strong> خرید اینترنتی در دیجی‌کالا و خرید حضوری در افق کوروش در یک اپلیکیشن.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#FF7722] text-white font-black flex items-center justify-center shrink-0">۲</div>
                  <span><strong>انتخاب خودکار منبع مالی:</strong> کسر هوشمند از بن رفاهی یا اقساط BNPL بدون کارمزد مازاد.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#0093DD] text-white font-black flex items-center justify-center shrink-0">۳</div>
                  <span><strong>تسویه آنی و بدون تأخیر:</strong> سیستم مالی ویژه همراه اول با گزارش‌های دقیق تحلیلی.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="w-64 bg-black border-4 border-slate-700 rounded-[32px] p-3 shadow-2xl">
                <div className="bg-[#F8FAF9] rounded-[24px] p-3 text-slate-900 space-y-3">
                  <div className="w-16 h-2.5 bg-black rounded-full mx-auto mb-1"></div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200 text-xs">
                    <span className="font-black text-[#00A88E]">فروشگاه اوانو</span>
                    <div className="flex bg-slate-200 rounded-full p-0.5 text-[11px] font-bold">
                      <button onClick={() => setMockupTab('online')} className={`px-2 py-0.5 rounded-full cursor-pointer ${mockupTab === 'online' ? 'bg-[#00D4B4] text-slate-900' : 'text-slate-600'}`}>آنلاین</button>
                      <button onClick={() => setMockupTab('offline')} className={`px-2 py-0.5 rounded-full cursor-pointer ${mockupTab === 'offline' ? 'bg-[#00D4B4] text-slate-900' : 'text-slate-600'}`}>حضوری</button>
                    </div>
                  </div>

                  <div className="bg-[#00D4B4]/15 text-[#00A88E] p-2 rounded-lg text-[10px] font-extrabold text-center">
                    اعتبار قابل مصرف: ۱۰،۰۰۰،۰۰۰ تومان
                  </div>

                  <div className="space-y-1.5 max-h-48 overflow-hidden">
                    {mockupData[mockupTab].map((m, idx) => (
                      <div key={idx} className="bg-white p-2 rounded-lg border border-slate-200 flex justify-between items-center text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-md bg-[#00D4B4]/20 text-[#00A88E] flex items-center justify-center font-bold text-[9px]">{m.avatar}</span>
                          <span className="font-bold">{m.name}</span>
                        </div>
                        <span className="bg-[#FF7722]/15 text-[#FF7722] text-[9px] px-1.5 py-0.5 rounded-md font-bold">{m.badge}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full py-2 rounded-xl font-black text-xs shadow-md text-slate-900 cursor-pointer" style={{ backgroundColor: primaryColor }}>
                    اسکن بارکد QR و پرداخت حضوری
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="bg-[#1C1C1C] text-white p-6 sm:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-800">
          <div className="flex items-center gap-2 text-base font-extrabold">
            <span>خط همراه اول داری؟</span>
            <span className="text-lg font-black" style={{ color: primaryColor }}>«اوانو اعتبارته»</span>
          </div>
          <div className="text-xs text-slate-400 font-light">
            شبکه پذیرندگان و درگاه‌های خرید اعتباری اپلیکیشن اوانو (Ewano) • شرکت همراه کسب‌وکارهای هوشمند (EBCOM) © ۲۰۲۶
          </div>
        </footer>
      </div>
    </div>
  );
}
