import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layers, CreditCard, ShoppingBag, LayoutDashboard } from 'lucide-react';

export default function Header() {
  const location = useLocation();

  const navItems = [
    { title: 'Credit', path: '/infographics/credit', icon: CreditCard },
    { title: 'Ziira', path: '/infographics/ziira', icon: Layers },
    { title: 'Merchants', path: '/infographics/merchants', icon: ShoppingBag },
    { title: 'EBCOM', path: '/infographics/ebcom', icon: LayoutDashboard },
  ];

  return (
    <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-lg shadow-lg shadow-indigo-500/20">
            E
          </div>
          <span className="text-lg font-bold text-white tracking-tight">EBCOM Info</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon size={16} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}