import React from 'react';
import { Twitter, Linkedin, Facebook } from 'lucide-react';

const Footer = ({ navigateTo }) => {
    return (
        <footer className="py-12 border-t border-white/5 bg-[#030607]/80 backdrop-blur-sm text-sm text-gray-400 relative z-10">
            <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">

                {/* Brand Column */}
                <div>
                    <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => navigateTo('home')}>
                        <img src="/logo.png" alt="Logo" className="h-12" />
                    </div>
                    <p>Automated crypto trading for everyone.</p>
                    <p>Reg.nr. 57541</p>
                    <p>License nr. 59990</p>
                    <p className="mb-4">Address: Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, United Arab Emirates.</p>
                    <div className="flex gap-4">
                        <SocialIcon icon={<Twitter size={18} />} />
                        <SocialIcon icon={<Linkedin size={18} />} />
                        <SocialIcon icon={<Facebook size={18} />} />
                    </div>
                </div>

                {/* Platform Links - Connected to Landing Page Sections */}
                <div>
                    <h4 className="text-white font-bold mb-4">Platform</h4>
                    <ul className="space-y-2">
                        <li>
                            <button onClick={() => navigateTo('home', 'features')} className="hover:text-[#00FF9D] transition-colors text-left">
                                Features
                            </button>
                        </li>
                        <li>
                            <button onClick={() => navigateTo('home', 'bots')} className="hover:text-[#00FF9D] transition-colors text-left">
                                Trading Bots
                            </button>
                        </li>
                        <li>
                            <button onClick={() => navigateTo('home', 'ai-demo')} className="hover:text-[#00FF9D] transition-colors text-left">
                                AI Strategy
                            </button>
                        </li>
                        <li>
                            <button onClick={() => navigateTo('home', 'faq')} className="hover:text-[#00FF9D] transition-colors text-left">
                                FAQ
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Company Links */}
                <div>
                    <h4 className="text-white font-bold mb-4">Company</h4>
                    <ul className="space-y-2">
                        <li><button onClick={() => navigateTo('home')} className="hover:text-[#00FF9D] transition-colors text-left">About Us</button></li>
                        <li><button onClick={() => navigateTo('home')} className="hover:text-[#00FF9D] transition-colors text-left">Careers</button></li>
                        <li>
                            <button onClick={() => navigateTo('contact')} className="hover:text-[#00FF9D] transition-colors text-left">
                                Contact Us
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Legal Links */}
                <div>
                    <h4 className="text-white font-bold mb-4">Legal</h4>
                    <ul className="space-y-2">
                        <li><button className="hover:text-[#00FF9D] transition-colors text-left">Privacy Policy</button></li>
                        <li><button className="hover:text-[#00FF9D] transition-colors text-left">Terms of Service</button></li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="container mx-auto px-6 text-center pt-8 border-t border-white/5">
                <p>&copy; 2025 FydBlock. All rights reserved.</p>

            </div>
        </footer>
    );
};

// Helper component for social icons
const SocialIcon = ({ icon }) => (
    <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center hover:bg-[#00FF9D] hover:text-black transition-colors cursor-pointer hover:shadow-[0_0_10px_#00FF9D]">
        {icon}
    </div>
);

export default Footer;