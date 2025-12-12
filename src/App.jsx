// src/App.jsx

import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
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
import Portfolio from './Portfolio';
import Bots from './Bots';
import ConfigureBot from './ConfigureBot';
import Backtest from './Backtest';
import LiveMarket from './LiveMarket';
import API_BASE_URL from './config';
import { TradingProvider } from './context/TradingContext'; // <--- 1. Import Context Provider

const PrivateRoute = ({ element }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    const checkUserStatus = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/user/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setIsProfileComplete(data.profileComplete);
        } else {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check failed", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050B0D]">
        <Loader2 className="animate-spin text-[#00FF9D]" size={48} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (!isProfileComplete) {
    return <Navigate to="/bot-builder" replace />;
  }

  return element;
};

const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const hideNavAndFooterPaths = [
    '/signin',
    '/signup',
    '/resetpass',
    '/dashboard',
    '/bot-builder',
    '/portfolio',
    '/bots',
    '/backtest',
    '/live-market',
    '/configure-bot'
  ];

  const showNavAndFooter = !hideNavAndFooterPaths.includes(location.pathname);

  const isFullPage = [
    '/dashboard',
    '/bot-builder',
    '/portfolio',
    '/bots',
    '/backtest',
    '/live-market',
    '/configure-bot'
  ].includes(location.pathname);

  const mainClass = isFullPage ? "relative z-10 p-0" : "relative z-10";

  return (
    <div className="min-h-screen bg-[#050B0D] text-white font-sans overflow-x-hidden selection:bg-[#00FF9D] selection:text-black relative">
      {!isFullPage && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-[#00FF9D]/10 rounded-full blur-[150px]" />
          <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[60vh] bg-[#00A3FF]/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[40vh] bg-[#00FF9D]/5 rounded-full blur-[180px]" />
        </div>
      )}

      {showNavAndFooter && <Navbar />}

      {/* 2. Wrap Main Routes with TradingProvider */}
      <TradingProvider>
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

            {/* Bot Builder */}
            <Route path="/bot-builder" element={
              localStorage.getItem('token') ? <BotBuilder /> : <Navigate to="/signin" replace />
            } />

            {/* Dashboard Routes (Now have access to isPaperTrading) */}
            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/portfolio" element={<PrivateRoute element={<Portfolio />} />} />
            <Route path="/bots" element={<PrivateRoute element={<Bots />} />} />
            <Route path="/configure-bot" element={<PrivateRoute element={<ConfigureBot />} />} />
            <Route path="/live-market" element={<PrivateRoute element={<LiveMarket />} />} />

            {/* Backtest Route */}
            <Route path="/backtest" element={<PrivateRoute element={<Backtest />} />} />
          </Routes>
        </main>
      </TradingProvider>

      {showNavAndFooter && <Footer />}
    </div>
  );
};

export default App;
