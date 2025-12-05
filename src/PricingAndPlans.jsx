import React, { useState } from 'react';
import {
    Check, ArrowRight,
    ChevronDown
} from 'lucide-react';

const PricingAndPlans = () => {
    // State for the billing toggle: true = Annual (Default), false = Monthly
    const [isAnnual, setIsAnnual] = useState(true);

    return (
        <div className="pt-32 pb-20 relative z-10 animate-in fade-in duration-500">

            {/* --- Header Section --- */}
            <section className="container mx-auto px-6 text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Choose Your Path To Automated Trading
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                    Select the perfect bot based on your goals: effortless long-term growth or full control over complex strategies.
                </p>
            </section>

            {/* --- Billing Toggle --- */}
            <div className="flex justify-center mb-16">
                <div className="bg-[#2D3035] p-1 rounded-lg flex items-center relative">
                    {/* Monthly Button */}
                    <button
                        onClick={() => setIsAnnual(false)}
                        className={`
                            px-8 py-3 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2
                            ${!isAnnual ? 'bg-[#53565A] text-white shadow-sm' : 'text-gray-400 hover:text-white'}
                        `}
                    >
                        Monthly
                        <span className="text-[10px] bg-[#E2F708] text-black px-1.5 py-0.5 rounded font-bold">-15%</span>
                    </button>

                    {/* Annual Button */}
                    <button
                        onClick={() => setIsAnnual(true)}
                        className={`
                            px-8 py-3 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2
                            ${isAnnual ? 'bg-[#53565A] text-white shadow-sm' : 'text-gray-400 hover:text-white'}
                        `}
                    >
                        Annual
                        <span className="text-[10px] bg-[#E2F708] text-black px-1.5 py-0.5 rounded font-bold">-54%</span>
                    </button>
                </div>
            </div>

            {/* --- Main Pricing Cards --- */}
            <section className="container mx-auto px-6 mb-20">
                {/* CHANGED: max-w-3xl (Small Width) for the cards only */}
                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">

                    {/* Card 1: FydBlock Signature Bot (Dark) */}
                    <div className="bg-[#0A1014] border border-white/10 rounded-3xl p-8 relative flex flex-col hover:border-white/20 transition-all mt-8 md:mt-0">

                        {/* VISUAL: Yellow Badge (Only shows on Annual) */}
                        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 bg-[#E2F708] text-black text-xs font-bold px-6 py-2 rounded-md uppercase tracking-wider shadow-[0_0_15px_rgba(226,247,8,0.3)] whitespace-nowrap transition-opacity duration-300 ${isAnnual ? 'opacity-100' : 'opacity-0'}`}>
                            Up to 40% off
                        </div>

                        <div className="mt-4 mb-6">
                            <h3 className="text-xl font-bold text-white mb-4">FydBlock Signature Bot</h3>
                            <div className="flex items-baseline gap-3 mb-2">
                                {/* Price Changes Logic: $19 (Annual) vs $50 (Monthly - 15% off $59) */}
                                <span className="text-5xl font-bold text-white">
                                    ${isAnnual ? '19' : '50'}
                                </span>

                                {/* Cross-out price always shows to anchor the value */}
                                <span className="text-xl text-gray-500 line-through decoration-gray-500">$59</span>

                                <span className="text-sm text-gray-400">/Month</span>
                            </div>
                            <p className="text-gray-400 text-sm mt-4">Set and forget Diversified Portfolios</p>
                        </div>

                        <ul className="space-y-5 mb-10 flex-1">
                            {[
                                "1X Signature Bot Slot",
                                "AI Native Includes",
                                "Unlimited Coins",
                                "24/7 Rebalancing"
                            ].map((feat, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm font-medium text-white">
                                    <div className="shrink-0">
                                        <Check size={18} className="text-[#00FF9D]" strokeWidth={3} />
                                    </div>
                                    {feat}
                                </li>
                            ))}
                        </ul>

                        <button className="w-full bg-[#00FF9D] hover:bg-[#00cc7d] text-black font-bold py-4 rounded-full transition-all shadow-[0_0_20px_rgba(0,255,157,0.2)]">
                            7 Days Free Trial
                        </button>
                    </div>

                    {/* Card 2: Pro Custom Strategy Bot (Green) */}
                    <div className="bg-[#00FF9D] rounded-3xl p-8 relative flex flex-col shadow-[0_0_40px_rgba(0,255,157,0.1)] mt-8 md:mt-0">

                        {/* VISUAL: Yellow Badge (Only shows on Annual) */}
                        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 bg-[#E2F708] text-black text-xs font-bold px-6 py-2 rounded-md uppercase tracking-wider shadow-lg whitespace-nowrap transition-opacity duration-300 ${isAnnual ? 'opacity-100' : 'opacity-0'}`}>
                            Up to 40% off
                        </div>

                        <div className="mt-4 mb-6">
                            <h3 className="text-xl font-bold text-black mb-4">Pro Custom Strategy Bot</h3>
                            <div className="flex items-baseline gap-3 mb-2">
                                {/* Price Changes Logic: $34 (Annual) vs $76 (Monthly - 15% off $89) */}
                                <span className="text-5xl font-bold text-black">
                                    ${isAnnual ? '34' : '76'}
                                </span>

                                {/* Cross-out price always shows */}
                                <span className="text-xl text-black/60 line-through decoration-black/40">$89</span>

                                <span className="text-sm text-black/80">/Month</span>
                            </div>
                            <p className="text-black/80 text-sm font-medium mt-4">A full-featured suite for seasoned traders.</p>
                        </div>

                        <ul className="space-y-5 mb-10 flex-1">
                            {[
                                "Unlimited Grid bot",
                                "Suggested Coin",
                                "Advanced Parameter",
                                "Access 6 Custom bots"
                            ].map((feat, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm font-bold text-black">
                                    <div className="shrink-0">
                                        <Check size={18} className="text-black" strokeWidth={3} />
                                    </div>
                                    {feat}
                                </li>
                            ))}
                        </ul>

                        <button className="w-full bg-black hover:bg-gray-900 text-white font-bold py-4 rounded-full transition-all shadow-xl">
                            7 Days Free Trial
                        </button>
                    </div>

                </div>

                <div className="text-center mt-16">
                    <p className="text-xs text-gray-500 max-w-2xl mx-auto">
                        All prices on this website are excluding VAT (if applicable). Free 7 day trial for Explorer package starts directly with each sign up.
                    </p>
                </div>
            </section>

            {/* --- Custom Plan (Wide Card) --- */}
            <section className="container mx-auto px-6 mb-24">
                {/* KEPT: max-w-5xl (Wide Width) for the bottom section */}
                <div className="max-w-5xl mx-auto bg-[#0A1014] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                    {/* Subtle Background Decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FF9D]/5 rounded-full blur-[80px] pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                        {/* Left: Text Info */}
                        <div className="flex-1 text-center lg:text-left">
                            <h3 className="text-3xl font-bold text-white mb-2">Custom Plan</h3>
                            <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto lg:mx-0">
                                Go beyond pre-set plans. Unlock more bots, more analytics, and dedicated support strategies.
                            </p>
                        </div>

                        {/* Center: Features Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                            {[
                                "Everything in Plus",
                                "Dedicated ML",
                                "Custom Bot Setting",
                                "Advanced analytics"
                            ].map((feat, i) => (
                                <div key={i} className="flex items-center gap-3 justify-start">
                                    <div className="w-5 h-5 flex items-center justify-center shrink-0">
                                        <Check size={18} className="text-[#00FF9D]" strokeWidth={3} />
                                    </div>
                                    <span className="text-sm text-white font-medium">{feat}</span>
                                </div>
                            ))}
                        </div>

                        {/* Right: Button */}
                        <div>
                            <button className="bg-[#FFDDA1] hover:bg-[#ffe5b5] text-black px-10 py-3 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(255,221,161,0.2)] whitespace-nowrap">
                                Contact US
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FAQ Section --- */}
            <section className="py-12 relative z-10" id="faq">
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

export default PricingAndPlans;
