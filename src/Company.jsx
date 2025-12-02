import React, { useState, useEffect } from 'react';
import { Plus, Minus, ArrowRight, User, Star } from 'lucide-react';

const Company = () => {
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

                    <button className="bg-[#00FF9D] text-black px-8 py-3 rounded-full font-bold hover:bg-[#00cc7d] transition-all shadow-[0_0_15px_rgba(0,255,157,0.3)] mt-4">
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
                    <button className="relative z-10 border border-white text-white px-8 py-2 rounded-xl bg-transparent hover:bg-white hover:text-black transition-all font-medium">
                        Join us
                    </button>
                </div>
            </section>

            {/* --- History Section --- */}
            <section className="container mx-auto px-6 mb-24">
                <h2 className="text-4xl font-bold text-white mb-12">Our History</h2>
                <div className="space-y-6 text-gray-400 leading-relaxed max-w-4xl">
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
            <section className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 mb-20">
                <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-[#00FF9D]/10 text-[#00FF9D] text-xs font-bold mb-6">
                        Common Questions
                    </div>
                    <h2 className="text-4xl font-bold mb-6 text-white leading-tight">
                        Crypto Blockchain <br /> Frequently Asked <br /> Questions
                    </h2>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                        Have questions? We have answers. Learn more about our platform, security, and how we differ from the competition.
                    </p>
                    <div className="flex items-center gap-6">
                        <button className="bg-[#00FF9D] text-black px-6 py-3 rounded-full font-bold hover:bg-[#00cc7d] transition-all">
                            More Questions
                        </button>
                        <button className="text-white flex items-center gap-2 hover:text-[#00FF9D] transition-colors font-medium">
                            Read Docs <span className="bg-white/10 rounded-full p-1"><ArrowRight size={12} /></span>
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <Accordion
                        title="What makes this blockchain different from others?"
                        content="Our architecture prioritizes user ownership and transparent automation logic, unlike black-box competitors."
                    />
                    <Accordion
                        title="How can I buy your token?"
                        content="Our utility token is available on Uniswap and our partner centralized exchanges."
                    />
                    <Accordion
                        title="What makes this blockchain different from others?"
                        content="We use a unique consensus layer that allows for sub-second finality on trade execution signals."
                    />
                    <Accordion
                        title="How secure is your blockchain platform?"
                        content="Security is paramount. We undergo quarterly third-party audits and maintain a bug bounty program."
                    />
                    <Accordion
                        title="What security measures are in place for transactions?"
                        content="All API keys are encrypted with RSA-2048 and stored in hardware security modules (HSM)."
                    />
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

const Accordion = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/10 pb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between text-left py-2 group"
            >
                <span className="font-bold text-white group-hover:text-[#00FF9D] transition-colors pr-4">{title}</span>
                <span className={`text-[#00FF9D] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-32 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
            >
                <p className="text-sm text-gray-400 leading-relaxed pr-8">{content}</p>
            </div>
        </div>
    );
};

export default Company;
