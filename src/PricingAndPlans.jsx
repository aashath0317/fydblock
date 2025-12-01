import React, { useState } from 'react';
import { Check, ArrowRight, Plus, Minus } from 'lucide-react';

const PricingAndPlans = () => {
    return (
        <div className="pt-32 pb-20 relative z-10 animate-in fade-in duration-500">

            {/* --- Header Section --- */}
            <section className="container mx-auto px-6 text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Plan & Pricing</h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    All FydBlock pricing plans come with a 7-day free trial on the PRO plan.
                    No credit card required.
                </p>
            </section>

            {/* --- Main Pricing Section --- */}
            <section className="container mx-auto px-6 mb-24">
                <div className="flex flex-col gap-12">

                    {/* 1. Text Description - Centered Above Cards */}
                    <div className="text-center max-w-4xl mx-auto space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            Automation That <br className="hidden md:block" />
                            Pays For Itself.
                        </h2>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto">
                            All prices on this website are excluding VAT (if applicable).
                            Free 3 day trial for Explorer package starts directly with each sign up.
                        </p>
                    </div>

                    {/* 2. Pricing Cards - Below the Text */}
                    <div className="grid md:grid-cols-3 gap-6">

                        {/* Card 1: Basic */}
                        <PricingCard
                            title="Basic Plan"
                            price="$14"
                            period="/Month"
                            description="Essential features for starting traders"
                            features={[
                                "3 Active Grid bots",
                                "AI Assistant",
                                "Unlimited Coins",
                                "Unlimited Smart orders"
                            ]}
                            buttonText="Choose Plan"
                            buttonStyle="green-outline"
                        />

                        {/* Card 2: Advance (Highlighted) */}
                        <div className="bg-[#00FF9D] text-black rounded-2xl p-6 relative transform md:-translate-y-4 shadow-[0_0_30px_rgba(0,255,157,0.3)] flex flex-col h-full">
                            <div className="absolute top-4 right-4 bg-black text-[#00FF9D] text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                                Most Popular
                            </div>
                            <h3 className="text-xl font-bold mb-2">Advance Plan</h3>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-4xl font-bold">$35</span>
                                <span className="text-sm font-medium opacity-80">/Month</span>
                            </div>
                            <p className="text-sm font-medium mb-8 opacity-80 h-10">A full-featured suite for seasoned traders.</p>

                            <ul className="space-y-4 mb-8 flex-1">
                                {["Unlimited Grid Bots", "Suggested Coin", "30 Days backtest", "Priority email support"].map((feat, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-bold">
                                        <Check size={16} className="shrink-0" />
                                        {feat}
                                    </li>
                                ))}
                            </ul>

                            <button className="w-full bg-black text-white py-3 rounded-full font-bold hover:bg-gray-900 transition-colors mt-auto">
                                Choose Plan
                            </button>
                        </div>

                        {/* Card 3: Custom */}
                        <PricingCard
                            title="Custom Plan"
                            price="Performance Fees"
                            period=""
                            description="Go beyond pre-set plans. Unlock more bots, for above $2M Capital Clients."
                            features={[
                                "Everything in Plus",
                                "Custom Bot Setting",
                                "Dedicated ML",
                                "Advanced analytics"
                            ]}
                            buttonText="Contact US"
                            buttonStyle="tan"
                        />

                    </div>
                </div>
            </section>

            {/* --- Free Plan Banner --- */}
            <section className="container mx-auto px-6 mb-24">
                <div className="border border-white/10 bg-[#0A1014]/50 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-bold text-white">$0</span>
                            <span className="text-gray-400">/Month</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 text-gray-400 text-sm">
                        <div className="flex items-center gap-2"><Check size={16} className="text-[#00FF9D]" /> 5 Bots Free on OKX</div>
                        <div className="flex items-center gap-2"><Check size={16} className="text-[#00FF9D]" /> Unlimited Manual trading</div>
                        <div className="flex items-center gap-2"><Check size={16} className="text-[#00FF9D]" /> 1 Bot Backtest (30D)</div>
                    </div>

                    <button className="bg-[#00FF9D] text-black px-8 py-3 rounded-full font-bold hover:bg-[#00cc7d] transition-colors shadow-[0_0_15px_rgba(0,255,157,0.3)]">
                        sign up for free
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
                        Whether you're a first-time user or developer, we've got the answers.
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
                        content="Our architecture combines scalability, speed, and low fees while supporting complex smart contracts and eco-friendly protocols."
                        isOpen={true}
                    />
                    <Accordion
                        title="How can I buy your token?"
                        content="You can purchase our tokens through major decentralized exchanges (DEX) or directly through our launchpad partners."
                    />
                    <Accordion
                        title="What makes this blockchain different from others?"
                        content="We use a unique consensus mechanism that ensures faster finality and higher throughput compared to legacy chains."
                    />
                    <Accordion
                        title="How does your blockchain handle scalability?"
                        content="We use dynamic sharding and layer-2 solutions to process thousands of transactions per second without network congestion."
                    />
                    <Accordion
                        title="What security measures are in place for transactions?"
                        content="All transactions are secured by military-grade encryption and verified by a distributed network of validators."
                    />
                    <Accordion
                        title="Can I stake my tokens for rewards?"
                        content="Yes! Staking is a core feature. You can earn up to 12% APY by delegating your tokens to a validator node."
                    />
                </div>
            </section>

        </div>
    );
};

/* --- Sub Components --- */

const PricingCard = ({ title, price, period, description, features, buttonText, buttonStyle }) => {
    const isTan = buttonStyle === 'tan';

    return (
        <div className="bg-[#0A1014] border border-white/10 rounded-2xl p-6 flex flex-col h-full hover:border-[#00FF9D]/30 transition-all">
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-white">{price}</span>
                {period && <span className="text-xs text-gray-500 font-medium">{period}</span>}
            </div>
            <p className="text-sm text-gray-400 mb-8 h-10">{description}</p>

            <ul className="space-y-4 mb-8 flex-1">
                {features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                        <Check size={16} className="text-[#00FF9D] shrink-0" />
                        {feat}
                    </li>
                ))}
            </ul>

            <button
                className={`w-full py-3 rounded-full font-bold transition-all mt-auto ${isTan
                        ? 'bg-[#EBCB8B] text-black hover:bg-[#d0b070]'
                        : 'bg-[#00FF9D] text-black hover:bg-[#00cc7d]'
                    }`}
            >
                {buttonText}
            </button>
        </div>
    );
};

const Accordion = ({ title, content, isOpen: defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

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

export default PricingAndPlans;