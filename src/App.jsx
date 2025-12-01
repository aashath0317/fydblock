// src/App.jsx
import React, { useState } from 'react';
import Navbar from './Navbar';
import LandingPage from './LandingPage';
import ContactPage from './ContactPage';
import Company from './Company';
import Affiliate from './Affiliate';
import PricingAndPlans from './PricingAndPlans';
import SignIn from './SignIn';
import Footer from './Footer';
import SignUp from './SignUp';
import ResetPass from './ResetPass';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page, sectionId = null) => {
    setCurrentPage(page);
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-[#050B0D] text-white font-sans overflow-x-hidden selection:bg-[#00FF9D] selection:text-black relative">

      {/* Background Effects... */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-[#00FF9D]/10 rounded-full blur-[150px]" />
        <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[60vh] bg-[#00A3FF]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[40vh] bg-[#00FF9D]/5 rounded-full blur-[180px]" />
      </div>

      <Navbar currentPage={currentPage} navigateTo={navigateTo} />

      <main>
        {currentPage === 'home' && <LandingPage />}
        {currentPage === 'company' && <Company />}
        {currentPage === 'pricing' && <PricingAndPlans />}
        {currentPage === 'affiliate' && <Affiliate />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'signin' && <SignIn navigateTo={navigateTo} />}
        {currentPage === 'signup' && <SignUp navigateTo={navigateTo} />}
        {currentPage === 'resetpass' && <ResetPass navigateTo={navigateTo} />}
      </main>

      {/* Only show Navbar if NOT on signin OR signup page */}
      {currentPage !== 'signin' && currentPage !== 'signup' && currentPage !== 'resetpass' && (
        <Navbar currentPage={currentPage} navigateTo={navigateTo} />
      )}

      {/* Only show Footer if NOT on auth pages */}
      {currentPage !== 'signin' && currentPage !== 'signup' && currentPage !== 'resetpass' && (
        <Footer navigateTo={navigateTo} />
      )}

    </div>
  );
};

export default App;