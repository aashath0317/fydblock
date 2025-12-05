// src/App.jsx

import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'; // ADD Navigate
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
import Dashboard from './Dashboard';

// Route Protection Logic
const PrivateRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? element : <Navigate to="/signin" replace />;
};

const App = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Hide Navbar/Footer on these specific paths
  const hideNavAndFooterPaths = ['/signin', '/signup', '/resetpass', '/dashboard', '/bot-builder'];
  const showNavAndFooter = !hideNavAndFooterPaths.includes(location.pathname);

  // Apply specific layout classes for dashboard/bot-builder
  const isFullPage = location.pathname === '/dashboard' || location.pathname === '/bot-builder';
  const mainClass = isFullPage ? "relative z-10 p-0" : "relative z-10";


  return (
    <div className="min-h-screen bg-[#050B0D] text-white font-sans overflow-x-hidden selection:bg-[#00FF9D] selection:text-black relative">

      {/* Background Effects */}
      {!isFullPage && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-[#00FF9D]/10 rounded-full blur-[150px]" />
          <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[60vh] bg-[#00A3FF]/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[40vh] bg-[#00FF9D]/5 rounded-full blur-[180px]" />
        </div>
      )}

      {showNavAndFooter && <Navbar />}

      <main className={mainClass}>
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

          {/* PROTECTED ROUTES */}
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        </Routes>
      </main>

      {showNavAndFooter && <Footer />}
    </div>
  );
};

export default App;
