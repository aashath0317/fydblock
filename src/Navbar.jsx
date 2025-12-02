// src/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link & useLocation
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Helper to check active state
  const isActive = (path) => location.pathname === path ? 'text-[#00FF9D]' : '';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050B0D]/80 backdrop-blur-xl border-b border-white/10 py-4 shadow-lg transition-all duration-300">
      <div className="container mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img src="/logo.png" alt="FydBlock Logo" className="h-8 md:h-10 object-contain" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link to="/" className={`hover:text-[#00FF9D] transition-colors ${isActive('/')}`}>Home</Link>
          <Link to="/company" className={`hover:text-[#00FF9D] transition-colors ${isActive('/company')}`}>Company</Link>
          <Link to="/affiliate" className={`hover:text-[#00FF9D] transition-colors ${isActive('/affiliate')}`}>Affiliate</Link>
          <Link to="/pricing" className={`hover:text-[#00FF9D] transition-colors ${isActive('/pricing')}`}>Pricing</Link>
          <Link to="/contact" className={`hover:text-[#00FF9D] transition-colors ${isActive('/contact')}`}>Contact Us</Link>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/signin" className="text-white hover:text-[#00FF9D] font-medium transition-colors">
            Log In
          </Link>
          <Link to="/signup" className="bg-[#00FF9D] text-black px-6 py-2 rounded-full font-bold hover:bg-[#00cc7d] transition-all hover:scale-105 shadow-[0_0_15px_rgba(0,255,157,0.3)]">
            Sign Up
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#050B0D]/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl h-screen">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-lg text-left text-gray-300 hover:text-[#00FF9D]">Home</Link>
          <Link to="/company" onClick={() => setMobileMenuOpen(false)} className="text-lg text-left text-gray-300 hover:text-[#00FF9D]">Company</Link>
          <Link to="/affiliate" onClick={() => setMobileMenuOpen(false)} className="text-lg text-left text-gray-300 hover:text-[#00FF9D]">Affiliate</Link>
          <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="text-lg text-left text-gray-300 hover:text-[#00FF9D]">Pricing</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-lg text-left text-[#00FF9D] font-bold">Contact Us</Link>
          <div className="h-px bg-white/10 my-2"></div>
          <Link to="/signin" onClick={() => setMobileMenuOpen(false)} className="text-left text-white font-medium py-2">Log In</Link>
          <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="bg-[#00FF9D] text-black py-3 rounded-lg font-bold text-center">Sign Up</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
