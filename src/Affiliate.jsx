import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowRight,
    Minus,
    Plus,
    Menu,
    X,
    ChevronDown
} from 'lucide-react';

const EXCHANGES = [
    { name: 'BINANCE', logo: 'BINANCE.png' },
    { name: 'COINBASE', logo: 'COINBASE.png' },
    { name: 'KRAKEN', logo: 'KRAKEN.png' },
    { name: 'BYBIT', logo: 'BYBIT.png' },
    { name: 'OKX', logo: 'OKX.jpg' },
];

const MARQUEE_LOGOS = [...EXCHANGES, ...EXCHANGES, ...EXCHANGES, ...EXCHANGES];

const Affiliate = () => {
    const navigate = useNavigate();
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
                        {/* Updated to Partner */}
                        <a href="https://partner.fydblock.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#00FF9D] transition-colors">Partner</a>
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
                                <a href="https://partner.fydblock.com" target="_blank" rel="noopener noreferrer" className="border border-[#00FF9D] text-[#00FF9D] bg-transparent px-10 py-3 rounded-full text-lg font-medium hover:bg-[#00FF9D] hover:text-black transition-all duration-300 inline-block text-center">
                                    Join Now
                                </a>
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

            <div className="overflow-hidden relative w-full mask-linear-gradient">
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#050B0D] to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050B0D] to-transparent z-10"></div>

                <div className="flex gap-16 animate-marquee whitespace-nowrap px-6 transition-all duration-500 w-max">
                    {MARQUEE_LOGOS.map((ex, i) => (
                        <span key={i} className="text-2xl font-bold font-mono tracking-widest text-white/40 flex items-center gap-4 hover:text-[#00FF9D] hover:shadow-[0_0_10px_rgba(0,255,157,0.2)] transition-all cursor-default group">
                            <img
                                src={`/logos/${ex.logo}`}
                                alt={ex.name}
                                className="w-14 h-14 object-contain transition-opacity"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                }}
                            />
                            <span className="w-14 h-14 rounded bg-white/10 hidden"></span>
                            {ex.name}
                        </span>
                    ))}
                </div>
            </div>

            {/* --- Steps Section --- */}
            <br />
            <br />
            <br />
            <section className="container mx-auto px-6 mb-32">
                <h2 className="text-3xl md:text-5xl font-medium text-center text-white mb-20">
                    Get Started In Three Easy Steps
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                    <StepCard
                        number="1. Join"
                        title="Sign up for the Partner Program"
                        actionLabel="Join Now"
                        actionLink="https://partner.fydblock.com"
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
                        <h3 className="text-2xl font-bold text-white mb-2">Become our Pro Partner</h3>
                        <p className="text-gray-400">Earn lifetime commission + trading volume bonus.</p>
                    </div>
                    <a href="https://partner.fydblock.com" target="_blank" rel="noopener noreferrer" className="relative z-10 bg-[#00FF9D] text-black px-8 py-3 rounded-full font-bold hover:bg-[#00cc7d] transition-all shadow-[0_0_20px_rgba(0,255,157,0.3)]">
                        Join Now
                    </a>
                </div>
            </section>

            {/* --- FAQ Section --- */}
            <section className="py-24 relative z-10" id="faq">
                <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-4">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">FydBlock <br />Frequently Asked Questions</h2>
                        <p className="text-gray-400 mb-8">Can't find the answer you're looking for? Reach out to our customer support team.</p>
                        <button className="text-[#00FF9D] font-bold flex items-center gap-2 hover:gap-4 transition-all hover:text-white">
                            Contact Support <ArrowRight size={20} />
                        </button>
                    </div>
                    <div className="lg:col-span-8 space-y-4">
                        <AccordionItem question="Is my money safe with FydBlock?" answer="Absolutely. Your funds always remain on your exchange account (like Binance or Coinbase). FydBlock simply sends trade commands via API keys which you configure to disable withdrawal permissions." />
                        <AccordionItem question="Do I need coding skills to use the bots?" answer="No! FydBlock is designed for everyone. We offer pre-configured templates and a visual strategy builder. You can start a bot in 3 clicks." />
                        <AccordionItem question="Which exchanges do you support?" answer="We support over 15 major exchanges including Binance, Kraken, Coinbase Pro, KuCoin, OKX, Bybit, and more." />
                        <AccordionItem question="Can I try it for free?" answer="Yes, we offer a 7-day free trial on our Pro plan so you can test all features risk-free. No credit card required." />
                    </div>
                </div>
            </section>
        </div>
    );
};

/* --- Sub Components --- */

const StepCard = ({ number, title, actionLabel, actionLink, isActive }) => (
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
            <a href={actionLink} target="_blank" rel="noopener noreferrer" className="w-full bg-[#00FF9D] text-black py-2.5 rounded-lg font-bold text-sm hover:bg-[#00cc7d] transition-colors block text-center">
                {actionLabel}
            </a>
        )}
    </div>
);

const AccordionItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-white/5">
            <button
                className="w-full py-6 flex items-center justify-between text-left hover:text-[#00FF9D] transition-colors group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium text-lg text-gray-200 group-hover:text-[#00FF9D]">{question}</span>
                <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#00FF9D]' : 'text-gray-500'}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-48 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-400 leading-relaxed">{answer}</p>
            </div>
        </div>
    );
};

export default Affiliate;
