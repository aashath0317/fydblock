import React, { useState } from 'react';
import {
    Users, Share2, Wallet, ArrowRight,
    CheckCircle2, Plus, Minus, ChevronRight
} from 'lucide-react';

const Affiliate = () => {
    // Simple state for the "calculator" slider visual
    const [clients, setClients] = useState(10);
    const earnings = (clients * 125).toLocaleString(); // Mock calculation: $125 per client

    return (
        <div className="pt-32 pb-20 relative z-10 animate-in fade-in duration-500">

            {/* --- Hero Section --- */}
            <section className="container mx-auto px-6 mb-24">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Text */}
                    <div className="space-y-8">
                        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                            Earn Up To 30% For <br />
                            Every Payment <br />
                            Your Referred <br />
                            Users Make.
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Lifetime referral share + bonuses for trading volume.
                        </p>
                        <button className="bg-[#00FF9D]/10 text-[#00FF9D] border border-[#00FF9D] px-8 py-3 rounded-full font-bold hover:bg-[#00FF9D] hover:text-black transition-all shadow-[0_0_15px_rgba(0,255,157,0.1)]">
                            Join Now
                        </button>
                    </div>

                    {/* Right Calculator Card */}
                    <div className="relative">
                        {/* Background Glow */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#00FF9D]/20 to-blue-500/20 rounded-3xl blur-2xl -z-10"></div>

                        <div className="bg-[#0A1014]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative">
                            {/* Decorative Green Line */}
                            <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-[#00FF9D] to-transparent opacity-50 rounded-r-3xl"></div>

                            <div className="flex justify-between items-end mb-4">
                                <span className="text-gray-400 text-sm uppercase tracking-wider">Number of Clients</span>
                                <span className="text-5xl font-light text-white">{clients}</span>
                            </div>

                            {/* Slider Input */}
                            <input
                                type="range"
                                min="1"
                                max="100"
                                value={clients}
                                onChange={(e) => setClients(parseInt(e.target.value))}
                                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00FF9D] mb-12 hover:accent-[#00cc7d]"
                            />

                            <div className="bg-[#050B0D] border border-white/5 rounded-2xl p-6">
                                <p className="text-gray-400 text-xs uppercase mb-2">Your potential Earnings</p>
                                <p className="text-4xl font-bold text-white">${earnings}</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Partners Logos (Mock) */}
                <div className="mt-24 pt-12 border-t border-white/5 flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {['NEXO', 'COINBASE', 'CRYPTO.COM', 'BINANCE', 'COINMARKETCAP'].map((brand, i) => (
                        <span key={i} className="text-xl font-bold text-gray-500 flex items-center gap-2">
                            <div className="w-6 h-6 bg-gray-600 rounded-full"></div> {brand}
                        </span>
                    ))}
                </div>
            </section>

            {/* --- Steps Section --- */}
            <section className="container mx-auto px-6 mb-24">
                <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-16">
                    Get Started In Three Easy Steps
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
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

                <p className="text-center text-gray-400 mt-12 max-w-2xl mx-auto">
                    Get subscription and trading volume bonuses from users you refer,
                    regardless of which exchange they trade on using FydBlock.
                </p>
            </section>

            {/* --- Pro Affiliate Banner --- */}
            <section className="container mx-auto px-6 mb-24">
                <div className="border border-white/10 bg-[#0A1014]/50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00FF9D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Become our Pro Affiliate</h3>
                        <p className="text-gray-400">Earn lifetime commission + trading volume bonus.</p>
                    </div>
                    <button className="bg-[#00FF9D] text-black px-8 py-3 rounded-full font-bold hover:bg-[#00cc7d] transition-all shadow-[0_0_15px_rgba(0,255,157,0.3)] z-10">
                        Join Now
                    </button>
                </div>
            </section>

            {/* --- FAQ Section --- */}
            <section className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 mb-20">
                <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-[#00FF9D]/10 text-[#00FF9D] text-xs font-bold mb-6">
                        Frequently Asked Questions
                    </div>
                    <h2 className="text-4xl font-bold mb-6 text-white leading-tight">
                        Crypto Blockchain <br /> Frequently Asked <br /> Questions
                    </h2>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                        Here are some of the most common questions from our community.
                        Whether you are a first-time user, investor, or developer, we've got the answers.
                    </p>
                    <div className="flex items-center gap-6">
                        <button className="bg-[#00FF9D] text-black px-6 py-3 rounded-full font-bold hover:bg-[#00cc7d] transition-all">
                            More Questions
                        </button>
                        <button className="text-white flex items-center gap-2 hover:text-[#00FF9D] transition-colors font-medium">
                            Contact Us <span className="bg-white/10 rounded-full p-1"><ArrowRight size={12} /></span>
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
                        title="How does your blockchain handle scalability?"
                        content="We utilize sharding technology to ensure high throughput even during peak network activity."
                    />
                    <Accordion
                        title="What security measures are in place for transactions?"
                        content="All API keys are encrypted with RSA-2048 and stored in hardware security modules (HSM)."
                    />
                    <Accordion
                        title="Can I stake my tokens for rewards?"
                        content="Yes, staking is live in the dashboard with up to 12% APY for long-term holders."
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
            ? 'bg-gradient-to-b from-[#00FF9D]/10 to-[#0A1014] border-[#00FF9D]/30 shadow-[0_0_30px_rgba(0,255,157,0.05)]'
            : 'bg-[#0A1014]/50 border-white/5 hover:border-[#00FF9D]/20'}
  `}>
        <div>
            <div className="text-lg font-bold text-white mb-4">{number}</div>
            <p className="text-gray-300 text-sm leading-relaxed mb-8">{title}</p>
        </div>

        {actionLabel && (
            <button className="w-full bg-[#00FF9D] text-black py-2 rounded-lg font-bold text-sm hover:bg-[#00cc7d] transition-colors">
                {actionLabel}
            </button>
        )}

        {/* Decorative corner accent */}
        <div className="absolute top-4 left-4 w-1 h-1 bg-white/20 rounded-full"></div>
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

export default Affiliate;