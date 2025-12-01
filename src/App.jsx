import React, { useState } from 'react';
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

const App = () => {
  // Default to 'home' so the Landing Page shows first
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page, sectionId = null) => {
    setCurrentPage(page);
    if (sectionId) {
      // Small delay to ensure page renders before scrolling
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

  // List of pages where Navbar and Footer should be HIDDEN
  const authPages = ['signin', 'signup', 'resetpass'];
  const showNavAndFooter = !authPages.includes(currentPage);

  return (
    <div className="min-h-screen bg-[#050B0D] text-white font-sans overflow-x-hidden selection:bg-[#00FF9D] selection:text-black relative">

      {/* --- Global Ambient Background Effects --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-[#00FF9D]/10 rounded-full blur-[150px]" />
        <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[60vh] bg-[#00A3FF]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[40vh] bg-[#00FF9D]/5 rounded-full blur-[180px]" />
      </div>

      {/* --- Navigation (Only shows on non-auth pages) --- */}
      {showNavAndFooter && (
        <Navbar currentPage={currentPage} navigateTo={navigateTo} />
      )}

      {/* --- Main Content Area --- */}
      <main className="relative z-10">
        {currentPage === 'home' && <LandingPage navigateTo={navigateTo} />}
        {currentPage === 'company' && <Company />}
        {currentPage === 'pricing' && <PricingAndPlans />}
        {currentPage === 'affiliate' && <Affiliate />}
        {currentPage === 'contact' && <ContactPage />}

        {/* Auth Pages */}
        {currentPage === 'signin' && <SignIn navigateTo={navigateTo} />}
        {currentPage === 'signup' && <SignUp navigateTo={navigateTo} />}
        {currentPage === 'resetpass' && <ResetPass navigateTo={navigateTo} />}
      </main>

      {/* --- Footer (Only shows on non-auth pages) --- */}
      {showNavAndFooter && (
        <Footer navigateTo={navigateTo} />
      )}

    </div>
  );
};

export default App;
