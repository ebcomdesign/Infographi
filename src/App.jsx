import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Credit from './pages/Credit';
import Ziira from './pages/Ziira';
import Merchants from './pages/Merchants';
import Ebcom from './pages/Ebcom';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans" dir="rtl">
        <Header />
        <main className="flex-grow container mx-auto px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/infographics/credit" element={<Credit />} />
            <Route path="/infographics/ziira" element={<Ziira />} />
            <Route path="/infographics/merchants" element={<Merchants />} />
            <Route path="/infographics/ebcom" element={<Ebcom />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}