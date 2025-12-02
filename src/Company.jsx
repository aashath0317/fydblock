import React, { useState, useEffect } from 'react';
import {
    Plus, Minus, ArrowRight, User, Star,
    ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Company = () => {
    const navigate = useNavigate();
    return (
        <div className="pt-32 pb-20 relative z-10 animate-in fade-in duration-500">

            {/* --- Welcome Section --- */}
            <section className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center mb-24">
                <div className="space-y-6 order-2 lg:order-1">
                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                        Welcome To <span className="text-[#00FF9D]">Fydblock.</span>
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                        We deliver cutting-edge AI powered algorithms for automated trading.
                        From DCA and Grid bots to your Signals with TradingView integration,
                        we make professional trading tools accessible to everyone.
                    </p>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                        With immersive charts, real-time data, and bank-grade security,
                        FydBlock is the ultimate solution for safe, insightful, and minimal trading.
                    </p>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                        Our platform puts you in control while our AI automation handles
                        execution 24/7/365.
                    </p>

                    <button
                        onClick={() => navigate('/pricing')}
                        className="bg-[#00FF9D] text-black px-8 py-3 rounded-full font-bold hover:bg-[#00cc7d] transition-all shadow-[0_0_15px_rgba(0,255,157,0.3)] mt-4"
                    >
                        Start Free Trial
                    </button>
                </div>

                {/* --- Hero Image --- */}
                <div className="relative flex justify-center order-1 lg:order-2">
                    <div className="w-[350px] h-[350px] md:w-[500px] md:h-[500px] relative animate-float">
                        {/* Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#00FF9D]/20 blur-[60px] rounded-full pointer-events-none"></div>

                        <img
                            src="/hero.png"
                            alt="Neural Network AI"
                            className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    </div>
                </div>
            </section>

            {/* --- Stats Section (ANIMATED) --- */}
            <section className="container mx-auto px-6 mb-24">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Trusted Worldwide Since 2021</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center md:text-left">
                        <div className="text-5xl md:text-6xl font-bold text-[#00FF9D] mb-2">
                            <CountUp end={1.2} suffix="K" decimals={1} />
                        </div>
                        <div className="text-gray-400 text-sm font-medium tracking-wide">Investing Users</div>
                    </div>

                    <div className="text-center md:text-left">
                        <div className="text-5xl md:text-6xl font-bold text-[#00FF9D] mb-2">
                            <CountUp end={0.8} suffix="M" decimals={1} />
                        </div>
                        <div className="text-gray-400 text-sm font-medium tracking-wide">Total Registered Users</div>
                    </div>

                    <div className="text-center md:text-left">
                        <div className="text-5xl md:text-6xl font-bold text-[#00FF9D] mb-2">
                            <CountUp end={150} prefix="$" suffix="M" decimals={0} />
                        </div>
                        <div className="text-gray-400 text-sm font-medium tracking-wide">Asset Locked</div>
                    </div>
                </div>

                {/* Green Banner */}
                <div className="mt-16 bg-gradient-to-r from-[#00FF9D]/20 to-[#00A3FF]/10 border border-[#00FF9D]/30 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[#00FF9D]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold text-white">Join 15,000+ Active FydBlock Members!</h3>
                        <p className="text-sm text-gray-300">Be part of the future of automated trading.</p>
                    </div>
                    <button
                        onClick={() => window.open('https://t.me/Fydblock', '_blank')}
                        className="relative z-10 border border-white text-white px-8 py-2 rounded-xl bg-transparent hover:bg-white hover:text-black transition-all font-medium">
                        Join us
                    </button>
                </div>
            </section>

            <section className="container mx-auto px-6 mb-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Side: Text Content */}
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-8 relative inline-block">
                            Our History
                            {/* Optional underline accent */}
                            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-[#00FF9D] rounded-full"></span>
                        </h2>

                        <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                            <p>
                                We started with a simple idea: make professional-grade trading automation accessible to everyone.
                                What began as a small script for friends has evolved into a robust platform serving thousands globally.
                            </p>
                            <p>
                                Since launching our beta in late 2021, we have integrated 15+ major exchanges and executed millions of
                                trades. The crypto winter didn't slow us down—it only made our risk management tools sharper.
                            </p>
                            <p>
                                Our team has expanded from two founders to a dedicated group of 20+ engineers.
                                We remain committed to our core mission: providing transparency, security, and performance.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Image Placeholder */}
                    <div className="relative h-[400px] w-full bg-[#0A1014] border border-white/10 rounded-2xl overflow-hidden group">
                        {/* Decorative Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-[#00FF9D]/10 blur-[50px] rounded-full"></div>

                        {/* Placeholder Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 z-10">
                            <div className="w-16 h-16 mb-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                    <circle cx="9" cy="9" r="2" />
                                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                                </svg>
                                <img src="./history.png" alt="Our History" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            {/* --- Founders Section --- */}
            <section className="container mx-auto px-6 mb-24">
                <h2 className="text-4xl font-bold text-white mb-12">Our Founders</h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
                    <FounderCard name="Shaafi M" role="CEO & Founder" />
                    <FounderCard name="Aashath MA" role="CTO & Founder" />
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

const CountUp = ({ end, duration = 2000, suffix = '', prefix = '', decimals = 0 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(progress * end);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [end, duration]);

    return <>{prefix}{count.toFixed(decimals)}{suffix}</>;
};

const FounderCard = ({ name, role }) => (
    <div className="bg-[#0A1014] border border-white/5 rounded-2xl p-6 flex items-start gap-4 hover:border-[#00FF9D]/30 transition-all group">
        <div className="w-12 h-12 rounded-full bg-[#00FF9D]/10 flex items-center justify-center text-[#00FF9D] group-hover:bg-[#00FF9D] group-hover:text-black transition-colors">
            <Star size={20} fill="currentColor" />
        </div>
        <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
            <p className="text-sm text-gray-400">{role}</p>
        </div>
        <div className="text-[#00FF9D] opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight size={20} />
        </div>
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
export default Company;
