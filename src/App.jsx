import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Credit from './pages/Credit';
import Ziira from './pages/Ziira';
import Merchants from './pages/Merchants';
import Ebcom from './pages/Ebcom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/infographics/credit" element={<Credit />} />
        <Route path="/infographics/ziira" element={<Ziira />} />
        <Route path="/infographics/merchants" element={<Merchants />} />
        <Route path="/infographics/ebcom" element={<Ebcom />} />
      </Routes>
    </Router>
  );
}