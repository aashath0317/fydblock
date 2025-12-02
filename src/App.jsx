// src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // Changed imports
import Navbar from './Navbar';
import Footer from './Footer';
import LandingPage from './LandingPage';
import Company from './Company';
import Affiliate from './Affiliate';
import PricingAndPlans from './PricingAndPlans';
import ContactPage from './ContactPage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ResetPass from './ResetPass';
import BotBuilder from './BotBuilder';

const App = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Hide Navbar/Footer on these specific paths
  const hideNavAndFooterPaths = ['/signin', '/signup', '/resetpass'];
  const showNavAndFooter = !hideNavAndFooterPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#050B0D] text-white font-sans overflow-x-hidden selection:bg-[#00FF9D] selection:text-black relative">

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-[#00FF9D]/10 rounded-full blur-[150px]" />
        <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[60vh] bg-[#00A3FF]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[40vh] bg-[#00FF9D]/5 rounded-full blur-[180px]" />
      </div>

      {showNavAndFooter && <Navbar />}

      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/company" element={<Company />} />
          <Route path="/pricing" element={<PricingAndPlans />} />
          <Route path="/affiliate" element={<Affiliate />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/resetpass" element={<ResetPass />} />
          <Route path="/bot-builder" element={<BotBuilder />} />
        </Routes>
      </main>

      {showNavAndFooter && <Footer />}
    </div>
  );
};

export default App;
