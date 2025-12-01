import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ currentPage, navigateTo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page) => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050B0D]/80 backdrop-blur-xl border-b border-white/10 py-4 shadow-lg transition-all duration-300">
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNav('home')}>
          <img src="/logo.png" alt="FydBlock Logo" className="h-8 md:h-10 object-contain" />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <button 
            onClick={() => handleNav('home')} 
            className={`hover:text-[#00FF9D] transition-colors ${currentPage === 'home' ? 'text-[#00FF9D]' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => handleNav('company')} 
            className={`hover:text-[#00FF9D] transition-colors ${currentPage === 'company' ? 'text-[#00FF9D]' : ''}`}
          >
            Company
          </button>
          <button 
            onClick={() => handleNav('affiliate')} 
            className={`hover:text-[#00FF9D] transition-colors ${currentPage === 'affiliate' ? 'text-[#00FF9D]' : ''}`}
          >
            Affiliate
          </button>
          <button 
            onClick={() => handleNav('pricing')} 
            className={`hover:text-[#00FF9D] transition-colors ${currentPage === 'pricing' ? 'text-[#00FF9D]' : ''}`}
          >
            Pricing
          </button>
          <button 
            onClick={() => handleNav('contact')} 
            className={`hover:text-[#00FF9D] transition-colors ${currentPage === 'contact' ? 'text-[#00FF9D]' : ''}`}
          >
            Contact Us
          </button>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => handleNav('signin')}
            className="text-white hover:text-[#00FF9D] font-medium transition-colors"
          >
            Log In
          </button>
          <button 
            onClick={() => handleNav('signup')}
            className="bg-[#00FF9D] text-black px-6 py-2 rounded-full font-bold hover:bg-[#00cc7d] transition-all hover:scale-105 shadow-[0_0_15px_rgba(0,255,157,0.3)]"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* --- Mobile Menu Dropdown (Fixed) --- */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#050B0D]/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-5 h-screen">
          <button onClick={() => handleNav('home')} className="text-lg text-left text-gray-300 hover:text-[#00FF9D]">Home</button>
          <button onClick={() => handleNav('company')} className="text-lg text-left text-gray-300 hover:text-[#00FF9D]">Company</button>
          <button onClick={() => handleNav('affiliate')} className="text-lg text-left text-gray-300 hover:text-[#00FF9D]">Affiliate</button>
          <button onClick={() => handleNav('pricing')} className="text-lg text-left text-gray-300 hover:text-[#00FF9D]">Pricing</button>
          <button onClick={() => handleNav('contact')} className="text-lg text-left text-[#00FF9D] font-bold">Contact Us</button>
          
          <div className="h-px bg-white/10 my-2"></div>
          
          <button onClick={() => handleNav('signin')} className="text-left text-white font-medium py-2">Log In</button>
          <button onClick={() => handleNav('signup')} className="bg-[#00FF9D] text-black py-3 rounded-lg font-bold text-center">Sign Up</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
