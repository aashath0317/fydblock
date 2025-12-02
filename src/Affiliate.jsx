import React, { useState } from 'react';
import {
    ArrowRight,
    Minus,
    Plus,
    Menu,
    X
} from 'lucide-react';

const Affiliate = () => {
    // State for the calculator
    const [clients, setClients] = useState(10); // Default to 10 to match image
    const earnings = (clients * 125).toLocaleString();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#020506] text-white font-sans selection:bg-[#00FF9D] selection:text-black">

            {/* --- Navbar (Matches Image) --- */}
            <nav className="fixed top-0 w-full z-50 bg-[#020506]/80 backdrop-blur-md border-b border-white/5">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-6 bg-[#00FF9D] skew-x-[-15deg]"></div>
                        <span className="text-xl font-bold tracking-tight">ydblock.</span>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8 text-sm text-gray-400 font-medium">
                        <a href="#" className="hover:text-white transition-colors">Product</a>
                        <a href="#" className="hover:text-white transition-colors">Company</a>
                        <a href="#" className="hover:text-white transition-colors">Pricing</a>
                        <a href="#" className="text-white">Affiliate</a>
                        <a href="#" className="hover:text-white transition-colors">Contact Us</a>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <button className="bg-[#00FF9D] text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-[#00cc7d] transition-colors shadow-[0_0_15px_rgba(0,255,157,0.4)]">
                            Get Started
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* --- Hero Section --- */}
            <section className="pt-40 pb-20 relative overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#00FF9D]/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                        {/* Left Text Content */}
                        <div className="space-y-8 max-w-xl">
                            <h1 className="text-5xl md:text-5xl font-light leading-[1.1] text-white">
                                Earn Up To 30% For <br />
                                Every Payment <br />
                                Your Referred <br />
                                Users Make.
                            </h1>

                            <p className="text-gray-400 text-lg md:text-xl font-light">
                                Lifetime referral share + bonuses for trading volume
                            </p>

                            <div className="pt-4">
                                <button className="border border-[#00FF9D] text-[#00FF9D] bg-transparent px-10 py-3 rounded-full text-lg font-medium hover:bg-[#00FF9D] hover:text-black transition-all duration-300">
                                    Join Now
                                </button>
                            </div>
                        </div>

                        {/* Right Calculator Card */}
                        <div className="relative">
                            {/* Card Container */}
                            <div className="bg-[#080D0F] border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">

                                {/* Top Glow Line (Green border effect) */}
                                <div className="absolute top-0 right-0 w-full h-full border border-[#00FF9D]/30 rounded-[2rem] pointer-events-none"></div>
                                <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#00FF9D]/10 blur-[60px] rounded-full pointer-events-none"></div>

                                {/* Header & Big Number */}
                                <div className="flex justify-between items-start mb-12">
                                    <span className="text-gray-400 text-sm font-medium pt-2">
                                        Number of Clients
                                    </span>
                                    <span className="text-7xl md:text-8xl font-light text-white leading-none tracking-tighter">
                                        {clients}
                                    </span>
                                </div>

                                {/* Custom Slider */}
                                <div className="mb-12 relative group">
                                    <input
                                        type="range"
                                        min="1"
                                        max="100"
                                        value={clients}
                                        onChange={(e) => setClients(parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer z-20 relative"
                                        style={{
                                            backgroundImage: `linear-gradient(to right, white 0%, white ${(clients / 100) * 100}%, #374151 ${(clients / 100) * 100}%, #374151 100%)`
                                        }}
                                    />
                                    {/* Custom Styles for Slider Thumb via Style Tag (Tailwind doesn't support complex range inputs easily inline) */}
                                    <style>{`
                                        input[type=range]::-webkit-slider-thumb {
                                            -webkit-appearance: none;
                                            height: 24px;
                                            width: 48px;
                                            border-radius: 999px;
                                            background: white;
                                            cursor: pointer;
                                            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                                        }
                                        input[type=range]::-moz-range-thumb {
                                            height: 24px;
                                            width: 48px;
                                            border-radius: 999px;
                                            background: white;
                                            border: none;
                                            cursor: pointer;
                                            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                                        }
                                    `}</style>
                                </div>

                                {/* Earnings Box */}
                                <div className="bg-[#05080A] border border-white/5 rounded-2xl p-6 md:p-8">
                                    <p className="text-gray-500 text-sm mb-2">Your potentials Earnings</p>
                                    <p className="text-4xl md:text-5xl font-medium text-white tracking-tight">
                                        ${earnings}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- Partners Logos --- */}
            <section className="container mx-auto px-6 mb-32">
                {/* Partners Logos (Mock) */}
                <div className="mt-24 pt-12 border-t border-white/5 flex flex-wrap justify-center gap-12 grayscale hover:grayscale-0 transition-all duration-500">
                    {[
                        { name: 'KRAKEN', file: 'KRAKEN.png' },
                        { name: 'BINANCE', file: 'BINANCE.png' },
                        { name: 'COINBASE', file: 'COINBASE.png' },
                        { name: 'BYBIT', file: 'BYBIT.png' },
                        { name: 'OKX', file: 'OKX.jpg' }
                    ].map((brand, i) => (
                        <div key={i} className="flex items-center gap-3 group select-none">
                            <img
                                src={`/logos/${brand.file}`}
                                alt={brand.name}
                                className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300"
                                onError={(e) => {
                                    e.target.style.display = 'none'; // Hide image if broken
                                    e.target.nextSibling.style.display = 'block'; // Show backup circle
                                }}
                            />
                            {/* Backup circle in case image fails to load */}
                            <div className="w-8 h-8 bg-gray-600 rounded-full hidden"></div>

                            <span className="text-xl font-bold text-gray-500 group-hover:text-white transition-colors">
                                {brand.name}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Steps Section --- */}
            <section className="container mx-auto px-6 mb-32">
                <h2 className="text-3xl md:text-5xl font-medium text-center text-white mb-20">
                    Get Started In Three Easy Steps
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                    <StepCard
                        number="1. Join"
                        title="Sign up for the Affiliate Program"
                        actionLabel="Join Now"
                        isActive={true}
                    />
                    <StepCard
                        number="2. Invite People"
                        title="Link to friends/content by sharing your unique referral link."
                    />
                    <StepCard
                        number="3. Earn"
                        title="Earn up to 30% commission on every trade your referrals make."
                    />
                </div>

                <p className="text-center text-gray-500 mt-16 max-w-2xl mx-auto text-sm md:text-base">
                    Get subscription and trading volume bonuses from users you refer,
                    regardless of which exchange they trade on using FydBlock.
                </p>
            </section>

            {/* --- Pro Affiliate Banner --- */}
            <section className="container mx-auto px-6 mb-32">
                <div className="border border-white/10 bg-[#0A1014] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-[#00FF9D]/30 transition-colors duration-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00FF9D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                    <div className="relative z-10 text-center md:text-left">
                        <h3 className="text-2xl font-bold text-white mb-2">Become our Pro Affiliate</h3>
                        <p className="text-gray-400">Earn lifetime commission + trading volume bonus.</p>
                    </div>
                    <button className="relative z-10 bg-[#00FF9D] text-black px-8 py-3 rounded-full font-bold hover:bg-[#00cc7d] transition-all shadow-[0_0_20px_rgba(0,255,157,0.3)]">
                        Join Now
                    </button>
                </div>
            </section>

            {/* --- FAQ Section --- */}
            <section className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 mb-24">
                <div>
                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#00FF9D]/10 text-[#00FF9D] text-xs font-bold mb-8 uppercase tracking-wider">
                        Frequently Asked Questions
                    </div>
                    <h2 className="text-4xl md:text-5xl font-medium mb-8 text-white leading-[1.1]">
                        Crypto Blockchain <br /> Frequently Asked <br /> Questions
                    </h2>
                    <p className="text-gray-400 mb-10 leading-relaxed max-w-md">
                        Here are some of the most common questions from our community.
                        Whether you are a first-time user, investor, or developer, we've got the answers.
                    </p>
                    <div className="flex items-center gap-6">
                        <button className="bg-[#00FF9D] text-black px-6 py-3 rounded-full font-bold hover:bg-[#00cc7d] transition-all">
                            More Questions
                        </button>
                        <button className="text-white flex items-center gap-2 hover:text-[#00FF9D] transition-colors font-medium group">
                            Contact Us
                            <span className="bg-white/10 rounded-full p-1 group-hover:bg-[#00FF9D]/20 transition-colors"><ArrowRight size={14} /></span>
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <Accordion
                        title="What makes this blockchain different?"
                        content="Our architecture prioritizes user ownership and transparent automation logic, unlike black-box competitors."
                    />
                    <Accordion
                        title="How can I buy your token?"
                        content="Our utility token is available on Uniswap and our partner centralized exchanges."
                    />
                    <Accordion
                        title="What is the consensus mechanism?"
                        content="We use a unique consensus layer that allows for sub-second finality on trade execution signals."
                    />
                    <Accordion
                        title="How does it handle scalability?"
                        content="We utilize sharding technology to ensure high throughput even during peak network activity."
                    />
                </div>
            </section>
        </div>
    );
};

/* --- Sub Components --- */

const StepCard = ({ number, title, actionLabel, isActive }) => (
    <div className={`
    relative p-8 rounded-2xl border transition-all duration-300 h-full flex flex-col justify-between
    ${isActive
            ? 'bg-gradient-to-b from-[#00FF9D]/5 to-[#0A1014] border-[#00FF9D]/40 shadow-[0_0_30px_rgba(0,255,157,0.05)]'
            : 'bg-[#0A1014]/50 border-white/5 hover:border-white/20'}
  `}>
        <div>
            <div className="text-lg font-bold text-white mb-4">{number}</div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">{title}</p>
        </div>

        {actionLabel && (
            <button className="w-full bg-[#00FF9D] text-black py-2.5 rounded-lg font-bold text-sm hover:bg-[#00cc7d] transition-colors">
                {actionLabel}
            </button>
        )}
    </div>
);

const Accordion = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/10 pb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between text-left py-4 group"
            >
                <span className="text-lg font-medium text-white group-hover:text-[#00FF9D] transition-colors pr-4">{title}</span>
                <span className={`text-[#00FF9D] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <p className="text-gray-400 leading-relaxed pr-8 pb-4">{content}</p>
            </div>
        </div>
    );
};

export default Affiliate;
