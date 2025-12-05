import React, { useState, useEffect } from 'react';
import {
    ArrowLeft,
    Check,
    ChevronRight,
    ArrowUpRight,
    CheckCircle2,
    Loader2,
    Zap, // Added for placeholder icon
    Lock, // Added for placeholder icon
    BarChart2, // Added for placeholder icon
    Layers // Added for placeholder icon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from './config';

// --- MOCK DATA ---
const EXCHANGES = [
    { id: 'binance', name: 'Binance', logo: '/logos/BINANCE.png' },
    { id: 'bybit', name: 'Bybit', logo: '/logos/BYBIT.png' },
    { id: 'okx', name: 'OKX', logo: '/logos/OKX.jpg' },
];

const CURRENCIES = [
    { id: 'USDT', name: 'USDT', icon: 'T', symbol: '$' },
    { id: 'USDC', name: 'USDC', icon: '$', symbol: '$' },
    { id: 'BNB', name: 'BNB', icon: 'B', symbol: 'B' },
    { id: 'BTC', name: 'BTC', icon: '₿', symbol: '₿' },
    { id: 'EUR', name: 'EUR', icon: '€', symbol: '€' },
];

// --- COMPONENTS ---

// 1. Breadcrumb Navigation
const Breadcrumbs = ({ currentStep }) => {
    const steps = [
        { id: 1, label: '1. General Information' },
        { id: 2, label: '3. Connect Exchange' }, // Matches design label '3'
        { id: 3, label: '4. Select Currency' }, // Matches design label '4'
        { id: 4, label: '2. Bot Type & Plans' }, // Matches design label '2'
        { id: 5, label: '5. Let\'s Trade' },
    ];
    // Note: The code uses 1, 2, 3, 4, 5 for logic, but displays the labels from the designs.
    const stepsInFlow = [1, 2, 3, 4, 5];

    return (
        <div className="flex flex-wrap justify-center items-center gap-4 mb-12 text-sm font-medium">
            {stepsInFlow.map((flowStep, index) => {
                const step = steps[index];
                return (
                    <div key={step.id} className="flex items-center gap-3">
                        <span className={`
                            px-3 py-2 rounded transition-all duration-300 flex items-center gap-2 whitespace-nowrap
                            ${currentStep === flowStep
                                ? 'bg-[#00FF9D] text-black font-bold shadow-[0_0_15px_rgba(0,255,157,0.3)]'
                                : flowStep < currentStep
                                    ? 'text-[#00FF9D]'
                                    : 'text-gray-500'
                            }
                        `}>
                            {step.label}
                        </span>
                        {index < steps.length - 1 && <span className="text-gray-700">→</span>}
                    </div>
                );
            })}
        </div>
    );
};

const BotBuilder = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [wizardData, setWizardData] = useState({
        name: '',
        country: '',
        phone: '',
        exchange: '',
        apiKey: '',
        apiSecret: '',
        currency: 'USDT', // Default
        plan: 'signature', // Default plan
        billingCycle: 'monthly', // Default billing
        agreed: false
    });

    // --- ACCESS CONTROL & INITIALIZATION ---
    useEffect(() => {
        const token = localStorage.getItem('token');

        // 1. Check Login
        if (!token) {
            navigate('/signin');
            return;
        }

        // 2. Check User Status (Block if already completed)
        const checkStatus = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/user/me`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();

                // If user has a bot, block access to the builder
                if (data.botCreated) {
                    navigate('/dashboard');
                    return;
                }

                // If user has profile data, pre-fill and possibly skip step 1
                if (data.profileComplete) {
                    setWizardData(prev => ({
                        ...prev,
                        name: data.user.full_name,
                        country: data.user.country,
                        phone: data.user.phone_number,
                        agreed: true
                    }));
                    // Logic to continue the flow if already started
                    // For now, we'll keep it simple and just allow continuing from 1
                }

            } catch (err) {
                // If token is invalid or endpoint fails, redirect to login
                navigate('/signin');
            }
        };

        checkStatus();
    }, [navigate]);

    // --- API HANDLERS (Same logic as provided in previous turn) ---
    const submitStep1 = async () => {
        if (!wizardData.name || !wizardData.country || !wizardData.phone || !wizardData.agreed) {
            return alert("Please fill all fields and agree to the terms.");
        }
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/user/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    full_name: wizardData.name, country: wizardData.country, phone: wizardData.phone
                })
            });
            if (res.ok) { setCurrentStep(2); } else { alert("Failed to save profile."); }
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    const submitStep2 = async () => {
        if (!wizardData.exchange) return alert("Please select an exchange.");
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/user/exchange`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ exchange_name: wizardData.exchange, api_key: wizardData.apiKey || "dummy_key", api_secret: wizardData.apiSecret || "dummy_secret" })
            });

            if (res.ok) { setCurrentStep(3); } else { alert("Failed to connect exchange."); }
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    const submitFinalBot = async () => {
        if (!wizardData.plan) return alert("Please select a plan.");
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/user/bot`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    bot_name: `${wizardData.plan} Bot`,
                    quote_currency: wizardData.currency,
                    bot_type: 'DCA',
                    plan: wizardData.plan,
                    billing_cycle: wizardData.billingCycle
                })
            });

            if (res.ok) { setCurrentStep(5); } else { alert("Failed to create bot."); }
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    // --- RENDER HELPERS (UI REWRITE) ---

    // STEP 1 UI
    const renderStep1 = () => (
        <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">General Information</h1>
                <p className="text-gray-400 font-light text-lg">
                    Please provide us with some details about yourself so that you can continue creating your first bot!
                </p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-white text-lg font-medium mb-2">Full name</label>
                    <input
                        type="text"
                        className="w-full bg-white text-black text-lg rounded-lg px-4 py-3 outline-none focus:ring-4 focus:ring-[#00FF9D]/30 transition-shadow"
                        placeholder="Shaafi"
                        value={wizardData.name}
                        onChange={(e) => setWizardData({ ...wizardData, name: e.target.value })}
                    />
                </div>

                {/* Country of Resident (Using Select for dropdown visual) */}
                <div>
                    <label className="block text-white text-lg font-medium mb-2">Country of Resident</label>
                    <select
                        className="w-full bg-white text-black text-lg rounded-lg px-4 py-3 outline-none appearance-none focus:ring-4 focus:ring-[#00FF9D]/30 transition-shadow cursor-pointer"
                        value={wizardData.country}
                        onChange={(e) => setWizardData({ ...wizardData, country: e.target.value })}
                    >
                        <option value="" disabled>Select Country</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="Global">Global / Other</option>
                    </select>
                </div>

                {/* Phone Number (Using Select for dropdown visual, though input is better for data) */}
                <div>
                    <label className="block text-white text-lg font-medium mb-2">Phone Number</label>
                    <select
                        className="w-full bg-white text-black text-lg rounded-lg px-4 py-3 outline-none appearance-none focus:ring-4 focus:ring-[#00FF9D]/30 transition-shadow cursor-pointer"
                        value={wizardData.phone}
                        onChange={(e) => setWizardData({ ...wizardData, phone: e.target.value })}
                    >
                        <option value="" disabled>Select Country</option>
                        <option value="+1">+1 (US)</option>
                        <option value="+44">+44 (UK)</option>
                    </select>
                </div>

                <div className="pt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            className="w-5 h-5 rounded accent-[#00FF9D] checked:bg-[#00FF9D] peer"
                            checked={wizardData.agreed}
                            onChange={() => setWizardData({ ...wizardData, agreed: !wizardData.agreed })}
                        />
                        <span className="text-gray-400 text-sm">
                            I agree to fydblock's <span className="text-[#00FF9D]">Terms of Service</span>
                        </span>
                    </label>
                </div>

                <button
                    onClick={submitStep1}
                    disabled={!wizardData.name || !wizardData.country || !wizardData.phone || !wizardData.agreed || loading}
                    className={`
                        mt-8 px-10 py-3 rounded-lg bg-[#00FF9D] text-black font-bold text-lg hover:bg-[#00cc7d] transition-all w-40
                        ${loading || !wizardData.name ? 'opacity-50 cursor-not-allowed' : 'shadow-[0_0_20px_rgba(0,255,157,0.4)]'}
                    `}
                >
                    {loading ? <Loader2 className="animate-spin mx-auto" size={24} /> : "Submit"}
                </button>
            </div>
        </div>
    );

    // STEP 2 UI
    const renderStep2 = () => (
        <div className="w-full max-w-6xl mx-auto animate-in fade-in duration-500">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                    Connect An Exchange To Start<br />Trading
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
                    Automate your strategy without code, test it on historical data, optimize, and execute across all connected accounts.
                </p>
            </div>

            {/* Exchange Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {EXCHANGES.map((ex) => (
                    <div
                        key={ex.id}
                        onClick={() => setWizardData({ ...wizardData, exchange: ex.id })}
                        className={`
                            relative group cursor-pointer h-52 rounded-xl border transition-all duration-300 flex items-center justify-center overflow-hidden bg-[#0A1014]
                            ${wizardData.exchange === ex.id
                                ? 'border-[#00FF9D] shadow-[0_0_30px_rgba(0,255,157,0.1)]'
                                : 'border-gray-800 hover:border-gray-500'
                            }
                        `}
                    >
                        {/* Selected Indicator Arrow */}
                        <div className={`
                            absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                            ${wizardData.exchange === ex.id ? 'bg-[#00FF9D] text-black scale-100' : 'bg-gray-800 text-gray-400'}
                        `}>
                            <ArrowUpRight size={16} />
                        </div>

                        {/* Logo */}
                        <img
                            src={ex.logo}
                            alt={ex.name}
                            className="h-14 object-contain"
                        />
                    </div>
                ))}
            </div>

            {/* CTA/Skip Buttons */}
            <div className="flex flex-col items-center space-y-4">
                <button className="px-10 py-3 rounded border border-gray-700 text-gray-400 hover:border-white hover:text-white transition-all text-sm uppercase tracking-wider">
                    View other exchanges
                </button>
                <p className="text-gray-500">Or</p>
                <button onClick={() => setCurrentStep(3)} className="text-[#00FF9D] hover:text-[#00cc7d] hover:underline text-lg">
                    I will do it later
                </button>
            </div>

            {/* Disclaimer Footer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24 pt-8 border-t border-gray-800/50 text-xs text-gray-500">
                <div className="flex items-start gap-3">
                    <Lock size={16} className="text-[#00FF9D] shrink-0 mt-1" />
                    <span>We will not have access to transfer or withdraw your assets. Your funds remain secure with encrypted API keys.</span>
                </div>
                <div className="flex items-start gap-3">
                    <Zap size={16} className="text-[#00FF9D] shrink-0 mt-1" />
                    <span>Your data is protected by Cloudflare, defending against attacks and encrypting all information.</span>
                </div>
            </div>
            {wizardData.exchange && (
                <div className="flex justify-center mt-12">
                    <button onClick={submitStep2} className="bg-[#00FF9D] text-black px-12 py-3 rounded-lg font-bold hover:bg-[#00cc7d]">Connect & Continue</button>
                </div>
            )}
        </div>
    );

    // STEP 3 UI
    const renderStep3 = () => (
        <div className="w-full max-w-6xl mx-auto animate-in fade-in duration-500 flex flex-col md:flex-row items-start justify-between gap-16">

            {/* Left Side: Currency List */}
            <div className="flex-1 max-w-xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Select Quote Currency
                </h1>
                <p className="text-gray-400 mb-10 text-lg leading-relaxed">
                    Select the quote currency that your bot will use for all trades on your Bybit account.
                    This will determine which asset your bot uses as the base for executing and settling trades.
                </p>

                <div className="space-y-2 bg-[#050B0D] border border-gray-700 rounded-xl overflow-hidden">
                    {CURRENCIES.map((curr) => (
                        <div
                            key={curr.id}
                            onClick={() => setWizardData({ ...wizardData, currency: curr.id })}
                            className={`
                                flex items-center gap-4 px-6 py-4 border-b border-gray-800 last:border-0 cursor-pointer transition-colors
                                ${wizardData.currency === curr.id ? 'bg-[#00FF9D]/10 border-[#00FF9D]' : 'hover:bg-white/5'}
                            `}
                        >
                            <div className={`
                                w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                                ${wizardData.currency === curr.id ? 'bg-[#00FF9D] text-black' : 'bg-gray-700 text-gray-300'}
                            `}>
                                {curr.symbol}
                            </div>
                            <span className={`text-lg ${wizardData.currency === curr.id ? 'text-[#00FF9D]' : 'text-gray-300'}`}>
                                {curr.name}
                            </span>
                            {wizardData.currency === curr.id && <Check size={20} className="text-[#00FF9D] ml-auto" />}
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => setCurrentStep(4)}
                    className="mt-8 bg-[#00FF9D] text-black px-10 py-3 rounded-lg font-bold hover:bg-[#00cc7d] transition-colors"
                >
                    Continue
                </button>
            </div>

            {/* Right Side: 3D Coin Visual */}
            <div className="flex-1 flex justify-center md:justify-end relative min-h-[400px]">
                <div className="relative w-64 h-64 md:w-96 md:h-96">
                    <div className="absolute top-0 right-0 w-full h-full rounded-full bg-[#00FF9D]/10 blur-[80px]"></div>
                    {/* Placeholder for 3D coin image - Using image tag for better instruction */}
                </div>
            </div>
        </div>
    );

    // STEP 4 UI
    const renderStep4 = () => (
        <div className="w-full max-w-6xl mx-auto animate-in fade-in duration-500">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose Your Path To Automated Trading</h1>
                <p className="text-gray-400 max-w-xl mx-auto">Select the perfect bot based on your goals: effortless long-term growth or full control over complex strategies.</p>
            </div>

            {/* Toggle */}
            <div className="flex justify-center mb-16">
                <div className="bg-[#1A2226] p-1 rounded-full flex items-center">
                    <button
                        onClick={() => setWizardData({ ...wizardData, billingCycle: 'monthly' })}
                        className={`px-8 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${wizardData.billingCycle === 'monthly' ? 'bg-[#53565A] text-white' : 'text-gray-400'}`}
                    >
                        Monthly <span className="bg-[#E2F708] text-black text-[10px] px-1 rounded">40%</span>
                    </button>
                    <button
                        onClick={() => setWizardData({ ...wizardData, billingCycle: 'annual' })}
                        className={`px-8 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${wizardData.billingCycle === 'annual' ? 'bg-[#53565A] text-white' : 'text-gray-400'}`}
                    >
                        Annual <span className="bg-[#E2F708] text-black text-[10px] px-1 rounded">40%</span>
                    </button>
                </div>
            </div>

            {/* Plans */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                {/* Signature Bot */}
                <div
                    onClick={() => setWizardData({ ...wizardData, plan: 'signature' })}
                    className={`
                        rounded-3xl p-8 border cursor-pointer transition-all duration-300 relative overflow-hidden
                        ${wizardData.plan === 'signature' ? 'border-[#00FF9D] bg-[#0A1014] shadow-[0_0_30px_rgba(0,255,157,0.1)]' : 'border-gray-800 bg-[#0A1014] hover:border-gray-600'}
                    `}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#E2F708] text-black text-xs font-bold px-3 py-1 rounded-b-lg">Up to 40% off</div>

                    <h3 className="text-xl text-white mb-2 mt-4">FydBlock Signature Bot</h3>
                    <div className="flex items-end gap-2 mb-6">
                        <span className="text-5xl font-bold text-white">$19</span>
                        <span className="text-xl text-gray-500 line-through">$59</span>
                        <span className="text-gray-400">/Month</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-6">Set and forget Diversified Portfolios</p>

                    <ul className="space-y-4 mb-8">
                        {['1X Signature Bot Slot', 'AI Native Includes', 'Unlimited Coins', '24/7 Rebalancing'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-white text-sm">
                                <Check className="text-[#00FF9D]" size={16} /> {item}
                            </li>
                        ))}
                    </ul>

                    <button className="w-full bg-[#00FF9D] text-black font-bold py-3 rounded-full hover:bg-[#00cc7d]">
                        7 Days Free Trail
                    </button>
                </div>

                {/* Pro Bot */}
                <div
                    onClick={() => setWizardData({ ...wizardData, plan: 'pro' })}
                    className={`
                        rounded-3xl p-8 border cursor-pointer transition-all duration-300 relative overflow-hidden
                        ${wizardData.plan === 'pro' ? 'bg-[#00FF9D] border-[#00FF9D] scale-[1.02]' : 'bg-[#00FF9D] border-[#00FF9D]'}
                    `}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#E2F708] text-black text-xs font-bold px-3 py-1 rounded-b-lg">Up to 40% off</div>

                    <h3 className="text-xl text-black mb-2 mt-4">Pro Custom Strategy Bot</h3>
                    <div className="flex items-end gap-2 mb-6">
                        <span className="text-5xl font-bold text-black">$34</span>
                        <span className="text-xl text-black/60 line-through">$89</span>
                        <span className="text-black/80">/Month</span>
                    </div>
                    <p className="text-black/80 text-sm mb-6">A full-featured suite for seasoned traders.</p>

                    <ul className="space-y-4 mb-8">
                        {['Unlimited Grid bot', 'Suggested Coin', 'Advanced Parameter', 'Access 6 Custom bots'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-black text-sm font-medium">
                                <Check className="text-black" size={16} /> {item}
                            </li>
                        ))}
                    </ul>

                    <button className="w-full bg-black text-white font-bold py-3 rounded-full hover:bg-gray-900">
                        7 Days Free Trail
                    </button>
                </div>
            </div>

            {/* Custom Plan Footer */}
            <div className="max-w-4xl mx-auto bg-[#0A1014] border border-gray-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">Custom Plan</h3>
                    <p className="text-gray-400 text-xs">Go beyond pre-set plans. Unlock more bots, more analytics...</p>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-300">
                    <div className="flex items-center gap-2"><Check className="text-[#00FF9D]" size={14} /> Everything In Plus</div>
                    <div className="flex items-center gap-2"><Check className="text-[#00FF9D]" size={14} /> Dedicated ML</div>
                    <div className="flex items-center gap-2"><Check className="text-[#00FF9D]" size={14} /> Custom Bot Setting</div>
                    <div className="flex items-center gap-2"><Check className="text-[#00FF9D]" size={14} /> Advanced analytics</div>
                </div>
                <button className="bg-[#FFDDA1] text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-[#ffe5b5]">
                    Contact US
                </button>
            </div>

            {/* Continue Button for flow */}
            {wizardData.plan && (
                <div className="flex justify-center mt-12">
                    <button onClick={() => setCurrentStep(5)} className="bg-[#00FF9D] text-black px-12 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(0,255,157,0.4)]">
                        Continue with {wizardData.plan === 'signature' ? 'Signature' : 'Pro'} Bot
                    </button>
                </div>
            )}
        </div>
    );

    // STEP 5 UI
    const renderStep5 = () => (
        <div className="w-full h-[60vh] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
            <div className="w-32 h-32 rounded-full bg-[#00FF9D]/10 flex items-center justify-center mb-8 animate-pulse">
                <CheckCircle2 size={64} className="text-[#00FF9D]" />
            </div>

            <h1 className="text-4xl text-white font-bold mb-4">Let's Trade</h1>
            <p className="text-gray-400 mb-12 text-xl">Your bot is configured and ready to start trading.</p>

            <button
                onClick={submitFinalBot}
                className="bg-[#00FF9D] text-black text-xl font-bold px-16 py-4 rounded-lg shadow-[0_0_30px_rgba(0,255,157,0.4)] hover:bg-[#00cc7d] hover:scale-105 transition-all"
            >
                {loading ? "Launching..." : "Let's Trade"}
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#020B0F] text-white font-sans flex flex-col pt-8 pb-12">
            <div className="container mx-auto px-6">
                {/* Header/Back Button */}
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={currentStep === 1 ? () => navigate('/') : () => setCurrentStep(c => c - 1)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} /> Back
                    </button>
                    <div className="h-6 w-px bg-gray-700 mx-2 hidden md:block"></div>
                    <span className="font-bold text-xl text-white">Bot Builder</span>
                </div>

                <Breadcrumbs currentStep={currentStep} />

                <div className="mt-8">
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                    {currentStep === 4 && renderStep4()}
                    {currentStep === 5 && renderStep5()}
                </div>
            </div>
        </div>
    );
};

export default BotBuilder;
